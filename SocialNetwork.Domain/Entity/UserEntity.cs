using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Domain.Entity
{
    public class UserEntity
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Login { get; set; }

        [StringLength(50)]
        public string Password { get; set; }

        [StringLength(50)]
        public string Surname { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Middlename { get; set; }
        public List<MessageEntity> Messages { get; set; }
    }
}
