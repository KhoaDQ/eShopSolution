﻿using eShopSolution.ApiIntegration;
using eShopSolution.ReactAPI.Common;
using eShopSolution.ReactAPI.Models;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.ReactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductApiClient _productApiClient;
        private readonly IConfiguration _configuration;
        private readonly ICategoryApiClient _categoryApiClient;
        private readonly ListtoDataTableConverter converter = new ListtoDataTableConverter();

        public ProductController(IProductApiClient productApiClient, IConfiguration configuration, ICategoryApiClient categoryApiClient)
        {
            _productApiClient = productApiClient;
            _configuration = configuration;
            _categoryApiClient = categoryApiClient;
        }

        [Route("GetAll")]
        [HttpGet]
        public async Task<JsonResult> GetAll([FromQuery] GetManageProductPagingRequest request)
        {
            List<ProductViewModel> products = new List<ProductViewModel>();
            products = await _productApiClient.GetAll(request.LanguageId, request.CategoryId);
            var categories = await _categoryApiClient.GetAll(request.LanguageId);
            var result = new { products, categories };
            // DataTable dataTable = converter.ToDataTable(data);

            return new JsonResult(result);
        }

        [Route("GetById")]
        [HttpPost]
        public async Task<ProductViewModel> GetById([FromBody] ProductIdModel productIdModel)
        {
            var result = await _productApiClient.GetById(productIdModel.Id, productIdModel.LanguageId);
            return result;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            var dict = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            ProductCreateRequest request = new ProductCreateRequest()
            {
                Price = Decimal.Parse(dict["Price"]),
                OriginalPrice = Decimal.Parse(dict["OriginalPrice"]),
                Stock = Int32.Parse(dict["Stock"]),
                Name = dict["Name"],
                Description = dict["Description"],
                Details = dict["Details"],
                SeoDescription = dict["SeoDescription"],
                SeoTitle = dict["SeoTitle"],
                SeoAlias = dict["SeoAlias"],
                LanguageId = dict["LanguageId"],
                ThumbnailImage = HttpContext.Request.Form.Files[0]
            };
            var result = await _productApiClient.CreateProduct(request);
            if (result)
            {
                return new JsonResult("Created Successfully");
            }
            return new JsonResult("Create failed");
        }

        [Route("Update")]
        [HttpPut]
        public async Task<IActionResult> Update()
        {
            var dict = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            ProductUpdateRequest request = new ProductUpdateRequest()
            {
                Id = Int32.Parse(dict["Id"]),
                Name = dict["Name"],
                Description = dict["Description"],
                Details = dict["Details"],
                SeoDescription = dict["SeoDescription"],
                SeoTitle = dict["SeoTitle"],
                SeoAlias = dict["SeoAlias"],
                LanguageId = dict["LanguageId"],
                ThumbnailImage = HttpContext.Request.Form.Files[0]
            };
            var result = await _productApiClient.UpdateProduct(request);
            if (result)
            {
                return new JsonResult("Updated Successfully");
            }
            return new JsonResult("Update failed");
        }

        [Route("Delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] ProductDeleteRequest request)
        {
            var result = await _productApiClient.DeleteProduct(request.Id);
            if (result)
            {
                return new JsonResult("Deleted Successfully");
            }
            return new JsonResult("Delete failed");
        }

        [Route("CategoryAssign")]
        [HttpPost]
        public async Task<IActionResult> CategoryAssign([FromBody] AssignProductIdModel productId)
        {
            var productAssignRequest = await GetCategoryAssignRequest(productId.Id);
            return new JsonResult(productAssignRequest);
        }

        [Route("NewCategoryAssign")]
        [HttpPost]
        public async Task<IActionResult> NewCategoryAssign([FromBody] CategoryAssignRequest request)
        {
            var result = await _productApiClient.CategoryAssign(request.Id, request);

            if (result.IsSuccessed)
            {
                return new JsonResult("Assigned Successfully");
            }

            return new JsonResult("Assign failed");
        }

        private async Task<CategoryAssignRequest> GetCategoryAssignRequest(int id)
        {
            var languageId = HttpContext.Session.GetString(SystemConstant.AppSettings.DefaultLanguageId);

            var productObj = await _productApiClient.GetById(id, languageId);
            var categories = await _categoryApiClient.GetAll(languageId);
            var categoryAssignRequest = new CategoryAssignRequest();
            foreach (var item in categories)
            {
                categoryAssignRequest.Categories.Add(new SelectedItem()
                {
                    Id = item.Id.ToString(),
                    Name = item.Name,
                    Selected = productObj.Categories.Contains(item.Name)
                });
            }

            return categoryAssignRequest;
        }
    }
}