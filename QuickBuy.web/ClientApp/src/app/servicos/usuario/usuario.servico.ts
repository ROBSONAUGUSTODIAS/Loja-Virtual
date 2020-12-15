import { Injectable, inject, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../../modelo/usuario";
import { getBaseUrl } from "../../../main";


@Injectable({
  providedIn: "root"
})

export class UsuarioServico {

  private baseUrl: string;
  private _usuario: Usuario;


  set usuario(usuario: Usuario) {

    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get usuario(): Usuario {
    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuario = JSON.parse(usuario_json);
    return this._usuario;
  }

  public usuario_autenticado(): boolean {

    return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";

  }
  //verifica se usuario é administardor
  public usuario_administrador(): boolean {

    return this.usuario_autenticado() && this.usuario.ehAdministrador;
  }

  public limpar_sessao() {

    sessionStorage.setItem("usuario-autenticado", "");
    this._usuario = null;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/Json');
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.baseUrl = baseUrl;

  }
  public verificarUsuario(usuario: Usuario): Observable<Usuario> {

    const headers = new HttpHeaders().set('content-type', 'application/json');


    var body = {

      email: usuario.email,
      senha: usuario.senha
    }

    return this.http.post<Usuario>(this.baseUrl + "api/usuario/VerificarUsuario", body, { headers });
  }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(this.baseUrl + "api/usuario", JSON.stringify(usuario), { headers: this.headers });
  }
}

