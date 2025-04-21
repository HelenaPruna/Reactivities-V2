using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RecurRequiredAttendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Recurrences_RecurId",
                table: "Attendances");

            migrationBuilder.AlterColumn<string>(
                name: "RecurId",
                table: "Attendances",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Recurrences_RecurId",
                table: "Attendances",
                column: "RecurId",
                principalTable: "Recurrences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Recurrences_RecurId",
                table: "Attendances");

            migrationBuilder.AlterColumn<string>(
                name: "RecurId",
                table: "Attendances",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Recurrences_RecurId",
                table: "Attendances",
                column: "RecurId",
                principalTable: "Recurrences",
                principalColumn: "Id");
        }
    }
}
