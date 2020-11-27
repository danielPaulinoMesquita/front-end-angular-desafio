import {Component, OnInit} from '@angular/core';
import {LoginService} from "../security/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
  'styles.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

  estaLogado():boolean{
    return this.loginService.estaLogado();
  }
}
