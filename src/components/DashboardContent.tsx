import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface User {
  username: string;
  role: string;
}

interface KPIs {
  totalSales: number;
  activeCustomers: number;
  dailyRevenue: number;
}

interface SalesData {
  date: string;
  sales: number;
}

interface DashboardData {
  kpis: KPIs;
  salesData: SalesData[];
}

interface DashboardContentProps {
  onMenuClick: () => void;
  dashboardData: DashboardData | null;
  user: User;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ onMenuClick, dashboardData, user }) => {
  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-2 text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome back, {user.username}!</h2>
            
            {dashboardData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                  <p className="text-2xl font-bold text-gray-900">${dashboardData.kpis.totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.kpis.activeCustomers.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500">Daily Revenue</h3>
                  <p className="text-2xl font-bold text-gray-900">${dashboardData.kpis.dailyRevenue.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New student enrolled in Computer Science 101</p>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Assignment submitted for Mathematics 201</p>
                <span className="text-xs text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Schedule updated for Physics 150</p>
                <span className="text-xs text-gray-400">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardContent;
