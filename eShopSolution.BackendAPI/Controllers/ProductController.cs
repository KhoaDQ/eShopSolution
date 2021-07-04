using eShopSolution.Application.Catalog.Products;
using eShopSolution.ViewModels.Catalog.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IPublicProductService _PublicProductService;
        private readonly IManageProductService _MangeProductService;

        public ProductController(IPublicProductService publicProductService, IManageProductService manageProductService)
        {
            _PublicProductService = publicProductService;
            _MangeProductService = manageProductService;
        }

        // Default http://localhost:post/product
        [HttpGet("{languageId}")]
        public async Task<IActionResult> Get(string languageId)
        {
            var products = await _PublicProductService.GetAll(languageId);
            return Ok(products);
        }

        // Add alias
        // http://localhost:post/product/public-paging
        [HttpGet("public-paging/{languageId}")]
        public async Task<IActionResult> Get([FromQuery]GetPublicProductPagingRequest request) // FromQuery mean that all parameters of request is taked from Query, it also be used in Get method // FromBody with Post method
        {
            var products = await _PublicProductService.GetAllByCategoryId(request);
            return Ok(products);
        }

        [HttpGet("{productId}/{languageId}")]
        public async Task<IActionResult> GetById(int productId, string languageId)
        {
            var product = await _MangeProductService.GetById(productId, languageId);
            if (product == null)
                return BadRequest("Can not find this product");
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm]ProductCreateRequest request)
        {
            var producId = await _MangeProductService.CreateProduct(request);
            if (producId == 0)
                return BadRequest();

            var product = await _MangeProductService.GetById(producId,request.LanguageId);

            return CreatedAtAction(nameof(GetById), new { id = producId},product);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] ProductUpdateRequest request)
        {
            var affectedResult = await _MangeProductService.Update(request);
            if (affectedResult == 0)
                return BadRequest();

            return Ok();
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> Delete([FromBody] int productId)
        {
            var affectedResult = await _MangeProductService.Delete(productId);
            if (affectedResult == 0)
                return BadRequest();

            return Ok();
        }

        [HttpPut("price/{id}/{newPrice}")]
        public async Task<IActionResult> UpdatePrice(int id, decimal newPrice)
        {
            var isSuccessful = await _MangeProductService.UpdatePrice(id,newPrice);
            if (isSuccessful)
                 return Ok();

            return BadRequest();
        }
    }
}
