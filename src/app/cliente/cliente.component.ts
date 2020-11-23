import { Component, OnInit } from '@angular/core';
import {Cliente, Telefone} from "./cliente.model";
import {ClienteService} from "./cliente.service";
import {catchError} from "rxjs/operators";
import {tryCatch} from "rxjs/internal-compatibility";
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

  tipos: string[] = [
    'RESIDENCIAL',
    'COMERCIAL',
    'CELULAR'
  ]

  telefones: Telefone[];
  telefone: Telefone;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.clientes()
      .subscribe(response =>{
      this.clientes = response;
    })

    this.telefones =[];
    this.telefone = new Telefone();
    this.telefoneRegex = this.TELEFONE_DEFAULT;
  }

  cadastrar(cliente: Cliente){
    this.telefones.forEach(tel => {
      this.telefone = new Telefone();
      this.telefone.numero = tel.numero;
      this.telefone.tipo = tel.tipo;
      this.cliente.telefones.push(this.telefone);
    })

    console.log("Salvar o cliente: ",cliente);
    // this.clienteService.clienteSalvar(cliente)
    //   .subscribe(response => {
    //     this.cliente= response;
    //     this.clientes.push(this.cliente);
    //     this.cliente= null;
    //   })
    Swal.fire(
      'Sucesso',
      'Cadastro feito com sucesso',
      "success");

  }

  atualizar(cliente: Cliente){

  }

  deletar(cliente: Cliente) {

    console.log("deletar o cliente: ",cliente)
    Swal.fire(
      'Deletado!',
      'Seu cliente foi deletado e retirado da lista',
      'success'
    );
    let indiceDoCliente = this.clientes.indexOf(cliente);
    this.clientes.splice(indiceDoCliente, 1);
    // this.clienteService.clienteDeletar(cliente.id)
    //   .subscribe(() => {
    //     let indiceDoCliente = this.clientes.indexOf(cliente);
    //     this.clientes.splice(indiceDoCliente, 1);
    //   });
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
        Swal.fire(
          'Cancelado',
          'O cliente vai permanecer na lista',
          'error'
        )
      }
    })
  }

  adicionarTelefone(){
      console.log(this.telefone)

      this.telefones.push(this.telefone);
      this.telefone = new Telefone();

  }

  mudarMascara(){
    switch (this.telefone.tipo) {
      case 'CELULAR':
        return this.TELEFONE_CELULAR;
        break;
      default:
        return this.TELEFONE_DEFAULT;
        break;
    }
  }

/*

referencia https://cursos.alura.com.br/forum/topico-adicionar-dados-de-um-formulario-em-um-array-angular-2-84397
metodo para adicionar mais de um campo
addAlternativa2() {
    const control = <FormArray>this.formQuiz.controls['alternativas'];
    control.push(this.initAlternativa());
  }

  outro metodo possivel
  public addNewPerson(): void {
    this.people = this.myForm.get('people') as FormArray
    this.people.push(this.createPerson())
}
 */

}
