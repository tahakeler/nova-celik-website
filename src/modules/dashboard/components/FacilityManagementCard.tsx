'use client';

import { Warehouse, Building2, Home } from 'lucide-react';

export default function FacilityManagementCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <h3 className="text-lg font-bold mb-3 text-gray-900">Facility Management</h3>
      <div className="flex gap-7">
        <div className="flex flex-col items-center">
          <span className="rounded-full bg-lime-100 w-14 h-14 flex items-center justify-center mb-2">
            <Warehouse className="w-7 h-7 text-lime-600" />
          </span>
          <span className="text-xs mt-1 text-gray-600">Warehouse</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="rounded-full bg-yellow-100 w-14 h-14 flex items-center justify-center mb-2">
            <Building2 className="w-7 h-7 text-yellow-500" />
          </span>
          <span className="text-xs mt-1 text-gray-600">Factory</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="rounded-full bg-red-100 w-14 h-14 flex items-center justify-center mb-2">
            <Home className="w-7 h-7 text-red-500" />
          </span>
          <span className="text-xs mt-1 text-gray-600">Office</span>
        </div>
      </div>
    </div>
  );
}
