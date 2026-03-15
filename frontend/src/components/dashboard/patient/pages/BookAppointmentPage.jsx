import { useState } from "react";
import DoctorDiscoveryPage from "./DoctorDiscoveryPage";
import DoctorDetailsPage from "./DoctorDetailsPage";
import SlotSelectionPage from "./SlotSelectionPage";

const BookAppointmentPage = ({ onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState("discovery"); // discovery, details, slots
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep("details");
  };

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setCurrentStep("slots");
  };

  const handleBackToDiscovery = () => {
    setSelectedDoctor(null);
    setSelectedClinic(null);
    setCurrentStep("discovery");
  };

  const handleBackToDetails = () => {
    setSelectedClinic(null);
    setCurrentStep("details");
  };

  return (
    <>
      {currentStep === "discovery" && (
        <DoctorDiscoveryPage onDoctorSelect={handleDoctorSelect} />
      )}

      {currentStep === "details" && (
        <DoctorDetailsPage
          doctor={selectedDoctor}
          onClinicSelect={handleClinicSelect}
          onBack={handleBackToDiscovery}
        />
      )}

      {currentStep === "slots" && (
        <SlotSelectionPage
          doctor={selectedDoctor}
          clinic={selectedClinic}
          onBookingComplete={onBookingComplete}
          onBack={handleBackToDetails}
        />
      )}
    </>
  );
};

export default BookAppointmentPage;
