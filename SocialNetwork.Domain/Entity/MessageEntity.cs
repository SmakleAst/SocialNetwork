using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Domain.Entity
{
    public class MessageEntity
    {
        public int Id { get; set; }
        public int FromUserId { get; set; }
        public UserEntity FromUser { get; set; }
        public int ToUserId { get; set; }
        public UserEntity ToUser { get; set; }

        [StringLength(50)]
        public string Header { get; set; }

        [StringLength(200)]
        public string Body { get; set; }
        public bool IsReading { get; set; }
        public DateTime DateOf { get; set; }
    }
}
