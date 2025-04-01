using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class confAttendanceDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Attendees_AttendeeId",
                table: "Attendances");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Attendees_AttendeeId",
                table: "Attendances",
                column: "AttendeeId",
                principalTable: "Attendees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Attendees_AttendeeId",
                table: "Attendances");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Attendees_AttendeeId",
                table: "Attendances",
                column: "AttendeeId",
                principalTable: "Attendees",
                principalColumn: "Id");
        }
    }
}
