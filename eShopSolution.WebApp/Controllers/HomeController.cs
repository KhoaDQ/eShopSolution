﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using eShopSolution.WebApp.Models;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;
using LazZiya.ExpressLocalization;
using eShopSolution.ApiIntegration;
using System.Globalization;
using eShopSolution.Utilities.Constants;

namespace eShopSolution.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly ISharedCultureLocalizer _loc;
        private readonly ISlideApiClient _slideApiClient;

        private readonly IProductApiClient _productApiClient;

        public HomeController(ILogger<HomeController> logger, ISharedCultureLocalizer loc, ISlideApiClient slideApiClient, IProductApiClient productApiClient)
        {
            _logger = logger;
            _loc = loc;
            _slideApiClient = slideApiClient;
            _productApiClient = productApiClient;
        }

        public async Task<IActionResult> Index()
        {
            //var msg = _loc.GetLocalizedString("Vietnamese");
            var culture = CultureInfo.CurrentCulture.Name;
            var viewmodel = new HomeViewModel
            {
                Slides = await _slideApiClient.GetAll(),
                LatestProducts = await _productApiClient.GetLatestProducts(culture, SystemConstant.ProductSettings.NumberOfLatestProducts),
                FeaturedProducts = await _productApiClient.GetFeaturedProducts(culture, SystemConstant.ProductSettings.NumberOfFeaturedProducts),
            };
            return View(viewmodel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult SetCultureCookie(string cltr, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(cltr)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
                );

            return LocalRedirect(returnUrl);
        }
    }
}