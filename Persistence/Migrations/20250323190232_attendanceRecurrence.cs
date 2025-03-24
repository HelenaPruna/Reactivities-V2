using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class attendanceRecurrence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Attendances");

            migrationBuilder.AddColumn<string>(
                name: "RecurId",
                table: "Attendances",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_RecurId",
                table: "Attendances",
                column: "RecurId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Recurrences_RecurId",
                table: "Attendances",
                column: "RecurId",
                principalTable: "Recurrences",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Recurrences_RecurId",
                table: "Attendances");

            migrationBuilder.DropIndex(
                name: "IX_Attendances_RecurId",
                table: "Attendances");

            migrationBuilder.DropColumn(
                name: "RecurId",
                table: "Attendances");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Attendances",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
