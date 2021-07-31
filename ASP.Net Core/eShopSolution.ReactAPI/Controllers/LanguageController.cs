using eShopSolution.ApiIntegration;
using eShopSolution.ReactAPI.Models;
using eShopSolution.Utilities.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.ReactAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageApiClient _languageApiClient;

        public LanguageController(ILanguageApiClient languageApiClient)
        {
            _languageApiClient = languageApiClient;
        }

        [Route("LanguageResult")]
        [HttpGet]
        public async Task<IActionResult> LanguageResult()
        {
            var languages = await _languageApiClient.GetAll();
            var navigationVm = new NavigationViewModel()
            {
                CurrentLanguageId = HttpContext
                .Session
                .GetString(SystemConstant.AppSettings.DefaultLanguageId),
                Languages = languages.ResultObj
            };

            return new JsonResult(navigationVm);
        }

        [Route("CallChangeLanguage")]
        [HttpPost]
        public IActionResult CallChangeLanguage(NavigationViewModel viewModel)
        {
            HttpContext.Session.SetString(SystemConstant.AppSettings.DefaultLanguageId,
                viewModel.CurrentLanguageId);
            return Ok();// Redirect(viewModel.ReturnUrl);
        }
    }
}