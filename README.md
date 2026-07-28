# PassRoom

PassRoom is a full-stack password manager built with the MERN stack.

What started as an academic project is being rebuilt into a proper multi-user application with authentication, encrypted credential storage, user-level data isolation, password breach detection, and a cleaner production-oriented architecture.

The goal is simple: **one room for your passwords, and only you get the key.**

---

## What PassRoom Does

PassRoom allows users to create an account and maintain their own private credential vault.

Each authenticated user gets access only to credentials associated with their account. Stored website passwords are encrypted before being written to the database, while account passwords are hashed and never stored in plaintext.

### Current Features

- User signup and login
- JWT-based authentication
- Role support for authorization
- User-specific credential vaults
- AES-256 encrypted credential storage
- bcrypt password hashing
- Have I Been Pwned password checks
- Request validation using Zod
- Protected credential API routes
- Centralized backend error handling
- Separate client and dashboard interfaces

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Motion / Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- Zod
- Node.js Crypto

### Security

- JWT authentication
- Role-based authorization foundation
- User-level data isolation
- AES-256 credential encryption
- bcrypt account password hashing
- HIBP k-anonymity password breach checking
- Environment-based secret management

---

## Project Structure

```text
PassRoom/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── credential.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── role.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   └── Credential.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── credential.routes.js
│   │
│   ├── utils/
│   │   ├── email.js
│   │   ├── encryption.js
│   │   ├── hibp.js
│   │   └── validationSchema.js
│   │
│   └── server.js
│
├── client/
│   └── src/
│
├── dashboard/
│   └── src/
│
└── README.md
```

---

## How Authentication Works

```text
User enters credentials
        |
        v
Backend validates request
        |
        v
Password checked with bcrypt
        |
        v
JWT issued after successful login
        |
        v
Client sends JWT with protected requests
        |
        v
Authentication middleware verifies token
        |
        v
req.user identifies the logged-in user
        |
        v
Only that user's credentials are queried
```

The client does not need to tell the server whose vault it wants.

The authenticated identity comes from the verified token, and credential queries are scoped to that user.

---

## Credential Security

Account passwords and stored credentials have different requirements, so PassRoom handles them differently.

### Account Passwords

Account passwords are hashed using **bcrypt**.

```text
Password -> bcrypt -> Hash -> Database
```

Hashing is intentionally one-way. PassRoom does not need to recover a user's login password.

### Stored Website Passwords

Vault passwords need to be recoverable by the application, so they are encrypted using **AES-256**.

```text
Credential -> AES Encryption -> MongoDB
```

The encryption key is supplied through environment configuration rather than being hardcoded into the repository.

### Password Breach Detection

PassRoom can check passwords against the **Have I Been Pwned** Pwned Passwords service.

The raw password is not sent to the service. PassRoom uses the k-anonymity range API, sending only a prefix of the password's SHA-1 hash and checking the returned hashes locally.

---

## API

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

### Credentials

All credential routes require authentication.

```http
POST   /api/credentials
GET    /api/credentials
DELETE /api/credentials/:id
POST   /api/credentials/check-password
```

Protected requests use:

```http
Authorization: Bearer <token>
```

---

## Running Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd PassRoom
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/passroom

JWT_SECRET=<your-secret>
AES_KEY=<64-character-hex-key>

CLIENT_URL=http://localhost:5173
```

Generate an AES-256 key with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Generate a JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Start the backend:

```bash
npm run dev
```

### 3. Start the client

```bash
cd ../client
npm install
npm run dev
```

### 4. Start the dashboard

```bash
cd ../dashboard
npm install
npm run dev
```

---

## Environment Variables

Secrets are intentionally excluded from version control.

A local backend environment requires:

```env
PORT=
MONGO_URI=
JWT_SECRET=
AES_KEY=
CLIENT_URL=
```

Never commit a real `.env` file or production secrets.

---

## Current Development

PassRoom is actively being refactored from its original academic-project architecture into a cleaner full-stack application.

Current work includes:

- Frontend architecture refactor
- Complete JWT integration between frontend and backend
- Protected dashboard routes
- Improved credential management
- Better loading, success, and error states
- Deployment configuration
- Automated tests
- Documentation and UI polish

So yes, there are still rooms under construction.

---

## Why PassRoom?

A password manager is a surprisingly good excuse to deal with things a basic CRUD project can avoid:

**authentication, authorization, ownership, encryption, hashing, validation, external security APIs, secret management, and frontend/backend trust boundaries.**

PassRoom is being built as both a usable application and a practical exercise in engineering those pieces properly.

---

## Disclaimer

PassRoom is an educational and portfolio project under active development.

Although it implements multiple security controls, it has **not undergone the level of security auditing, cryptographic review, infrastructure hardening, or testing expected from a production password manager**.

Do not use it as the sole storage location for important real-world credentials.

---

## Contributors

### **[Prajwal Tiwari](https://github.com/Prajwal-Tiwari)**— Backend Developer

Worked on:
- Backend architecture and REST API
- Authentication and authorization
- User-level credential isolation
- AES credential encryption and bcrypt password hashing
- HIBP integration
- Database models, validation, and security middleware

### **[Aastha Yadav](https://github.com/aastha612-yadav)** — Frontend Developer

Worked on:
- Client and dashboard UI
- React components and page architecture
- Authentication flow integration
- Protected dashboard routes
- Vault and password management interface
- Responsive UI and user experience

---

## License

No license has been specified yet.
