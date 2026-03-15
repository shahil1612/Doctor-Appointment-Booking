import Button from "../../ui/Button";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  isDangerous = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#1e293b]">{title}</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            size="sm"
          >
            {cancelText}
          </Button>
          <Button
            variant={isDangerous ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
