﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

/*
  Configure entity:
  + Attribute configuration
  + Fluent API configuration - Current choice
*/

// This is Fluent API configuration
namespace eShopSolution.Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public decimal OrginalPrice { get; set; }
        public int Stock { get; set; }
        public int ViewCount { get; set; }
        public DateTime DataCreated { get; set; }
        public string SeoAlias { get; set; }

    }
}

// This is Attribute configuration
/*
namespace eShopSolution.Data.Entities
{
    [Table("Products")]
    public class Product
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public decimal OrginalPrice { get; set; }
        public int Stock { get; set; }
        public int ViewCount { get; set; }
        public DateTime DataCreated { get; set; }

        [Required]
        public string SeoAlias { get; set; }

    }
}
*/