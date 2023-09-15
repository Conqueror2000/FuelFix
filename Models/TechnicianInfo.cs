using System.ComponentModel.DataAnnotations;

namespace MaintainSys.Models
{
    public class TechnicianInfo
    {
        [Key]
        public int TechnicianId { get; set; }

        public string Password { get; set; }

        

        public string Sector { get; set; }

        public string TypeofEquip { get; set; }

        public int PhoneNo { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}