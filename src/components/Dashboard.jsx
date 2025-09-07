import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const Dashboard = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDashboardData({
        kpis: {
          totalSales: 150000,
          activeCustomers: 1200,
          dailyRevenue: 5000,
        },
        salesData: [
          { date: '2025-09-01', sales: 4000 },
          { date: '2025-09-02', sales: 4500 },
          { date: '2025-09-03', sales: 4700 },
          { date: '2025-09-04', sales: 5200 },
          { date: '2025-09-05', sales: 4800 },
        ]
      });
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardContent 
          onMenuClick={() => setSidebarOpen(true)}
          dashboardData={dashboardData}
          user={user}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;