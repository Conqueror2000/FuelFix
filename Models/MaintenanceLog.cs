using System.ComponentModel.DataAnnotations;

namespace MaintainSys.Models
{
    public class MaintenanceLog
    {
        [Key]
        public int Log_id { get; set; }

        public string Log_description { get; set; }

        public DateTime Log_created { get; set; }

        public int User_id { get; set; }
        

    }
}