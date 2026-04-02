import { useState, useEffect } from "react";
import { medicalDocumentAPI } from "../../../../services/api.js";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const PatientProfileModal = ({ isOpen, onClose, patient }) => {
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  useEffect(() => {
    if (isOpen && patient) {
      fetchPatientDocuments();
    }
  }, [isOpen, patient]);

  const fetchPatientDocuments = async () => {
    setLoadingDocuments(true);
    try {
      const data = await medicalDocumentAPI.getPatientDocuments(patient.userId);
      setDocuments(data || []);
    } catch (error) {
      console.error("Failed to fetch patient documents:", error);
      // Don't show error toast as it might just mean no documents
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleDownloadDocument = async (documentId, fileName) => {
    try {
      const response = await medicalDocumentAPI.downloadDocument(documentId);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started");
    } catch (error) {
      console.error("Failed to download document:", error);
      toast.error("Failed to download document");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("image")) return "🖼️";
    if (fileType.includes("word")) return "📝";
    if (fileType.includes("excel") || fileType.includes("spreadsheet"))
      return "📊";
    return "📎";
  };

  if (!isOpen || !patient) return null;

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const InfoField = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Patient Profile
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Personal Information Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Personal Information
            </h3>
            <div className="space-y-2">
              <InfoField label="Full Name" value={patient.fullName || "N/A"} />
              <InfoField label="Email" value={patient.email || "N/A"} />
              <InfoField label="Phone" value={patient.phone || "N/A"} />
              <InfoField
                label="Date of Birth"
                value={formatDate(patient.dob)}
              />
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Medical Information
            </h3>
            <div className="space-y-2">
              <InfoField
                label="Blood Group"
                value={patient.bloodGroup || "N/A"}
              />
              <InfoField
                label="Height"
                value={patient.heightCm ? `${patient.heightCm} cm` : "N/A"}
              />
              <InfoField
                label="Weight"
                value={patient.weightKg ? `${patient.weightKg} kg` : "N/A"}
              />
              <InfoField label="Allergies" value={patient.allergies || "N/A"} />
              <InfoField
                label="Chronic Conditions"
                value={patient.chronicConditions || "N/A"}
              />
            </div>
          </div>

          {/* Emergency & Appointment Information Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Appointment History
            </h3>
            <div className="space-y-2">
              <InfoField
                label="Emergency Contact"
                value={patient.emergencyContact || "N/A"}
              />
              <InfoField
                label="Total Appointments"
                value={patient.appointmentCount || 0}
              />
              <InfoField
                label="Last Appointment"
                value={formatDate(patient.lastAppointmentDate)}
              />
            </div>
          </div>

          {/* Medical Documents Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Medical Documents
            </h3>
            {loadingDocuments ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">No documents uploaded</p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.documentId}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-2xl">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {doc.documentTitle}
                        </p>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {formatFileSize(doc.fileSize)}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(doc.uploadedAtUtc).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleDownloadDocument(doc.documentId, doc.fileName)
                      }
                      className="ml-2 px-3 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
          <Button variant="outline" onClick={onClose} size="sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileModal;
