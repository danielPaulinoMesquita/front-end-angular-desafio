import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "./usuario.model";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

  URL = "http://localhost:8080";

  USUARIO_LOGADO = 'usuario_logado';

  usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {
  }

  usuarioLogado(): Usuario {
    const usuarioStorage = localStorage.getItem(this.USUARIO_LOGADO);

    if (!usuarioStorage){
      this.router.navigate(['/login']);
    }
    this.usuario = JSON.parse(usuarioStorage);
    return this.usuario;
  }

  estaLogado(): boolean{
    return localStorage.getItem(this.USUARIO_LOGADO) !== null || undefined;
  }

  logout(){
    localStorage.removeItem(this.USUARIO_LOGADO)
  }

  login(usuario: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL}/login`, {usuario: usuario, senha: senha});
  }
}
