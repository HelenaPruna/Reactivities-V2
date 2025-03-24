using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class datesModified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Activities_Date",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "FirstDateId",
                table: "Activities",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recurrences_Date",
                table: "Recurrences",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_FirstDateId",
                table: "Activities",
                column: "FirstDateId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Recurrences_FirstDateId",
                table: "Activities",
                column: "FirstDateId",
                principalTable: "Recurrences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Recurrences_FirstDateId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Recurrences_Date",
                table: "Recurrences");

            migrationBuilder.DropIndex(
                name: "IX_Activities_FirstDateId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "FirstDateId",
                table: "Activities");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Activities",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_Date",
                table: "Activities",
                column: "Date");
        }
    }
}
