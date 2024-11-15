import React from 'react';

interface DatePickerProps {
  label: string;
  id: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, id }) => {
  return (
    <div className="flex gap-4 self-stretch mt-12 max-md:mt-10">
      <label htmlFor={id} className="text-xl tracking-tight leading-tight text-black">
        {label}
      </label>
      <div className="flex gap-2.5 px-2 py-1 mt-2 text-xs tracking-tight leading-tight text-black whitespace-nowrap bg-white rounded border border-lime-800 border-solid">
        <input
          type="date"
          id={id}
          defaultValue="2025-01-01"
          className="bg-transparent border-none"
        />
      </div>
    </div>
  );
}

export default DatePicker;