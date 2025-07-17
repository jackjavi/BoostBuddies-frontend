# Member Management System

## Overview

This project is a **Full-Stack Member Management System** designed using the MERN stack. The system features:

- Secure user registration and login.
- CRUD operations on member profiles with associated roles.
- Profile picture uploads.
- A responsive user interface built with React and Tailwind CSS.
- A robust backend powered by Node.js, Express, and SQLite.
- Features like pagination, sorting, filtering, and a dashboard with statistical summaries.

## Features

- User Authentication:
  - Secure registration and login using JWT.
  - Pre-configured admin account.
- Member Management:
  - CRUD operations for member profiles.
  - Role-based access control.
  - Profile picture uploads.
- Dashboard:
  - Statistical summaries of users and activities.
  - Advanced filtering, sorting, and pagination.
- Backend:
  - SQLite database with normalized tables.
  - Predefined roles and activity logs seeded automatically.
- Frontend:
  - Responsive UI using React, Tailwind CSS, and React Router.
  - Protected routes with state management using Context API.

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/jackjavi/Member-Management_System.git
cd Member-Management_System
```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```
4. Fill in the required environment variables in the `.env` file:

   - `REACT_APP_BACKEND_URL` - Backend API base URL (e.g., `http://localhost:5000`).

5. Start the development server:
   ```bash
   npm start
   ```
   **Note**: The frontend will run on `http://localhost:3000` by default.

---

## Usage

1. Log in using the admin credentials specified in the `.env` file.
2. Explore the dashboard to:
   - Manage members.
   - View activity logs.
   - Edit user roles, or delete members.
3. Use the seeded users to test features (raw passwords available in console after `npm run seed`).

---

## Technical Details

### Frontend

- Built with **React** and styled using **Tailwind CSS**.
- Navigation handled with **React Router**.
- State management using **Context API**.

## Development Scripts

### Frontend

- **Start development server**:
  ```bash
  npm start
  ```
- **Build for production**:
  ```bash
  npm run build
  ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---
