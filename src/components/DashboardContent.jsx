import React from 'react';
import { Menu, Search, Bell, Sun, Cloud, CloudRain } from 'lucide-react';
import StatsCards from './StatsCards';
import SalesChart from './SalesChart';
import ActivityFeed from './ActivityFeed';
import WeatherWidget from './WeatherWidget';

const DashboardContent = ({ onMenuClick, dashboardData, user }) => {
  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user?.username}!</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        {dashboardData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <StatsCards kpis={dashboardData.kpis} />
              
              {/* Sales Chart */}
              <SalesChart data={dashboardData.salesData} />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Weather Widget */}
              <WeatherWidget />
              
              {/* Activity Feed */}
              <ActivityFeed />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading dashboard...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardContent;