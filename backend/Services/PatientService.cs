using backend.DTOs;
using backend.Exceptions;
using backend.Mapping;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    /// <summary>
    /// Provides business logic for patient profile management operations.
    /// </summary>
    public class PatientService : IPatientService
    {
        #region Private Fields

        /// <summary>
        /// Represents patient repository dependency.
        /// </summary>
        private readonly IPatientRepository _patientRepository;

        /// <summary>
        /// Represents reflection mapper dependency.
        /// </summary>
        private readonly IReflectionMapper _reflectionMapper;

        /// <summary>
        /// Represents in-memory workflow state for patient profile update.
        /// </summary>
        private UpdatePatientProfileWorkflowState? _updateProfileState;

        #endregion

        #region Constructor

        /// <summary>
        /// Initializes a new instance of the <see cref="PatientService"/> class.
        /// </summary>
        /// <param name="patientRepository">The patient repository.</param>
        /// <param name="reflectionMapper">The reflection mapper.</param>
        public PatientService(IPatientRepository patientRepository, IReflectionMapper reflectionMapper)
        {
            _patientRepository = patientRepository;
            _reflectionMapper = reflectionMapper;
        }

        #endregion

        #region Public Methods

        /// <inheritdoc/>
        public async Task<PatientProfileResponse> GetPatientProfileAsync(int patientUserId)
        {
            TBL02? patient = await _patientRepository.GetPatientByUserIdAsync(patientUserId);
            if (patient == null)
            {
                throw new AppException("Patient profile not found.", StatusCodes.Status404NotFound);
            }

            PatientProfileResponse response = _reflectionMapper.Map<TBL01, PatientProfileResponse>(patient.L02F06);
            _reflectionMapper.MapToExisting<TBL02, PatientProfileResponse>(patient, response);
            return response;
        }

        /// <inheritdoc/>
        public async Task UpdateProfilePresaveAsync(int patientUserId, UpdatePatientProfileRequest request)
        {
            TBL02? patient = await _patientRepository.GetPatientByUserIdAsync(patientUserId);
            if (patient == null)
            {
                throw new AppException("Patient profile not found.", StatusCodes.Status404NotFound);
            }

            _updateProfileState = new UpdatePatientProfileWorkflowState
            {
                PatientUserId = patientUserId,
                Request = request,
                Patient = patient
            };
        }

        /// <inheritdoc/>
        public Task UpdateProfileValidateAsync()
        {
            if (_updateProfileState == null)
            {
                throw new AppException("Invalid profile update workflow state.", StatusCodes.Status400BadRequest);
            }

            UpdatePatientProfileRequest request = _updateProfileState.Request;

            if (request.HeightCm.HasValue && (request.HeightCm.Value < 0 || request.HeightCm.Value > 300))
            {
                throw new AppException("Height must be between 0 and 300 cm.", StatusCodes.Status400BadRequest);
            }

            if (request.WeightKg.HasValue && (request.WeightKg.Value < 0 || request.WeightKg.Value > 500))
            {
                throw new AppException("Weight must be between 0 and 500 kg.", StatusCodes.Status400BadRequest);
            }

            return Task.CompletedTask;
        }

        /// <inheritdoc/>
        public async Task<PatientProfileResponse> UpdateProfileSaveAsync()
        {
            if (_updateProfileState == null || _updateProfileState.Patient == null)
            {
                throw new AppException("Invalid profile update workflow state.", StatusCodes.Status400BadRequest);
            }

            _reflectionMapper.MapToExisting(_updateProfileState.Request, _updateProfileState.Patient);
            await _patientRepository.UpdatePatientAsync(_updateProfileState.Patient);

            TBL02? updatedPatient = await _patientRepository.GetPatientByUserIdAsync(_updateProfileState.PatientUserId);
            if (updatedPatient == null)
            {
                throw new AppException("Failed to retrieve updated patient profile.", StatusCodes.Status500InternalServerError);
            }

            PatientProfileResponse response = _reflectionMapper.Map<TBL01, PatientProfileResponse>(updatedPatient.L02F06);
            _reflectionMapper.MapToExisting<TBL02, PatientProfileResponse>(updatedPatient, response);
            return response;
        }

        #endregion
    }
}
