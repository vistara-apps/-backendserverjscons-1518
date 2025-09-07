import React from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  X,
  BookOpen,
  Trophy,
  Bell
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, user, onLogout }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Courses' },
    { icon: Users, label: 'Students' },
    { icon: Calendar, label: 'Schedule' },
    { icon: Trophy, label: 'Achievements' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <div className={`
        fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:duration-0
        w-64 bg-gray-800 border-r border-gray-700 z-50 lg:z-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="text-white font-semibold">CampusConnect</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left
                    ${item.active 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user?.username}</p>
                <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;