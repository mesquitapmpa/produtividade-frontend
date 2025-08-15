import { Efetivo } from "./efetivo";
import { Parametro } from "./param";



export interface Imagem {
  "armamento_id": number,
  "code": string,
  "id": number,
  "name": string,
  "url": string
}

export interface Armamento {
  id?: string
  code?: string
  marca?:  {
    code: string
    name: string
  }
  nserie?: string
  nrp?: string
  status?:  {
    code: string
    name: string
  }
  unidade?:  {
    code: string
    name: string
  }
  unidade_vinculada?: number
  imagens: Imagem[]
  obs?: string
  create_at?: string
  update_at?: string

}


export interface ArmamentoResponse {
  data: Armamento[]
}
