import { Efetivo } from "./efetivo";
import { Parametro } from "./param";

interface Opcoes {
  label: string
  value: string
}

export interface Image {
  code?: string;
  id?: number;
  name?: string;
  registro_id?: number;
  url?: string;
}

export interface Registro {
  id?: string
  data?: Date
  code?: string
  municipio?: any
  unidade?: any
  parametro?: Parametro
  ocorrencia?: string
  parametro_id?: number
  militares?: Efetivo[]
  efetivo?: string
  relatorio?: string
  create_at?: string
  update_at?: string
  status?: boolean
  images?: Image[]
}


export interface RegistroResponse {
  data: Registro[]
}
