export class Cliente {
  id: string
  nome: string
  senha: string
  cpf: string
  emails: string[]
  cep: number
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  complemento: string
  perfis: string[]
  telefones: Telefone[]

  constructor() {
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

