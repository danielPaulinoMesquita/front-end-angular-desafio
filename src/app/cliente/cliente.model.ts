export class Cliente {
  id: number
  nome: string
  senha: string
  cpf: string
  emails: string[]
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  complemento: string
  perfis: string[]
  telefones: Telefone[]

  constructor() {
    this.cep = "";
    this.telefones = [];
    this.emails = [];
  }

}

export class Telefone {
  numero: string
  tipoTelefone: string

  constructor() {
    this.tipoTelefone = "";
    this.numero = "";
  }

}

