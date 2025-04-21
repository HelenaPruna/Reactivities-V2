using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RoomsClassAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Room",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "RoomId",
                table: "Recurrences",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoomId",
                table: "Activities",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    NumberFloor = table.Column<int>(type: "INTEGER", nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recurrences_RoomId_Date_TimeStart_TimeEnd",
                table: "Recurrences",
                columns: new[] { "RoomId", "Date", "TimeStart", "TimeEnd" });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_RoomId",
                table: "Activities",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Rooms_RoomId",
                table: "Activities",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recurrences_Rooms_RoomId",
                table: "Recurrences",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Rooms_RoomId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Recurrences_Rooms_RoomId",
                table: "Recurrences");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Recurrences_RoomId_Date_TimeStart_TimeEnd",
                table: "Recurrences");

            migrationBuilder.DropIndex(
                name: "IX_Activities_RoomId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Recurrences");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "Room",
                table: "Activities",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
