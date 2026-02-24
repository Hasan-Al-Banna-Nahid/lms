# 🚀 LMS Backend - Scalable API Architecture

This is the core API engine for the Learning Management System, built with a focus on modularity, security, and high performance.

## 🛠️ Tech Stack
- **Runtime:** Node.js (Express.js)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (JSON Web Tokens) & Bcrypt

## 🏗️ Architectural Pattern
The backend follows the **Layered Architecture (Controller-Service-Repository)**:
- **Controllers:** Manage HTTP requests and responses.
- **Services:** Handle business logic (e.g., validation, hashing, business rules).
- **Repositories (DAL):** Direct database interaction via Prisma.
- **Middlewares:** Role-based access control (RBAC) and Auth protection.

## 🔑 Key Backend Features
- **RBAC (Role-Based Access Control):** Enforced logic for Super Admin, Admin, Instructor, and Student.
- **Dynamic Role Management:** API endpoints to switch user roles and manage account status (`ACTIVE`, `SUSPENDED`).
- **Soft Delete Pattern:** Implemented for users and courses to ensure data integrity.
- **Security:** Password hashing, input validation using Zod, and centralized error handling.

## 🚀 Setup Instructions
1. Navigate to the backend directory.
2. Install dependencies: `npm install`
3. Configure `.env`:
env:
   DATABASE_URL="postgresql://neondb_owner:npg_gev4HiTYF3Cf@ep-twilight-dust-aibjv4et-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
   EMAIL_PASS="wwzp entz eddx qqdy"
   EMAIL_USER=iamnahid591998@gmail.com
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_ACCESS_SECRET=1e5787b6a11323d462085d8c83874236bf6237b449bc5edf2d218f8205e131987b97946c0a6ed2c93add2705010c451d3e29fd16f3866deb3b5448a060aec12e
   PORT=4000

   Live Server : https://lms-daqd.onrender.com
