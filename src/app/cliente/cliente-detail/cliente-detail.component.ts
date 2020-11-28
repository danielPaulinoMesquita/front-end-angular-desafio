import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClienteService} from "../cliente.service";
import {Cliente} from "../cliente.model";

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {

  clienteId: any;
  clienteDetail: Cliente;

  contatos: boolean;
  endereco: boolean;

  telefone: string;
  email:string;

  constructor(private route: ActivatedRoute, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteId = params.get('id');
      this.clienteService.clientesPorId(this.clienteId).subscribe(response => {
        this.clienteDetail = response;
        this.principalEmailETelefone();
      })
      console.log(this.clienteId)
    })
  }

  mudarNav(nav: string){
    switch (nav) {
      case 'contatos':
        this.contatos = true;
        this.endereco = false;
        break;
      case 'endereco':
        this.contatos = false;
        this.endereco = true;
        break;
      default:
        this.contatos = false;
        this.endereco = false;
    }
  }

  principalEmailETelefone(){
    if(this.clienteDetail){
      this.telefone = this.clienteDetail.telefones[0].numero;
      this.email = this.clienteDetail.emails[0];
    }
  }

}
