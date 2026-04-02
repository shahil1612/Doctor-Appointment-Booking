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
    /// Exposes medical document endpoints for patients and doctors.
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class MedicalDocumentsController : ControllerBase
    {
        #region Private Fields

        /// <summary>
        /// Represents medical document service dependency.
        /// </summary>
        private readonly IMedicalDocumentService _documentService;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicalDocumentsController"/> class.
        /// </summary>
        /// <param name="documentService">The medical document service.</param>
        public MedicalDocumentsController(IMedicalDocumentService documentService)
        {
            _documentService = documentService;
        }

        #endregion

        #region Patient Endpoints

        /// <summary>
        /// Uploads a new medical document for current patient.
        /// </summary>
        /// <param name="request">The upload request with file.</param>
        /// <returns>The created document details.</returns>
        [HttpPost]
        [RequestSizeLimit(10 * 1024 * 1024)] // 10MB limit
        public async Task<IActionResult> UploadDocument([FromForm] UploadMedicalDocumentRequest request)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.PATIENT)
            {
                throw new AppException("Only patients can upload documents.", StatusCodes.Status403Forbidden);
            }

            MedicalDocumentResponse response = await _documentService.UploadDocumentAsync(currentUser.UserId, request);

            return StatusCode(201, response);
        }

        /// <summary>
        /// Retrieves all medical documents for current patient.
        /// </summary>
        /// <returns>A list of medical documents.</returns>
        [HttpGet("patient/my-documents")]
        public async Task<IActionResult> GetMyDocuments()
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.PATIENT)
            {
                throw new AppException("Only patients can access this endpoint.", StatusCodes.Status403Forbidden);
            }

            List<MedicalDocumentResponse> response = await _documentService.GetPatientDocumentsAsync(currentUser.UserId);

            return Ok(response);
        }

        /// <summary>
        /// Retrieves medical documents for a specific patient (doctor access).
        /// </summary>
        /// <param name="patientUserId">The patient user identifier.</param>
        /// <returns>A list of medical documents.</returns>
        [HttpGet("patient/{patientUserId:int}")]
        public async Task<IActionResult> GetPatientDocuments(int patientUserId)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.DOCTOR)
            {
                throw new AppException("Only doctors can access patient documents.", StatusCodes.Status403Forbidden);
            }

            List<MedicalDocumentResponse> response = await _documentService.GetPatientDocumentsAsync(patientUserId);

            return Ok(response);
        }

        /// <summary>
        /// Downloads a medical document file.
        /// </summary>
        /// <param name="documentId">The document identifier.</param>
        /// <returns>The file stream.</returns>
        [HttpGet("{documentId:int}/download")]
        public async Task<IActionResult> DownloadDocument(int documentId)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            (Stream fileStream, string contentType, string fileName) = await _documentService.DownloadDocumentAsync(
                documentId,
                currentUser.UserId,
                currentUser.Role);

            return File(fileStream, contentType, fileName);
        }

        /// <summary>
        /// Deletes a medical document.
        /// </summary>
        /// <param name="documentId">The document identifier.</param>
        /// <returns>A status response.</returns>
        [HttpDelete("{documentId:int}")]
        public async Task<IActionResult> DeleteDocument(int documentId)
        {
            CurrentUserContext currentUser = HttpContext.GetCurrentUserContext();

            if (currentUser.Role != UserType.PATIENT)
            {
                throw new AppException("Only patients can delete their documents.", StatusCodes.Status403Forbidden);
            }

            await _documentService.DeleteDocumentAsync(documentId, currentUser.UserId);

            return Ok(new { message = "Document deleted successfully." });
        }

        #endregion
    }
}
