using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class ChangeFileLengthType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "FileSize",
                table: "ProductImages",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264"),
                column: "ConcurrencyStamp",
                value: "ccb5f316-63b2-4101-ac0c-dd5e0754fb77");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "4585f34a-28bb-422a-b67c-0406b513ef9a", "AQAAAAEAACcQAAAAECbKO0CBrWTbf3vhIb04BCX1T7Zu/hvW+DtQCyU+6x1r3Y3Ezp8IyWGBn2TMFxCEzw==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCreated",
                value: new DateTime(2021, 7, 3, 23, 23, 7, 713, DateTimeKind.Local).AddTicks(97));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "FileSize",
                table: "ProductImages",
                type: "int",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264"),
                column: "ConcurrencyStamp",
                value: "c70f0b95-b525-4675-9dd2-4b1df2d54b21");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0c506d4b-9df1-4360-ab61-54981852cb7f", "AQAAAAEAACcQAAAAEK/0zEhGldR0bTM/4zFOtDWuaq0XTYy9OITpV+DQKKlsMsnvbhfCaQgt4DrEtB+E4A==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCreated",
                value: new DateTime(2021, 7, 3, 22, 1, 0, 862, DateTimeKind.Local).AddTicks(348));
        }
    }
}
