import React from 'react';

const MenuItem = ({ name }) => {
  return (
    // --- NEW: Updated light/dark styles ---
    <div className="py-4 border-b border-[rgb(var(--border))] last:border-b-0">
      <h3 className="text-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))]">{name}</h3>
    </div>
  );
};

export default MenuItem;