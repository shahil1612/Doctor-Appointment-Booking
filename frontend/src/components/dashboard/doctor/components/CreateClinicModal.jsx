import { useState } from "react";
import { doctorAPI } from "../../../../services/api.js";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

// Extract FormField outside component to prevent recreation on each render
const FormField = ({
  label,
  field,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      }`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const CreateClinicModal = ({ isOpen, onClose, onClinicCreated }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    consultationFee: "",
    phone: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = "Clinic name must be at least 3 characters";
    }

    if (!formData.addressLine.trim() || formData.addressLine.length < 5) {
      newErrors.addressLine = "Address must be at least 5 characters";
    }

    if (!formData.city.trim() || formData.city.length < 2) {
      newErrors.city = "City is required (min 2 characters)";
    }

    if (!formData.state.trim() || formData.state.length < 2) {
      newErrors.state = "State is required (min 2 characters)";
    }

    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    if (!formData.consultationFee || parseFloat(formData.consultationFee) < 0) {
      newErrors.consultationFee =
        "Consultation fee is required and must be >= 0";
    }

    if (formData.phone && !/^$|^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits (or leave empty)";
    }

    if (
      formData.latitude &&
      (isNaN(formData.latitude) ||
        parseFloat(formData.latitude) < -90 ||
        parseFloat(formData.latitude) > 90)
    ) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (
      formData.longitude &&
      (isNaN(formData.longitude) ||
        parseFloat(formData.longitude) < -180 ||
        parseFloat(formData.longitude) > 180)
    ) {
      newErrors.longitude = "Longitude must be between -180 and 180";
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
      const payload = {
        name: formData.name,
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        consultationFee: parseFloat(formData.consultationFee),
        phone: formData.phone || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      const result = await doctorAPI.createClinic(payload);
      toast.success("Clinic created successfully!");
      onClinicCreated(result);
      onClose();

      // Reset form
      setFormData({
        name: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        consultationFee: "",
        phone: "",
        latitude: "",
        longitude: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Clinic creation error:", error);
      toast.error(error.message || "Failed to create clinic");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Create New Clinic
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Clinic Name"
              field="name"
              placeholder="Enter clinic name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormField
              label="Consultation Fee (₹)"
              field="consultationFee"
              type="number"
              placeholder="1000"
              value={formData.consultationFee}
              onChange={handleChange}
              error={errors.consultationFee}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Address Line"
              field="addressLine"
              placeholder="Enter complete address"
              value={formData.addressLine}
              onChange={handleChange}
              error={errors.addressLine}
            />
            <FormField
              label="Phone (Optional)"
              field="phone"
              placeholder="10-digit number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="City"
              field="city"
              placeholder="e.g., Mumbai"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            <FormField
              label="State"
              field="state"
              placeholder="e.g., Maharashtra"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
            />
            <FormField
              label="Pincode"
              field="pincode"
              placeholder="e.g., 400001"
              value={formData.pincode}
              onChange={handleChange}
              error={errors.pincode}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Latitude (Optional)"
              field="latitude"
              type="number"
              placeholder="e.g., 19.0760"
              value={formData.latitude}
              onChange={handleChange}
              error={errors.latitude}
            />
            <FormField
              label="Longitude (Optional)"
              field="longitude"
              type="number"
              placeholder="e.g., 72.8777"
              value={formData.longitude}
              onChange={handleChange}
              error={errors.longitude}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              💡 Tip: Fill in optional coordinates only if you have the exact
              clinic location. You can leave them blank for now.
            </p>
          </div>
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
            disabled={isSaving}
            size="sm"
          >
            {isSaving ? "Creating..." : "Create Clinic"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateClinicModal;
