using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Entidades
{
    public class ItemPedido : Entidade
    {
        public int Id { get; set; }

        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }
        /// <summary>
        /// class modificada
        /// </summary>
        public virtual ICollection<ItemPedido> Pedidos { get; set; }

        public override void Validate()
        {
            if (ProdutoId == 0)

                AdicionarCritica("Não foi possivel indenticar qual a referencia ");

            if (Quantidade == 0)

                AdicionarCritica("Quantidade não foi informado");
        }
    }
}
