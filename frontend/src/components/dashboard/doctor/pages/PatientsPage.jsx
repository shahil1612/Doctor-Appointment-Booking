import { useState, useEffect } from "react";
import { doctorAPI } from "../../../../services/api.js";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import PatientProfileModal from "../components/PatientProfileModal";
import toast from "react-hot-toast";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const data = await doctorAPI.getPatients();

        // Transform backend response to match expected format
        const transformed = data.map((patient) => ({
          id: patient.userId,
          userId: patient.userId,
          name: patient.fullName || "Unknown Patient",
          fullName: patient.fullName,
          email: patient.email,
          phone: patient.phone,
          dob: patient.dob,
          bloodGroup: patient.bloodGroup,
          heightCm: patient.heightCm,
          weightKg: patient.weightKg,
          allergies: patient.allergies,
          chronicConditions: patient.chronicConditions,
          emergencyContact: patient.emergencyContact,
          appointmentCount: patient.appointmentCount || 0,
          lastAppointmentDate: patient.lastAppointmentDate,
          lastVisit: patient.lastAppointmentDate
            ? new Date(patient.lastAppointmentDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )
            : "N/A",
        }));

        setPatients(transformed);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        toast.error("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search patients by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patients List */}
      {filteredPatients.length === 0 ? (
        <Card>
          <Card.Content className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No patients found</p>
            <p className="text-sm">
              Your patients will appear here once they book appointments with
              you
            </p>
          </Card.Content>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="hover:shadow-md transition-all rounded-xl"
            >
              <Card.Content className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {patient.name}
                  </h3>
                  <Badge variant="confirmed" className="text-xs">
                    {patient.appointmentCount}{" "}
                    {patient.appointmentCount === 1 ? "visit" : "visits"}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {patient.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Phone:</span>{" "}
                    {patient.phone || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Blood Group:
                    </span>{" "}
                    {patient.bloodGroup || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Last Visit:
                    </span>{" "}
                    {patient.lastVisit}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedPatient(patient);
                    setIsModalOpen(true);
                  }}
                >
                  View Profile
                </Button>
              </Card.Content>
            </Card>
          ))}
        </div>
      )}

      {/* Patient Profile Modal */}
      <PatientProfileModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientsPage;
