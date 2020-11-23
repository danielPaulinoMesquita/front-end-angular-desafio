import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "./cliente.model";

@Injectable()
export class ClienteService {

  URL = "http://localhost:8080/clientes";

  constructor(private http: HttpClient) {}

  // Map e catch foi importado separadamente
  // FILTRO para clientes
  clientesFiltro(search?: string): Observable<Cliente[]> {

    let params: HttpParams = undefined;
    if (search) {
      params = new HttpParams().set('q', search)
    }

    return this.http.get<Cliente[]>(`${this.URL}`, {params});

  }

  clientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.URL}`);
  }

  clientesPorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.URL}/${id}`)
  }

  clienteSalvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.URL}`, cliente);
  }

  clienteDeletar(id){
    return this.http.delete(`${this.URL}/${id}`);
  }
}
