using eShopSolution.ApiIntegration;
using eShopSolution.ReactAPI.Common;
using eShopSolution.ViewModels.Catalog.Products;
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

        [Route("GetAll/{languageId}")]
        [HttpGet]
        public async Task<JsonResult> GetAll(string languageId)
        {
            List<ProductViewModel> data = new List<ProductViewModel>();
            data = await _productApiClient.GetAll(languageId);
            DataTable dataTable = converter.ToDataTable(data);

            return new JsonResult(dataTable);
        }

        //[Route("Logout")]
        //[HttpPost]
        //public async Task<IActionResult> Logout()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    HttpContext.Session.Remove("Token");
        //    return Ok();
        //}

        //[Route("GetById")]
        //[HttpPost]
        //public async Task<UserViewModel> GetById([FromBody] UserIdModel userid)
        //{
        //    Guid g = Guid.Parse(userid.Id);
        //    var result = await _productApiClient.GetById(g);
        //    return result.ResultObj;
        //}

        //[Route("Create")]
        //[HttpPost]
        //public async Task<IActionResult> Create(RegisterRequest request)
        //{
        //    var result = await _productApiClient.RegisterUser(request);
        //    if (result.IsSuccessed)
        //    {
        //        return new JsonResult("Created Successfully");
        //    }
        //    return new JsonResult("Create failed");
        //}

        //[Route("Update")]
        //[HttpPut]
        //public async Task<IActionResult> Update(UserUpdateRequest request)
        //{
        //    var result = await _productApiClient.UpdateUser(request.Id, request);
        //    if (result.IsSuccessed)
        //    {
        //        return new JsonResult("Updated Successfully");
        //    }
        //    return new JsonResult("Update failed");
        //}

        //[Route("Delete")]
        //[HttpPost]
        //public async Task<IActionResult> Delete([FromBody] UserIdModel userid)
        //{
        //    Guid g = Guid.Parse(userid.Id);
        //    var result = await _productApiClient.Delete(g);
        //    if (result.IsSuccessed)
        //    {
        //        return new JsonResult("Deleted Successfully");
        //    }
        //    return new JsonResult("Delete failed");
        //}

        //[Route("RoleAssign")]
        //[HttpPost]
        //public async Task<IActionResult> RoleAssign([FromBody] UserIdModel userid)
        //{
        //    Guid g = Guid.Parse(userid.Id);
        //    var roleAssignRequest = await GetRoleAssignRequest(g);
        //    return new JsonResult(roleAssignRequest);
        //}

        //[Route("NewRoleAssign")]
        //[HttpPost]
        //public async Task<IActionResult> NewRoleAssign([FromBody] RoleAssignRequest request)
        //{
        //    var result = await _productApiClient.RoleAssign(request.Id, request);

        //    if (result.IsSuccessed)
        //    {
        //        return new JsonResult("Assigned Successfully");
        //    }

        //    return new JsonResult("Assign failed");
        //}

        //private async Task<RoleAssignRequest> GetRoleAssignRequest(Guid id)
        //{
        //    var userObj = await _productApiClient.GetById(id);
        //    var roleObj = await _roleApiClient.GetAll();
        //    var roleAssignRequest = new RoleAssignRequest();
        //    foreach (var role in roleObj.ResultObj)
        //    {
        //        roleAssignRequest.Roles.Add(new SelectedItem()
        //        {
        //            Id = role.Id.ToString(),
        //            Name = role.Name,
        //            Selected = userObj.ResultObj.Roles.Contains(role.Name)
        //        });
        //    }

        //    return roleAssignRequest;
        //}
    }
}