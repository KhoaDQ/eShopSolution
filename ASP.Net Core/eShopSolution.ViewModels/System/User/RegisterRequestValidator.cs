using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.System.User
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            // x is RegisterRequest
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First name is required")
                .MaximumLength(200).WithMessage("First name can not over 200 characters");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("First name is required")
                .MaximumLength(200).WithMessage("First name can not over 200 characters");
            RuleFor(x => x.Dob).GreaterThan(DateTime.Now.AddYears(-100)).WithMessage("Birthday can not greater than 100 days");
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required")
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").WithMessage("Email format not match");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number is required");
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Username is required");
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Username is required")
                .MinimumLength(6).WithMessage("Password is at least 6 characters");

            RuleFor(x => x).Custom((request, context) =>
            {
                if (request.Password != request.ConfirmPassword)
                {
                    context.AddFailure("Confirm password is not match");
                }
            });
        }
    }
}