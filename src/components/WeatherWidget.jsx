import React from 'react';
import { Sun, Cloud, MapPin } from 'lucide-react';

const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">Campus Location</span>
        </div>
        <Sun className="w-6 h-6" />
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">72°F</span>
          <span className="text-lg text-white/80">/ 22°C</span>
        </div>
        <p className="text-white/90 text-sm mt-1">Sunny with few clouds</p>
      </div>
      
      <div className="flex justify-between text-sm">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Sun className="w-4 h-4" />
          </div>
          <p className="text-white/80">Today</p>
          <p className="font-medium">75°F</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Cloud className="w-4 h-4" />
          </div>
          <p className="text-white/80">Tomorrow</p>
          <p className="font-medium">68°F</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-1">
            <Cloud className="w-4 h-4" />
          </div>
          <p className="text-white/80">Wed</p>
          <p className="font-medium">71°F</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;