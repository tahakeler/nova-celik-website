'use client';

import { Building2, Warehouse, Home } from 'lucide-react';

export default function FacilityManagementCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64">
      <div className="mb-2 text-[15px] font-bold text-yellow-600 flex items-center">
        <span className="mr-2">Facility Management</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="rounded-full bg-lime-100 w-12 h-12 flex items-center justify-center">
          <Warehouse className="w-6 h-6 text-lime-600" />
        </div>
        <div className="rounded-full bg-yellow-100 w-12 h-12 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center">
          <Home className="w-6 h-6 text-red-500" />
        </div>
      </div>
    </div>
  );
}
