import { useState } from "react";
import { doctorAPI } from "../../../../services/api.js";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const DoctorProfileModal = ({ isOpen, onClose, profile, onProfileUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState(
    profile
      ? {
          specialization: profile.specialization || "",
          yearsExperience: profile.yearsExperience || "",
          consultationFee: profile.consultationFee || "",
          bio: profile.bio || "",
          licenseNumber: profile.licenseNumber || "",
        }
      : {},
  );

  if (!isOpen || !profile) return null;

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);

    try {
      const updatePayload = {
        specialization: editData.specialization || "",
        yearsExperience: editData.yearsExperience
          ? parseInt(editData.yearsExperience)
          : null,
        consultationFee: editData.consultationFee
          ? parseFloat(editData.consultationFee)
          : 0,
        bio: editData.bio || "",
        licenseNumber: editData.licenseNumber || "",
      };

      const updatedProfile = await doctorAPI.updateProfile(updatePayload);

      toast.success("Profile updated successfully!");
      onProfileUpdate(updatedProfile);
      setIsEditMode(false);
    } catch (error) {
      toast.error(
        error.message || "Failed to update profile. Please try again.",
      );
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      specialization: profile.specialization || "",
      yearsExperience: profile.yearsExperience || "",
      consultationFee: profile.consultationFee || "",
      bio: profile.bio || "",
      licenseNumber: profile.licenseNumber || "",
    });
    setIsEditMode(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {isEditMode ? "Edit Profile" : "Profile Information"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                label="Full Name"
                value={profile.fullName}
                editable={false}
              />
              <InfoItem label="Email" value={profile.email} editable={false} />
              <InfoItem label="Phone" value={profile.phone} editable={false} />
              <InfoItem
                label="License Number"
                value={profile.licenseNumber}
                editable={false}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableInfoItem
                label="Specialization"
                value={editData.specialization}
                isEditMode={isEditMode}
                onChange={(val) => handleEditChange("specialization", val)}
                placeholder="e.g., Cardiology, Dermatology"
                maxLength={100}
              />
              <EditableInfoItem
                label="Years of Experience"
                value={editData.yearsExperience}
                isEditMode={isEditMode}
                onChange={(val) => handleEditChange("yearsExperience", val)}
                type="number"
                placeholder="e.g., 5"
                min="0"
                max="70"
              />
              <EditableInfoItem
                label="Consultation Fee (₹)"
                value={editData.consultationFee}
                isEditMode={isEditMode}
                onChange={(val) => handleEditChange("consultationFee", val)}
                type="number"
                placeholder="e.g., 500"
                min="0"
                step="0.01"
              />
            </div>
            <div className="mt-4">
              <EditableInfoItem
                label="Professional Bio"
                value={editData.bio}
                isEditMode={isEditMode}
                onChange={(val) => handleEditChange("bio", val)}
                placeholder="Write your professional bio here..."
                maxLength={500}
                fullWidth
                textarea
              />
            </div>
            <div className="mt-4">
              <EditableInfoItem
                label="License Number"
                value={editData.licenseNumber}
                isEditMode={isEditMode}
                onChange={(val) => handleEditChange("licenseNumber", val)}
                placeholder="e.g., MCI/2021/12345"
                maxLength={100}
              />
            </div>
          </div>

          {/* Rating & Reviews */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                label="Average Rating"
                value={
                  profile.ratingAvg
                    ? `${profile.ratingAvg.toFixed(1)} ⭐`
                    : "No ratings yet"
                }
                editable={false}
              />
              <InfoItem
                label="Total Reviews"
                value={profile.totalReviews || "0"}
                editable={false}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 flex-shrink-0">
          {isEditMode ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setIsEditMode(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <label className="text-xs font-medium text-gray-500 block mb-1">
        {label}
      </label>
      <p className="text-sm text-[#1e293b] font-medium">
        {value || "Not specified"}
      </p>
    </div>
  );
};

const EditableInfoItem = ({
  label,
  value,
  isEditMode,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  min,
  max,
  step,
  fullWidth = false,
  textarea = false,
}) => {
  return (
    <div
      className={`${fullWidth ? "col-span-full" : ""} bg-white rounded-lg p-3 border border-gray-200`}
    >
      <label className="text-xs font-medium text-gray-500 block mb-1">
        {label}
      </label>
      {isEditMode ? (
        textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            min={min}
            max={max}
            step={step}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )
      ) : (
        <p className="text-sm text-[#1e293b] font-medium">
          {value
            ? type === "number"
              ? `${value} ${label.includes("Experience") ? "yrs" : ""}`
              : value
            : "Not specified"}
        </p>
      )}
    </div>
  );
};

export default DoctorProfileModal;
