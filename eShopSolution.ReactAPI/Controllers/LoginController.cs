using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.System.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

namespace eShopSolution.ReactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserApiClient _userApiClient;
        private readonly IConfiguration _configuration;

        public LoginController(IUserApiClient userApiClient,
            IConfiguration configuration)
        {
            _userApiClient = userApiClient;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Index([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return null;//View(ModelState);

            var result = await _userApiClient.Authenticate(request);

            if (result == null)
            {
                return null;//View();
            }

            if (result.ResultObj == null)
            {
                ModelState.AddModelError("", result.Message);
                return null;//View();
            }

            var userPrincipal = ValidateToken(result.ResultObj);
            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                IsPersistent = false
            };

            HttpContext.Session.SetString(SystemConstant.AppSettings.DefaultLanguageId, _configuration[SystemConstant.AppSettings.DefaultLanguageId]);
            HttpContext.Session.SetString(SystemConstant.AppSettings.Token, result.ResultObj.ToString());
            await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        userPrincipal,
                        authProperties);

            //Response.Cookies.Append("jwt", result.ResultObj.ToString(), new CookieOptions
            //{
            //    HttpOnly = true
            //});

            return Ok(new { message = "success" });
        }

        private ClaimsPrincipal ValidateToken(string jwtToken)
        {
            IdentityModelEventSource.ShowPII = true;

            SecurityToken validatedToken;

            TokenValidationParameters validationParameters = new TokenValidationParameters();

            validationParameters.ValidateLifetime = true;

            validationParameters.ValidAudience = _configuration["Tokens:Issuer"];
            validationParameters.ValidIssuer = _configuration["Tokens:Issuer"];
            validationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));

            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);

            return principal;
        }
    }
}