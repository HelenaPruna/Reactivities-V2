using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Id).NotEmpty().WithMessage("Id is required");
        RuleFor(x => x.ActivityDto.IsCancelled).NotEqual(true).WithMessage("L'activitat esta cancel·lada, no es pot editar");
    }
}
