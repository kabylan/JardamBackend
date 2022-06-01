using Microsoft.EntityFrameworkCore.Migrations;

namespace Jardam.Migrations
{
    public partial class HelpDataNoUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpData_AspNetUsers_UserID",
                table: "HelpData");

            migrationBuilder.DropIndex(
                name: "IX_HelpData_UserID",
                table: "HelpData");

            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                table: "HelpData",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                table: "HelpData",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HelpData_UserID",
                table: "HelpData",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_HelpData_AspNetUsers_UserID",
                table: "HelpData",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
