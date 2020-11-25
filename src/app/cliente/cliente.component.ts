import {Component, OnInit} from '@angular/core';
import {Cliente, Telefone} from "./cliente.model";
import {ClienteService} from "./cliente.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  TELEFONE_DEFAULT = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  TELEFONE_CELULAR = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  clientes: Cliente[];
  cliente: Cliente;
  editar: boolean;

  telefoneRegex: (string | RegExp)[] = [];
  telefones: Telefone[];
  telefone: Telefone;

  tipos: string[] = [
    'RESIDENCIAL',
    'COMERCIAL',
    'CELULAR'
  ]

  emails:string[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.clientes()
      .subscribe(response =>{
      this.clientes = response;
    })

    this.inicializarCliente();
    this.inicializarTelefone();
  }

  cadastrar(cliente: Cliente){
    this.criarClienteSalvar(cliente);

    this.clienteService.clienteSalvar(this.cliente)
      .subscribe((response) => {
        this.cliente = response;
        this.clientes.push(this.cliente);
      })
    this.mensagemAviso("Sucesso", "Cadastro feito com sucesso", "success");

    this.cliente= new Cliente();
  }

  atualizar(cliente: Cliente){
    this.criarClienteSalvar(cliente);

    this.clienteService.clienteAtualizar(this.cliente)
      .subscribe((response) => {
        this.cliente = response;
        this.clientes.push(this.cliente);
      })
    this.mensagemAviso("Sucesso", "Atualização feita com sucesso", "success");

    this.editar = false;
    this.cliente= new Cliente();
  }

  editarCliente(cliente: Cliente){
    this.clienteService.clientesPorId(cliente.id)
      .subscribe(response => {
      this.cliente = response;
      this.telefones = this.cliente.telefones;
      this.emails = this.cliente.emails;
      this.editar = true;
    })

    console.log("está em modo edição: ",this.editar);
    console.log("cliente para edição: ", cliente);
  }

  deletar(cliente: Cliente) {
    this.clienteService
      .clienteDeletar(cliente.id)
      .subscribe(() => {
        let indiceDoCliente = this.clientes.indexOf(cliente);
        this.clientes.splice(indiceDoCliente, 1);
        this.mensagemAviso("Deletado!", "Seu cliente foi deletado e retirado da lista","success");
      });
  }

  confirmarDelete(cliente: Cliente){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você vai deletar o cliente da lista',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.deletar(cliente);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.mensagemAviso("Cancelado","O cliente vai permanecer na lista","error")
      }
    })
  }

  cancelar(){
     this.editar = false;
     this.cliente = new Cliente();
  }

  mensagemAviso(titulo:string, msg:string, icon:any){
    Swal.fire(titulo, msg, icon);
  }

  adicionarTelefone(){
      this.telefones.push(this.telefone)
      this.telefone = new Telefone();
  }

  retirarTelefone(telefone: Telefone){
    let indice = this.telefones.indexOf(telefone);
    this.telefones.splice(indice,1);
  }

  adicionarEmail(){
    this.telefones.push(this.telefone)
    this.telefone = new Telefone();
  }

  retirarEmail(email: string){
    let indice = this.emails.indexOf(email);
    this.emails.splice(indice,1);
  }

  inicializarTelefone(){
    this.telefone = new Telefone();
    this.telefones = [];
    this.telefoneRegex = this.TELEFONE_DEFAULT;
  }

  inicializarCliente(){
    this.editar = false;
    this.cliente = new Cliente();
  }

  criarClienteSalvar(cliente): void {
    this.cliente = new Cliente();
    this.cliente.id = cliente.id;
    this.cliente.nome = cliente.nome;
    this.cliente.emails.push(cliente.email);
    this.cliente.senha = cliente.senha;
    this.cliente.cpf = cliente.cpf;
    this.cliente.cep = cliente.cep;
    this.cliente.bairro = cliente.bairro;
    this.cliente.cidade = cliente.cidade;
    this.cliente.logradouro = cliente.logradouro;
    this.cliente.uf = cliente.uf;
    this.cliente.complemento = cliente.complemento;

    this.telefones.forEach(tel => {
      this.cliente.telefones.push(tel);
    })
  }

  mudarMascara(){
    switch (this.telefone.tipoTelefone) {
      case 'CELULAR':
        return this.TELEFONE_CELULAR;
        break;
      default:
        return this.TELEFONE_DEFAULT;
        break;
    }
  }

}
