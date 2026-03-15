// Patient Data
export const patientData = {
  name: "Emma Richardson",
  id: "EM-9241",
  initials: "E",
  age: "28",
  gender: "Female",
  bloodGroup: "Blood: A+",
};

// Appointments Data
export const upcomingAppts = [
  {
    id: 1,
    day: "14",
    month: "Mar",
    doctor: "Dr. Sarah Chen",
    type: "Cardiology · Follow-up",
    time: "10:00 AM · City Heart Clinic",
    status: "confirmed",
  },
  {
    id: 2,
    day: "22",
    month: "Mar",
    doctor: "Lab Draw – Quest Diagnostics",
    type: "Blood Panel · Fasting Required",
    time: "09:00 AM · Downtown Branch",
    status: "pending",
  },
  {
    id: 3,
    day: "03",
    month: "Apr",
    doctor: "Dr. Mehmet Yilmaz",
    type: "Echocardiogram",
    time: "02:30 PM · St. Mary's Hospital",
    status: "confirmed",
  },
];

export const pastAppts = [
  {
    id: 4,
    day: "05",
    month: "Mar",
    doctor: "Dr. Sarah Chen",
    type: "Cardiology · Check-up",
    time: "11:00 AM",
    status: "completed",
  },
  {
    id: 5,
    day: "18",
    month: "Feb",
    doctor: "Dr. Anita Rao",
    type: "General Physician · Cold",
    time: "09:30 AM",
    status: "completed",
  },
  {
    id: 6,
    day: "02",
    month: "Feb",
    doctor: "Lab Draw – LabCorp",
    type: "Lipid Panel",
    time: "08:00 AM",
    status: "completed",
  },
];

// Prescriptions Data
export const prescriptions = [
  {
    id: 1,
    name: "Metoprolol",
    dose: "50mg · Twice daily",
    refills: 2,
    icon: "💙",
    status: "ok",
    prescribed: "Dr. Sarah Chen",
  },
  {
    id: 2,
    name: "Atorvastatin",
    dose: "20mg · Nightly",
    refills: 1,
    icon: "🟡",
    status: "low",
    prescribed: "Dr. Sarah Chen",
  },
  {
    id: 3,
    name: "Aspirin (Low-dose)",
    dose: "81mg · With lunch",
    refills: 5,
    icon: "🔴",
    status: "ok",
    prescribed: "Dr. Sarah Chen",
  },
  {
    id: 4,
    name: "Vitamin D3",
    dose: "2000 IU · Daily",
    refills: 3,
    icon: "☀️",
    status: "ok",
    prescribed: "Dr. Anita Rao",
  },
];

// Documents Data
export const documents = [
  {
    id: 1,
    name: "Lipid Panel Results",
    meta: "Mar 05, 2026 · Dr. Chen",
    size: "284 KB",
    icon: "🧪",
    color: "rgb(219, 234, 254)",
  },
  {
    id: 2,
    name: "Echocardiogram Report",
    meta: "Jan 12, 2026 · St. Mary's",
    size: "1.2 MB",
    icon: "🫀",
    color: "rgb(254, 226, 226)",
  },
  {
    id: 3,
    name: "Discharge Summary",
    meta: "Nov 28, 2025",
    size: "540 KB",
    icon: "📋",
    color: "rgb(254, 243, 199)",
  },
  {
    id: 4,
    name: "Insurance Pre-auth Letter",
    meta: "Jan 03, 2026",
    size: "120 KB",
    icon: "📄",
    color: "rgb(224, 231, 255)",
  },
];

// Messages Data
export const messages = [
  {
    id: 1,
    sender: "Dr. Sarah Chen",
    preview:
      "Your lipid panel results look excellent! LDL down to 182. Keep up the great work...",
    time: "2h ago",
    unread: true,
    color: "from-blue-400 to-blue-600",
    initials: "SC",
  },
  {
    id: 2,
    sender: "City Heart Clinic",
    preview:
      "Reminder: Your appointment on March 14 is confirmed at 10:00 AM. Please arrive 15 min early.",
    time: "1d ago",
    unread: true,
    color: "from-emerald-400 to-teal-500",
    initials: "CH",
  },
  {
    id: 3,
    sender: "Dr. Mehmet Yilmaz",
    preview:
      "Your echocardiogram is scheduled. Please avoid caffeine 24 hours before the test.",
    time: "3d ago",
    unread: false,
    color: "from-purple-400 to-purple-600",
    initials: "MY",
  },
];

// Care Team Data
export const careTeam = [
  {
    name: "Dr. Sarah Chen",
    spec: "Cardiologist · Primary",
    initials: "SC",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    name: "Dr. Mehmet Yilmaz",
    spec: "Cardiologist · Imaging",
    initials: "MY",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
  },
  {
    name: "Dr. Anita Rao",
    spec: "General Physician",
    initials: "AR",
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  {
    name: "Nurse Linda Park",
    spec: "Care Coordinator",
    initials: "LP",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
];

// Bills Data
export const bills = [
  {
    name: "Cardiology Consultation",
    date: "Mar 05, 2026",
    amount: "$120.00",
    status: "paid",
  },
  {
    name: "Lipid Panel Lab Test",
    date: "Mar 05, 2026",
    amount: "$85.50",
    status: "paid",
  },
  {
    name: "Echocardiogram (upcoming)",
    date: "Apr 03, 2026",
    amount: "$340.00",
    status: "due",
  },
  {
    name: "Insurance Copay – Feb Visit",
    date: "Feb 18, 2026",
    amount: "$30.00",
    status: "overdue",
  },
];
