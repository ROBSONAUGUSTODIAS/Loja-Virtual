using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Infrastructure;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.web.Controllers
{
    [Route("api/[Controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
            
        }



        [HttpPost("VerificarUsuario")]
        public IActionResult VerificarUsuario ([FromBody] Usuario usuario)
        {
            try
            {                        //-------------------------------
                var usuarioRetorno = _usuarioRepositorio.Obter(usuario.Email, usuario.Senha);


                //TimeoutControlExtensions de senha VERIFICAR E CORRIGIR!
                if (usuarioRetorno != null)

                    return Ok(usuarioRetorno);
                
                return BadRequest("usuario ou senha inválido");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }

        }


        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioCadastrado = _usuarioRepositorio.Obter(usuario.Email);
                if (usuarioCadastrado != null) 
                    return BadRequest("Usuario já cadastrado no sistema");

                //usuario.EhAdministrador = true;
                _usuarioRepositorio.Adicionar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }

        }
    }
}
