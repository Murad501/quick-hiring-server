# Quick Hire - Backend (API)

A RESTful API for the Quick Hire job portal platform. Built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **Yarn**: Recommended (or npm)
- **MongoDB**: A running MongoDB instance (Local or Atlas)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd quick-hire-server
    ```

2.  **Install dependencies**:

    ```bash
    yarn install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and populate it:

    ```env
    project_name="quick-hire-server"
    NODE_ENV=development
    PORT=5000

    # MongoDB Connection
    mongodb_host=mongodb+srv://quick-hire:lYNXwlXji1FUom5f@cluster0.6i4g7bl.mongodb.net/quick-hire

    # Auth & Encryption
    BCRYPT_SALT_ROUND=12
    JWT_SECRET='HelLoWorLd'
    JWT_EXPIRE_IN=7d
    JWT_REFRESH_SECRET='HellOWOrlD'
    JWT_REFRESH_EXPIRE_IN=30d
    ```

### Running the Server

- **Development**: Starts the server with `ts-node-dev` for hot-reloading.
  ```bash
  yarn dev
  ```
- **Production**: Compiles and runs the production build.
  ```bash
  yarn build
  yarn start
  ```

### Admin Access

To access the admin features, use the following credentials (default):

- **Email**: `admin@quick-hiring.com`
- **Password**: `admin@quick-hiring.com`

---

## 🏗️ Architecture

The project follows a modular, feature-based architecture for scalability and maintenance.

### Folder Structure (`src/app`)

- **`modules/`**: Contains core business logic divided by features.
  - `auth/`: Login, logout, and token handling.
  - `users/`: User profile management.
  - `jobs/`: Job posting, searching, and metadata aggregation.
  - `applications/`: Handling job submissions and status updates.
- **`middleware/`**:
  - `auth.ts`: Handles JWT verification and role-based access control.
  - `validateRequest.ts`: Intercepts requests to validate them against Zod schemas.
  - `globalErrorHandler.ts`: Centralized error management system.
- **`routes/`**: Centralized route registration with versioning (`/api/v1`).
- **`helpers/`**: Utility functions like `catchAsync` and `queryMaker`.

---

## 📡 API Reference

All requests must be prefixed with `/api/v1`.

### 🔐 Authentication

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "admin@quick-hiring.com",
    "password": "admin@quick-hiring.com"
  }
  ```

#### Logout

- **URL**: `/auth/logout`
- **Method**: `POST`

---

### 💼 Jobs

#### Get All Jobs (Public)

- **URL**: `/jobs`
- **Method**: `GET`
- **Description**: Returns only "open" jobs for the guest view. Supports query params for search/filter.

#### Get All Jobs (Admin)

- **URL**: `/jobs/admin`
- **Method**: `GET`
- **Access**: `ADMIN`
- **Description**: Returns all jobs regardless of status.

#### Get Single Job

- **URL**: `/jobs/:jobId`
- **Method**: `GET`

#### Create Job

- **URL**: `/jobs`
- **Method**: `POST`
- **Access**: `ADMIN`
- **Body**:
  ```json
  {
    "title": "Software Engineer",
    "company": "FastTech",
    "location": "Remote",
    "category": "Engineering",
    "description": "...",
    "type": "Full-time",
    "tags": ["React", "Node"],
    "sections": [
      { "title": "Responsibilities", "values": ["Coding", "Testing"] }
    ]
  }
  ```

#### Update Job

- **URL**: `/jobs/:jobId`
- **Method**: `PATCH`
- **Access**: `ADMIN`

#### Update Job Status

- **URL**: `/jobs/:jobId/status`
- **Method**: `PATCH`
- **Access**: `ADMIN`
- **Body**: `{ "status": "closed" }`

#### Delete Job

- **URL**: `/jobs/:jobId`
- **Method**: `DELETE`
- **Access**: `ADMIN`

#### Get Job Metadata

- **GET `/jobs/companies`**: Returns unique companies and their job counts.
- **GET `/jobs/categories`**: Returns unique categories and their job counts.

---

### 📄 Applications

#### Submit Application

- **URL**: `/applications`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "jobId": "JOB-123",
    "name": "John Doe",
    "email": "john@example.com",
    "resumeLink": "https://...",
    "coverNote": "..."
  }
  ```

#### Get All Applications

- **URL**: `/applications`
- **Method**: `GET`
- **Access**: `ADMIN`

#### Update Application Status

- **URL**: `/applications/:applicationId/status`
- **Method**: `PATCH`
- **Access**: `ADMIN`
- **Body**: `{ "status": "reviewed" }`

---

## 🛠️ Global Handling

### standard Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Successful",
  "meta": { ... },
  "data": { ... }
}
```

### Error Handling

Errors are caught by the `globalErrorHandler` middleware, returning descriptive messages and status codes (e.g., 400 Bad Request, 401 Unauthorized).

---

_Developed as part of the QTech Job Task._
