import React from 'react';

interface DatePickerProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error ?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, id, value, onChange, error }) => {
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
        defaultValue="2025-01-01"
        className={`px-2 py-1 text-base tracking-tight leading-tight text-black bg-white border 
         ${error ? 'border-red-500' : 'border-lime-800' }
          rounded text-opacity-70`}
      />
    </div>
  );
}

export default DatePicker;
