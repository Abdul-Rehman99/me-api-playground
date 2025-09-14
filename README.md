# Me-API Playground

A full-stack application that serves as a personal portfolio API with authentication, allowing users to manage and showcase their professional profile, skills, projects, and experience.

**Live Demo:** https://lustrous-naiad-40b50b.netlify.app/

---

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- JWT Authentication - Secure user registration and login
- RESTful API - Complete CRUD operations for profile management
- MongoDB Integration - NoSQL database with Mongoose ODM
- Query Endpoints - Advanced filtering and search capabilities
- CORS Enabled - Cross-origin resource sharing configured
- Input Validation - Robust data validation and error handling

### Frontend (React + Tailwind CSS v4)
- Modern React - Built with functional components and hooks
- Responsive Design - Mobile-first approach with Tailwind CSS
- Authentication Flow - Complete login/register functionality
- Profile Management - Create, view, and edit personal profile
- Search & Filter - Advanced search across all profile data
- Interactive UI - Modern, clean, and user-friendly interface

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user and return JWT token
- `GET /api/auth/me` - Get current user information

### Profile
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)
- `GET /api/profile/projects?skill=python` - Get projects filtered by skill
- `GET /api/profile/skills/top` - Get top skills by proficiency
- `GET /api/profile/search?q=query` - Search across profile data

### Health
- `GET /api/health` - Health check endpoint

---

## 🛠 Technology Stack

### Backend
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (JSON Web Tokens)
- Security: bcryptjs for password hashing
- Validation: express-validator

### Frontend
- Library: React 18
- Routing: React Router v6
- Styling: Tailwind CSS v4
- Icons: Lucide React
- Build Tool: Vite
- HTTP Client: axios

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd me-api-playground
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd client

# Install dependencies
npm install

# Set up environment variables
# VITE_API_BASE_URL=http://localhost:5000

# Start the development server
npm run dev
```

### 4. Access the Application
- Backend API: http://localhost:5000
- Frontend App: http://localhost:5173
- API Health Check: http://localhost:5000/api/health

---

## 🗃 Database Schema

### User Collection
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Profile Collection
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  email: String (required, unique),
  title: String,
  about: String,
  skills: [{
    name: String (required),
    proficiency: String (enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'])
  }],
  education: [{
    institution: String (required),
    degree: String (required),
    field: String,
    duration: { start: Date, end: Date }
  }],
  work: [{
    company: String (required),
    position: String (required),
    duration: { start: Date, end: Date },
    description: String,
    skills: [String]
  }],
  projects: [{
    title: String (required),
    description: String (required),
    skills: [String],
    links: { github: String, demo: String }
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow
1. Registration: User creates an account with an email and password  
2. Login: User authenticates and receives JWT token  
3. Token Storage: JWT stored in localStorage for persistent sessions  
4. Protected Routes: API endpoints require valid JWT in Authorization header  
5. Auto-logout: Token expiration and validation checks  

---

## 🎨 UI Components

### Layout Components
- Header - Navigation with responsive menu
- Footer - Application footer
- Card - Reusable card container

### Auth Components
- Login - User authentication form
- Register - User registration form

### Profile Components
- ProfileView - Read-only profile display
- ProfileEdit - Comprehensive profile editor
- Projects - Project listing with filtering
- Skills - Skills visualization

### UI Components
- Modal - Reusable modal dialog
- LoadingSpinner - Loading indicator
- SearchBar - Search input component

---

## 📱 Responsive Design
The application is built with a mobile-first approach using Tailwind CSS v4:
- Mobile: Single column layout, hamburger menu
- Tablet: Adapted multi-column layouts
- Desktop: Full responsive grid systems

---

## 🔍 Search & Filtering
The application supports advanced search capabilities:
- Global Search: Search across all profile data
- Skill Filtering: Filter projects by specific skills
- Proficiency Levels: Filter skills by expertise level
- Real-time Results: Instant filtering as you type

---

## 🧪 Testing

### Manual Testing
1. Authentication: Register, login, logout flows
2. Profile Management: CRUD operations on profile data
3. Search Functionality: Test all search and filter options
4. Responsive Design: Test on various screen sizes

### API Testing with curl
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"password123"}'

# Get profile (with JWT)
curl -X GET http://localhost:5000/api/profile   -H "Authorization: Bearer <your_jwt_token>"
```

---

## 🆘 Support
If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify your environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that all dependencies are installed

---

## 🗺 Future Enhancements
- Image upload for profile pictures and project screenshots
- Social authentication (Google, GitHub)
- PDF resume generation
- Email notifications
- Advanced analytics dashboard
- API rate limiting
- Unit and integration tests
- Docker containerization
- Progressive Web App (PWA) features
