using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class delPoliciesUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendees_Activities_ActivityId",
                table: "Attendees");

            migrationBuilder.DropForeignKey(
                name: "FK_Recurrences_Activities_ActivityId",
                table: "Recurrences");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendees_Activities_ActivityId",
                table: "Attendees",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recurrences_Activities_ActivityId",
                table: "Recurrences",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendees_Activities_ActivityId",
                table: "Attendees");

            migrationBuilder.DropForeignKey(
                name: "FK_Recurrences_Activities_ActivityId",
                table: "Recurrences");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendees_Activities_ActivityId",
                table: "Attendees",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recurrences_Activities_ActivityId",
                table: "Recurrences",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");
        }
    }
}
