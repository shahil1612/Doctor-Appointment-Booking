import { useState, useEffect } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

const SlotSelectionPage = ({ doctor, clinic, onBookingComplete, onBack }) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Slot, 2: Enter Reason

  // Fetch slots when page loads
  useEffect(() => {
    const fetchSlots = async () => {
      setSlotsLoading(true);
      try {
        const data = await appointmentAPI.getAvailableSlots(
          doctor.doctorUserId,
          clinic.clinicId,
        );
        console.log("✅ Available Slots Response:", data);
        setSlots(data || []);
        if (!data || data.length === 0) {
          toast.error("No available slots for this clinic");
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch available slots");
        console.error("❌ Error fetching slots:", error);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [doctor.doctorUserId, clinic.clinicId]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setStep(2);
  };

  const handleBookAppointment = async () => {
    if (!reason.trim() || reason.length < 5) {
      toast.error("Please provide a reason (at least 5 characters)");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        doctorUserId: doctor.doctorUserId,
        slotId: selectedSlot.slotId,
        reason: reason.trim(),
      };

      await appointmentAPI.createAppointment(payload);
      toast.success("Appointment booked successfully!");
      onBookingComplete?.();
    } catch (error) {
      toast.error(error.message || "Failed to book appointment");
      console.error("Error booking appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setReason("");
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle={`Dr. ${doctor.fullName} at ${clinic.name}`}>
            {step === 1 ? "Select Appointment Slot" : "Confirm Your Booking"}
          </Card.Title>
        </Card.Header>

        <Card.Content className="space-y-4">
          {/* Booking Context Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold text-gray-800">📋 Booking Details:</p>
              <p>
                <strong>Doctor:</strong> Dr. {doctor.fullName} (
                {doctor.specialization})
              </p>
              <p>
                <strong>Clinic:</strong> {clinic.name}, {clinic.city}
              </p>
              {clinic.consultationFee && (
                <p>
                  <strong>Fee:</strong> ₹{clinic.consultationFee}
                </p>
              )}
            </div>
          </div>

          {/* Step 1: Slot Selection */}
          {step === 1 && (
            <div className="space-y-4">
              {slotsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No available slots for this clinic
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Available Time Slots
                  </h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {slots.map((slot) => {
                      const slotDate = new Date(slot.slotStartUtc);
                      const timeStr = slotDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const dateStr = slotDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });

                      return (
                        <button
                          key={slot.slotId}
                          onClick={() => handleSelectSlot(slot)}
                          className="w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">
                                📅 {dateStr}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                🕐 {timeStr}
                              </p>
                            </div>
                            <div className="text-2xl">→</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={handleBack}>
                  ← Back
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Reason Entry */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-800 mb-2">
                  ✓ Slot Selected
                </p>
                <p className="text-sm text-gray-700">
                  {new Date(selectedSlot?.slotStartUtc).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Why do you need this appointment? *
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your health concern or reason for the appointment (at least 5 characters)"
                  maxLength={500}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {reason.length}/500 characters
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleBookAppointment}
                  disabled={isSubmitting || reason.length < 5}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default SlotSelectionPage;
