using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAppointmentNavigationProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_appointments_appointment_slots_slot_id",
                table: "appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_appointments_clinics_clinic_id",
                table: "appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_appointments_users_L04F12L01F01",
                table: "appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_appointments_users_L04F13L01F01",
                table: "appointments");

            migrationBuilder.DropIndex(
                name: "IX_appointments_clinic_id",
                table: "appointments");

            migrationBuilder.DropIndex(
                name: "IX_appointments_L04F12L01F01",
                table: "appointments");

            migrationBuilder.DropIndex(
                name: "IX_appointments_L04F13L01F01",
                table: "appointments");

            migrationBuilder.DropIndex(
                name: "IX_appointments_slot_id",
                table: "appointments");

            migrationBuilder.DropColumn(
                name: "L04F12L01F01",
                table: "appointments");

            migrationBuilder.DropColumn(
                name: "L04F13L01F01",
                table: "appointments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "L04F12L01F01",
                table: "appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "L04F13L01F01",
                table: "appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_appointments_clinic_id",
                table: "appointments",
                column: "clinic_id");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_L04F12L01F01",
                table: "appointments",
                column: "L04F12L01F01");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_L04F13L01F01",
                table: "appointments",
                column: "L04F13L01F01");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_slot_id",
                table: "appointments",
                column: "slot_id");

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_appointment_slots_slot_id",
                table: "appointments",
                column: "slot_id",
                principalTable: "appointment_slots",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_clinics_clinic_id",
                table: "appointments",
                column: "clinic_id",
                principalTable: "clinics",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_users_L04F12L01F01",
                table: "appointments",
                column: "L04F12L01F01",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_users_L04F13L01F01",
                table: "appointments",
                column: "L04F13L01F01",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
