using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class requestsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    State = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Message = table.Column<string>(type: "TEXT", nullable: false),
                    RequestedById = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ActivityId = table.Column<string>(type: "TEXT", nullable: true),
                    ApprovedById = table.Column<string>(type: "TEXT", nullable: true),
                    DateApproved = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Requests_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Requests_AspNetUsers_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Requests_AspNetUsers_RequestedById",
                        column: x => x.RequestedById,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Requests_ActivityId",
                table: "Requests",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_ApprovedById",
                table: "Requests",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_RequestedById",
                table: "Requests",
                column: "RequestedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Requests");
        }
    }
}
