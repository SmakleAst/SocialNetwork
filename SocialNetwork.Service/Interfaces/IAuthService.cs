using SocialNetwork.Domain.Response;

namespace SocialNetwork.Service.Interfaces
{
    public interface IAuthService
    {
        Task<IBaseResponse<AuthViewModel>> AuthentificateUser(AuthViewModel model);
        Task<IBaseResponse<RegistrationViewModel>> RegistrationUser(RegistrationViewModel model);
    }
}
