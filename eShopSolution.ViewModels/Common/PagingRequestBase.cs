using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Common
{
    public class PagingRequestBase : RequestBase
    {
        // Quickly -> Prop - Tab- Tab
        public int PageIndex { get; set; }

        public int PageSize { get; set; }
    }
}