export interface ProdAbordagens {
  BPM: string
  Pessoas: number
  Ciclistas: number
  Motociclistas: number
  Automóveis: number
  "Casas de Show\n Averiguadas": number
  "Bares \nAveriguados": number,
  "BAPMS'S": number
}

export interface ProdPrisoes {
  "BPM": string
  "Motos \nRecuperadas": number
  "Veículos 4 Rodas\nRecuperados": number
  "Foragidos\n Recapturados": number
  "Cumprimento de \nmandado judicial": number
  "Flagrantes": number
  "TCO": number
  "Menores \nde Idade": number
  "Arma de Fogo\n Caseira": number
  "Arma de Fogo\n Industrial": number
  "Arma\nBranca": number
  "Simulacro": number
  "Munições": number
  "Entorpecentes \nApreendidos (g)": number
  "Presos por\nTráfico": number
}

export interface ProdArmas {
  "BPM": string
  "Arma de Fogo\n Caseira": number
  "Arma de Fogo\n Industrial": number
  "TOTAL": number
}

export interface ProdArmas {
  "BPM": string
  "Motos \nRecuperadas": number
  "Veículos 4 Rodas\nRecuperados": number
  "Foragidos\n Recapturados": number
  "Cumprimento de \nmandado judicial": number
  "Flagrantes": number
  "TCO": number
  "Menores \nde Idade": number
  "Arma de Fogo\n Caseira": number
  "Arma de Fogo\n Industrial": number
  "Arma\nBranca": number
  "Simulacro": number
  "Munições": number
  "Entorpecentes \nApreendidos (g)": number
  "Presos por\nTráfico": number
}

export interface ProdResponse {
  abordagens: ProdAbordagens[]
  prisoes: ProdPrisoes[]
  armas: ProdArmas[]
}

