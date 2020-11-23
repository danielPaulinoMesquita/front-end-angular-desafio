export class Cliente {
  id: string
  nome: string
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
  }

}

export class Telefone {
  numero: string
  tipo: string

  constructor() {
    this.tipo = "";
    this.numero = "";
  }
}
