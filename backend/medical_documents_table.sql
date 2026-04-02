-- MySQL script to create medical_documents table
-- Run this script in your MySQL database

CREATE TABLE IF NOT EXISTS medical_documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_user_id INT NOT NULL,
    document_title VARCHAR(200) NOT NULL,
    description VARCHAR(500) NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    uploaded_at_utc DATETIME NOT NULL,
    CONSTRAINT fk_medical_documents_patient
        FOREIGN KEY (patient_user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    INDEX idx_patient_user_id (patient_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify table was created
DESCRIBE medical_documents;
