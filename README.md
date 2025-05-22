User Access Management System

A full-stack user access control app with:
- JWT Auth
- Role-based access (Admin, Manager, Employee)
- React frontend + Express/Node backend
- PostgreSQL + TypeORM

---

Folder Structure

project-root/
├── backend/
│   ├── src/
│   │   ├── entities/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── ormconfig.ts
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── App.jsx
    ├── public/
    └── package.json


Backend Setup

1. Set up `.env`
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_NAME=user_access_db
JWT_SECRET=supersecret
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Start development server
```bash
npm run dev
```

---

Frontend Setup

1. Install dependencies
```bash
cd frontend
npm install
```

2. Start React app
```bash
npm start
```

Visit: `http://localhost:5173`

---

Features

- `/signup` → Create a user (default role = Employee)
- `/login` → Log in and receive JWT
- Role-based navigation after login:
  - Admin → `/create-software`
  - Manager → `/pending-requests`
  - Employee → `/request-access`

---

Sample API Endpoints

Signup:
```http
POST /api/auth/signup
{
  "username": "alice",
  "password": "pass123",
  "role": "Employee"
}
```

Login:
```http
POST /api/auth/login
{
  "username": "alice",
  "password": "pass123"
}
```

Create Software (Admin):
```http
POST /api/software
Headers: Authorization: Bearer <token>
{
  "name": "Jira",
  "description": "Project tool",
  "accessLevels": ["Read", "Write", "Admin"]
}
```

---

Build & Deploy

Build Backend:
```bash
cd backend
npm run build
```

Build Frontend:
```bash
cd frontend
npm run build
```

Then deploy using:
- Render.com for backend

---

Tech Stack
- React + Tailwind CSS
- Node.js + Express
- PostgreSQL
- TypeORM
- JWT + bcrypt

---

Contributing
Feel free to work and improve the project. welcome!

---


