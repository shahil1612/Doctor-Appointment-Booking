using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Extensions;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    /// <summary>
    /// Handles prescription-related API endpoints.
    /// </summary>
    [ApiController]
    [Route("api/prescriptions")]
    public class PrescriptionsController : ControllerBase
    {
        #region Private Fields

        /// <summary>
        /// Represents prescription service dependency.
        /// </summary>
        private readonly IPrescriptionService _prescriptionService;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="PrescriptionsController"/> class.
        /// </summary>
        /// <param name="prescriptionService">The prescription service.</param>
        public PrescriptionsController(IPrescriptionService prescriptionService)
        {
            _prescriptionService = prescriptionService;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Creates a new prescription for a patient appointment.
        /// Only doctors can issue prescriptions for their own appointments.
        /// </summary>
        /// <param name="request">The prescription creation request.</param>
        /// <returns>The created prescription response.</returns>
        [HttpPost]
        public async Task<IActionResult> CreatePrescription([FromBody] CreatePrescriptionRequest request)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            // Verify user is a doctor
            if (currentUser.Role != UserType.DOCTOR)
            {
                return BadRequest(new ErrorResponse
                {
                    Error = "Only doctors can issue prescriptions",
                    Message = "Your account does not have permission to issue prescriptions"
                });
            }

            try
            {
                PrescriptionResponse response = await _prescriptionService.CreatePrescriptionAsync(
                    currentUser.UserId,
                    request);
                return Ok(response);
            }
            catch (Exception ex) when (ex.Message.Contains("not found"))
            {
                return NotFound(new ErrorResponse
                {
                    Error = "Appointment not found",
                    Message = ex.Message
                });
            }
            catch (Exception ex) when (ex.Message.Contains("permission"))
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves prescriptions based on user type.
        /// Patients see their prescriptions, doctors see prescriptions they issued.
        /// </summary>
        /// <returns>List of prescriptions.</returns>
        [HttpGet]
        public async Task<IActionResult> GetPrescriptions()
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            List<PrescriptionResponse> prescriptions = currentUser.Role == UserType.PATIENT
                ? await _prescriptionService.GetPatientPrescriptionsAsync(currentUser.UserId)
                : await _prescriptionService.GetDoctorIssuedPrescriptionsAsync(currentUser.UserId);

            return Ok(prescriptions);
        }

        /// <summary>
        /// Retrieves a specific prescription by identifier.
        /// </summary>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <returns>The prescription details.</returns>
        [HttpGet("{prescriptionId}")]
        public async Task<IActionResult> GetPrescriptionById(int prescriptionId)
        {
            PrescriptionResponse? prescription = await _prescriptionService.GetPrescriptionByIdAsync(prescriptionId);

            if (prescription == null)
            {
                return NotFound(new ErrorResponse
                {
                    Error = "Prescription not found",
                    Message = $"Prescription with ID {prescriptionId} does not exist"
                });
            }

            return Ok(prescription);
        }

        /// <summary>
        /// Updates an existing prescription.
        /// Only the issuing doctor can update a prescription.
        /// </summary>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <param name="request">The prescription update request.</param>
        /// <returns>Success response.</returns>
        [HttpPut("{prescriptionId}")]
        public async Task<IActionResult> UpdatePrescription(
            int prescriptionId,
            [FromBody] CreatePrescriptionRequest request)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            // Verify user is a doctor
            if (currentUser.Role != UserType.DOCTOR)
            {
                return BadRequest(new ErrorResponse
                {
                    Error = "Only doctors can update prescriptions",
                    Message = "Your account does not have permission to update prescriptions"
                });
            }

            try
            {
                await _prescriptionService.UpdatePrescriptionAsync(
                    currentUser.UserId,
                    prescriptionId,
                    request);

                return Ok(new { message = "Prescription updated successfully" });
            }
            catch (Exception ex) when (ex.Message.Contains("not found"))
            {
                return NotFound(new ErrorResponse
                {
                    Error = "Prescription not found",
                    Message = ex.Message
                });
            }
            catch (Exception ex) when (ex.Message.Contains("permission"))
            {
                return Forbid(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a prescription.
        /// Only the issuing doctor can delete a prescription.
        /// </summary>
        /// <param name="prescriptionId">The prescription identifier.</param>
        /// <returns>Success response.</returns>
        [HttpDelete("{prescriptionId}")]
        public async Task<IActionResult> DeletePrescription(int prescriptionId)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            // Verify user is a doctor
            if (currentUser.Role != UserType.DOCTOR)
            {
                return BadRequest(new ErrorResponse
                {
                    Error = "Only doctors can delete prescriptions",
                    Message = "Your account does not have permission to delete prescriptions"
                });
            }

            try
            {
                await _prescriptionService.DeletePrescriptionAsync(
                    currentUser.UserId,
                    prescriptionId);

                return Ok(new { message = "Prescription deleted successfully" });
            }
            catch (Exception ex) when (ex.Message.Contains("not found"))
            {
                return NotFound(new ErrorResponse
                {
                    Error = "Prescription not found",
                    Message = ex.Message
                });
            }
            catch (Exception ex) when (ex.Message.Contains("permission"))
            {
                return Forbid(ex.Message);
            }
        }

        #endregion
    }
}
