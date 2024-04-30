using Microsoft.EntityFrameworkCore;
using SocialNetwork.DAL.Interfaces;
using SocialNetwork.Domain.Entity;
using SocialNetwork.Domain.Enum;
using SocialNetwork.Domain.Response;
using SocialNetwork.Domain.ViewModels;
using SocialNetwork.Service.Interfaces;

namespace SocialNetwork.Service.Implementations
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<UserEntity> _userRepository;
        private readonly IBaseRepository<MessageEntity> _messageRepository;

        public UserService(IBaseRepository<UserEntity> userRepository, IBaseRepository<MessageEntity> messageRepository) =>
            (_userRepository, _messageRepository) = (userRepository, messageRepository);

        public async Task<IBaseResponse<IEnumerable<MessageViewModel>>> GetAllReceivedMessages(int userId)
        {
            try
            {
                var messages = await _messageRepository.GetAll()
                    .Where(x => x.ToUserId == userId)
                    .Select(x => new MessageViewModel
                    {
                        Id = x.Id,
                        FromUserLogin = x.FromUser.Login,
                        Header = x.Header,
                        IsReading = x.IsReading,
                        DateOf = x.DateOf.ToString("dd.MM.yyyy"),
                    })
                    .ToListAsync();

                return new BaseResponse<IEnumerable<MessageViewModel>>
                {
                    Data = messages,
                    StatusCode = StatusCode.Ok
                };
            }
            catch (Exception exception)
            {
                return new BaseResponse<IEnumerable<MessageViewModel>>
                {
                    Description = exception.Message,
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<OneMessageViewModel>> GetOneMessage(int messageId)
        {
            try
            {
                var messageEntity = await _messageRepository.GetAll()
                    .FirstOrDefaultAsync(x => x.Id == messageId);

                if (messageEntity == null)
                {
                    return new BaseResponse<OneMessageViewModel>
                    {
                        Description = "Сообщение не найдено",
                        StatusCode = StatusCode.MessageNotFound
                    };
                }

                var message = new OneMessageViewModel
                {
                    Id = messageEntity.Id,
                    Header = messageEntity.Header,
                    Body = messageEntity.Body,
                    IsReading = messageEntity.IsReading,
                    DateOf = messageEntity.DateOf.ToString("dd.MM.yyyy"),
                };

                return new BaseResponse<OneMessageViewModel>
                {
                    Data = message,
                    StatusCode = StatusCode.Ok
                };
            }
            catch (Exception exception)
            {
                return new BaseResponse<OneMessageViewModel>
                {
                    Description = exception.Message,
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<UserViewModel>> GetUserAccountInformation(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<IBaseResponse<SendMessageViewModel>> SendMessage(SendMessageViewModel model)
        {
            throw new NotImplementedException();
        }
    }
}
