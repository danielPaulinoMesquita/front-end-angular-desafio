import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./security/login/login.service";

@Injectable()
export class Guard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.loginService.estaLogado()){
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
