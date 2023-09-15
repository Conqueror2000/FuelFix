using System.ComponentModel.DataAnnotations;

namespace MaintainSys.Models
{
    public class EmployeeInfo
    {
        [Key]
        public int EmployeeId { get; set; }

        public string Password { get; set; }

        public string Designation { get; set; }

        public int PhoneNo { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}