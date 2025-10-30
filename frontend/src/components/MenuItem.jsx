import React from 'react';

const MenuItem = ({ name }) => {
  return (
    // --- NEW: Updated light/dark styles ---
    <div className="py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <h3 className="text-xl text-gray-800 dark:text-gray-200">{name}</h3>
    </div>
  );
};

export default MenuItem;