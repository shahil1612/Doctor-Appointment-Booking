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
    /// Exposes patient profile management endpoints.
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        #region Private Fields

        /// <summary>
        /// Represents patient service dependency.
        /// </summary>
        private readonly IPatientService _patientService;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="PatientController"/> class.
        /// </summary>
        /// <param name="patientService">The patient service.</param>
        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        #endregion

        #region Patient Profile Endpoints

        /// <summary>
        /// Retrieves current patient's profile with complete details.
        /// </summary>
        /// <returns>The patient profile response.</returns>
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.PATIENT)
            {
                throw new AppException("You are not authorized to access this resource.", StatusCodes.Status403Forbidden);
            }

            PatientProfileResponse response = await _patientService.GetPatientProfileAsync(currentUser.UserId);

            return Ok(response);
        }

        /// <summary>
        /// Updates current patient's profile information.
        /// </summary>
        /// <param name="request">The profile update request payload.</param>
        /// <returns>The updated patient profile response.</returns>
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdatePatientProfileRequest request)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.PATIENT)
            {
                throw new AppException("You are not authorized to access this resource.", StatusCodes.Status403Forbidden);
            }

            await _patientService.UpdateProfilePresaveAsync(currentUser.UserId, request);
            await _patientService.UpdateProfileValidateAsync();
            PatientProfileResponse response = await _patientService.UpdateProfileSaveAsync();

            return Ok(response);
        }

        #endregion
    }
}
