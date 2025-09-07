import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, BookOpen, Users, Clock, User } from 'lucide-react';
import { coursesAPI } from '../../services/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAll();
      setCourses(response.data);
    } catch (error) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = async (courseData) => {
    try {
      await coursesAPI.create(courseData);
      fetchCourses();
      setShowAddModal(false);
    } catch (error) {
      setError('Failed to add course');
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await coursesAPI.delete(courseId);
        fetchCourses();
      } catch (error) {
        setError('Failed to delete course');
        console.error('Error deleting course:', error);
      }
    }
  };

  const getEnrollmentColor = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getEnrollmentBg = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'bg-red-500/20';
    if (percentage >= 75) return 'bg-yellow-500/20';
    return 'bg-green-500/20';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-gray-400">Manage course catalog and enrollment</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses by name, code, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{course.name}</h3>
                  <p className="text-gray-400 text-sm font-mono">{course.code}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{course.instructor}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{course.schedule}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Credits</span>
                <span className="text-white font-semibold">{course.credits}</span>
              </div>
            </div>

            {/* Description */}
            {course.description && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
            )}

            {/* Enrollment Status */}
            <div className={`p-3 rounded-lg ${getEnrollmentBg(course.enrolled, course.capacity)} border border-gray-600`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Enrollment</span>
                <span className={`text-sm font-semibold ${getEnrollmentColor(course.enrolled, course.capacity)}`}>
                  {course.enrolled}/{course.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    (course.enrolled / course.capacity) * 100 >= 90 
                      ? 'bg-red-500' 
                      : (course.enrolled / course.capacity) * 100 >= 75 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((course.enrolled / course.capacity) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  {Math.round((course.enrolled / course.capacity) * 100)}% full
                </span>
                <span className="text-xs text-gray-400">
                  {course.capacity - course.enrolled} spots left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first course'}
          </p>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <AddCourseModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCourse}
        />
      )}

      {/* Edit Course Modal */}
      {selectedCourse && (
        <EditCourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSubmit={(data) => {
            // Handle edit submission
            setSelectedCourse(null);
            fetchCourses();
          }}
        />
      )}
    </div>
  );
};

// Add Course Modal Component
const AddCourseModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    instructor: '',
    credits: 3,
    schedule: '',
    capacity: 30,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Course Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Course Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., CS101"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Instructor</label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Schedule</label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., MWF 10:00-11:00"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
              placeholder="Course description..."
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Course Modal Component (simplified for now)
const EditCourseModal = ({ course, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Edit Course</h2>
        <p className="text-gray-300 mb-4">Editing: {course.name} ({course.code})</p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
