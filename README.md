# CampusConnect - Complete Campus Management System

![CampusConnect Dashboard](https://img.shields.io/badge/CampusConnect-v1.0.0-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)

A modern, full-stack campus management system built with React, Node.js, and Express. CampusConnect provides a comprehensive solution for managing students, courses, schedules, and campus communications with a beautiful, responsive dark-themed interface.

## 🌟 Features

### 🎯 **Core Functionality**
- **Student Management** - Complete student records, enrollment tracking, and GPA monitoring
- **Course Management** - Course catalog, enrollment limits, and instructor assignments
- **Schedule Management** - Class schedules, events, and calendar integration
- **Dashboard Analytics** - Real-time KPIs, enrollment trends, and performance metrics
- **Messaging System** - Campus-wide announcements and direct messaging
- **Notifications** - Real-time alerts for assignments, grades, and schedule changes

### 🔐 **Authentication & Security**
- JWT-based authentication with secure token management
- Role-based access control (Admin/Student)
- Password hashing with bcrypt
- Automatic token refresh and logout on expiration
- Protected API routes with middleware validation

### 🎨 **Modern UI/UX**
- Responsive dark theme design
- Mobile-first approach with Tailwind CSS
- Interactive charts and data visualizations
- Smooth animations and transitions
- Intuitive navigation with collapsible sidebar

### 📊 **Analytics & Reporting**
- Student enrollment trends
- Course popularity metrics
- GPA distribution analysis
- Real-time dashboard KPIs
- Interactive charts with Recharts

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/-backendserverjscons-1518.git
   cd -backendserverjscons-1518
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   npm run install:backend
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev:full
   
   # Or start them separately:
   # Frontend (port 5173)
   npm run dev
   
   # Backend (port 5000)
   npm run backend
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

### Default Login Credentials
```
Admin Account:
Username: admin
Password: admin123

Student Account:
Username: student1
Password: student123
```

## 📁 Project Structure

```
campusconnect/
├── backend/                    # Express.js API server
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
├── src/                       # React frontend
│   ├── components/            # React components
│   │   ├── pages/            # Page components
│   │   │   ├── StudentsPage.jsx
│   │   │   └── CoursesPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── services/             # API service layer
│   │   └── api.js           # Axios configuration & API calls
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── package.json             # Frontend dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend
VITE_API_URL=http://localhost:5000/api

# Backend (backend/.env)
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### API Configuration

The API base URL can be configured in `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with username and password
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### POST `/api/auth/register`
Register a new user
```json
{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "student"
}
```

### Dashboard Endpoints

#### GET `/api/dashboard`
Get complete dashboard data including KPIs and analytics

#### GET `/api/dashboard/stats`
Get dashboard statistics only

### Student Management

#### GET `/api/students`
Get all students (Admin only)

#### POST `/api/students`
Create a new student (Admin only)
```json
{
  "fullName": "Jane Smith",
  "email": "jane@student.edu",
  "phone": "+1-555-0123",
  "major": "Computer Science",
  "year": "Freshman"
}
```

#### GET `/api/students/:id`
Get student by ID

### Course Management

#### GET `/api/courses`
Get all courses

#### POST `/api/courses`
Create a new course (Admin only)
```json
{
  "name": "Introduction to Programming",
  "code": "CS101",
  "instructor": "Dr. Smith",
  "credits": 3,
  "schedule": "MWF 10:00-11:00",
  "capacity": 30,
  "description": "Basic programming concepts"
}
```

### Schedule Management

#### GET `/api/schedule`
Get all schedule events

#### POST `/api/schedule`
Create a new schedule event (Admin only)

### Messaging & Notifications

#### GET `/api/messages`
Get all messages

#### POST `/api/messages`
Send a new message

#### GET `/api/notifications`
Get all notifications

#### PUT `/api/notifications/:id/read`
Mark notification as read

## 🎨 UI Components

### Key Components

- **Dashboard** - Main dashboard with analytics and KPIs
- **StudentsPage** - Student management with search and CRUD operations
- **CoursesPage** - Course catalog with enrollment tracking
- **LoginPage** - Authentication with modern gradient design
- **Sidebar** - Navigation with role-based menu items
- **StatsCards** - Animated KPI cards with trend indicators
- **SalesChart** - Interactive enrollment trend charts
- **WeatherWidget** - Campus weather information
- **ActivityFeed** - Recent campus activities and announcements

### Styling

The application uses Tailwind CSS with a custom dark theme:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      purple: { /* Custom purple shades */ },
      blue: { /* Custom blue shades */ }
    },
    backgroundImage: {
      'gradient-purple-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }
  }
}
```

## 🔒 Security Features

### Authentication
- JWT tokens with 24-hour expiration
- Secure password hashing with bcrypt (10 rounds)
- Automatic token refresh and logout handling
- Protected routes with authentication middleware

### Authorization
- Role-based access control (Admin/Student)
- API endpoint protection based on user roles
- Frontend route guards for sensitive pages

### Data Validation
- Input validation on both frontend and backend
- SQL injection prevention (when using databases)
- XSS protection with proper data sanitization

## 📱 Responsive Design

CampusConnect is fully responsive and works seamlessly across:

- **Desktop** (1024px+) - Full sidebar navigation and multi-column layouts
- **Tablet** (768px-1023px) - Collapsible sidebar and responsive grids
- **Mobile** (320px-767px) - Mobile-optimized navigation and single-column layouts

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Heroku/Railway)

1. Set environment variables:
   ```bash
   PORT=5000
   JWT_SECRET=your_production_secret
   NODE_ENV=production
   ```

2. Deploy the backend folder to your hosting platform

### Docker Deployment

Create a `Dockerfile` for containerized deployment:

```dockerfile
# Frontend
FROM node:18-alpine as frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Backend
FROM node:18-alpine as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Production
FROM node:18-alpine
WORKDIR /app
COPY --from=backend /app/backend ./backend
COPY --from=frontend /app/dist ./frontend
EXPOSE 5000
CMD ["node", "backend/server.js"]
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
npm test

# Backend tests
cd backend && npm test

# Run all tests
npm run test:all
```

### Test Coverage

The application includes:
- Unit tests for API endpoints
- Component testing for React components
- Integration tests for authentication flow
- E2E tests for critical user journeys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration for code style
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Q: Backend server won't start**
A: Ensure Node.js 16+ is installed and run `npm run install:backend`

**Q: Frontend shows API connection errors**
A: Check that the backend is running on port 5000 and VITE_API_URL is correct

**Q: Login fails with correct credentials**
A: Verify JWT_SECRET is set and backend is properly configured

### Getting Help

- 📧 Email: support@campusconnect.edu
- 💬 Discord: [CampusConnect Community](https://discord.gg/campusconnect)
- 📖 Documentation: [docs.campusconnect.edu](https://docs.campusconnect.edu)
- 🐛 Issues: [GitHub Issues](https://github.com/vistara-apps/-backendserverjscons-1518/issues)

## 🎯 Roadmap

### Version 1.1.0 (Coming Soon)
- [ ] Real-time notifications with WebSocket
- [ ] File upload for student documents
- [ ] Advanced reporting and analytics
- [ ] Mobile app with React Native
- [ ] Integration with external LMS systems

### Version 1.2.0 (Future)
- [ ] Multi-tenant support for multiple campuses
- [ ] Advanced scheduling with conflict detection
- [ ] Payment integration for course fees
- [ ] AI-powered student performance insights
- [ ] Video conferencing integration

---

**Built with ❤️ by the CampusConnect Team**

*Making campus management simple, efficient, and beautiful.*
