using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class UpdateProductTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264"),
                column: "ConcurrencyStamp",
                value: "ba308622-f782-4894-af44-fac45df0ea6f");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "db81bf01-99bb-474d-a16a-9ef0f68606e3", "AQAAAAEAACcQAAAAEKHM1yCJeM3B+ngIpgVtun4F9u0GONy8CXy/+B0cH147q/OQjord3ySd59K/ozuAVA==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCreated",
                value: new DateTime(2021, 7, 5, 1, 12, 0, 316, DateTimeKind.Local).AddTicks(1296));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                column: "DateCreated",
                value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
