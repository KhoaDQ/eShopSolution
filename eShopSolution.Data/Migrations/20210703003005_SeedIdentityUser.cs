using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class SeedIdentityUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(2021, 7, 3, 7, 30, 5, 190, DateTimeKind.Local).AddTicks(9339),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 7, 3, 7, 12, 8, 458, DateTimeKind.Local).AddTicks(2861));

            migrationBuilder.InsertData(
                table: "AppRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Description", "Name", "NormalizedName" },
                values: new object[] { new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264"), "8827f96d-d198-4687-a0da-72fc5c77e436", "Administrator role", "admin", "admin" });

            migrationBuilder.InsertData(
                table: "AppUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"), new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264") });

            migrationBuilder.InsertData(
                table: "AppUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Dob", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"), 0, "eaea3ca2-455d-4c10-8edb-e71ab47bfb0f", new DateTime(2000, 5, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "quockhoathcstq@gmail.com", true, "Khoa", "Dang", false, null, "quockhoathcstq@gmail.com", "admin", "AQAAAAEAACcQAAAAECdl+UcUWQib8uE0sDZPu+Nq4J6cSIpmsSKN/zRo1kmBGT/eYMdOYRRpRYOI2QPSXw==", null, false, "", false, "admin" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCreated",
                value: new DateTime(2021, 7, 3, 7, 30, 5, 206, DateTimeKind.Local).AddTicks(3475));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264"));

            migrationBuilder.DeleteData(
                table: "AppUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"), new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264") });

            migrationBuilder.DeleteData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"));

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 7, 3, 7, 12, 8, 458, DateTimeKind.Local).AddTicks(2861),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 7, 3, 7, 30, 5, 190, DateTimeKind.Local).AddTicks(9339));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCreated",
                value: new DateTime(2021, 7, 3, 7, 12, 8, 474, DateTimeKind.Local).AddTicks(9500));
        }
    }
}
