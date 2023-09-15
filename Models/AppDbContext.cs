using Microsoft.EntityFrameworkCore;

namespace MaintainSys.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<EmployeeInfo> EmployeeInfo { get; set; }

        public DbSet<TechnicianInfo> TechnicianInfo { get; set; }

        public DbSet<MaintenanceLog> MaintenanceLog { get; set; }

        public DbSet<TicketInfo> TicketInfo { get; set; }


    }
}
