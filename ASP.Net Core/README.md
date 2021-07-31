# ASP.NET core 3.1 project 
## Technologies
- ASP.Net core 3.1
- Entity framework core 3.1
## Install tools
.NET Core SDK 3.1
Git client
Visual Studio 2019
SQL Server 2019
## Install packages
- Microsoft .EntityFrameworkCore.SqlServer
- Microsoft .EntityFrameworkCore.Tools
- Microsoft .EntityFrameworkCore.Design
## Youtube tutorial
Video list: https://www.youtube.com/playlist?list=PLRhlTlpDUWsyN_FiVQrDWMtHix_E2A_UD
TEDU Course: https://tedu.com.vn/khoa-hoc/lam-du-an-voi-aspnet-core-31-34.html
## How to config and run
Clone code from Github: git clone https://github.com/KhoaDQ/eShopSolution.git
Open solution eShopSolution.sln in Visual Studio 2019
Set startup project is eShopSolution.Data
Change connection string in Appsetting.json in eShopSolution.Data project
Open Tools --> Nuget Package Manager --> Package Manager Console in Visual Studio
Run Update-database and Enter.
After migrate database successful, set Startup Project is eShopSolution.WebApp
Change database connection in appsettings.Development.json in eShopSolution.WebApp project.
Choose profile to run or press F5
## How to contribute 
Fork and create your branch
Create Pull request to us.
## Admin template: https://startbootstrap.com/templates/sb-admin/
## Portal template: https://www.free-css.com/free-css-templates/page194/bootstrap-shop

## I18N (Internalization)
References: https://medium.com/swlh/step-by-step-tutorial-to-build-multi-cultural-asp-net-core-web-app-3fac9a960c43
Source code: https://github.com/LazZiya/ExpressLocalizationSampleCore3