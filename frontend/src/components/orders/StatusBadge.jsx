import React from 'react'

const COLORS = {
    Processing: 'text-yellow-700 bg-yellow-100',
    Shipped: 'text-blue-700 bg-blue-100',
    Delivered: 'text-green-700 bg-green-100',
    Cancelled: 'text-red-700 bg-red-100',
    Paid: 'text-green-600 bg-green-100',
    Pending: 'text-red-600 bg-red-100',
};

const StatusBadge = ({ label }) => (
    <span className={`${COLORS[label] || 'text-gray-700 bg-gray-100'} px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>{label}</span>
);

export default StatusBadge
