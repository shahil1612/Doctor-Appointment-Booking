# Implementation Documentation
## Sehat - Doctor Appointment Booking System

---

## Table of Contents
1. [Introduction](#1-introduction)
2. [Technology Stack](#2-technology-stack)
3. [System Architecture](#3-system-architecture)
4. [Database Design](#4-database-design)
5. [Backend Implementation](#5-backend-implementation)
6. [Frontend Implementation](#6-frontend-implementation)
7. [API Routes & Endpoints](#7-api-routes--endpoints)
8. [Security Implementation](#8-security-implementation)
9. [Key Features Implementation](#9-key-features-implementation)
10. [Design Patterns & Best Practices](#10-design-patterns--best-practices)

---

## 1. Introduction

### 1.1 Project Overview
**Sehat** is a comprehensive, full-stack healthcare appointment management system designed to bridge the gap between patients and healthcare providers. The platform facilitates seamless appointment booking, payment processing, prescription management, and medical document handling through a modern, secure web application.

### 1.2 Problem Statement
The healthcare industry faces significant challenges in appointment management:
- **Inefficient Booking Systems**: Manual or phone-based appointment scheduling leads to errors and delays
- **Payment Complications**: Lack of integrated payment solutions causes administrative overhead
- **Document Management Issues**: Physical medical records are difficult to share and maintain
- **Limited Doctor Discovery**: Patients struggle to find qualified doctors in their vicinity
- **Communication Gaps**: Poor coordination between patients and healthcare providers

### 1.3 Solution
Sehat addresses these challenges by providing:
- **Digital Appointment Management**: Real-time slot availability and instant booking confirmation
- **Integrated Payment Gateway**: Secure online payments through Stripe with automatic refund processing
- **Electronic Health Records**: Digital document upload, storage, and sharing capabilities
- **Location-Based Search**: Geographic distance calculation to find nearby doctors
- **Role-Based Dashboards**: Customized interfaces for patients and doctors
- **Digital Prescriptions**: Paperless prescription creation and management

### 1.4 Project Scope
The system encompasses:
- User registration and authentication (Patients and Doctors)
- Doctor profile management with multi-clinic support
- Real-time appointment slot management
- Payment processing with Stripe integration
- Digital prescription issuance
- Medical document upload and storage
- Location-based doctor discovery
- Financial tracking for healthcare providers
- Responsive web interface

---

## 2. Technology Stack

### 2.1 Backend Technologies

#### Framework & Language
- **ASP.NET Core 8.0**: Latest LTS version of Microsoft's cross-platform web framework
- **C# 12**: Modern object-oriented programming language with null safety features
- **Entity Framework Core 8.0**: Object-Relational Mapper (ORM) for database operations

#### Database
- **MySQL 8.0**: Open-source relational database management system
- **Pomelo.EntityFrameworkCore.MySql 8.0**: MySQL provider for Entity Framework Core

#### Authentication & Security
- **JWT (JSON Web Tokens)**: Stateless authentication mechanism
- **BCrypt.Net-Next 4.0.3**: Password hashing algorithm with salt generation
- **Microsoft.AspNetCore.Authentication.JwtBearer 8.0**: JWT authentication middleware

#### Payment Processing
- **Stripe.NET SDK 51.0**: Official Stripe library for payment integration
- Supports payment intents, refunds, and webhook handling

#### Logging & Monitoring
- **NLog.Web.AspNetCore 6.1.1**: Structured logging framework
- Console and file-based logging with correlation IDs

#### API Documentation
- **Swashbuckle.AspNetCore 6.6.2**: OpenAPI/Swagger documentation generator
- Interactive API testing interface

### 2.2 Frontend Technologies

#### Framework & Build Tools
- **React 19.2**: Modern JavaScript library for building user interfaces
- **Vite 7.3.1**: Next-generation frontend build tool with lightning-fast HMR
- **@vitejs/plugin-react-swc 4.2.2**: SWC-based React plugin for faster compilation

#### Styling & UI
- **Tailwind CSS 4.2.1**: Utility-first CSS framework for rapid UI development
- **@tailwindcss/vite 4.2.1**: Vite plugin for Tailwind CSS
- **Framer Motion 12.34.5**: Production-ready animation library
- **Lucide React 0.576.0**: Beautiful, consistent icon library

#### State Management
- **Redux Toolkit 2.11.2**: Official Redux toolset for efficient state management
- **React Redux 9.2.0**: Official React bindings for Redux

#### Routing
- **React Router DOM 7.13.1**: Declarative routing for React applications

#### Maps & Geolocation
- **React Leaflet 5.0.0**: React components for Leaflet maps
- **Leaflet 1.9.4**: Open-source JavaScript library for interactive maps

#### Payment Integration
- **@stripe/react-stripe-js 6.1.0**: React components for Stripe Elements
- **@stripe/stripe-js 9.0.1**: Stripe.js wrapper for payment processing

#### Notifications & UX
- **React Hot Toast 2.6.0**: Lightweight notification library
- **React Type Animation 3.2.0**: Typewriter effect component
- **React Parallax Tilt 1.7.319**: 3D tilt effect for interactive elements

#### Development Tools
- **ESLint 9.39.1**: JavaScript linting tool
- **TypeScript Types**: Type definitions for React and React DOM

### 2.3 Development Environment
- **Node.js**: v18+ (JavaScript runtime)
- **.NET SDK**: 8.0 (Backend runtime)
- **MySQL Server**: 8.0 (Database server)
- **Git**: Version control system
- **Visual Studio Code**: Recommended IDE

---

## 3. System Architecture

### 3.1 Architectural Pattern
The system follows a **Layered (N-Tier) Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│     Presentation Layer (React)          │
│  - UI Components                        │
│  - Redux Store (State Management)       │
│  - API Service Layer                    │
└───────────────┬─────────────────────────┘
                │ HTTP/REST (JSON)
┌───────────────▼─────────────────────────┐
│     API Layer (Controllers)             │
│  - Request Validation                   │
│  - Response Formatting                  │
│  - Authorization Checks                 │
└───────────────┬─────────────────────────┘
                │ Method Calls
┌───────────────▼─────────────────────────┐
│     Business Logic Layer (Services)     │
│  - Business Rules Enforcement           │
│  - Workflow State Management            │
│  - Data Validation                      │
│  - External Service Integration         │
└───────────────┬─────────────────────────┘
                │ Data Operations
┌───────────────▼─────────────────────────┐
│     Data Access Layer (Repositories)    │
│  - CRUD Operations                      │
│  - Query Composition                    │
│  - Entity Framework Context             │
└───────────────┬─────────────────────────┘
                │ SQL Queries
┌───────────────▼─────────────────────────┐
│     Database Layer (MySQL)              │
│  - Data Persistence                     │
│  - Constraints & Relationships          │
│  - Indexes & Optimization               │
└─────────────────────────────────────────┘
```

### 3.2 Design Principles

#### Separation of Concerns
Each layer has a distinct responsibility:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and workflows
- **Repositories**: Manage data access and persistence
- **Models**: Define data structures and entities

#### Dependency Injection
All dependencies are injected through constructors, promoting:
- **Testability**: Easy to mock dependencies
- **Loose Coupling**: Components depend on abstractions, not implementations
- **Maintainability**: Changes to implementations don't affect consumers

#### Single Responsibility Principle
Each class has one reason to change:
- Controllers only handle HTTP concerns
- Services only contain business logic
- Repositories only perform data operations

### 3.3 Cross-Cutting Concerns

#### Middleware Pipeline
```
Request
   ↓
1. CorrelationIdMiddleware → Generate unique request ID
   ↓
2. RequestLoggingMiddleware → Log incoming requests
   ↓
3. GlobalExceptionMiddleware → Catch and handle exceptions
   ↓
4. Authentication → Validate JWT tokens
   ↓
5. UserContextMiddleware → Extract user claims
   ↓
6. Authorization → Check role-based permissions
   ↓
Controller Action
   ↓
Response
```

#### Logging Strategy
- **Structured Logging**: JSON-formatted logs with context
- **Correlation IDs**: Track requests across components
- **Log Levels**: Trace, Debug, Info, Warn, Error, Fatal
- **Destinations**: Console (development) and File (production)

---

## 4. Database Design

### 4.1 Database Schema Overview
The system uses **11 normalized tables** to store application data:

| Table Code | Table Name | Purpose |
|------------|------------|---------|
| TBL01 | users | Master user accounts with authentication |
| TBL02 | patients | Patient health profiles and personal data |
| TBL03 | doctors | Doctor credentials and professional information |
| TBL04 | appointments | Appointment booking records |
| TBL05 | clinics | Healthcare facility information |
| TBL06 | doctor_clinics | Many-to-many mapping of doctors to clinics |
| TBL07 | appointment_slots | Available consultation time slots |
| TBL08 | prescriptions | Digital prescription records |
| TBL09 | medical_documents | Patient medical document metadata |
| TBL10 | payments | Payment transaction records (Stripe) |
| TBL11 | refunds | Payment refund tracking |

### 4.2 Entity Relationships

#### One-to-One Relationships
- **User → Patient**: Each user can be one patient
- **User → Doctor**: Each user can be one doctor
- **Appointment → Payment**: Each appointment has one payment
- **Appointment → Prescription**: Each appointment can have one prescription

#### One-to-Many Relationships
- **User → Appointments** (as patient): One patient can have many appointments
- **User → Appointments** (as doctor): One doctor can handle many appointments
- **Doctor → AppointmentSlots**: One doctor can create many slots
- **Patient → MedicalDocuments**: One patient can upload many documents
- **Payment → Refunds**: One payment can have one refund

#### Many-to-Many Relationships
- **Doctors ↔ Clinics**: Doctors can work at multiple clinics, clinics can have multiple doctors (junction table: TBL06)

### 4.3 Detailed Table Structures

#### TBL01: users
**Purpose**: Central authentication and user management
```sql
CREATE TABLE users (
    L01F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L01F02 INT NOT NULL,                          -- user_type (1=PATIENT, 2=DOCTOR)
    L01F03 VARCHAR(100) NOT NULL,                 -- full_name
    L01F04 VARCHAR(100) UNIQUE NOT NULL,          -- email
    L01F05 VARCHAR(255) NOT NULL,                 -- password_hash (BCrypt)
    L01F06 VARCHAR(20),                           -- phone_number
    L01F07 DATETIME NOT NULL,                     -- created_at_utc
    L01F08 DATETIME,                              -- updated_at_utc
    INDEX idx_email (L01F04),
    INDEX idx_user_type (L01F02)
);
```

#### TBL02: patients
**Purpose**: Patient-specific health and personal information
```sql
CREATE TABLE patients (
    L02F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L02F02 INT UNIQUE NOT NULL,                   -- user_id (FK → users)
    L02F03 DATE,                                  -- date_of_birth
    L02F04 VARCHAR(20),                           -- gender
    L02F05 VARCHAR(5),                            -- blood_group (A+, O-, etc.)
    L02F06 INT,                                   -- height_cm
    L02F07 INT,                                   -- weight_kg
    L02F08 TEXT,                                  -- allergies
    L02F09 TEXT,                                  -- chronic_conditions
    L02F10 VARCHAR(100),                          -- emergency_contact_name
    L02F11 VARCHAR(20),                           -- emergency_contact_phone
    L02F12 TEXT,                                  -- address
    L02F13 VARCHAR(100),                          -- city
    L02F14 VARCHAR(100),                          -- state
    L02F15 VARCHAR(10),                           -- pincode
    L02F16 DECIMAL(10,8),                         -- latitude
    L02F17 DECIMAL(11,8),                         -- longitude
    FOREIGN KEY (L02F02) REFERENCES users(L01F01) ON DELETE CASCADE
);
```

#### TBL03: doctors
**Purpose**: Doctor professional credentials and profile
```sql
CREATE TABLE doctors (
    L03F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L03F02 INT UNIQUE NOT NULL,                   -- user_id (FK → users)
    L03F03 VARCHAR(100),                          -- specialization
    L03F04 VARCHAR(200),                          -- qualification (MBBS, MD, etc.)
    L03F05 VARCHAR(50),                           -- license_number
    L03F06 INT,                                   -- years_of_experience
    L03F07 TEXT,                                  -- bio
    L03F08 VARCHAR(500),                          -- profile_picture_url
    L03F09 BIGINT NOT NULL,                       -- consultation_fee_cents (default)
    L03F10 DECIMAL(3,2) DEFAULT 0.00,            -- avg_rating
    L03F11 INT DEFAULT 0,                         -- total_reviews
    FOREIGN KEY (L03F02) REFERENCES users(L01F01) ON DELETE CASCADE
);
```

#### TBL04: appointments
**Purpose**: Central appointment booking records
```sql
CREATE TABLE appointments (
    L04F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L04F02 INT NOT NULL,                          -- patient_user_id (FK → users)
    L04F03 INT NOT NULL,                          -- doctor_user_id (FK → users)
    L04F04 INT NOT NULL,                          -- slot_id (FK → appointment_slots)
    L04F05 DATETIME NOT NULL,                     -- appointment_at_utc
    L04F06 INT NOT NULL,                          -- status (1=PENDING, 2=APPROVED, 3=DECLINED, 4=CANCELLED, 5=COMPLETED)
    L04F07 TEXT,                                  -- reason
    L04F08 TEXT,                                  -- notes (patient)
    L04F09 TEXT,                                  -- doctor_notes
    L04F10 INT,                                   -- clinic_id (FK → clinics)
    L04F11 DATETIME NOT NULL,                     -- created_at_utc
    L04F12 DATETIME,                              -- updated_at_utc
    FOREIGN KEY (L04F02) REFERENCES users(L01F01),
    FOREIGN KEY (L04F03) REFERENCES users(L01F01),
    FOREIGN KEY (L04F04) REFERENCES appointment_slots(L07F01),
    FOREIGN KEY (L04F10) REFERENCES clinics(L05F01),
    INDEX idx_patient (L04F02),
    INDEX idx_doctor (L04F03),
    INDEX idx_status (L04F06)
);
```

#### TBL05: clinics
**Purpose**: Healthcare facility master data
```sql
CREATE TABLE clinics (
    L05F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L05F02 VARCHAR(200) NOT NULL,                 -- name
    L05F03 TEXT NOT NULL,                         -- address
    L05F04 VARCHAR(100),                          -- city
    L05F05 VARCHAR(100),                          -- state
    L05F06 VARCHAR(10),                           -- pincode
    L05F07 VARCHAR(20),                           -- phone_number
    L05F08 DECIMAL(10,8),                         -- latitude
    L05F09 DECIMAL(11,8),                         -- longitude
    L05F10 DATETIME NOT NULL,                     -- created_at_utc
);
```

#### TBL06: doctor_clinics
**Purpose**: Junction table for doctor-clinic many-to-many relationship
```sql
CREATE TABLE doctor_clinics (
    L06F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L06F02 INT NOT NULL,                          -- doctor_user_id (FK → users)
    L06F03 INT NOT NULL,                          -- clinic_id (FK → clinics)
    L06F04 BIGINT,                                -- consultation_fee_cents (override)
    L06F05 DATETIME NOT NULL,                     -- created_at_utc
    FOREIGN KEY (L06F02) REFERENCES users(L01F01),
    FOREIGN KEY (L06F03) REFERENCES clinics(L05F01),
    UNIQUE KEY unique_doctor_clinic (L06F02, L06F03)
);
```

#### TBL07: appointment_slots
**Purpose**: Available time slots for appointments
```sql
CREATE TABLE appointment_slots (
    L07F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L07F02 INT NOT NULL,                          -- doctor_user_id (FK → users)
    L07F03 INT NOT NULL,                          -- clinic_id (FK → clinics)
    L07F04 DATETIME NOT NULL,                     -- slot_start_utc
    L07F05 DATETIME NOT NULL,                     -- slot_end_utc
    L07F06 BOOLEAN DEFAULT FALSE,                 -- is_booked
    L07F07 DATETIME NOT NULL,                     -- created_at_utc
    FOREIGN KEY (L07F02) REFERENCES users(L01F01),
    FOREIGN KEY (L07F03) REFERENCES clinics(L05F01),
    INDEX idx_doctor_clinic_slot (L07F02, L07F03, L07F04)
);
```

#### TBL08: prescriptions
**Purpose**: Digital prescription records
```sql
CREATE TABLE prescriptions (
    L08F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L08F02 INT NOT NULL,                          -- appointment_id (FK → appointments)
    L08F03 TEXT,                                  -- diagnosis
    L08F04 TEXT,                                  -- medications
    L08F05 TEXT,                                  -- dosage
    L08F06 TEXT,                                  -- frequency
    L08F07 TEXT,                                  -- duration
    L08F08 TEXT,                                  -- instructions
    L08F09 DATETIME NOT NULL,                     -- created_at_utc
    FOREIGN KEY (L08F02) REFERENCES appointments(L04F01)
);
```

#### TBL09: medical_documents
**Purpose**: Patient medical document metadata
```sql
CREATE TABLE medical_documents (
    L09F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L09F02 INT NOT NULL,                          -- patient_user_id (FK → users)
    L09F03 VARCHAR(200),                          -- title
    L09F04 TEXT,                                  -- description
    L09F05 VARCHAR(255) NOT NULL,                 -- file_name
    L09F06 VARCHAR(500) NOT NULL,                 -- file_path
    L09F07 INT NOT NULL,                          -- file_size_bytes
    L09F08 VARCHAR(100),                          -- mime_type
    L09F09 DATETIME NOT NULL,                     -- uploaded_at_utc
    FOREIGN KEY (L09F02) REFERENCES users(L01F01)
);
```

#### TBL10: payments
**Purpose**: Stripe payment transaction records
```sql
CREATE TABLE payments (
    L10F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L10F02 INT,                                   -- appointment_id (FK → appointments)
    L10F03 VARCHAR(255) UNIQUE,                   -- stripe_payment_intent_id
    L10F04 BIGINT NOT NULL,                       -- amount_cents
    L10F05 VARCHAR(10) DEFAULT 'inr',            -- currency
    L10F06 INT NOT NULL,                          -- status (1=PENDING, 2=SUCCEEDED, 3=FAILED)
    L10F07 VARCHAR(100),                          -- payment_method
    L10F08 TEXT,                                  -- failure_reason
    L10F09 DATETIME NOT NULL,                     -- created_at_utc
    L10F10 DATETIME,                              -- updated_at_utc
    FOREIGN KEY (L10F02) REFERENCES appointments(L04F01)
);
```

#### TBL11: refunds
**Purpose**: Payment refund tracking
```sql
CREATE TABLE refunds (
    L11F01 INT PRIMARY KEY AUTO_INCREMENT,        -- id
    L11F02 INT NOT NULL,                          -- payment_id (FK → payments)
    L11F03 VARCHAR(255) UNIQUE,                   -- stripe_refund_id
    L11F04 BIGINT NOT NULL,                       -- refund_amount_cents
    L11F05 INT NOT NULL,                          -- status (1=PENDING, 2=SUCCEEDED, 3=FAILED)
    L11F06 TEXT,                                  -- reason
    L11F07 TEXT,                                  -- failure_reason
    L11F08 DATETIME NOT NULL,                     -- created_at_utc
    L11F09 DATETIME,                              -- processed_at_utc
    FOREIGN KEY (L11F02) REFERENCES payments(L10F01)
);
```

### 4.4 Data Integrity

#### Referential Integrity
- Foreign key constraints ensure data consistency
- Cascade delete on user deletion removes related patient/doctor records
- Orphaned records prevented through constraints

#### Data Validation
- NOT NULL constraints on required fields
- UNIQUE constraints on email, license numbers, Stripe IDs
- CHECK constraints on enum values (status codes)
- DEFAULT values for optional fields

#### Indexing Strategy
- Primary keys automatically indexed
- Composite indexes on frequently queried columns
- Foreign key columns indexed for join performance
- Email and user_type columns indexed for authentication queries

---

## 5. Backend Implementation

### 5.1 Project Structure

```
backend/
├── Controllers/              # HTTP request handlers (7 controllers)
│   ├── AuthController.cs
│   ├── AppointmentsController.cs
│   ├── DoctorController.cs
│   ├── PatientController.cs
│   ├── PrescriptionsController.cs
│   ├── MedicalDocumentsController.cs
│   └── PaymentsController.cs
│
├── Services/                 # Business logic layer (15 services)
│   ├── Interfaces/
│   │   ├── IAuthService.cs
│   │   ├── ITokenService.cs
│   │   ├── IAppointmentService.cs
│   │   ├── IDoctorService.cs
│   │   ├── IPatientService.cs
│   │   ├── IPrescriptionService.cs
│   │   ├── IMedicalDocumentService.cs
│   │   └── IPaymentService.cs
│   │
│   └── Implementations/
│       ├── AuthService.cs
│       ├── TokenService.cs
│       ├── AppointmentService.cs
│       ├── DoctorService.cs
│       ├── PatientService.cs
│       ├── PrescriptionService.cs
│       ├── MedicalDocumentService.cs
│       └── PaymentService.cs
│
├── Repositories/             # Data access layer (11 repositories)
│   ├── Interfaces/
│   │   ├── IUserRepository.cs
│   │   ├── IPatientRepository.cs
│   │   ├── IDoctorRepository.cs
│   │   ├── IAppointmentRepository.cs
│   │   ├── IPrescriptionRepository.cs
│   │   ├── IMedicalDocumentRepository.cs
│   │   ├── IPaymentRepository.cs
│   │   └── IRefundRepository.cs
│   │
│   └── Implementations/
│       ├── UserRepository.cs
│       ├── PatientRepository.cs
│       ├── DoctorRepository.cs
│       ├── AppointmentRepository.cs
│       ├── PrescriptionRepository.cs
│       ├── MedicalDocumentRepository.cs
│       ├── PaymentRepository.cs
│       └── RefundRepository.cs
│
├── Models/                   # Database entities & workflow states
│   ├── Entities/
│   │   ├── TBL01.cs (User)
│   │   ├── TBL02.cs (Patient)
│   │   ├── TBL03.cs (Doctor)
│   │   ├── TBL04.cs (Appointment)
│   │   ├── TBL05.cs (Clinic)
│   │   ├── TBL06.cs (DoctorClinic)
│   │   ├── TBL07.cs (AppointmentSlot)
│   │   ├── TBL08.cs (Prescription)
│   │   ├── TBL09.cs (MedicalDocument)
│   │   ├── TBL10.cs (Payment)
│   │   └── TBL11.cs (Refund)
│   │
│   ├── Enums/
│   │   ├── UserType.cs
│   │   ├── AppointmentStatus.cs
│   │   └── AppointmentDecisionAction.cs
│   │
│   ├── WorkflowStates/
│   │   ├── SignupWorkflowState.cs
│   │   ├── AppointmentCreateWorkflowState.cs
│   │   ├── AppointmentDecisionWorkflowState.cs
│   │   └── AppointmentCancelWorkflowState.cs
│   │
│   └── Configuration/
│       ├── StripeSettings.cs
│       └── CurrentUserContext.cs
│
├── DTOs/                     # Data Transfer Objects (31 DTOs)
│   ├── Request/
│   │   ├── SignupRequest.cs
│   │   ├── LoginRequest.cs
│   │   ├── CreateAppointmentRequest.cs
│   │   ├── CreateAppointmentSlotRequest.cs
│   │   ├── CreatePaymentIntentRequest.cs
│   │   ├── ConfirmPaymentRequest.cs
│   │   ├── CreatePrescriptionRequest.cs
│   │   ├── UpdateDoctorProfileRequest.cs
│   │   └── UpdatePatientProfileRequest.cs
│   │
│   └── Response/
│       ├── LoginResponse.cs
│       ├── AppointmentResponse.cs
│       ├── AppointmentSlotResponse.cs
│       ├── AvailableDoctorResponse.cs
│       ├── PaymentIntentResponse.cs
│       ├── PaymentConfirmResponse.cs
│       ├── PrescriptionResponse.cs
│       ├── DoctorProfileResponse.cs
│       └── PatientProfileResponse.cs
│
├── Middleware/               # Custom middleware components
│   ├── GlobalExceptionMiddleware.cs
│   ├── RequestLoggingMiddleware.cs
│   ├── UserContextMiddleware.cs
│   └── CorrelationIdMiddleware.cs
│
├── Data/                     # Entity Framework context
│   └── ApplicationDbContext.cs
│
├── Mapping/                  # Object mapping utilities
│   ├── IReflectionMapper.cs
│   └── ReflectionMapper.cs
│
├── Extensions/               # Extension methods
│   └── HttpContextExtensions.cs
│
├── Exceptions/               # Custom exception classes
│   └── AppException.cs
│
├── Migrations/               # EF Core database migrations
│
├── uploads/                  # File storage directory
│
├── Program.cs                # Application entry point & DI configuration
├── appsettings.json          # Configuration (not in source control)
├── appsettingsexample.json   # Configuration template
├── nlog.config               # Logging configuration
└── backend.csproj            # Project dependencies
```

### 5.2 Controllers (API Layer)

Controllers handle HTTP requests and delegate business logic to services.

#### 5.2.1 AuthController
**Purpose**: User authentication and registration
**Route**: `/api/auth`

**Responsibilities**:
- User signup (Patient and Doctor)
- User login with credentials
- JWT token generation
- Rate limiting on login endpoint

**Key Methods**:
```csharp
POST /api/auth/signup
- Creates new user account with role-specific data
- Validates email uniqueness
- Hashes password with BCrypt
- Returns JWT token on success

POST /api/auth/login
- Validates credentials
- Generates JWT token with user claims
- Rate limited (5 attempts per 60 seconds)
```

#### 5.2.2 AppointmentsController
**Purpose**: Appointment booking and management
**Route**: `/api/appointments`

**Patient Endpoints**:
```csharp
GET /api/appointments/doctors/available
- Lists all doctors with distance calculation
- Filters by location (Haversine formula)

GET /api/appointments/slots/available
- Shows available slots for selected doctor
- Filters by clinic

POST /api/appointments
- Creates appointment request (PENDING status)
- Validates slot availability
- Links to payment

GET /api/appointments/pending
GET /api/appointments/approved
GET /api/appointments/declined
GET /api/appointments/cancelled
GET /api/appointments/completed
- Retrieves appointments by status
```

**Doctor Endpoints**:
```csharp
POST /api/appointments/doctor/slots
- Creates appointment slots at specific clinic
- Sets availability window

GET /api/appointments/doctor/slots
- Lists doctor's created slots

DELETE /api/appointments/doctor/slots/{id}
- Removes unused slot

PUT /api/appointments/{id}/decision
- Approves or declines appointment request
- Updates appointment status

PUT /api/appointments/{id}/cancel
- Cancels appointment
- Triggers automatic refund

PUT /api/appointments/{id}/complete
- Marks appointment as completed
- Enables prescription creation
```

#### 5.2.3 DoctorController
**Purpose**: Doctor profile and clinic management
**Route**: `/api/doctor`

**Key Methods**:
```csharp
GET /api/doctor/profile
- Retrieves doctor's professional profile

PUT /api/doctor/profile
- Updates specialization, qualifications, fees

POST /api/doctor/clinic
- Creates clinic and associates with doctor
- Sets clinic-specific consultation fee

GET /api/doctor/clinics
- Lists all associated clinics

GET /api/doctor/patients
- Retrieves patients with appointments
```

#### 5.2.4 PatientController
**Purpose**: Patient profile management
**Route**: `/api/patient`

**Key Methods**:
```csharp
GET /api/patient/profile
- Retrieves patient health profile

PUT /api/patient/profile
- Updates personal and health information
- Updates location coordinates
```

#### 5.2.5 PrescriptionsController
**Purpose**: Digital prescription management
**Route**: `/api/prescriptions`

**Key Methods**:
```csharp
POST /api/prescriptions
- Creates prescription (doctor only)
- Requires completed appointment

GET /api/prescriptions
- Lists user's prescriptions
- Patient: own prescriptions
- Doctor: issued prescriptions

GET /api/prescriptions/{id}
- Retrieves specific prescription

DELETE /api/prescriptions/{id}
- Deletes prescription (doctor only)
```

#### 5.2.6 MedicalDocumentsController
**Purpose**: Medical document upload and management
**Route**: `/api/medical-documents`

**Key Methods**:
```csharp
POST /api/medical-documents
- Uploads document (patient only)
- Validates file type and size (10 MB limit)
- Stores file metadata

GET /api/medical-documents/patient/my-documents
- Retrieves patient's own documents

GET /api/medical-documents/patient/{id}
- Retrieves patient documents (doctor access)

GET /api/medical-documents/{id}/download
- Downloads document file
- Authorization check

DELETE /api/medical-documents/{id}
- Deletes document (patient only)
```

#### 5.2.7 PaymentsController
**Purpose**: Payment processing and refund management
**Route**: `/api/payments`

**Key Methods**:
```csharp
GET /api/payments/config
- Returns Stripe publishable key (public endpoint)

POST /api/payments/create-intent
- Creates Stripe payment intent
- Calculates amount from doctor fees

POST /api/payments/confirm
- Confirms payment with Stripe
- Creates appointment on success

GET /api/payments/appointment/{id}
- Retrieves payment details for appointment

GET /api/payments/my-payments
- Lists user's payment history

POST /api/payments/refund/{id}
- Processes refund (doctor only)
- Creates Stripe refund

GET /api/payments/earnings
- Doctor earnings dashboard
- Shows total, monthly, pending amounts
```

### 5.3 Services (Business Logic Layer)

Services contain business rules and orchestrate operations across repositories.

#### 5.3.1 AuthService
**Purpose**: Authentication and user registration logic

**Key Responsibilities**:
- Password hashing with BCrypt
- Email uniqueness validation
- Role-based user creation
- Workflow state management

**Workflow Pattern** (Three-Step):
```csharp
1. PresaveAsync() → Prepare data, hash password
2. ValidateAsync() → Check business rules
3. SaveAsync() → Persist to database
```

**Key Features**:
- Creates user record (TBL01)
- Creates role-specific record (TBL02 or TBL03)
- Generates JWT token via TokenService
- Handles both patient and doctor registrations

#### 5.3.2 TokenService
**Purpose**: JWT token generation and validation

**Key Responsibilities**:
- Creates JWT tokens with user claims
- Signs tokens with secret key
- Sets expiration (2 hours)

**Token Structure**:
```json
{
  "nameid": "123",           // User ID
  "role": "PATIENT",         // UserType
  "exp": 1234567890          // Expiration timestamp
}
```

#### 5.3.3 AppointmentService
**Purpose**: Appointment lifecycle management

**Key Responsibilities**:
- Slot availability validation
- Appointment creation workflow
- Status transitions (PENDING → APPROVED → COMPLETED)
- Distance calculation (Haversine formula)
- Appointment filtering by status

**Complex Operations**:
- **Doctor Discovery**: Calculates distance between patient and each clinic
- **Slot Booking**: Validates availability and marks slot as booked
- **Approval/Decline**: Updates status and notifies via status change
- **Cancellation**: Updates status and triggers refund

#### 5.3.4 DoctorService
**Purpose**: Doctor profile and clinic management

**Key Responsibilities**:
- Profile CRUD operations
- Clinic association
- Consultation fee management (default and clinic-specific)
- Slot creation at clinics

#### 5.3.5 PatientService
**Purpose**: Patient profile management

**Key Responsibilities**:
- Health profile updates
- Location coordinate management
- Emergency contact information

#### 5.3.6 PrescriptionService
**Purpose**: Digital prescription handling

**Key Responsibilities**:
- Prescription creation post-appointment
- Authorization checks (doctor owns appointment)
- Status validation (appointment must be COMPLETED)
- Prescription retrieval with filtering

#### 5.3.7 MedicalDocumentService
**Purpose**: Document upload and storage

**Key Responsibilities**:
- File validation (type, size, extension)
- Physical file storage
- Metadata tracking
- Access control (patient owns, doctor can view)
- File deletion with cleanup

**Allowed File Types**:
- PDF: `application/pdf`
- Images: `image/jpeg`, `image/png`, `image/gif`
- Documents: `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

#### 5.3.8 PaymentService
**Purpose**: Stripe payment integration

**Key Responsibilities**:
- Payment intent creation
- Amount calculation from doctor/clinic fees
- Payment confirmation
- Refund processing
- Earnings calculation

**Payment Flow**:
1. Create payment intent with Stripe
2. Store payment record (PENDING)
3. Client completes payment
4. Confirm payment status with Stripe
5. Update payment record (SUCCEEDED/FAILED)
6. Create appointment if successful

**Refund Flow**:
1. Validate appointment and payment
2. Create Stripe refund
3. Store refund record
4. Update refund status

### 5.4 Repositories (Data Access Layer)

Repositories encapsulate database operations using Entity Framework Core.

#### 5.4.1 UserRepository
**Key Methods**:
```csharp
FindByIdAsync(int userId)
- Retrieves user by primary key

FindByEmailAsync(string email)
- Finds user by email address

AddAsync(TBL01 user)
- Creates new user record

UpdateAsync(TBL01 user)
- Updates existing user

EmailExistsAsync(string email)
- Checks email uniqueness
```

#### 5.4.2 AppointmentRepository
**Key Methods**:
```csharp
FindByIdAsync(int appointmentId)
- Retrieves appointment with related data

GetByPatientUserIdAsync(int patientId)
- Gets patient's appointments

GetByDoctorUserIdAsync(int doctorId)
- Gets doctor's appointments

GetByStatusAsync(int userId, AppointmentStatus status)
- Filters appointments by status

AddAsync(TBL04 appointment)
- Creates appointment record

UpdateAsync(TBL04 appointment)
- Updates appointment

FindSlotByIdAsync(int slotId)
- Retrieves appointment slot
```

#### 5.4.3 PaymentRepository
**Key Methods**:
```csharp
FindByStripeIdAsync(string paymentIntentId)
- Retrieves payment by Stripe ID

FindByAppointmentIdAsync(int appointmentId)
- Gets payment for appointment

GetUserPaymentsAsync(int userId)
- Lists user's payment history

AddAsync(TBL10 payment)
- Creates payment record

UpdateAsync(TBL10 payment)
- Updates payment status
```

**Similar patterns** for:
- DoctorRepository
- PatientRepository
- PrescriptionRepository
- MedicalDocumentRepository
- RefundRepository

### 5.5 Data Transfer Objects (DTOs)

DTOs separate API contracts from database entities.

#### Request DTOs
**Purpose**: Structure incoming client data

Examples:
```csharp
SignupRequest
- Email, Password, UserType
- Role-specific fields (Patient/Doctor)

CreateAppointmentRequest
- SlotId, Reason, ClinicId

CreatePaymentIntentRequest
- DoctorUserId, SlotId, Reason

UpdateDoctorProfileRequest
- Specialization, Qualification, Fee
```

#### Response DTOs
**Purpose**: Format outgoing data to clients

Examples:
```csharp
LoginResponse
- Token, UserId, UserType, FullName

AppointmentResponse
- AppointmentId, PatientName, DoctorName
- Status, DateTime, Clinic details

AvailableDoctorResponse
- DoctorUserId, FullName, Specialization
- Distance (calculated), Clinics array

PaymentIntentResponse
- ClientSecret (for Stripe.js)
- AmountCents, Currency
```

### 5.6 Middleware Components

#### GlobalExceptionMiddleware
**Purpose**: Centralized error handling
```csharp
- Catches all exceptions
- Logs errors with correlation ID
- Returns appropriate HTTP status codes
- Prevents stack trace leakage
- AppException: returns specific error message
- Unknown exceptions: returns generic error
```

#### RequestLoggingMiddleware
**Purpose**: HTTP request/response logging
```csharp
- Logs request method, path, correlation ID
- Logs response status code
- Tracks request duration
- Structured logging format
```

#### UserContextMiddleware
**Purpose**: Extract user claims from JWT
```csharp
- Reads JWT claims
- Creates CurrentUserContext object
- Validates user exists in database
- Makes user context available to controllers/services
```

#### CorrelationIdMiddleware
**Purpose**: Request tracking
```csharp
- Generates unique GUID per request
- Adds to HTTP response headers
- Available for logging throughout request lifecycle
```

### 5.7 Dependency Injection Configuration

**Program.cs** configures all dependencies:
```csharp
// Repositories (Scoped - per HTTP request)
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IAppointmentRepository, AppointmentRepository>();
services.AddScoped<IPaymentRepository, PaymentRepository>();
// ... all repositories

// Services (Scoped)
services.AddScoped<IAuthService, AuthService>();
services.AddScoped<IAppointmentService, AppointmentService>();
services.AddScoped<IPaymentService, PaymentService>();
// ... all services

// Infrastructure (Singleton - single instance)
services.AddSingleton<ITokenService, TokenService>();
services.AddSingleton<IReflectionMapper, ReflectionMapper>();

// Database Context (Scoped)
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));

// JWT Authentication
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { /* token validation */ });

// CORS
services.AddCors(options => { /* CORS policy */ });

// Stripe Configuration
services.Configure<StripeSettings>(
    configuration.GetSection("Stripe"));
```

---

## 6. Frontend Implementation

### 6.1 Project Structure

```
frontend/
├── public/
│   ├── sehat-logo.png           # Application logo
│   └── index.html               # HTML entry point
│
├── src/
│   ├── components/
│   │   ├── landing/             # Landing page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HowSehatWorks.jsx
│   │   │   ├── WhyChooseSehat.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── auth/                # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── patient/         # Patient dashboard
│   │   │   │   ├── PatientDashboard.jsx
│   │   │   │   ├── pages/
│   │   │   │   │   ├── OverviewPage.jsx
│   │   │   │   │   ├── FindDoctorsPage.jsx
│   │   │   │   │   ├── AppointmentsPage.jsx
│   │   │   │   │   ├── DocumentsPage.jsx
│   │   │   │   │   ├── PrescriptionsPage.jsx
│   │   │   │   │   ├── ProfilePage.jsx
│   │   │   │   │   └── BillingPage.jsx
│   │   │   │   │
│   │   │   │   └── components/
│   │   │   │       ├── Sidebar.jsx
│   │   │   │       ├── SummaryCards.jsx
│   │   │   │       ├── AppointmentDetailsModal.jsx
│   │   │   │       ├── PaymentModal.jsx
│   │   │   │       ├── LocationPicker.jsx
│   │   │   │       ├── DocumentsList.jsx
│   │   │   │       ├── PrescriptionsList.jsx
│   │   │   │       ├── BillingList.jsx
│   │   │   │       ├── CareTeamList.jsx
│   │   │   │       └── MessagesList.jsx
│   │   │   │
│   │   │   └── doctor/          # Doctor dashboard
│   │   │       ├── DoctorDashboard.jsx
│   │   │       ├── pages/
│   │   │       │   ├── OverviewPage.jsx
│   │   │       │   ├── AppointmentsPage.jsx
│   │   │       │   ├── PatientsPage.jsx
│   │   │       │   ├── SlotsPage.jsx
│   │   │       │   ├── EarningsPage.jsx
│   │   │       │   └── ProfilePage.jsx
│   │   │       │
│   │   │       └── components/
│   │   │           ├── Sidebar.jsx
│   │   │           ├── AppointmentCard.jsx
│   │   │           ├── EarningsChart.jsx
│   │   │           └── SlotManager.jsx
│   │   │
│   │   └── ui/                  # Reusable UI components
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Avatar.jsx
│   │       ├── FormInput.jsx
│   │       ├── FormSelect.jsx
│   │       ├── DottedBackground.jsx
│   │       ├── ParticleBackground.jsx
│   │       └── CustomToaster.jsx
│   │
│   ├── services/
│   │   └── api.js               # API client and all endpoints
│   │
│   ├── store/
│   │   ├── index.js             # Redux store configuration
│   │   └── authSlice.js         # Authentication state slice
│   │
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   │
│   ├── App.jsx                  # Root component with routing
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Tailwind CSS imports
│
├── .env                         # Environment variables (not in source control)
├── .env.example                 # Environment template
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── eslint.config.js             # ESLint configuration
```

### 6.2 State Management (Redux)

#### Store Configuration
```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

#### Authentication Slice
```javascript
// store/authSlice.js
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    userType: null,
  },
  reducers: {
    loginSuccess(state, action) {
      // Update state and localStorage
    },
    logout(state) {
      // Clear state and localStorage
    },
    updateUser(state, action) {
      // Update user profile
    },
  },
});
```

### 6.3 API Service Layer

**Centralized API client** with automatic token injection:
```javascript
// services/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiRequest = async (endpoint, method, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  
  return response.json();
};

export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
  signup: (userData) => apiRequest('/auth/signup', 'POST', userData),
};

export const appointmentAPI = {
  getAvailableDoctors: () => apiRequest('/appointments/doctors/available'),
  // ... more endpoints
};
```

### 6.4 Routing Architecture

```javascript
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Protected Patient Routes */}
    <Route path="/patient/*" element={
      <ProtectedRoute allowedRoles={['PATIENT']}>
        <PatientDashboard />
      </ProtectedRoute>
    } />
    
    {/* Protected Doctor Routes */}
    <Route path="/doctor/*" element={
      <ProtectedRoute allowedRoles={['DOCTOR']}>
        <DoctorDashboard />
      </ProtectedRoute>
    } />
  </Routes>
</BrowserRouter>
```

### 6.5 Key Components

#### Protected Route Component
```javascript
// Validates authentication and role
// Redirects to login if not authenticated
// Redirects to appropriate dashboard if wrong role
```

#### Payment Modal (Stripe Integration)
```javascript
// Uses @stripe/react-stripe-js
// Renders Stripe Elements (CardElement)
// Handles payment intent creation
// Confirms payment on submission
```

#### Location Picker (Map Integration)
```javascript
// React Leaflet map component
// Shows doctor locations as markers
// Calculates and displays distances
// Interactive marker clustering
```

---

## 7. API Routes & Endpoints

### Complete API Reference

#### 7.1 Authentication Routes (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Register new user (Patient/Doctor) |
| POST | `/api/auth/login` | ❌ | Login with credentials, get JWT token |

**Rate Limiting**: Login endpoint limited to 5 attempts per 60 seconds per IP

#### 7.2 Appointment Routes (`/api/appointments`)

##### Patient Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/appointments/doctors/available` | ✅ | List available doctors with distance |
| GET | `/api/appointments/slots/available?doctorUserId={id}` | ✅ | Get available slots for doctor |
| POST | `/api/appointments` | ✅ | Create appointment request |
| GET | `/api/appointments/pending` | ✅ | Get pending appointments |
| GET | `/api/appointments/approved` | ✅ | Get approved appointments |
| GET | `/api/appointments/declined` | ✅ | Get declined appointments |
| GET | `/api/appointments/cancelled` | ✅ | Get cancelled appointments |
| GET | `/api/appointments/completed` | ✅ | Get completed appointments |

##### Doctor Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/appointments/doctor/slots` | ✅ 👨‍⚕️ | Create appointment slot |
| GET | `/api/appointments/doctor/slots` | ✅ 👨‍⚕️ | Get doctor's created slots |
| DELETE | `/api/appointments/doctor/slots/{slotId}` | ✅ 👨‍⚕️ | Delete unused slot |
| PUT | `/api/appointments/{id}/decision` | ✅ 👨‍⚕️ | Approve/decline appointment |
| PUT | `/api/appointments/{id}/cancel` | ✅ 👨‍⚕️ | Cancel appointment (refund) |
| PUT | `/api/appointments/{id}/complete` | ✅ 👨‍⚕️ | Mark appointment as completed |

**Legend**: ✅ = Requires authentication, 👨‍⚕️ = Doctor only

#### 7.3 Payment Routes (`/api/payments`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/payments/config` | ❌ | Get Stripe publishable key |
| POST | `/api/payments/create-intent` | ✅ | Create Stripe payment intent |
| POST | `/api/payments/confirm` | ✅ | Confirm payment and create appointment |
| GET | `/api/payments/appointment/{appointmentId}` | ✅ | Get payment details for appointment |
| GET | `/api/payments/my-payments` | ✅ | Get user's payment history |
| POST | `/api/payments/refund/{appointmentId}` | ✅ 👨‍⚕️ | Process refund |
| GET | `/api/payments/earnings` | ✅ 👨‍⚕️ | Get doctor earnings dashboard |

#### 7.4 Prescription Routes (`/api/prescriptions`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/prescriptions` | ✅ 👨‍⚕️ | Create prescription |
| GET | `/api/prescriptions` | ✅ | Get user's prescriptions |
| GET | `/api/prescriptions/{prescriptionId}` | ✅ | Get specific prescription |
| PUT | `/api/prescriptions/{prescriptionId}` | ✅ 👨‍⚕️ | Update prescription |
| DELETE | `/api/prescriptions/{prescriptionId}` | ✅ 👨‍⚕️ | Delete prescription |

#### 7.5 Medical Document Routes (`/api/medical-documents`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/medical-documents` | ✅ 👤 | Upload medical document |
| GET | `/api/medical-documents/patient/my-documents` | ✅ 👤 | Get patient's own documents |
| GET | `/api/medical-documents/patient/{patientUserId}` | ✅ 👨‍⚕️ | Get patient's documents (doctor) |
| GET | `/api/medical-documents/{documentId}/download` | ✅ | Download document |
| DELETE | `/api/medical-documents/{documentId}` | ✅ 👤 | Delete document |

**Legend**: 👤 = Patient only

#### 7.6 Doctor Routes (`/api/doctor`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/doctor/profile` | ✅ 👨‍⚕️ | Get doctor profile |
| PUT | `/api/doctor/profile` | ✅ 👨‍⚕️ | Update doctor profile |
| POST | `/api/doctor/clinic` | ✅ 👨‍⚕️ | Create clinic and associate |
| GET | `/api/doctor/clinics` | ✅ 👨‍⚕️ | Get associated clinics |
| GET | `/api/doctor/patients` | ✅ 👨‍⚕️ | Get patients list |

#### 7.7 Patient Routes (`/api/patient`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/patient/profile` | ✅ 👤 | Get patient profile |
| PUT | `/api/patient/profile` | ✅ 👤 | Update patient profile |

### 7.8 Request/Response Examples

#### Example: Create Appointment
**Request**:
```http
POST /api/appointments
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "slotId": 123,
  "reason": "Regular checkup",
  "clinicId": 5
}
```

**Response**:
```json
{
  "appointmentId": 456,
  "patientName": "John Doe",
  "doctorName": "Dr. Smith",
  "clinicName": "City Hospital",
  "appointmentAtUtc": "2024-05-15T10:00:00Z",
  "status": "PENDING",
  "reason": "Regular checkup"
}
```

#### Example: Payment Intent
**Request**:
```http
POST /api/payments/create-intent
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "doctorUserId": 10,
  "slotId": 123,
  "reason": "Consultation"
}
```

**Response**:
```json
{
  "clientSecret": "pi_3ABC123_secret_XYZ",
  "amountCents": 100000,
  "currency": "inr",
  "doctorName": "Dr. Smith",
  "slotTime": "2024-05-15T10:00:00Z"
}
```

---

## 8. Security Implementation

### 8.1 Authentication Mechanism

#### JWT Token Structure
```
Header:
{
  "alg": "HS256",    // HMAC SHA-256
  "typ": "JWT"
}

Payload:
{
  "nameid": "123",           // User ID (ClaimTypes.NameIdentifier)
  "role": "PATIENT",         // UserType (ClaimTypes.Role)
  "exp": 1234567890,         // Expiration timestamp
  "iat": 1234567000          // Issued at timestamp
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)
```

**Token Lifecycle**:
1. User logs in with credentials
2. Server validates credentials
3. Server generates JWT with user claims
4. Client stores token in localStorage
5. Client includes token in Authorization header for all requests
6. Server validates token on each request
7. Token expires after 2 hours

### 8.2 Password Security

#### BCrypt Hashing
```csharp
// Signup: Hash password
string passwordHash = BCrypt.Net.BCrypt.HashPassword(
    password, 
    workFactor: 4  // Number of hashing rounds
);

// Login: Verify password
bool isValid = BCrypt.Net.BCrypt.Verify(
    providedPassword, 
    storedHash
);
```

**Security Features**:
- Automatic salt generation (unique per password)
- Configurable work factor (computational cost)
- One-way hashing (cannot be reversed)
- Resistant to rainbow table attacks

### 8.3 Role-Based Authorization

#### Authorization Levels

**Anonymous** (No authentication required):
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/payments/config`

**Authenticated** (Valid JWT required):
- Most endpoints require authentication
- Token validated on each request

**Patient-Only**:
- Appointment creation
- Document upload
- Profile management

**Doctor-Only**:
- Slot creation
- Appointment approval/decline
- Prescription creation
- Refund processing
- Earnings view

#### Authorization Implementation
```csharp
[Authorize]  // Requires valid JWT
public class AppointmentsController : ControllerBase
{
    [HttpPost("doctor/slots")]  // Doctor-only endpoint
    public async Task<IActionResult> CreateSlot(...)
    {
        var user = HttpContext.GetCurrentUser();
        if (user.Role != UserType.DOCTOR)
            throw new AppException("Unauthorized", 403);
        // ... proceed
    }
}
```

### 8.4 Input Validation

#### DTO Validation
```csharp
public class SignupRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [MinLength(8)]
    public string Password { get; set; }
    
    [Required]
    public UserType UserType { get; set; }
}
```

#### File Upload Validation
```csharp
// Size validation (10 MB limit)
const long MAX_FILE_SIZE = 10 * 1024 * 1024;
if (file.Length > MAX_FILE_SIZE)
    throw new AppException("File too large", 400);

// Type validation (whitelist)
var allowedTypes = new[] { 
    "application/pdf", 
    "image/jpeg", 
    "image/png" 
};
if (!allowedTypes.Contains(file.ContentType))
    throw new AppException("Invalid file type", 400);
```

### 8.5 SQL Injection Prevention

**Entity Framework Core** automatically uses parameterized queries:
```csharp
// Safe: EF Core parameterizes this query
var user = await _context.Users
    .FirstOrDefaultAsync(u => u.L01F04 == email);

// Translates to:
// SELECT * FROM users WHERE L01F04 = @p0
// Parameters: @p0 = 'user@example.com'
```

### 8.6 Cross-Site Scripting (XSS) Prevention

- **Input Sanitization**: All user inputs validated
- **Output Encoding**: JSON responses automatically encoded
- **Content-Type Headers**: Always set to `application/json`
- **React Protection**: React escapes values by default

### 8.7 Cross-Origin Resource Sharing (CORS)

**Development Configuration**:
```csharp
services.AddCors(options => {
    options.AddDefaultPolicy(builder => {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

**Production Configuration** (recommended):
```csharp
services.AddCors(options => {
    options.AddDefaultPolicy(builder => {
        builder.WithOrigins("https://sehat-app.com")
               .AllowCredentials()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

### 8.8 HTTPS Enforcement

```csharp
// Redirect HTTP to HTTPS
app.UseHttpsRedirection();

// Add HSTS headers
app.UseHsts();
```

### 8.9 Rate Limiting

**Login Endpoint**:
- 5 attempts per 60 seconds per IP address
- Returns 429 Too Many Requests when exceeded
- Prevents brute-force attacks

### 8.10 Error Handling Security

**GlobalExceptionMiddleware** prevents information disclosure:
```csharp
// Known exceptions: Return specific message
catch (AppException ex)
{
    return new { error = ex.Message };  // Safe
}

// Unknown exceptions: Return generic message
catch (Exception ex)
{
    _logger.LogError(ex, "Unexpected error");
    return new { error = "Internal server error" };  // No details
}
```

**Stack traces never exposed** in production responses.

### 8.11 Secrets Management

**Development**:
- Secrets in `appsettings.json` (not committed)
- `appsettingsexample.json` provides template

**Production** (Recommended):
- Azure Key Vault
- AWS Secrets Manager
- Environment variables
- .NET User Secrets (development)

---

## 9. Key Features Implementation

### 9.1 Location-Based Doctor Search

#### Haversine Formula Implementation
Calculates great-circle distance between two points on Earth:

```csharp
public double CalculateDistance(
    double lat1, double lon1,  // Patient coordinates
    double lat2, double lon2)  // Doctor/Clinic coordinates
{
    const double EarthRadiusKm = 6371.0;
    
    // Convert to radians
    double dLat = ToRadians(lat2 - lat1);
    double dLon = ToRadians(lon2 - lon1);
    
    lat1 = ToRadians(lat1);
    lat2 = ToRadians(lat2);
    
    // Haversine formula
    double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
              Math.Cos(lat1) * Math.Cos(lat2) *
              Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
    
    double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
    
    return EarthRadiusKm * c;  // Distance in kilometers
}

private double ToRadians(double degrees)
{
    return degrees * Math.PI / 180.0;
}
```

**Usage**:
1. Patient provides location (latitude/longitude)
2. System retrieves all doctors with clinic locations
3. Distance calculated for each doctor-clinic pair
4. Results sorted by distance (nearest first)
5. Frontend displays on interactive map

### 9.2 Appointment Workflow

#### State Transitions
```
          [PATIENT BOOKS]
                ↓
           [PENDING]
                ↓
    ┌───────────┴──────────┐
    ↓                      ↓
[APPROVED]            [DECLINED]
    ↓                      ↓
    ├──→ [COMPLETED]   [AUTO-REFUND]
    ↓
[CANCELLED]
    ↓
[AUTO-REFUND]
```

#### Workflow Implementation
```csharp
// 1. Patient creates appointment (PENDING status)
var appointment = new TBL04 {
    Status = AppointmentStatus.PENDING,
    // ... other fields
};

// 2. Doctor approves
appointment.Status = AppointmentStatus.APPROVED;

// 3. Doctor marks completed
appointment.Status = AppointmentStatus.COMPLETED;
// Now prescription can be created

// 4. Doctor cancels (triggers refund)
appointment.Status = AppointmentStatus.CANCELLED;
await ProcessRefundAsync(appointment.Id);
```

### 9.3 Payment Processing Flow

#### Creating Payment Intent
```csharp
// 1. Calculate amount from doctor/clinic fees
var amount = doctorClinic?.ConsultationFeeCents 
             ?? doctor.ConsultationFeeCents;

// 2. Create Stripe payment intent
var options = new PaymentIntentCreateOptions {
    Amount = amount,
    Currency = "inr",
    Metadata = new Dictionary<string, string> {
        { "patient_user_id", patientId.ToString() },
        { "doctor_user_id", doctorId.ToString() },
        { "slot_id", slotId.ToString() }
    }
};

var service = new PaymentIntentService();
var paymentIntent = await service.CreateAsync(options);

// 3. Return client secret to frontend
return new PaymentIntentResponse {
    ClientSecret = paymentIntent.ClientSecret,
    AmountCents = amount
};
```

#### Confirming Payment
```csharp
// 1. Retrieve payment intent from Stripe
var service = new PaymentIntentService();
var paymentIntent = await service.GetAsync(paymentIntentId);

// 2. Verify payment succeeded
if (paymentIntent.Status != "succeeded")
    throw new AppException("Payment not successful", 400);

// 3. Update payment record
payment.Status = PaymentStatus.SUCCEEDED;
payment.PaymentMethod = paymentIntent.PaymentMethodId;

// 4. Create appointment
var appointment = await CreateAppointmentAsync(...);

// 5. Link payment to appointment
payment.AppointmentId = appointment.Id;
await _paymentRepository.UpdateAsync(payment);
```

#### Processing Refund
```csharp
// 1. Retrieve original payment
var payment = await _paymentRepository
    .FindByAppointmentIdAsync(appointmentId);

// 2. Create Stripe refund
var options = new RefundCreateOptions {
    PaymentIntent = payment.StripePaymentIntentId,
    Amount = payment.AmountCents,
    Reason = "requested_by_customer"
};

var service = new RefundService();
var refund = await service.CreateAsync(options);

// 3. Store refund record
var refundRecord = new TBL11 {
    PaymentId = payment.Id,
    StripeRefundId = refund.Id,
    RefundAmountCents = payment.AmountCents,
    Status = RefundStatus.PENDING
};

await _refundRepository.AddAsync(refundRecord);
```

### 9.4 Document Upload & Storage

#### Upload Process
```csharp
// 1. Validate file
ValidateFile(file);  // Size, type, extension

// 2. Generate unique filename
var fileName = $"{Guid.NewGuid()}_{file.FileName}";

// 3. Construct storage path
var uploadPath = Path.Combine(
    _webHostEnvironment.WebRootPath,
    "uploads",
    fileName
);

// 4. Save file to disk
using (var stream = new FileStream(uploadPath, FileMode.Create))
{
    await file.CopyToAsync(stream);
}

// 5. Store metadata in database
var document = new TBL09 {
    PatientUserId = patientId,
    FileName = fileName,
    FilePath = uploadPath,
    FileSizeBytes = (int)file.Length,
    MimeType = file.ContentType
};

await _repository.AddAsync(document);
```

#### Download Process
```csharp
// 1. Retrieve document metadata
var document = await _repository.FindByIdAsync(documentId);

// 2. Verify authorization
if (currentUser.Id != document.PatientUserId && 
    currentUser.Role != UserType.DOCTOR)
    throw new AppException("Unauthorized", 403);

// 3. Read file from disk
var fileBytes = await File.ReadAllBytesAsync(document.FilePath);

// 4. Return file stream
return File(
    fileBytes, 
    document.MimeType, 
    document.FileName
);
```

### 9.5 Prescription Creation

```csharp
// 1. Verify appointment exists and is completed
var appointment = await _appointmentRepository
    .FindByIdAsync(appointmentId);

if (appointment == null)
    throw new AppException("Appointment not found", 404);

if (appointment.DoctorUserId != currentDoctorId)
    throw new AppException("Unauthorized", 403);

if (appointment.Status != AppointmentStatus.COMPLETED)
    throw new AppException("Appointment not completed", 400);

// 2. Create prescription
var prescription = new TBL08 {
    AppointmentId = appointmentId,
    Diagnosis = request.Diagnosis,
    Medications = request.Medications,
    Dosage = request.Dosage,
    Frequency = request.Frequency,
    Duration = request.Duration,
    Instructions = request.Instructions
};

await _prescriptionRepository.AddAsync(prescription);

// 3. Return prescription details
return MapToPrescriptionResponse(prescription);
```

### 9.6 Slot Management

#### Creating Slots
```csharp
// 1. Verify doctor-clinic association
var doctorClinic = await _doctorClinicRepository
    .FindByDoctorAndClinicAsync(doctorId, clinicId);

if (doctorClinic == null)
    throw new AppException("Doctor not associated with clinic", 400);

// 2. Validate time range
if (slotEnd <= slotStart)
    throw new AppException("Invalid time range", 400);

// 3. Check for conflicts
var conflictingSlot = await _slotRepository
    .FindConflictingSlotAsync(doctorId, clinicId, slotStart, slotEnd);

if (conflictingSlot != null)
    throw new AppException("Slot conflicts with existing slot", 400);

// 4. Create slot
var slot = new TBL07 {
    DoctorUserId = doctorId,
    ClinicId = clinicId,
    SlotStartUtc = slotStart,
    SlotEndUtc = slotEnd,
    IsBooked = false
};

await _slotRepository.AddAsync(slot);
```

#### Booking Slot
```csharp
// 1. Retrieve slot
var slot = await _slotRepository.FindByIdAsync(slotId);

// 2. Verify availability
if (slot.IsBooked)
    throw new AppException("Slot already booked", 400);

// 3. Create appointment (links to slot)
var appointment = new TBL04 {
    SlotId = slotId,
    // ... other fields
};

await _appointmentRepository.AddAsync(appointment);

// 4. Mark slot as booked
slot.IsBooked = true;
await _slotRepository.UpdateAsync(slot);
```

---

## 10. Design Patterns & Best Practices

### 10.1 Design Patterns Used

#### 1. Repository Pattern
**Purpose**: Separate data access logic from business logic

**Implementation**:
```csharp
public interface IUserRepository
{
    Task<TBL01> FindByIdAsync(int userId);
    Task<TBL01> FindByEmailAsync(string email);
    Task<TBL01> AddAsync(TBL01 user);
    Task UpdateAsync(TBL01 user);
}

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    
    public async Task<TBL01> FindByIdAsync(int userId)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.L01F01 == userId);
    }
}
```

**Benefits**:
- Testable (can mock repository)
- Centralized data access logic
- Easy to switch data sources

#### 2. Service Pattern
**Purpose**: Encapsulate business logic

**Implementation**:
```csharp
public interface IAuthService
{
    Task<LoginResponse> SignupAsync(SignupRequest request);
    Task<LoginResponse> LoginAsync(LoginRequest request);
}

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    
    public async Task<LoginResponse> LoginAsync(...)
    {
        // Business logic here
    }
}
```

**Benefits**:
- Controllers stay thin
- Reusable business logic
- Testable in isolation

#### 3. Dependency Injection Pattern
**Purpose**: Achieve loose coupling

**Implementation**:
```csharp
// Registration
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IAuthService, AuthService>();

// Usage
public class AuthController
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;  // Injected
    }
}
```

**Benefits**:
- Easy to test (inject mocks)
- Loose coupling
- Configuration centralized

#### 4. DTO Pattern
**Purpose**: Separate API contracts from domain models

**Implementation**:
```csharp
// Domain Model (Database entity)
public class TBL01
{
    public int L01F01 { get; set; }  // id
    public string L01F05 { get; set; }  // password_hash
}

// DTO (API contract)
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }  // Plain text (not hash)
}
```

**Benefits**:
- Hide internal structure
- Version API independently
- Validation on DTOs

#### 5. Middleware Pipeline Pattern
**Purpose**: Handle cross-cutting concerns

**Implementation**:
```csharp
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);  // Call next middleware
        }
        catch (Exception ex)
        {
            // Handle exception
        }
    }
}

// Registration
app.UseMiddleware<GlobalExceptionMiddleware>();
```

**Benefits**:
- Separation of concerns
- Reusable across controllers
- Configurable order

#### 6. Workflow State Pattern
**Purpose**: Manage multi-step operations

**Implementation**:
```csharp
public class SignupWorkflowState
{
    public SignupRequest Request { get; set; }
    public TBL01 User { get; set; }
    public TBL02? Patient { get; set; }
    public TBL03? Doctor { get; set; }
}

// Three-step workflow
await authService.SignupPresaveAsync(request);   // Prepare
await authService.SignupValidateAsync();          // Validate
await authService.SignupSaveAsync();              // Persist
```

**Benefits**:
- Clear operation steps
- Easy to add validation
- State maintained between steps

#### 7. Singleton Pattern
**Purpose**: Single instance across application

**Implementation**:
```csharp
// Token service as singleton (no state, pure functions)
services.AddSingleton<ITokenService, TokenService>();
```

**Benefits**:
- Performance (no repeated instantiation)
- Thread-safe operations
- Consistent behavior

### 10.2 SOLID Principles

#### Single Responsibility Principle
Each class has one reason to change:
- **Controllers**: HTTP handling only
- **Services**: Business logic only
- **Repositories**: Data access only

#### Open/Closed Principle
Open for extension, closed for modification:
- Interfaces allow new implementations
- Middleware pipeline extensible

#### Liskov Substitution Principle
Subtypes substitutable for base types:
- All repositories implement interfaces
- Can swap implementations without breaking code

#### Interface Segregation Principle
Specific interfaces:
- IAuthService, IPaymentService (not IService)
- Clients depend only on methods they use

#### Dependency Inversion Principle
Depend on abstractions, not concretions:
- Controllers depend on IService interfaces
- Services depend on IRepository interfaces

### 10.3 Best Practices Applied

#### 1. Async/Await
All I/O operations asynchronous:
```csharp
public async Task<TBL01> FindByIdAsync(int userId)
{
    return await _context.Users
        .FirstOrDefaultAsync(u => u.L01F01 == userId);
}
```

#### 2. Proper Exception Handling
Custom exceptions with meaningful messages:
```csharp
if (slot.IsBooked)
    throw new AppException("Slot already booked", 400);
```

#### 3. Logging
Structured logging with context:
```csharp
_logger.LogInformation(
    "User {UserId} logged in from {IpAddress}", 
    userId, 
    ipAddress
);
```

#### 4. Configuration Management
Settings externalized:
```csharp
services.Configure<StripeSettings>(
    configuration.GetSection("Stripe")
);
```

#### 5. Database Migrations
Version-controlled schema changes:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### 6. Separation of Concerns
Clear layer boundaries:
```
HTTP Request
    → Controller (validates request)
        → Service (applies business rules)
            → Repository (queries database)
                → Database
```

#### 7. Defensive Programming
Validate inputs, check nulls:
```csharp
if (appointment == null)
    throw new AppException("Appointment not found", 404);
```

#### 8. RESTful API Design
Proper HTTP methods and status codes:
- POST for creation (201 Created)
- GET for retrieval (200 OK)
- PUT for updates (200 OK)
- DELETE for deletion (200 OK)
- 404 for not found
- 400 for bad request
- 401 for unauthorized
- 403 for forbidden

---

## Conclusion

This implementation document provides a comprehensive overview of the **Sehat - Doctor Appointment Booking System**. The project demonstrates:

**Technical Excellence**:
- Modern technology stack (.NET 8, React 19, MySQL)
- Clean architecture with layered design
- Comprehensive security implementation
- Production-ready code quality

**Business Value**:
- Solves real-world healthcare appointment challenges
- Integrated payment processing
- Complete appointment lifecycle management
- Multi-clinic support for healthcare providers

**Scalability**:
- Repository pattern for data abstraction
- Dependency injection for loose coupling
- Middleware pipeline for extensibility
- RESTful API design for future integrations

**Security**:
- JWT authentication
- BCrypt password hashing
- Role-based authorization
- Input validation and sanitization
- HTTPS enforcement

The system is production-ready, maintainable, and extensible, following industry best practices and SOLID principles throughout the implementation.

---

**Document Version**: 1.0  
**Last Updated**: April 2026  
**Technology Versions**: .NET 8.0, React 19.2, MySQL 8.0  
**Status**: Complete Implementation
