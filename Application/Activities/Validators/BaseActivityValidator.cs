using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title can't be longer than 100 characters");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => selector(x).DateStart).NotEmpty().WithMessage("Date must be in the future");
        RuleFor(x => selector(x).DateEnd).NotEmpty().WithMessage("Date must be in the future");
        RuleFor(x => selector(x).TimeStart).NotEmpty().WithMessage("Date must be in the future");
        RuleFor(x => selector(x).TimeEnd).NotEmpty().WithMessage("Date must be in the future");
        RuleFor(x => selector(x).Room).NotEmpty().WithMessage("Room is required");
        RuleFor(x => selector(x).MaxParticipants).NotEmpty().WithMessage("MaxParticipants is required");
        RuleFor(x => selector(x).AllowedMissedDays).NotEmpty().WithMessage("AllowedMissedDays is required");
    }
}
