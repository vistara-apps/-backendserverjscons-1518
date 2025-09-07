const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'campus_connect_secret_key_2024';

// In-memory database (replace with real database in production)
let users = [
  { 
    id: 1, 
    username: 'admin', 
    password: '$2a$10$8K1p/a0dRTlNqNzNNtyaOeJ3/s9qvuydXV3/Rkwz.eSdqKdOvPKBG', // admin123
    role: 'admin',
    email: 'admin@campusconnect.edu',
    fullName: 'Administrator',
    avatar: null,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    username: 'student1',
    password: '$2a$10$8K1p/a0dRTlNqNzNNtyaOeJ3/s9qvuydXV3/Rkwz.eSdqKdOvPKBG', // student123
    role: 'student',
    email: 'john.doe@student.edu',
    fullName: 'John Doe',
    studentId: 'STU001',
    avatar: null,
    createdAt: new Date('2024-02-15')
  }
];

let courses = [
  {
    id: 1,
    name: 'Computer Science 101',
    code: 'CS101',
    instructor: 'Dr. Smith',
    credits: 3,
    schedule: 'MWF 10:00-11:00',
    enrolled: 45,
    capacity: 50,
    description: 'Introduction to Computer Science fundamentals'
  },
  {
    id: 2,
    name: 'Mathematics 201',
    code: 'MATH201',
    instructor: 'Prof. Johnson',
    credits: 4,
    schedule: 'TTh 14:00-15:30',
    enrolled: 38,
    capacity: 40,
    description: 'Advanced Calculus and Linear Algebra'
  },
  {
    id: 3,
    name: 'Physics 150',
    code: 'PHYS150',
    instructor: 'Dr. Williams',
    credits: 3,
    schedule: 'MWF 13:00-14:00',
    enrolled: 42,
    capacity: 45,
    description: 'General Physics with Laboratory'
  }
];

let students = [
  {
    id: 1,
    studentId: 'STU001',
    fullName: 'John Doe',
    email: 'john.doe@student.edu',
    phone: '+1-555-0123',
    major: 'Computer Science',
    year: 'Sophomore',
    gpa: 3.75,
    enrolledCourses: [1, 2],
    status: 'Active'
  },
  {
    id: 2,
    studentId: 'STU002',
    fullName: 'Jane Smith',
    email: 'jane.smith@student.edu',
    phone: '+1-555-0124',
    major: 'Mathematics',
    year: 'Junior',
    gpa: 3.92,
    enrolledCourses: [2, 3],
    status: 'Active'
  },
  {
    id: 3,
    studentId: 'STU003',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@student.edu',
    phone: '+1-555-0125',
    major: 'Physics',
    year: 'Senior',
    gpa: 3.68,
    enrolledCourses: [1, 3],
    status: 'Active'
  }
];

let scheduleEvents = [
  {
    id: 1,
    title: 'CS101 - Lecture',
    start: '2024-09-09T10:00:00',
    end: '2024-09-09T11:00:00',
    type: 'lecture',
    courseId: 1,
    location: 'Room 101'
  },
  {
    id: 2,
    title: 'MATH201 - Tutorial',
    start: '2024-09-10T14:00:00',
    end: '2024-09-10T15:30:00',
    type: 'tutorial',
    courseId: 2,
    location: 'Room 205'
  },
  {
    id: 3,
    title: 'PHYS150 - Lab',
    start: '2024-09-11T13:00:00',
    end: '2024-09-11T16:00:00',
    type: 'lab',
    courseId: 3,
    location: 'Physics Lab'
  }
];

let messages = [
  {
    id: 1,
    from: 'Dr. Smith',
    to: 'All Students',
    subject: 'Assignment Due Date Extended',
    content: 'The CS101 assignment deadline has been extended to Friday.',
    timestamp: new Date('2024-09-07T09:30:00'),
    read: false,
    type: 'announcement'
  },
  {
    id: 2,
    from: 'Admin Office',
    to: 'All Students',
    subject: 'Campus Event: Tech Fair 2024',
    content: 'Join us for the annual Tech Fair on September 15th.',
    timestamp: new Date('2024-09-06T14:20:00'),
    read: true,
    type: 'event'
  }
];

let notifications = [
  {
    id: 1,
    title: 'New Assignment Posted',
    message: 'CS101: Programming Assignment 3 is now available',
    type: 'assignment',
    timestamp: new Date('2024-09-07T10:15:00'),
    read: false
  },
  {
    id: 2,
    title: 'Grade Updated',
    message: 'Your MATH201 midterm grade has been posted',
    type: 'grade',
    timestamp: new Date('2024-09-06T16:45:00'),
    read: false
  },
  {
    id: 3,
    title: 'Schedule Change',
    message: 'PHYS150 lab moved to Room 301',
    type: 'schedule',
    timestamp: new Date('2024-09-05T11:30:00'),
    read: true
  }
];

// Dashboard KPIs and analytics data
const dashboardData = {
  kpis: {
    totalStudents: 1247,
    activeCourses: 45,
    totalRevenue: 2450000,
    averageGPA: 3.42
  },
  enrollmentData: [
    { month: 'Jan', students: 1100 },
    { month: 'Feb', students: 1150 },
    { month: 'Mar', students: 1180 },
    { month: 'Apr', students: 1200 },
    { month: 'May', students: 1220 },
    { month: 'Jun', students: 1247 }
  ],
  coursePopularity: [
    { course: 'Computer Science', students: 320 },
    { course: 'Mathematics', students: 280 },
    { course: 'Physics', students: 245 },
    { course: 'Chemistry', students: 210 },
    { course: 'Biology', students: 192 }
  ]
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email, fullName, role = 'student' } = req.body;

    if (!username || !password || !email || !fullName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      email,
      fullName,
      role,
      avatar: null,
      createdAt: new Date()
    };

    if (role === 'student') {
      newUser.studentId = `STU${String(students.length + 1).padStart(3, '0')}`;
    }

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Dashboard Routes
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json(dashboardData);
});

app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  res.json(dashboardData.kpis);
});

// Student Routes
app.get('/api/students', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  res.json(students);
});

app.get('/api/students/:id', authenticateToken, (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  // Students can only view their own data, admins can view any
  if (req.user.role !== 'admin' && req.user.id !== studentId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json(student);
});

app.post('/api/students', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { fullName, email, phone, major, year } = req.body;
  
  if (!fullName || !email || !major || !year) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  const newStudent = {
    id: students.length + 1,
    studentId: `STU${String(students.length + 1).padStart(3, '0')}`,
    fullName,
    email,
    phone: phone || '',
    major,
    year,
    gpa: 0.0,
    enrolledCourses: [],
    status: 'Active'
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Course Routes
app.get('/api/courses', authenticateToken, (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', authenticateToken, (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json(course);
});

app.post('/api/courses', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { name, code, instructor, credits, schedule, capacity, description } = req.body;
  
  if (!name || !code || !instructor || !credits || !schedule || !capacity) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  const newCourse = {
    id: courses.length + 1,
    name,
    code,
    instructor,
    credits,
    schedule,
    enrolled: 0,
    capacity,
    description: description || ''
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Schedule Routes
app.get('/api/schedule', authenticateToken, (req, res) => {
  res.json(scheduleEvents);
});

app.post('/api/schedule', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { title, start, end, type, courseId, location } = req.body;
  
  if (!title || !start || !end || !type) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  const newEvent = {
    id: scheduleEvents.length + 1,
    title,
    start,
    end,
    type,
    courseId: courseId || null,
    location: location || ''
  };

  scheduleEvents.push(newEvent);
  res.status(201).json(newEvent);
});

// Message Routes
app.get('/api/messages', authenticateToken, (req, res) => {
  res.json(messages);
});

app.post('/api/messages', authenticateToken, (req, res) => {
  const { to, subject, content, type = 'message' } = req.body;
  
  if (!to || !subject || !content) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  const newMessage = {
    id: messages.length + 1,
    from: req.user.username,
    to,
    subject,
    content,
    timestamp: new Date(),
    read: false,
    type
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Notification Routes
app.get('/api/notifications', authenticateToken, (req, res) => {
  res.json(notifications);
});

app.put('/api/notifications/:id/read', authenticateToken, (req, res) => {
  const notificationId = parseInt(req.params.id);
  const notification = notifications.find(n => n.id === notificationId);
  
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }

  notification.read = true;
  res.json(notification);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 CampusConnect API Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth/login`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
