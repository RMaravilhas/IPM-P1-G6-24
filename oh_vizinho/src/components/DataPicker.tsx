import React from 'react';

interface DatePickerProps {
  label: string;
  id: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, id }) => {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor={id} className="text-xl tracking-tight leading-tight text-black">
        {label}
      </label>
      <input
        type="date"
        id={id}
        defaultValue="2025-01-01"
        className="px-2 py-1 text-xs tracking-tight leading-tight text-black bg-white border border-lime-800 rounded text-opacity-70"
      />
    </div>
  );
}

export default DatePicker;
