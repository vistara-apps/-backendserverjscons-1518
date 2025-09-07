import React from 'react';
import { MessageSquare, UserPlus, Award, Calendar } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'message',
      icon: MessageSquare,
      title: 'New message from Prof. Johnson',
      description: 'Assignment feedback available',
      time: '2 min ago',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      id: 2,
      type: 'user',
      icon: UserPlus,
      title: 'Sarah Miller joined CS-101',
      description: 'New student enrolled',
      time: '15 min ago',
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      id: 3,
      type: 'achievement',
      icon: Award,
      title: 'Achievement unlocked',
      description: 'Perfect attendance this month',
      time: '1 hour ago',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    {
      id: 4,
      type: 'calendar',
      icon: Calendar,
      title: 'Upcoming exam reminder',
      description: 'Mathematics exam tomorrow',
      time: '2 hours ago',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
        <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.bg} flex-shrink-0`}>
                <IconComponent className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{activity.title}</p>
                <p className="text-gray-400 text-xs mt-1">{activity.description}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;