// statCard.jsx — Reusable stat card used in dashboard and profile pages
import React from 'react';

// StatCard: displays a large value, a label, and a description sub-label
const StatCard = ({ value, label, description }) => {
  return (
    <div className="flex flex-col p-6 bg-white border-r border-gray-200 last:border-r-0">
      {/* Primary metric value */}
      <h3 className="text-4xl font-bold text-gray-900 mb-1">{value}</h3>
      {/* Card label */}
      <p className="text-sm font-bold text-gray-800 mb-0.5">{label}</p>
      {/* Sub-description */}
      <p className="text-[11px] text-gray-400 leading-tight">{description}</p>
    </div>
  );
};

export default StatCard;
