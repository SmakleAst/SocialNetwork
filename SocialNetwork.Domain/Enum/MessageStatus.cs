using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Domain.Enum
{
    public enum MessageStatus
    {
        [Display(Name = "Непрочитанные")]
        NotReading = 0,

        [Display(Name = "Прочитанные")]
        isReading = 1,

        [Display(Name = "Все")]
        All = 2,
    }
}
