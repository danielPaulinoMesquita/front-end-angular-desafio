import {Component, EventEmitter, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {Usuario} from "./usuario.model";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {tryCatch} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  erro: boolean;
  mensagem: string = "";
  usuario: Usuario;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(usuario: Usuario){
    this.loginService.login(usuario.usuario, usuario.senha)
      .subscribe(response => {
        this.usuario = response;
        localStorage.setItem("usuario_logado",JSON.stringify(this.usuario));
        this.router.navigate(['/cliente']);
      })
  }

}
