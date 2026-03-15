import Card from "../../ui/Card";
import Button from "../../ui/Button";

const DoctorDetailsPage = ({ doctor, onClinicSelect, onBack }) => {
  if (!doctor) {
    return null;
  }

  const handleClinicSelect = (clinic) => {
    console.log("📍 Clinic selected:", clinic);
    onClinicSelect(clinic);
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Review doctor profile and select clinic">
            Doctor Profile
          </Card.Title>
        </Card.Header>

        <Card.Content className="space-y-6">
          {/* Doctor Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-semibold text-white flex-shrink-0">
                {doctor.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  Dr. {doctor.fullName}
                </h2>
                <p className="text-base text-blue-700 font-semibold mt-1">
                  {doctor.specialization}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
                  <span>⭐ Rating: {doctor.rating.toFixed(1)}/5</span>
                  <span>•</span>
                  <span>📅 {doctor.yearsExperience} years experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {doctor.bio && (
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                About Doctor
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {doctor.bio}
              </p>
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Contact Information
            </h3>
            {doctor.email && (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span>📧</span>
                <span>{doctor.email}</span>
              </div>
            )}
            {doctor.phone && (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span>📱</span>
                <span>{doctor.phone}</span>
              </div>
            )}
          </div>

          {/* Clinic Selection */}
          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Select Clinic & Book Slot
            </h3>

            {doctor.clinics && doctor.clinics.length > 0 ? (
              <div className="space-y-3">
                {doctor.clinics.map((clinic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleClinicSelect(clinic)}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {clinic.name}
                        </h4>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <p>📍 {clinic.address}</p>
                          <p>
                            🏙️ {clinic.city}, {clinic.state}
                          </p>
                        </div>
                        {clinic.consultationFee && (
                          <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Consultation Fee: ₹{clinic.consultationFee}
                          </div>
                        )}
                      </div>
                      <div className="text-3xl">→</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  No clinics available for this doctor
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onBack}>
              ← Back to Doctors
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default DoctorDetailsPage;
