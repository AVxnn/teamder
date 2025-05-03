import React from 'react';

const PlayerCardSkeleton = () => {
  return (
    <div className="max-w-md bg-gray-800 rounded-xl p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gray-700"></div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
          <div className="h-3 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
      {/* ... другие скелетоны */}
    </div>
  );
};

export default PlayerCardSkeleton;
