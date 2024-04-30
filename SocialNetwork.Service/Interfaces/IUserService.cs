using SocialNetwork.Domain.Response;
using SocialNetwork.Domain.ViewModels;

namespace SocialNetwork.Service.Interfaces
{
    public interface IUserService
    {
        Task<IBaseResponse<UserViewModel>> GetUserAccountInformation(int userId);
        Task<IBaseResponse<IEnumerable<MessageViewModel>>> GetAllReceivedMessages(int userId);
        Task<IBaseResponse<OneMessageViewModel>> GetOneMessage(int messageId);
        Task<IBaseResponse<SendMessageViewModel>> SendMessage(SendMessageViewModel model);
    }
}
