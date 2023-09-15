using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MaintainSys.Migrations
{
    /// <inheritdoc />
    public partial class third : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Sector",
                table: "TechnicianInfo",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeofEquip",
                table: "TechnicianInfo",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sector",
                table: "TechnicianInfo");

            migrationBuilder.DropColumn(
                name: "TypeofEquip",
                table: "TechnicianInfo");
        }
    }
}
