import { useState } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const CreateSlotModal = ({ isOpen, onClose, clinics = [], onSlotCreated }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    clinicId: "",
    slotDate: "",
    slotStartTime: "",
    slotEndTime: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clinicId) {
      newErrors.clinicId = "Please select a clinic";
    }

    if (!formData.slotDate) {
      newErrors.slotDate = "Please select a date";
    }

    if (!formData.slotStartTime) {
      newErrors.slotStartTime = "Please select start time";
    }

    if (!formData.slotEndTime) {
      newErrors.slotEndTime = "Please select end time";
    }

    // Check if end time is after start time
    if (formData.slotStartTime && formData.slotEndTime) {
      if (formData.slotEndTime <= formData.slotStartTime) {
        newErrors.slotEndTime = "End time must be after start time";
      }
    }

    // Check if date is in the future
    if (formData.slotDate) {
      const selectedDate = new Date(formData.slotDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.slotDate = "Please select a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSaving(true);

    try {
      // Combine date and time to create UTC datetime
      const slotDate = new Date(formData.slotDate);
      const [startHour, startMin] = formData.slotStartTime
        .split(":")
        .map(Number);
      const [endHour, endMin] = formData.slotEndTime.split(":").map(Number);

      const slotStartUtc = new Date(slotDate);
      slotStartUtc.setHours(startHour, startMin, 0, 0);

      const slotEndUtc = new Date(slotDate);
      slotEndUtc.setHours(endHour, endMin, 0, 0);

      const payload = {
        clinicId: parseInt(formData.clinicId),
        slotStartUtc: slotStartUtc.toISOString(),
        slotEndUtc: slotEndUtc.toISOString(),
      };

      const result = await appointmentAPI.createSlot(payload);
      toast.success("Appointment slot created successfully!");
      onSlotCreated(result);
      onClose();

      // Reset form
      setFormData({
        clinicId: "",
        slotDate: "",
        slotStartTime: "",
        slotEndTime: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Slot creation error:", error);
      toast.error(error.message || "Failed to create appointment slot");
    } finally {
      setIsSaving(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Create Appointment Slot
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto flex-1"
        >
          {clinics.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-700">
                ⚠️ You need to create at least one clinic before creating slots.
                Please create a clinic first.
              </p>
            </div>
          ) : (
            <>
              {/* Clinic Selection */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Select Clinic *
                </label>
                <select
                  value={formData.clinicId}
                  onChange={(e) => handleChange("clinicId", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.clinicId
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="">-- Select a clinic --</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.clinicId} value={clinic.clinicId}>
                      {clinic.name} - {clinic.city}
                    </option>
                  ))}
                </select>
                {errors.clinicId && (
                  <p className="text-xs text-red-500">{errors.clinicId}</p>
                )}
              </div>

              {/* Date Selection */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  type="date"
                  min={today}
                  value={formData.slotDate}
                  onChange={(e) => handleChange("slotDate", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.slotDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.slotDate && (
                  <p className="text-xs text-red-500">{errors.slotDate}</p>
                )}
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={formData.slotStartTime}
                    onChange={(e) =>
                      handleChange("slotStartTime", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.slotStartTime
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.slotStartTime && (
                    <p className="text-xs text-red-500">
                      {errors.slotStartTime}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={formData.slotEndTime}
                    onChange={(e) =>
                      handleChange("slotEndTime", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.slotEndTime
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.slotEndTime && (
                    <p className="text-xs text-red-500">{errors.slotEndTime}</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  💡 Tip: Create slots for when you are available to see
                  patients. Time is in your local timezone.
                </p>
              </div>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSaving || clinics.length === 0}
            size="sm"
          >
            {isSaving ? "Creating..." : "Create Slot"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSlotModal;
