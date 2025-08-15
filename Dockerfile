# =========================
# 1) Build Angular (prod)
# =========================
FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# seu script "build" já chama ng build (produção)
RUN npm run build

# Normaliza a saída do Angular (browser/ ou raiz) para /app/build_out
RUN node -e "\
const fs=require('fs');\
const aj=require('./angular.json');\
const app=(aj.defaultProject)||(Object.keys(aj.projects)[0]);\
const path=require('path');\
const a=path.join('dist',app,'browser');\
const b=path.join('dist',app);\
const out='/app/build_out';\
fs.mkdirSync(out,{recursive:true});\
if(fs.existsSync(a)){ require('child_process').execSync('cp -R '+a+'/* '+out+'/'); }\
else if(fs.existsSync(b)){ require('child_process').execSync('cp -R '+b+'/* '+out+'/'); }\
else { throw new Error('Não encontrei diretório de build em dist/'+app); }\
"

# =========================
# 2) Nginx (SPA)
# =========================
FROM nginx:stable-alpine AS final

# limpa html padrão
RUN rm -rf /usr/share/nginx/html/*

# copia build
COPY --from=build /app/build_out/ /usr/share/nginx/html/

# grava a config do nginx diretamente (SPA + cache + health)
RUN printf '%s\n' "\
server { \
  listen 80; \
  server_name 32bpm.mesquitapmpa.com.br; \
  root /usr/share/nginx/html; \
  index index.html; \
  gzip on; \
  gzip_types text/plain text/css application/javascript application/json image/svg+xml; \
  gzip_min_length 1024; \
  location = /healthz { default_type application/json; try_files /healthz =200; } \
  location ~* \.(?:js|mjs|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$ { \
    try_files \$uri =404; access_log off; expires 30d; \
    add_header Cache-Control \"public, max-age=2592000, immutable\"; } \
  location / { try_files \$uri \$uri/ /index.html; } \
}" > /etc/nginx/conf.d/default.conf

# health estático
RUN printf '{\"status\":\"ok\"}\n' > /usr/share/nginx/html/healthz

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/healthz || exit 1