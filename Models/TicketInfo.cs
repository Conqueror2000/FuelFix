using System.ComponentModel.DataAnnotations;

namespace MaintainSys.Models
{
    public class TicketInfo
    {
        [Key]
        public int TicketNumber { get; set; }

        public string Sector { get; set; }

        public string TypeOfEquip { get; set; }

        public string Status { get; set; }

        public int EmployeeId { get; set; }

        public string Priority { get; set; }

        public string Comment { get; set; }

        public int TechnicianId { get; set; }

        


        

        

       



    }
}