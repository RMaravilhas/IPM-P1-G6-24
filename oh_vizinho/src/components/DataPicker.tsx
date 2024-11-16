import React from 'react';

interface DatePickerProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, id, value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor={id} className="text-xl tracking-tight leading-tight text-black">
        {label}
      </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        className="px-2 py-1 text-xs tracking-tight leading-tight text-black bg-white border border-lime-800 rounded text-opacity-70"
      />
    </div>
  );
}

export default DatePicker;
