using SocialNetwork.Domain.Enum;

namespace SocialNetwork.Domain.Filters
{
    public class MessageFilter
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public MessageStatus Status { get; set; }
    }
}
