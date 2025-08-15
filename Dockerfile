# =========================
# 1) Build Angular (prod)
# =========================
FROM node:20-slim AS build
WORKDIR /app

# Instala deps antes para melhor cache
COPY package*.json ./
RUN npm ci

# Copia o código
COPY . .

# Build de produção (seu script "build" já chama ng build)
# Se precisar de um profile específico: npm run build -- --configuration=production
RUN npm run build

# Normaliza saída: move para /app/build_out
# - Angular moderno: dist/<app>/browser
# - Angular clássico: dist/<app>
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
# 2) Nginx (servindo SPA)
# =========================
FROM nginx:stable-alpine AS final

# Remove site default
RUN rm -rf /usr/share/nginx/html/*

# Copia artefatos do build
COPY --from=build /app/build_out/ /usr/share/nginx/html/

# Nginx para SPA + cache estático + healthcheck
COPY ops/nginx.conf /etc/nginx/conf.d/default.conf

# Health estático simples
RUN printf '{\"status\":\"ok\"}\n' > /usr/share/nginx/html/healthz

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost/healthz || exit 1