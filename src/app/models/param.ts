
export interface Parametro {
  id: number;
  code?: string;
  nome?: string;
  legenda?: string;
  pontos?: number;
  status?: boolean;
  create_at?: string;
  update_at?: string;
}


export interface ParametroResponse {
  data: Parametro[]
}
