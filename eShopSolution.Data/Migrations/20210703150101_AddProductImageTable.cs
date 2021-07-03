using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eShopSolution.Data.Migrations
{
    public partial class AddProductImageTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 7, 3, 7, 30, 5, 190, DateTimeKind.Local).AddTicks(9339));

            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(nullable: false),
                    ImagePath = table.Column<string>(maxLength: 200, nullable: false),
                    Caption = table.Column<string>(maxLength: 200, nullable: true),
                    IsDefault = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    SortOrder = table.Column<int>(nullable: false),
                    FileSize = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductImages_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_ProductId",
                table: "ProductImages",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductImages");

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderDate",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 7, 3, 7, 30, 5, 190, DateTimeKind.Local).AddTicks(9339),
                oldClrType: typeof(DateTime));

            migrationBuilder.UpdateData(
                table: "AppRoles",
                keyColumn: "Id",
                keyValue: new Guid("98f8ef41-91ee-4707-bd7b-f5bb79e3a264"),
                column: "ConcurrencyStamp",
                value: "8827f96d-d198-4687-a0da-72fc5c77e436");

            migrationBuilder.UpdateData(
                table: "AppUsers",
                keyColumn: "Id",
                keyValue: new Guid("251a4f8a-18be-42a3-b83f-e1ded8d8da81"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "eaea3ca2-455d-4c10-8edb-e71ab47bfb0f", "AQAAAAEAACcQAAAAECdl+UcUWQib8uE0sDZPu+Nq4J6cSIpmsSKN/zRo1kmBGT/eYMdOYRRpRYOI2QPSXw==" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCreated",
                value: new DateTime(2021, 7, 3, 7, 30, 5, 206, DateTimeKind.Local).AddTicks(3475));
        }
    }
}
