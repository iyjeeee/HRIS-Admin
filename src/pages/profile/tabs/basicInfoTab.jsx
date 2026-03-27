// basicInfoTab.jsx — Admin Profile: Basic personal details tab
import React from 'react';
import { User, CreditCard } from 'lucide-react';

// Reusable detail display field
const DetailItem = ({ label, value, extra }) => (
  <div>
    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">{label}</p>
    <p className="text-sm font-bold text-gray-900">
      {value}
      {extra && <span className="text-gray-400 font-medium ml-1 text-xs">{extra}</span>}
    </p>
  </div>
);

const BasicInfoTab = () => (
  <div className="p-6 space-y-6">

    {/* ── Basic Details section ── */}
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
        <User size={15} className="text-gray-400" />
        <h3 className="font-bold text-sm text-gray-700">Basic Details</h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-y-10">
        <DetailItem label="Full Name"              value="Admin User" />
        <DetailItem label="Birth Date"             value="March 5, 1985" extra="(41 years old)" />
        <DetailItem label="Civil Status"           value="Married" />
        <DetailItem label="Contact Number"         value="09171234567" />
        <DetailItem label="Residence Address"      value="Makati City" />
        <DetailItem label="Personal Email Address" value="admin.personal@gmail.com" />
      </div>
    </div>

    {/* ── Primary Identification section ── */}
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
        <CreditCard size={15} className="text-gray-400" />
        <h3 className="font-bold text-sm text-gray-700">Primary Identification</h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-y-10">
        <DetailItem label="PhilSys National ID (PCN)" value="9876-5432-1098-7654" />
        <DetailItem label="Passport Number"           value="P9876543Z" />
        <DetailItem label="Driver's License"          value="N09-87-654321" />
        <DetailItem label="PRC License"               value="N/A" extra="(Optional)" />
      </div>
    </div>

  </div>
);

export default BasicInfoTab;
