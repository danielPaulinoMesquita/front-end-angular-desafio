export class Cliente {
  id: number
  nome: string
  cpf: string
  emails: string[]
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  complemento: string
  telefones: Telefone[]

  constructor() {
    this.cep = "";
    this.logradouro = "";
    this.bairro = "";
    this.cidade = "";
    this.uf = "";
    this.complemento = "";
    this.telefones = [];
    this.emails = [];
  }

}

export class Telefone {
  id: number
  numero: string
  tipoTelefone: string

  constructor() {
    this.tipoTelefone = "";
    this.numero = "";
  }

}

