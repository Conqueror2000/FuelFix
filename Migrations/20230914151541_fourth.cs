using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MaintainSys.Migrations
{
    /// <inheritdoc />
    public partial class fourth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Designation",
                table: "TechnicianInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Designation",
                table: "TechnicianInfo",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
