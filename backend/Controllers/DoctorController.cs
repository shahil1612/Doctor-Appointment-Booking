using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Extensions;
using backend.Exceptions;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    /// <summary>
    /// Exposes doctor profile and clinic management endpoints.
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        #region Private Fields

        /// <summary>
        /// Represents doctor service dependency.
        /// </summary>
        private readonly IDoctorService _doctorService;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="DoctorController"/> class.
        /// </summary>
        /// <param name="doctorService">The doctor service.</param>
        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        #endregion

        #region Doctor Profile Endpoints

        /// <summary>
        /// Retrieves current doctor's profile with complete details.
        /// </summary>
        /// <returns>The doctor profile response.</returns>
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.DOCTOR)
            {
                throw new AppException("You are not authorized to access this resource.", StatusCodes.Status403Forbidden);
            }

            DoctorProfileResponse response = await _doctorService.GetDoctorProfileAsync(currentUser.UserId);

            return Ok(response);
        }

        /// <summary>
        /// Updates current doctor's profile information.
        /// </summary>
        /// <param name="request">The profile update request payload.</param>
        /// <returns>The updated doctor profile response.</returns>
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateDoctorProfileRequest request)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.DOCTOR)
            {
                throw new AppException("You are not authorized to access this resource.", StatusCodes.Status403Forbidden);
            }

            await _doctorService.UpdateProfilePresaveAsync(currentUser.UserId, request);
            await _doctorService.UpdateProfileValidateAsync();
            DoctorProfileResponse response = await _doctorService.UpdateProfileSaveAsync();

            return Ok(response);
        }

        #endregion

        #region Clinic Management Endpoints

        /// <summary>
        /// Creates a new clinic and associates it with current doctor.
        /// </summary>
        /// <param name="request">The clinic creation request payload.</param>
        /// <returns>The created clinic response with association details.</returns>
        [HttpPost("clinic")]
        public async Task<IActionResult> CreateClinic([FromBody] CreateClinicRequest request)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.DOCTOR)
            {
                throw new AppException("You are not authorized to access this resource.", StatusCodes.Status403Forbidden);
            }

            await _doctorService.CreateClinicPresaveAsync(currentUser.UserId, request);
            await _doctorService.CreateClinicValidateAsync();
            ClinicResponse response = await _doctorService.CreateClinicSaveAsync();

            return StatusCode(201, response);
        }

        /// <summary>
        /// Retrieves all clinics associated with current doctor.
        /// </summary>
        /// <returns>A list of clinic responses with association details.</returns>
        [HttpGet("clinics")]
        public async Task<IActionResult> GetClinics()
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.DOCTOR)
            {
                throw new AppException("You are not authorized to access this resource.", StatusCodes.Status403Forbidden);
            }

            List<ClinicResponse> response = await _doctorService.GetDoctorClinicsAsync(currentUser.UserId);

            return Ok(response);
        }

        #endregion
    }
}
