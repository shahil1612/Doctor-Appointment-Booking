import { useState, useEffect } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import CreateClinicModal from "../components/CreateClinicModal";
import CreateSlotModal from "../components/CreateSlotModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { doctorAPI, appointmentAPI } from "../../../../services/api.js";
import toast from "react-hot-toast";

const SchedulePage = () => {
  const [clinics, setClinics] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateClinicModalOpen, setIsCreateClinicModalOpen] = useState(false);
  const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);
  const [selectedClinicFilter, setSelectedClinicFilter] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    slotId: null,
    isDeleting: false,
  });

  // Fetch clinics and slots on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clinicsData, slotsData] = await Promise.all([
        doctorAPI.getClinics(),
        appointmentAPI.getDoctorSlots(),
      ]);
      setClinics(clinicsData || []);
      setSlots(slotsData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load schedule data");
    } finally {
      setLoading(false);
    }
  };

  const handleClinicCreated = (newClinic) => {
    setClinics((prev) => [...prev, newClinic]);
    setIsCreateClinicModalOpen(false);
  };

  const handleSlotCreated = (newSlot) => {
    setSlots((prev) => [...prev, newSlot]);
    setIsCreateSlotModalOpen(false);
  };

  const handleDeleteSlot = async (slotId) => {
    setDeleteConfirmation({
      isOpen: true,
      slotId: slotId,
      isDeleting: false,
    });
  };

  const handleConfirmDelete = async () => {
    const slotId = deleteConfirmation.slotId;
    setDeleteConfirmation((prev) => ({ ...prev, isDeleting: true }));

    try {
      await appointmentAPI.deleteSlot(slotId);
      setSlots((prev) => prev.filter((slot) => slot.slotId !== slotId));
      toast.success("Slot deleted successfully");
      setDeleteConfirmation({ isOpen: false, slotId: null, isDeleting: false });
    } catch (error) {
      console.error("Failed to delete slot:", error);
      toast.error("Failed to delete slot");
      setDeleteConfirmation((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, slotId: null, isDeleting: false });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredSlots = selectedClinicFilter
    ? slots.filter((slot) => slot.clinicId === selectedClinicFilter)
    : slots;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clinics Section */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between gap-4">
            <Card.Title>Your Clinics</Card.Title>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateClinicModalOpen(true)}
            >
              + Add Clinic
            </Button>
          </div>
        </Card.Header>
        <Card.Content className="space-y-4">
          {clinics.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No clinics yet</p>
              <p className="text-sm mb-4">
                Start by creating your first clinic to begin managing
                appointments
              </p>
              <Button
                variant="primary"
                onClick={() => setIsCreateClinicModalOpen(true)}
              >
                Create First Clinic
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clinics.map((clinic) => (
                <div
                  key={clinic.clinicId}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      {clinic.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Address:</span>{" "}
                      {clinic.addressLine}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">City:</span> {clinic.city},{" "}
                      {clinic.state} {clinic.pincode}
                    </p>
                    {clinic.phone && (
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Phone:</span>{" "}
                        {clinic.phone}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-blue-600 pt-2">
                      ₹{clinic.consultationFee} consultation fee
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>

      {/* Slots Section */}
      {clinics.length > 0 && (
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Card.Title>Appointment Slots</Card.Title>
              <div className="flex items-center gap-3">
                <select
                  value={selectedClinicFilter || ""}
                  onChange={(e) =>
                    setSelectedClinicFilter(
                      e.target.value ? parseInt(e.target.value) : null,
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Clinics</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.clinicId} value={clinic.clinicId}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCreateSlotModalOpen(true)}
                >
                  + Create Slot
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="space-y-4">
            {filteredSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">No slots created yet</p>
                <p className="text-sm">
                  Create appointment slots to allow patients to book
                  appointments with you
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSlots.map((slot) => {
                  const clinic = clinics.find(
                    (c) => c.clinicId === slot.clinicId,
                  );
                  return (
                    <div
                      key={slot.slotId}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {clinic?.name || "Unknown Clinic"}
                          </h3>
                          {slot.isBooked ? (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                              Booked
                            </span>
                          ) : (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Available
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">📅 Date:</span>{" "}
                          {formatDate(slot.slotStartUtc)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">⏰ Time:</span>{" "}
                          {new Date(slot.slotStartUtc).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}{" "}
                          -{" "}
                          {new Date(slot.slotEndUtc).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                      {!slot.isBooked && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteSlot(slot.slotId)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Modals */}
      <CreateClinicModal
        isOpen={isCreateClinicModalOpen}
        onClose={() => setIsCreateClinicModalOpen(false)}
        onClinicCreated={handleClinicCreated}
      />
      <CreateSlotModal
        isOpen={isCreateSlotModalOpen}
        onClose={() => setIsCreateSlotModalOpen(false)}
        clinics={clinics}
        onSlotCreated={handleSlotCreated}
      />
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        title="Delete Appointment Slot"
        message="Are you sure you want to delete this appointment slot? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={deleteConfirmation.isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default SchedulePage;
