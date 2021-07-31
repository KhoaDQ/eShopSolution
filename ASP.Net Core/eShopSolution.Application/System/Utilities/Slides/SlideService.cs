using eShopSolution.Data.EF;
using eShopSolution.Data.Entities;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.System.Roles;
using eShopSolution.ViewModels.Utilities.Slides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.Application.System.Utilities.Slides
{
    public class SlideService : ISlideService
    {
        private readonly IConfiguration _config;
        private readonly EShopDbContext _context;

        public SlideService(EShopDbContext context,
            IConfiguration config)
        {
            _config = config;
            _context = context;
        }

        public async Task<List<SlideViewModel>> GetAll()
        {
            var slides = await _context.Slides.OrderBy(x => x.SortOrder)
                .Select(x => new SlideViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Image = x.Image,
                    Url = x.Url,
                    Description = x.Description,
                }).ToListAsync();
            return slides;
        }
    }
}