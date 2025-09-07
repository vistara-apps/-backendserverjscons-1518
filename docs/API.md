# CampusConnect API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:5000/api`  
**Authentication:** JWT Bearer Token

---

## 🔐 Authentication

### POST `/auth/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@campusconnect.edu",
    "fullName": "Administrator",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST `/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "student"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "username": "newuser",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "student",
    "createdAt": "2024-09-07T14:15:00.000Z"
  }
}
```

---

## 📊 Dashboard

### GET `/dashboard`
Get complete dashboard data including KPIs and analytics.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "kpis": {
    "totalStudents": 1247,
    "activeCourses": 45,
    "totalRevenue": 2450000,
    "averageGPA": 3.42
  },
  "enrollmentData": [
    { "month": "Jan", "students": 1100 },
    { "month": "Feb", "students": 1150 },
    { "month": "Mar", "students": 1180 },
    { "month": "Apr", "students": 1200 },
    { "month": "May", "students": 1220 },
    { "month": "Jun", "students": 1247 }
  ],
  "coursePopularity": [
    { "course": "Computer Science", "students": 320 },
    { "course": "Mathematics", "students": 280 },
    { "course": "Physics", "students": 245 },
    { "course": "Chemistry", "students": 210 },
    { "course": "Biology", "students": 192 }
  ]
}
```

### GET `/dashboard/stats`
Get dashboard KPIs only.

**Response:**
```json
{
  "totalStudents": 1247,
  "activeCourses": 45,
  "totalRevenue": 2450000,
  "averageGPA": 3.42
}
```

---

## 👥 Students

### GET `/students`
Get all students (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "studentId": "STU001",
    "fullName": "John Doe",
    "email": "john.doe@student.edu",
    "phone": "+1-555-0123",
    "major": "Computer Science",
    "year": "Sophomore",
    "gpa": 3.75,
    "enrolledCourses": [1, 2],
    "status": "Active"
  }
]
```

### GET `/students/:id`
Get student by ID.

**Parameters:**
- `id` (integer): Student ID

**Response:**
```json
{
  "id": 1,
  "studentId": "STU001",
  "fullName": "John Doe",
  "email": "john.doe@student.edu",
  "phone": "+1-555-0123",
  "major": "Computer Science",
  "year": "Sophomore",
  "gpa": 3.75,
  "enrolledCourses": [1, 2],
  "status": "Active"
}
```

### POST `/students`
Create a new student (Admin only).

**Request Body:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane.smith@student.edu",
  "phone": "+1-555-0124",
  "major": "Mathematics",
  "year": "Freshman"
}
```

**Response:**
```json
{
  "id": 4,
  "studentId": "STU004",
  "fullName": "Jane Smith",
  "email": "jane.smith@student.edu",
  "phone": "+1-555-0124",
  "major": "Mathematics",
  "year": "Freshman",
  "gpa": 0.0,
  "enrolledCourses": [],
  "status": "Active"
}
```

---

## 📚 Courses

### GET `/courses`
Get all courses.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Computer Science 101",
    "code": "CS101",
    "instructor": "Dr. Smith",
    "credits": 3,
    "schedule": "MWF 10:00-11:00",
    "enrolled": 45,
    "capacity": 50,
    "description": "Introduction to Computer Science fundamentals"
  }
]
```

### GET `/courses/:id`
Get course by ID.

**Parameters:**
- `id` (integer): Course ID

**Response:**
```json
{
  "id": 1,
  "name": "Computer Science 101",
  "code": "CS101",
  "instructor": "Dr. Smith",
  "credits": 3,
  "schedule": "MWF 10:00-11:00",
  "enrolled": 45,
  "capacity": 50,
  "description": "Introduction to Computer Science fundamentals"
}
```

### POST `/courses`
Create a new course (Admin only).

**Request Body:**
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

**Response:**
```json
{
  "id": 4,
  "name": "Introduction to Programming",
  "code": "CS101",
  "instructor": "Dr. Smith",
  "credits": 3,
  "schedule": "MWF 10:00-11:00",
  "enrolled": 0,
  "capacity": 30,
  "description": "Basic programming concepts"
}
```

---

## 📅 Schedule

### GET `/schedule`
Get all schedule events.

**Response:**
```json
[
  {
    "id": 1,
    "title": "CS101 - Lecture",
    "start": "2024-09-09T10:00:00",
    "end": "2024-09-09T11:00:00",
    "type": "lecture",
    "courseId": 1,
    "location": "Room 101"
  }
]
```

### POST `/schedule`
Create a new schedule event (Admin only).

**Request Body:**
```json
{
  "title": "CS101 - Lab Session",
  "start": "2024-09-10T14:00:00",
  "end": "2024-09-10T16:00:00",
  "type": "lab",
  "courseId": 1,
  "location": "Computer Lab"
}
```

**Response:**
```json
{
  "id": 4,
  "title": "CS101 - Lab Session",
  "start": "2024-09-10T14:00:00",
  "end": "2024-09-10T16:00:00",
  "type": "lab",
  "courseId": 1,
  "location": "Computer Lab"
}
```

---

## 💬 Messages

### GET `/messages`
Get all messages.

**Response:**
```json
[
  {
    "id": 1,
    "from": "Dr. Smith",
    "to": "All Students",
    "subject": "Assignment Due Date Extended",
    "content": "The CS101 assignment deadline has been extended to Friday.",
    "timestamp": "2024-09-07T09:30:00.000Z",
    "read": false,
    "type": "announcement"
  }
]
```

### POST `/messages`
Send a new message.

**Request Body:**
```json
{
  "to": "All Students",
  "subject": "New Assignment Posted",
  "content": "A new assignment has been posted for CS101.",
  "type": "announcement"
}
```

**Response:**
```json
{
  "id": 3,
  "from": "admin",
  "to": "All Students",
  "subject": "New Assignment Posted",
  "content": "A new assignment has been posted for CS101.",
  "timestamp": "2024-09-07T14:15:00.000Z",
  "read": false,
  "type": "announcement"
}
```

---

## 🔔 Notifications

### GET `/notifications`
Get all notifications.

**Response:**
```json
[
  {
    "id": 1,
    "title": "New Assignment Posted",
    "message": "CS101: Programming Assignment 3 is now available",
    "type": "assignment",
    "timestamp": "2024-09-07T10:15:00.000Z",
    "read": false
  }
]
```

### PUT `/notifications/:id/read`
Mark notification as read.

**Parameters:**
- `id` (integer): Notification ID

**Response:**
```json
{
  "id": 1,
  "title": "New Assignment Posted",
  "message": "CS101: Programming Assignment 3 is now available",
  "type": "assignment",
  "timestamp": "2024-09-07T10:15:00.000Z",
  "read": true
}
```

---

## 🏥 Health Check

### GET `/health`
Check API server health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-09-07T14:15:00.000Z",
  "version": "1.0.0"
}
```

---

## 🚨 Error Responses

### Authentication Errors

**401 Unauthorized:**
```json
{
  "error": "Access token required"
}
```

**403 Forbidden:**
```json
{
  "error": "Invalid or expired token"
}
```

### Validation Errors

**400 Bad Request:**
```json
{
  "error": "Username and password required"
}
```

**409 Conflict:**
```json
{
  "error": "Username or email already exists"
}
```

### Not Found Errors

**404 Not Found:**
```json
{
  "error": "Student not found"
}
```

### Server Errors

**500 Internal Server Error:**
```json
{
  "error": "Server error during login"
}
```

---

## 📝 Request Headers

All authenticated endpoints require the following header:

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 🔄 Rate Limiting

- **Rate Limit:** 100 requests per 15 minutes per IP
- **Headers:** 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets

---

## 🧪 Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Get Students:**
```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer <your_token>"
```

### Using Postman

1. Import the API collection
2. Set the base URL to `http://localhost:5000/api`
3. Add Authorization header with Bearer token
4. Test endpoints as documented above

---

## 📚 SDK Examples

### JavaScript/Node.js

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login
const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  const { token } = response.data;
  api.defaults.headers.Authorization = `Bearer ${token}`;
  return response.data;
};

// Get students
const getStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};
```

### Python

```python
import requests

class CampusConnectAPI:
    def __init__(self, base_url="http://localhost:5000/api"):
        self.base_url = base_url
        self.token = None
        
    def login(self, username, password):
        response = requests.post(f"{self.base_url}/auth/login", 
                               json={"username": username, "password": password})
        data = response.json()
        self.token = data["token"]
        return data
        
    def get_students(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/students", headers=headers)
        return response.json()
```

---

**API Documentation Version:** 1.0.0  
**Last Updated:** September 7, 2024
