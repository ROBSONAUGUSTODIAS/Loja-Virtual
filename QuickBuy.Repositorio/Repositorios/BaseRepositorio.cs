using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class BaseRepositorio<TEnty> : IBaseRepositorio<TEnty> where TEnty : class
    {

        protected readonly QuickBuyContexto QuickBuyContexto;
        public BaseRepositorio(QuickBuyContexto quickBuyContexto) 
        {
            QuickBuyContexto = quickBuyContexto;
        
        }
        public void Adicionar(TEnty entity)
        {
            QuickBuyContexto.Set<TEnty>().Add(entity);
            QuickBuyContexto.SaveChanges();
        }

        public void Atulizar(TEnty entity)
        {
            QuickBuyContexto.Set<TEnty>().Update(entity);
            QuickBuyContexto.SaveChanges();
        }


        public TEnty ObterPorId(int id)
        {
            return QuickBuyContexto.Set<TEnty>().Find(id);
        }

        public IEnumerable<TEnty> ObterTodos()
        {
            return QuickBuyContexto.Set<TEnty>().ToList();
        }

        public void Remover(TEnty entity)
        {
            QuickBuyContexto.Remove(entity);
            QuickBuyContexto.SaveChanges();
        }

        public void Dispose()
        {
            QuickBuyContexto.Dispose();
        }
    }
}
