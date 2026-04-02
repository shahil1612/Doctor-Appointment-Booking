import { useState, useEffect } from "react";
import { medicalDocumentAPI } from "../../../../services/api.js";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await medicalDocumentAPI.getMyDocuments();
      setDocuments(data || []);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    fetchDocuments();
  };

  const handleDeleteClick = (document) => {
    setDocumentToDelete(document);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;

    try {
      await medicalDocumentAPI.deleteDocument(documentToDelete.documentId);
      toast.success("Document deleted successfully");
      setIsDeleteModalOpen(false);
      setDocumentToDelete(null);
      fetchDocuments();
    } catch (error) {
      console.error("Failed to delete document:", error);
      toast.error(error.message || "Failed to delete document");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Reports, test results & records">
            Medical Documents
          </Card.Title>
          <Button variant="primary" onClick={() => setIsUploadModalOpen(true)}>
            + Upload Document
          </Button>
        </Card.Header>
        <Card.Content>
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📁</div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                No documents
              </h4>
              <p className="text-xs text-gray-600 mb-4">
                Upload your medical documents, test results, and reports
              </p>
              <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(true)}
              >
                Upload Your First Document
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.documentId}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{getFileIcon(doc.fileType)}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleDownloadDocument(doc.documentId, doc.fileName)
                        }
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        title="Download"
                      >
                        ⬇️
                      </button>
                      <button
                        onClick={() => handleDeleteClick(doc)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {doc.documentTitle}
                  </h3>
                  {doc.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {doc.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(doc.fileSize)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(doc.uploadedAtUtc).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadDocumentModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDocumentToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          document={documentToDelete}
        />
      )}
    </div>
  );
};

const UploadDocumentModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Document title is required");
      return;
    }

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("DocumentTitle", title);
      if (description) {
        formData.append("Description", description);
      }
      formData.append("File", file);

      await medicalDocumentAPI.uploadDocument(formData);
      toast.success("Document uploaded successfully!");
      onSuccess();
      resetForm();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Upload Medical Document
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder="e.g., Blood Test Report, X-Ray, Prescription"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              placeholder="Add any relevant details about this document"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select File * (Max 10MB)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, Images (JPG, PNG, GIF), Word, Excel
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Document"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, document }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2
            className="text-2xl font-semibold text-[#1e293b]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Delete Document
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            disabled={isDeleting}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold mb-1">
                  Warning: This action cannot be undone
                </h3>
                <p className="text-red-700 text-sm">
                  Once deleted, this document cannot be recovered.
                </p>
              </div>
            </div>
          </div>

          {/* Document Details */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this document?
            </p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-semibold text-gray-900">
                {document?.documentTitle}
              </p>
              {document?.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {document.description}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Document"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
