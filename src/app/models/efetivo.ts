
interface Quadro {
  "quadro": string
}

interface Graduacao {
    "idgraduacao": number,
    "graduacao": string,
    "idquadro": number,
    "quadro": Quadro
}

export interface Efetivo {
  id: number
  idpessoa: number
  nome: string
  rg: number
  cpf: string
  idunidade: number
  nome_guerra: string
  idsituacao_funcional: number
  relevancia?: string
  graduacao: Graduacao
  quadro: Quadro
  str_graduacao: string
  str_quadro: string
  image?: string
}


export interface EfetivoResponse {
  count: number,
  rows: Efetivo[]
}

/*
  {
          "idpessoa": 3803,
          "idgraduacao": 10,
          "nome": "ESMALIE DA SILVA MESQUITA",
          "cpf": "83786120234",
          "rg": 33433,
          "idsituacao_funcional": 1,
          "oculto": 0,
          "idunidade": 78,
          "nome_guerra": "MESQUITA",
          "graduacao": {
              "idgraduacao": 10,
              "graduacao": "MAJ",
              "idquadro": 1,
              "quadro": {
                  "quadro": "QOPM"
              }
          },
          "unidade_atividade": {
              "sigla_unidade": "32º BPM",
              "idunidade": 78
          },
          "unidade_lotacao": {
              "sigla_unidade": "32º BPM",
              "idunidade": 78
          },
          "situacao_funcional": {
              "situacao_funcional": "PRONTO PARA EXERCÍCIO DAS ATRIBUIÇÕES"
          },
          "PeopleToManyFunctions": [
              {
                  "id": 9117,
                  "idpessoa": 3803,
                  "idfuncao": 3379,
                  "FuncaoGestor": {
                      "id": 3379,
                      "descricao": "SUBCOMANDANTE DO BATALHÃO",
                      "id_unidade": 78,
                      "oculto": 0,
                      "idunidade": 78
                  }
              }
          ]
      },
*/
