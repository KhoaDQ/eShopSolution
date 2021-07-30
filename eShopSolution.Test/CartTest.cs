using eShopSolution.WebApp.Controllers.Functions;
using eShopSolution.WebApp.Models;
using System;
using System.Collections.Generic;
using Xunit;

namespace eShopSolution.Test
{
    public class CartTest
    {
        [Fact]
        public void TestUpdateCart()
        {
            //Arrange

            List<CartItemViewModel> cartItemViewModels = new List<CartItemViewModel>();
            cartItemViewModels.Add(new CartItemViewModel()
            {
                ProductId = 1,
                Quantity = 5,
                Price = 50000
            });
            cartItemViewModels.Add(new CartItemViewModel()
            {
                ProductId = 2,
                Quantity = 2,
                Price = 30000
            });

            int productIdHaveNewQuantity = 2;
            int newQuantity = 3;

            List<CartItemViewModel> expectedCartItemViewModels = new List<CartItemViewModel>();
            expectedCartItemViewModels.Add(new CartItemViewModel()
            {
                ProductId = 1,
                Quantity = 5,
                Price = 50000
            });
            expectedCartItemViewModels.Add(new CartItemViewModel()
            {
                ProductId = 2,
                Quantity = newQuantity,
                Price = 30000
            });

            //Act
            var newCartItemViewModels = CartFunction.Updatecart(cartItemViewModels, productIdHaveNewQuantity, newQuantity);

            //Assert
            Assert.Equal(expectedCartItemViewModels[1].Quantity, newCartItemViewModels[1].Quantity);
        }
    }
}