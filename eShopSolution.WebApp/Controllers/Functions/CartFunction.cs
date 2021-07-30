using eShopSolution.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Controllers.Functions
{
    public class CartFunction
    {
        public static List<CartItemViewModel> Updatecart(List<CartItemViewModel> currentCart, int id, int quantity)
        {
            foreach (var item in currentCart)
            {
                if (item.ProductId == id)
                {
                    if (quantity == 0)
                    {
                        currentCart.Remove(item);
                        break;
                    }
                    item.Quantity = quantity;
                }
            }

            return currentCart;
        }
    }
}