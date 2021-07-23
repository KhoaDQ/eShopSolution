using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.WebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Controllers
{
    public class ProductController : Controller
    {
        private readonly ICategoryApiClient _categoryApiClient;
        private readonly IProductApiClient _productApiClient;

        public ProductController(ICategoryApiClient categoryApiClient, IProductApiClient productApiClient)
        {
            _categoryApiClient = categoryApiClient;
            _productApiClient = productApiClient;
        }

        public async Task<IActionResult> Detail(int id, string culture)
        {
            var product = await _productApiClient.GetById(id, culture);
            return View(new ProductDetailViewModel()
            {
                Product = product,
                Category = await _categoryApiClient.GetById(culture, id)
                //,ProductImages =
                //,RelatedProducts =
            });
        }

        public async Task<IActionResult> Category(int id, string culture, int page = 1)
        {
            var products = await _productApiClient.GetPagings(new GetManageProductPagingRequest()
            {
                CategoryId = id,
                PageIndex = page,
                LanguageId = culture,
                PageSize = 10
            });
            return View(new ProductCategoryViewModel()
            {
                Products = products,
                Category = await _categoryApiClient.GetById(culture, id)
            }); ;
        }
    }
}