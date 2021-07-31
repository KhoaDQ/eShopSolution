using eShopSolution.ApiIntegration;
using eShopSolution.ReactAPI.Common;
using eShopSolution.ReactAPI.Models;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.System.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.ReactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserApiClient _userApiClient;
        private readonly IRoleApiClient _roleApiClient;
        private readonly IConfiguration _configuration;
        private readonly ListtoDataTableConverter converter = new ListtoDataTableConverter();

        public UserController(IUserApiClient userApiClient, IRoleApiClient roleApiClient, IConfiguration configuration)
        {
            _userApiClient = userApiClient;
            _roleApiClient = roleApiClient;
            _configuration = configuration;
        }

        [Route("GetAll")]
        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            List<UserViewModel> data = new List<UserViewModel>();
            data = await _userApiClient.GetAll();
            DataTable dataTable = converter.ToDataTable(data);

            return new JsonResult(dataTable);
        }

        [Route("Logout")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Remove("Token");
            return Ok();
        }

        [Route("GetById")]
        [HttpPost]
        public async Task<UserViewModel> GetById([FromBody] UserIdModel userid)
        {
            Guid g = Guid.Parse(userid.Id);
            var result = await _userApiClient.GetById(g);
            return result.ResultObj;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> Create(RegisterRequest request)
        {
            var result = await _userApiClient.RegisterUser(request);
            if (result.IsSuccessed)
            {
                return new JsonResult("Created Successfully");
            }
            return new JsonResult("Create failed");
        }

        [Route("Update")]
        [HttpPut]
        public async Task<IActionResult> Update(UserUpdateRequest request)
        {
            var result = await _userApiClient.UpdateUser(request.Id, request);
            if (result.IsSuccessed)
            {
                return new JsonResult("Updated Successfully");
            }
            return new JsonResult("Update failed");
        }

        [Route("Delete")]
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] UserIdModel userid)
        {
            Guid g = Guid.Parse(userid.Id);
            var result = await _userApiClient.Delete(g);
            if (result.IsSuccessed)
            {
                return new JsonResult("Deleted Successfully");
            }
            return new JsonResult("Delete failed");
        }

        [Route("RoleAssign")]
        [HttpPost]
        public async Task<IActionResult> RoleAssign([FromBody] UserIdModel userid)
        {
            Guid g = Guid.Parse(userid.Id);
            var roleAssignRequest = await GetRoleAssignRequest(g);
            return new JsonResult(roleAssignRequest);
        }

        [Route("NewRoleAssign")]
        [HttpPost]
        public async Task<IActionResult> NewRoleAssign([FromBody] RoleAssignRequest request)
        {
            var result = await _userApiClient.RoleAssign(request.Id, request);

            if (result.IsSuccessed)
            {
                return new JsonResult("Assigned Successfully");
            }

            return new JsonResult("Assign failed");
        }

        private async Task<RoleAssignRequest> GetRoleAssignRequest(Guid id)
        {
            var userObj = await _userApiClient.GetById(id);
            var roleObj = await _roleApiClient.GetAll();
            var roleAssignRequest = new RoleAssignRequest();
            foreach (var role in roleObj.ResultObj)
            {
                roleAssignRequest.Roles.Add(new SelectedItem()
                {
                    Id = role.Id.ToString(),
                    Name = role.Name,
                    Selected = userObj.ResultObj.Roles.Contains(role.Name)
                });
            }

            return roleAssignRequest;
        }
    }
}