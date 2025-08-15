
export interface AuthRequest {
  cpf: string,
  senha: string
}

export interface AuthResponse {
  token: string
  xtoken: string
  idpessoa: string
  nome: string
  graduacao: string
  rg: string
  nome_guerra: string
  unidade: number
  img: string
}
