import { Component, OnInit } from "@angular/core";
import { templateJitUrl } from "@angular/compiler";
import { Usuario } from "../../modelo/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { d } from "@angular/core/src/render3";


@Component({

  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent implements OnInit {

  public usuario;
  public returnUrl: string;
  public mensagem: string;
  public ativar_spinner: boolean;
    

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private UsuarioServico: UsuarioServico) {
    
  }

  ngOnInit(): void {

    this.usuario = new Usuario();
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];

  }
  public entrar() {

    this.ativar_spinner = true;

    this.UsuarioServico.verificarUsuario(this.usuario)
      .subscribe(
        usuario_json => {


          this.UsuarioServico.usuario = usuario_json;
          //essa linha séra executada no caso de retorno sem erros
          if (this.returnUrl == null) {
            this.router.navigate(['/']);

          } else {
            this.router.navigate([this.returnUrl]);
          }

          this.router.navigate([this.returnUrl]);

      },
        err => {

          console.log(err.error);
          this.mensagem = err.error;

          this.ativar_spinner = false;

      }
    );

    }
  }




