# Quick Hire - Backend (API)

A RESTful API for the Quick Hire job portal platform. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Authentication**: Secure login/logout using JWT and cookies.
- **User Profile**: Fetch authenticated user details.
- **Job Management**: Complete CRUD for jobs with dynamic sections and status updates.
- **Applications**: Apply for jobs and manage application status.
- **Dynamic Aggregation**: Live counts for companies and job categories.
- **Security**: Route protection based on user roles (Admin).
- **Validation**: Request data validation using Zod.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Zod
- **Authentication**: JSON Web Token (JWT)
- **Logging**: Morgan & Winston

## Prerequisites

- Node.js (v18 or higher)
- Yarn or npm
- MongoDB URI (local or Atlas)

## Getting Started

### 1. Installation

```bash
cd quick-hire-server
yarn install
```

### 2. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development
PORT=5000
mongodb_host=mongodb+srv://quick-hire:lYNXwlXji1FUom5f@cluster0.6i4g7bl.mongodb.net/quick-hire
BCRYPT_SALT_ROUND=12
JWT_SECRET=your_jwt_secret
JWT_EXPIRE_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE_IN=30d
```

### 3. Running the Server

**Development Mode:**

```bash
yarn dev
```

**Production Mode:**

```bash
yarn build
yarn start
```

## API Documentation

The API follows a modular structure. All endpoints are prefixed with `/api/v1`.

### Core Modules:

- `/auth`: Login, Logout
- `/user`: User profiles
- `/jobs`: Job listings, creation, updates, and category/company aggregations
- `/applications`: Job application submission and management

---

_Developed as part of the QTech Job Task._
