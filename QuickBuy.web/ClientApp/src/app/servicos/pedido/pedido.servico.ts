import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pedido } from "../../modelo/pedido";

@Injectable({
  providedIn:'root'
})
export class PedidoServico {

  public _baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseURL: string) {

    this._baseUrl = baseURL;

  }
  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public efetivarCompra(pedido: Pedido): Observable<number> {

    return this.http.post<number>(this._baseUrl + "api/pedido", JSON.stringify(pedido), { headers: this.headers });
  }


}
