import {Component, OnInit} from '@angular/core';
import {Cliente, Telefone} from "./cliente.model";
import {ClienteService} from "./cliente.service";
import Swal from 'sweetalert2';
import {LoginService} from "../security/login/login.service";
import {Usuario} from "../security/login/usuario.model";


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
  email:string = "";

  usuario: Usuario;

  constructor(private clienteService: ClienteService, private loginService: LoginService) { }

  ngOnInit() {
    this.clienteService.clientes()
      .subscribe(response =>{
      this.clientes = response;
    })

    this.usuario = this.loginService.usuarioLogado();
    console.log(this.usuario)

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

    this.clientes = this.clientes.map(cli => {
      if (cli.id === this.cliente.id){
        return cli = this.cliente;
      }
      return cli;
    });

    this.clienteService.clienteAtualizar(this.cliente)
      .subscribe((response) => {
        this.cliente = response;
        this.clientes = this.clientes.map(cli => {
          if (cli.id === this.cliente.id){
            return cli = this.cliente;
          }
          return cli;
        });
        this.editar = false;

    })
    this.mensagemAviso("Sucesso", "Atualização feita com sucesso", "success");

    this.inicializarTelefone();
    this.inicializarCliente()
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
    this.emails.push(this.email);
    this.email = "";
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
    this.emails = [];
  }

  criarClienteSalvar(cliente): void {
    if (!this.editar){
      this.cliente = new Cliente();
    }
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

  buscarEnderecoCep(event: any){
    let cep = event.target.value;

    if(cep.length ===8){
      this.clienteService.cepPesquisar(cep).subscribe(res =>{
        this.cliente.logradouro = res.logradouro;
        this.cliente.complemento = res.complemento;
        this.cliente.bairro = res.bairro;
        this.cliente.uf = res.uf;
        this.cliente.cidade = res.localidade;
      })
    }
  }

  autenticadoAdmin(): boolean{
    if(this.usuario){
      return this.usuario.perfil === "ADMIN";
    }
  }
}
