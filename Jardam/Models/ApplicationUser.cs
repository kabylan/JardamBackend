using Microsoft.AspNetCore.Identity;

namespace Jardam.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public byte[] ProfilePicture { get; set; }
    }
}
