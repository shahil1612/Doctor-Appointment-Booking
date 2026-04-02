using backend.DTOs;
using backend.Exceptions;
using backend.Mapping;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    /// <summary>
    /// Provides business logic for medical document operations.
    /// </summary>
    public class MedicalDocumentService : IMedicalDocumentService
    {
        #region Private Fields

        /// <summary>
        /// Represents medical document repository dependency.
        /// </summary>
        private readonly IMedicalDocumentRepository _documentRepository;

        /// <summary>
        /// Represents reflection mapper dependency.
        /// </summary>
        private readonly IReflectionMapper _reflectionMapper;

        /// <summary>
        /// Represents web host environment for file paths.
        /// </summary>
        private readonly IWebHostEnvironment _environment;

        /// <summary>
        /// Represents appointment repository for doctor access validation.
        /// </summary>
        private readonly IAppointmentRepository _appointmentRepository;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicalDocumentService"/> class.
        /// </summary>
        public MedicalDocumentService(
            IMedicalDocumentRepository documentRepository,
            IReflectionMapper reflectionMapper,
            IWebHostEnvironment environment,
            IAppointmentRepository appointmentRepository)
        {
            _documentRepository = documentRepository;
            _reflectionMapper = reflectionMapper;
            _environment = environment;
            _appointmentRepository = appointmentRepository;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<MedicalDocumentResponse> UploadDocumentAsync(int patientUserId, UploadMedicalDocumentRequest request)
        {
            // Validate patient exists
            TBL01? user = await _documentRepository.FindUserByIdAsync(patientUserId);
            if (user == null || user.L01F02 != UserType.PATIENT)
            {
                throw new AppException("Patient profile not found.", StatusCodes.Status400BadRequest);
            }

            // Validate file
            if (request.File == null || request.File.Length == 0)
            {
                throw new AppException("File is required.", StatusCodes.Status400BadRequest);
            }

            // Validate file size (max 10MB)
            const long maxFileSize = 10 * 1024 * 1024;
            if (request.File.Length > maxFileSize)
            {
                throw new AppException("File size cannot exceed 10MB.", StatusCodes.Status400BadRequest);
            }

            // Validate file type (PDF, images, common document formats)
            string[] allowedTypes = {
                "application/pdf",
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };

            if (!allowedTypes.Contains(request.File.ContentType.ToLower()))
            {
                throw new AppException("Invalid file type. Only PDF, images, and Office documents are allowed.", StatusCodes.Status400BadRequest);
            }

            // Create uploads directory if it doesn't exist
            string uploadsPath = Path.Combine(_environment.ContentRootPath, "uploads", "medical-documents");
            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            // Generate unique file name
            string fileExtension = Path.GetExtension(request.File.FileName);
            string uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            string filePath = Path.Combine(uploadsPath, uniqueFileName);

            // Save file to disk
            using (FileStream stream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream);
            }

            // Create document record
            TBL09 document = new TBL09
            {
                L09F02 = patientUserId,
                L09F03 = request.DocumentTitle,
                L09F04 = request.Description,
                L09F05 = request.File.FileName,
                L09F06 = filePath,
                L09F07 = request.File.Length,
                L09F08 = request.File.ContentType,
                L09F09 = DateTime.UtcNow
            };

            int documentId = await _documentRepository.CreateDocumentAsync(document);
            document.L09F01 = documentId;

            MedicalDocumentResponse response = _reflectionMapper.Map<TBL09, MedicalDocumentResponse>(document);
            response.PatientName = user.L01F03;

            return response;
        }

        /// <inheritdoc/>
        public async Task<List<MedicalDocumentResponse>> GetPatientDocumentsAsync(int patientUserId)
        {
            // Validate patient exists
            TBL01? user = await _documentRepository.FindUserByIdAsync(patientUserId);
            if (user == null || user.L01F02 != UserType.PATIENT)
            {
                throw new AppException("Patient profile not found.", StatusCodes.Status400BadRequest);
            }

            List<TBL09> documents = await _documentRepository.GetPatientDocumentsAsync(patientUserId);
            List<MedicalDocumentResponse> responses = new List<MedicalDocumentResponse>();

            foreach (TBL09 document in documents)
            {
                MedicalDocumentResponse response = _reflectionMapper.Map<TBL09, MedicalDocumentResponse>(document);
                response.PatientName = user.L01F03;
                responses.Add(response);
            }

            return responses;
        }

        /// <inheritdoc/>
        public async Task<(Stream FileStream, string ContentType, string FileName)> DownloadDocumentAsync(
            int documentId,
            int requestingUserId,
            UserType requestingUserType)
        {
            TBL09? document = await _documentRepository.FindDocumentByIdAsync(documentId);
            if (document == null)
            {
                throw new AppException("Document not found.", StatusCodes.Status404NotFound);
            }

            // Validate access rights
            if (requestingUserType == UserType.PATIENT)
            {
                // Patient can only access their own documents
                if (document.L09F02 != requestingUserId)
                {
                    throw new AppException("You are not authorized to access this document.", StatusCodes.Status403Forbidden);
                }
            }
            else if (requestingUserType == UserType.DOCTOR)
            {
                // Doctor can access documents of their patients (patients with appointments)
                List<TBL04> appointments = await _appointmentRepository.GetDoctorAppointmentsByStatusAsync(requestingUserId, AppointmentStatus.APPROVED);
                appointments.AddRange(await _appointmentRepository.GetDoctorAppointmentsByStatusAsync(requestingUserId, AppointmentStatus.COMPLETED));
                appointments.AddRange(await _appointmentRepository.GetDoctorAppointmentsByStatusAsync(requestingUserId, AppointmentStatus.PENDING));

                bool hasAppointmentWithPatient = appointments.Any(a => a.L04F02 == document.L09F02);
                if (!hasAppointmentWithPatient)
                {
                    throw new AppException("You are not authorized to access this document.", StatusCodes.Status403Forbidden);
                }
            }
            else
            {
                throw new AppException("Invalid user type.", StatusCodes.Status403Forbidden);
            }

            // Check if file exists
            if (!File.Exists(document.L09F06))
            {
                throw new AppException("File not found on server.", StatusCodes.Status404NotFound);
            }

            // Open file stream
            FileStream fileStream = new FileStream(document.L09F06, FileMode.Open, FileAccess.Read);

            return (fileStream, document.L09F08, document.L09F05);
        }

        /// <inheritdoc/>
        public async Task DeleteDocumentAsync(int documentId, int patientUserId)
        {
            TBL09? document = await _documentRepository.FindDocumentByIdAsync(documentId);
            if (document == null)
            {
                throw new AppException("Document not found.", StatusCodes.Status404NotFound);
            }

            // Validate ownership
            if (document.L09F02 != patientUserId)
            {
                throw new AppException("You are not authorized to delete this document.", StatusCodes.Status403Forbidden);
            }

            // Delete file from disk
            if (File.Exists(document.L09F06))
            {
                File.Delete(document.L09F06);
            }

            // Delete database record
            await _documentRepository.DeleteDocumentAsync(document);
        }

        #endregion
    }
}
