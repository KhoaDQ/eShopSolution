using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eShopSolution.ViewModels.System.User
{
    public class RegisterRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime Dob { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[Display(Name = "Xác nhận mật khẩu")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}