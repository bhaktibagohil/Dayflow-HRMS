CREATE DATABASE dayflow_hrms;
\c dayflow_hrms;

CREATE SCHEMA hrms;
SET search_path TO hrms;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    -- Auto‑generated employee ID (used for login)
    employee_id VARCHAR(20) UNIQUE NOT NULL,

    -- Company identifier (e.g. OI, AC)
    company_code VARCHAR(10) NOT NULL,

    -- Name details (used for employee_id generation in backend)
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    -- Login via email also allowed
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),

    -- Security
    password_hash TEXT NOT NULL,

    -- Access control
    role VARCHAR(20)
        CHECK (role IN ('ADMIN', 'EMPLOYEE'))
        NOT NULL,

    -- Required for employee_id format
    year_of_joining INT NOT NULL,

    -- Status & audit
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- employee_profiles
CREATE TABLE employee_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    date_of_birth DATE,
    gender VARCHAR(10),
    designation VARCHAR(100),
    department VARCHAR(100),
    date_of_joining DATE,
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- leave_types
CREATE TABLE leave_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    is_paid BOOLEAN DEFAULT TRUE
);


-- attendance
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20)
        CHECK (status IN ('PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE')),
    work_hours NUMERIC(4,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- leave_requests
CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(20)
        CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
        DEFAULT 'PENDING',
    admin_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_leave_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_leave_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_types(id)
);

-- payroll
CREATE TABLE payroll (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    basic_salary NUMERIC(10,2) NOT NULL,
    allowances NUMERIC(10,2) DEFAULT 0,
    deductions NUMERIC(10,2) DEFAULT 0,
    net_salary NUMERIC(10,2) NOT NULL,
    month VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payroll_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

