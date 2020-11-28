import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "./cliente.model";

@Injectable()
export class ClienteService {

  URL = "http://localhost:8080/clientes";
  VIACEP = "https://viacep.com.br/ws";

  constructor(private http: HttpClient) {}

  clientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.URL}`);
  }

  clientesPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.URL}/${id}`)
  }

  clienteSalvar(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(`${this.URL}`, cliente);
  }

  clienteAtualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.URL}/${cliente.id}`, cliente);
  }

  clienteDeletar(id){
    return this.http.delete(`${this.URL}/${id}`);
  }

  cepPesquisar(cep?: string): Observable<any> {
    return this.http.get(`${this.VIACEP}/${cep}/json`);
  }
}
