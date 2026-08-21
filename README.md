# Money Metrics

Money Metrics is a full-stack personal finance management application built using the MERN stack. It allows users to track income and expenses, analyze spending patterns, generate financial reports, and manage transactions through a responsive dashboard.

## Live Demo

Frontend: https://moneymetrics-fe.netlify.app

Backend: Add your Render backend URL here

## Features

### Authentication
- User registration and login
- JWT authentication using HTTP-only cookies
- Protected routes
- Logout functionality
- Forgot password using email OTP
- Password reset using OTP
- Password hashing using bcrypt

### Transaction Management
- Add income and expense transactions
- Edit transactions
- Delete transactions
- Search transactions by description or category
- Filter by transaction type
- Filter by category
- Filter by date range
- Sort transactions by latest or oldest
- Server-side pagination

### Dashboard
- Total income
- Total expenses
- Current balance
- Financial summary
- Income and expense charts
- Expense category breakdown
- Recent transaction information

### Reports
- Generate financial summaries
- Filter reports by date range
- Expense breakdown by category
- Top expense category
- Export reports as CSV
- Download reports as PDF

### UI
- Responsive design for desktop, tablet, and mobile
- Responsive sidebar navigation
- Loading, error, and empty states
- Custom 404 page
- Money Metrics branding and favicon

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Recharts
- Lucide React
- Papa Parse
- jsPDF
- jsPDF AutoTable

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

### Deployment
- Netlify - Frontend
- Render - Backend
- MongoDB Atlas - Database

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgotpassword
POST /api/auth/resetpassword
```

### Transactions

```text
POST   /api/transactions
GET    /api/transactions
GET    /api/transactions/:id
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

### Reports

```text
GET /api/reports
```

## Security

Money Metrics includes several security practices:

- Passwords are hashed using bcrypt
- Authentication uses JWT stored in HTTP-only cookies
- Production cookies use secure settings
- Protected API routes require authentication
- Users can only access their own transactions
- CORS restricts allowed frontend origins
- Environment variables are used for sensitive credentials
- Transaction input is validated on the backend

## Local Setup

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:YOUR_BACKEND_PORT/api
```

Start the frontend:

```bash
npm run dev
```

## Password Reset in Deployed Demo

The forgot-password feature uses Nodemailer and SMTP for sending OTP emails.

The feature works during local development. However, the deployed demo may not send OTP emails because the free backend hosting environment restricts outbound SMTP connections.

The password-reset implementation is included in the source code and can be tested locally with valid email credentials.

## Author

Kesavan Gnanasekaran

MERN Stack Developer
