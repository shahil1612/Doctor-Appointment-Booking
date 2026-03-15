import { useState, useEffect } from "react";
import { appointmentAPI } from "../../../../services/api.js";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

const DoctorDiscoveryPage = ({ onDoctorSelect }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch available doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await appointmentAPI.getAvailableDoctors();
        console.log("✅ Available Doctors Response:", data);
        setDoctors(data || []);
        if (!data || data.length === 0) {
          toast.error("No doctors available");
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch doctors");
        console.error("❌ Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter((doctor) => {
    const query = searchQuery.toLowerCase();
    return (
      doctor.fullName.toLowerCase().includes(query) ||
      doctor.specialization?.toLowerCase().includes(query) ||
      doctor.clinics?.some(
        (clinic) =>
          clinic.name.toLowerCase().includes(query) ||
          clinic.city.toLowerCase().includes(query),
      )
    );
  });

  const handleDoctorClick = (doctor) => {
    console.log("👤 Doctor selected:", doctor);
    onDoctorSelect(doctor);
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title subtitle="Find and book with your preferred doctor">
            Choose Your Doctor
          </Card.Title>
        </Card.Header>

        <Card.Content className="space-y-4">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search by doctor name, specialization, or clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {doctors.length === 0
                  ? "No doctors available at the moment"
                  : "No doctors match your search"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.doctorUserId}
                  onClick={() => handleDoctorClick(doctor)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="space-y-3">
                    {/* Doctor Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-lg font-semibold text-blue-600 flex-shrink-0">
                        {doctor.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          Dr. {doctor.fullName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {doctor.specialization}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>⭐ {doctor.rating.toFixed(1)}</span>
                          <span>•</span>
                          <span>{doctor.yearsExperience} years experience</span>
                        </div>
                      </div>
                      <div className="text-2xl">→</div>
                    </div>

                    {/* Clinics Info */}
                    {doctor.clinics && doctor.clinics.length > 0 && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">
                          Practices at:
                        </p>
                        <div className="space-y-1">
                          {doctor.clinics.map((clinic, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-gray-600 flex items-start"
                            >
                              <span className="mr-2">•</span>
                              <span>
                                {clinic.name}, {clinic.city}
                                {clinic.consultationFee && (
                                  <span className="ml-2 text-blue-600 font-semibold">
                                    ₹{clinic.consultationFee}
                                  </span>
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default DoctorDiscoveryPage;
