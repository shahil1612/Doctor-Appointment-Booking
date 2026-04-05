# 🏥 Sehat - Doctor Appointment Booking System

<div align="center">

<img src="frontend/public/sehat-logo.png" alt="Sehat Logo" width="150" />

**A modern, full-stack healthcare appointment management system**

[![.NET 8.0](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-008CDD?logo=stripe)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Key Features Implementation](#-key-features-implementation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## 🌟 Overview

**Sehat** is a comprehensive healthcare appointment management system that bridges the gap between patients and healthcare providers. Built with modern technologies and best practices, it provides a seamless experience for booking, managing, and tracking medical appointments.

### Why Sehat?

- **Patient-Centric Design**: Intuitive interface for easy appointment booking and management
- **Doctor Efficiency**: Streamlined workflow for managing appointments, prescriptions, and patient records
- **Secure Payments**: Integrated Stripe payment gateway with INR support
- **Document Management**: Secure upload and access to medical documents
- **Location-Based Search**: Find doctors near you with interactive map integration

---

## ✨ Features

### 👨‍⚕️ For Doctors

- **Profile Management**
  - Complete profile with specialization, qualifications, and experience
  - Multiple clinic management with individual consultation fees
  - Availability schedule configuration

- **Appointment Management**
  - View and manage all appointments (pending, approved, completed)
  - Approve, decline, or cancel appointments
  - Mark appointments as completed
  - View patient history and medical documents

- **Prescription Management**
  - Create digital prescriptions with medications and dosages
  - View prescription history
  - Download prescriptions as PDF

- **Financial Dashboard**
  - Real-time earnings tracking
  - Monthly revenue analytics
  - Transaction history with refund management
  - Automated refund processing on cancellations

- **Slot Management**
  - Create flexible appointment slots
  - Define working hours across multiple clinics
  - Automatic slot availability updates

### 👤 For Patients

- **Easy Registration & Authentication**
  - Secure JWT-based authentication
  - Profile management with medical history

- **Doctor Discovery**
  - Search doctors by specialization, location, or name
  - Interactive map view with nearby doctors
  - Detailed doctor profiles with ratings and reviews

- **Appointment Booking**
  - Real-time slot availability
  - Integrated payment processing
  - Appointment reason specification
  - Instant booking confirmation

- **Appointment Tracking**
  - Dashboard with upcoming and past appointments
  - Status tracking (Pending → Approved → Completed)
  - Appointment cancellation with refund

- **Medical Documents**
  - Upload and manage medical documents
  - Share documents with doctors
  - Secure document storage

- **Prescriptions**
  - Access digital prescriptions
  - Download and print prescriptions
  - Prescription history

### 💳 Payment Integration

- **Stripe Payment Gateway**
  - Support for INR (Indian Rupees) payments
  - Secure payment processing
  - Automatic refund on cancellation
  - Payment history and receipts

---

## 🛠 Tech Stack

### Backend

- **Framework**: ASP.NET Core 8.0 Web API
- **Database**: MySQL 8.0 with Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: BCrypt
- **Payment Gateway**: Stripe.NET SDK
- **Logging**: NLog
- **API Documentation**: Swagger/OpenAPI
- **Architecture**: Clean Architecture with Repository Pattern

### Frontend

- **Framework**: React 19.2
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS 4.2
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion
- **Maps**: React Leaflet
- **Payment UI**: Stripe React Components
- **Notifications**: React Hot Toast

### DevOps & Tools

- **Version Control**: Git & GitHub
- **API Testing**: Swagger UI
- **Development**: Hot Reload (Vite + dotnet watch)

---

## 🏗 Architecture

### Backend Architecture

```
backend/
├── Controllers/          # API Endpoints
├── Services/            # Business Logic Layer
├── Repositories/        # Data Access Layer
├── Models/             # Entity Models (TBL01-TBL11)
├── DTOs/               # Data Transfer Objects
├── Middleware/         # Custom Middleware (Auth, Logging, Exception)
├── Extensions/         # Extension Methods
├── Mapping/            # Object Mapping (IReflectionMapper)
├── Data/              # DbContext
└── Exceptions/        # Custom Exceptions
```

**Design Patterns Used**:
- Repository Pattern
- Dependency Injection
- DTO Pattern
- Middleware Pipeline
- Factory Pattern (Workflow States)

### Frontend Architecture

```
frontend/src/
├── components/
│   ├── dashboard/      # Dashboard components (Patient/Doctor)
│   ├── ui/            # Reusable UI components
│   ├── auth/          # Authentication components
│   └── home/          # Landing page components
├── services/          # API service layer
├── store/            # Redux store & slices
├── assets/           # Static assets
└── utils/            # Utility functions
```

**State Management**:
- Redux Toolkit for global state
- React hooks for local state
- Persistent auth state in localStorage

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **.NET SDK** (8.0 or higher)
- **MySQL** (8.0 or higher)
- **Stripe Account** (for payment integration)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahil16-12/Doctor-Appointment-Booking.git
   cd Doctor-Appointment-Booking/backend
   ```

2. **Install dependencies**
   ```bash
   dotnet restore
   ```

3. **Configure database connection**
   
   Create `appsettings.json` from `appsettingsexample.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=doctor_appointment_db;User=root;Password=yourpassword;"
     },
     "JwtSettings": {
       "SecretKey": "your-256-bit-secret-key-here",
       "Issuer": "SehatAPI",
       "Audience": "SehatClient",
       "ExpiryMinutes": 1440
     },
     "StripeSettings": {
       "SecretKey": "sk_test_...",
       "PublishableKey": "pk_test_...",
       "Currency": "inr"
     }
   }
   ```

4. **Set up the database**
   
   Run the SQL scripts to create tables:
   ```bash
   mysql -u root -p doctor_appointment_db < database_schema.sql
   ```

5. **Run the backend**
   ```bash
   dotnet run
   ```
   
   Backend will be available at `https://localhost:7092`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` from `.env.example`:
   ```env
   VITE_API_BASE_URL=https://localhost:7092/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **Run the frontend**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:5173`

### Database Setup

**Manual Table Creation**: Run the following SQL scripts in order:

1. `users_and_doctors_tables.sql` - Users, Doctors, Patients tables
2. `clinics_and_slots_tables.sql` - Clinics and Appointment Slots
3. `appointments_table.sql` - Appointments table
4. `prescriptions_table.sql` - Prescriptions table
5. `medical_documents_table.sql` - Medical Documents table
6. `payment_tables.sql` - Payments and Refunds tables

Or create a consolidated schema file with all tables.

---

## 🔐 Environment Variables

### Backend (`appsettings.json`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DefaultConnection` | MySQL connection string | `Server=localhost;Database=...` |
| `JwtSettings:SecretKey` | JWT signing key (256-bit) | `your-secret-key-here` |
| `JwtSettings:ExpiryMinutes` | Token expiry duration | `1440` (24 hours) |
| `StripeSettings:SecretKey` | Stripe secret key | `sk_test_...` |
| `StripeSettings:PublishableKey` | Stripe publishable key | `pk_test_...` |
| `StripeSettings:Currency` | Payment currency | `inr` or `usd` |

### Frontend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://localhost:7092/api` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |

---

## 📚 API Documentation

### Authentication

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "1234567890",
  "dob": "1990-01-01",
  "gender": "MALE",
  "userType": "PATIENT"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "userType": "PATIENT",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

### Appointments

#### Get Available Doctors
```http
GET /api/appointments/available-doctors?specialization=Cardiology
Authorization: Bearer {token}
```

#### Get Available Slots
```http
GET /api/appointments/available-slots?doctorUserId=5&clinicId=2
Authorization: Bearer {token}
```

#### Create Payment Intent
```http
POST /api/payments/create-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "doctorUserId": 5,
  "slotId": 123,
  "reason": "Regular checkup"
}
```

#### Confirm Payment and Book Appointment
```http
POST /api/payments/confirm
Authorization: Bearer {token}
Content-Type: application/json

{
  "paymentIntentId": "pi_...",
  "doctorUserId": 5,
  "slotId": 123,
  "reason": "Regular checkup"
}
```

#### Get My Appointments
```http
GET /api/appointments/my-appointments
Authorization: Bearer {token}
```

#### Complete Appointment (Doctor)
```http
PUT /api/appointments/{appointmentId}/complete
Authorization: Bearer {token}
```

### Prescriptions

#### Create Prescription
```http
POST /api/prescriptions
Authorization: Bearer {token}
Content-Type: application/json

{
  "appointmentId": 123,
  "diagnosis": "Common cold",
  "medications": "Paracetamol 500mg - 1 tablet twice daily",
  "notes": "Rest and drink plenty of fluids"
}
```

#### Get Prescription
```http
GET /api/prescriptions/{prescriptionId}
Authorization: Bearer {token}
```

### Medical Documents

#### Upload Document
```http
POST /api/medicaldocuments
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "file": <binary>,
  "documentType": "LAB_REPORT",
  "description": "Blood test results"
}
```

#### Get My Documents
```http
GET /api/medicaldocuments/patient/my-documents
Authorization: Bearer {token}
```

#### Download Document
```http
GET /api/medicaldocuments/{documentId}/download
Authorization: Bearer {token}
```

### Payments

#### Get Doctor Earnings
```http
GET /api/payments/earnings
Authorization: Bearer {token}
```

**Response**:
```json
{
  "totalEarnings": 50000.00,
  "thisMonthEarnings": 15000.00,
  "pendingPayouts": 5000.00,
  "totalCompletedAppointments": 100,
  "thisMonthCompletedAppointments": 30,
  "recentTransactions": [...]
}
```

#### Refund Payment
```http
POST /api/payments/refund/{appointmentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Appointment cancelled by doctor"
}
```

For complete API documentation, visit `/swagger` when running the backend.

---

## 🗄 Database Schema

### Key Tables

| Table | Description | Key Fields |
|-------|-------------|------------|
| **users** (TBL01) | User accounts | id, user_type, full_name, email, password_hash |
| **patients** (TBL02) | Patient details | id, user_id, emergency_contact, allergies, blood_group |
| **doctors** (TBL03) | Doctor profiles | id, user_id, specialization, qualification, experience |
| **appointments** (TBL04) | Appointments | id, patient_user_id, doctor_user_id, status, appointment_at_utc |
| **clinics** (TBL05) | Clinic information | id, name, address, latitude, longitude |
| **doctor_clinics** (TBL06) | Doctor-clinic mapping | id, doctor_user_id, clinic_id, consultation_fee |
| **appointment_slots** (TBL07) | Available slots | id, doctor_user_id, clinic_id, slot_start_utc, is_booked |
| **prescriptions** (TBL08) | Prescriptions | id, appointment_id, diagnosis, medications |
| **medical_documents** (TBL09) | Patient documents | id, patient_user_id, document_type, file_path |
| **payments** (TBL10) | Payment records | id, appointment_id, amount_cents, currency, status |
| **refunds** (TBL11) | Refund records | id, payment_id, refund_amount_cents, status |

### Relationships

- **One-to-One**: User ↔ Patient/Doctor
- **One-to-Many**: Doctor → Appointments, Patient → Appointments
- **Many-to-Many**: Doctor ↔ Clinics (through doctor_clinics)
- **One-to-One**: Appointment ↔ Payment, Appointment ↔ Prescription

---

## 📁 Project Structure

```
Doctor-Appointment-Booking/
│
├── backend/                      # ASP.NET Core Web API
│   ├── Controllers/             # API Controllers
│   │   ├── AuthController.cs
│   │   ├── AppointmentsController.cs
│   │   ├── DoctorController.cs
│   │   ├── PatientController.cs
│   │   ├── PrescriptionsController.cs
│   │   ├── MedicalDocumentsController.cs
│   │   └── PaymentsController.cs
│   │
│   ├── Services/                # Business Logic
│   │   ├── IAuthService.cs
│   │   ├── AuthService.cs
│   │   ├── IAppointmentService.cs
│   │   ├── AppointmentService.cs
│   │   ├── IPaymentService.cs
│   │   └── PaymentService.cs
│   │
│   ├── Repositories/            # Data Access
│   │   ├── IUserRepository.cs
│   │   ├── UserRepository.cs
│   │   ├── IAppointmentRepository.cs
│   │   └── AppointmentRepository.cs
│   │
│   ├── Models/                  # Entity Models
│   │   ├── TBL01.cs (Users)
│   │   ├── TBL02.cs (Patients)
│   │   ├── TBL03.cs (Doctors)
│   │   └── ...
│   │
│   ├── DTOs/                    # Data Transfer Objects
│   │   ├── LoginRequest.cs
│   │   ├── SignupRequest.cs
│   │   ├── AppointmentResponse.cs
│   │   └── ...
│   │
│   ├── Middleware/              # Custom Middleware
│   │   ├── GlobalExceptionMiddleware.cs
│   │   ├── RequestLoggingMiddleware.cs
│   │   └── UserContextMiddleware.cs
│   │
│   ├── Data/                    # DbContext
│   │   └── ApplicationDbContext.cs
│   │
│   └── Program.cs               # Application entry point
│
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── patient/
│   │   │   │   │   ├── pages/
│   │   │   │   │   │   ├── OverviewPage.jsx
│   │   │   │   │   │   ├── FindDoctorsPage.jsx
│   │   │   │   │   │   ├── AppointmentsPage.jsx
│   │   │   │   │   │   └── DocumentsPage.jsx
│   │   │   │   │   └── components/
│   │   │   │   │
│   │   │   │   └── doctor/
│   │   │   │       ├── pages/
│   │   │   │       │   ├── DashboardPage.jsx
│   │   │   │       │   ├── AppointmentsPage.jsx
│   │   │   │       │   ├── EarningsPage.jsx
│   │   │   │       │   └── SlotsPage.jsx
│   │   │   │       └── components/
│   │   │   │
│   │   │   ├── ui/              # Reusable UI Components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── Modal.jsx
│   │   │   │
│   │   │   ├── auth/            # Auth Components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   │
│   │   │   └── home/            # Landing Page
│   │   │       └── LandingPage.jsx
│   │   │
│   │   ├── services/            # API Services
│   │   │   └── api.js
│   │   │
│   │   ├── store/              # Redux Store
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       └── authSlice.js
│   │   │
│   │   └── App.jsx             # Root Component
│   │
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔑 Key Features Implementation

### 1. **JWT Authentication**

- Secure token-based authentication
- Token expiry management
- Role-based authorization (PATIENT, DOCTOR)
- Password hashing with BCrypt

### 2. **Appointment State Machine**

```
PENDING → APPROVED → COMPLETED
   ↓          ↓
DECLINED   CANCELLED
```

- Workflow-based state management
- Validation at each state transition
- Automatic slot release on cancellation

### 3. **Payment Integration**

- **Stripe Payment Intent API**
- Support for INR (Indian Rupees)
- Automatic consultation fee calculation
- Secure payment confirmation
- Automatic refund processing

### 4. **File Upload System**

- Multipart form data handling
- File type validation (PDF, JPG, PNG)
- Secure file storage
- Document download with authorization

### 5. **Real-Time Slot Management**

- Dynamic slot creation
- Automatic booking status update
- Conflict prevention
- Multi-clinic support

### 6. **Location-Based Search**

- Leaflet map integration
- Haversine formula for distance calculation
- Geolocation API
- Interactive clinic markers

---

## 📸 Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Patient Dashboard
![Patient Dashboard](docs/screenshots/patient-dashboard.png)

### Doctor Dashboard
![Doctor Dashboard](docs/screenshots/doctor-dashboard.png)

### Appointment Booking
![Appointment Booking](docs/screenshots/booking.png)

### Payment Integration
![Payment](docs/screenshots/payment.png)

---

## 🧪 Testing

### Backend Testing

```bash
cd backend
dotnet test
```

### Frontend Testing

```bash
cd frontend
npm run test
```

### API Testing

Use Swagger UI at `https://localhost:7092/swagger` or import the Postman collection.

---

## 👨‍💻 Author

**Sahil**
- GitHub: [@sahil16-12](https://github.com/sahil16-12)
- Repository: [Doctor-Appointment-Booking](https://github.com/sahil16-12/Doctor-Appointment-Booking)

---

## 🙏 Acknowledgments

- [Stripe](https://stripe.com/) - Payment processing
- [React Leaflet](https://react-leaflet.js.org/) - Map integration
- [Tailwind CSS](https://tailwindcss.com/) - UI styling
- [ASP.NET Core](https://dotnet.microsoft.com/) - Backend framework

---

## 📞 Support

For support, email sahil16december@gmail.com or create an issue in this repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Sahil](https://github.com/sahil16-12)

</div>
