import React from 'react';

interface NumberPickerProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const NumberPicker: React.FC<NumberPickerProps> = ({ id, label, value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-xl tracking-tight leading-tight text-black">
        {label}
      </label>
      <input
        type="number"
        id={id}
        min="0"
        placeholder="0"
        value={value}
        onChange={onChange}
        className="w-14 px-2 py-1 ml-auto text-base font-semibold text-center bg-white rounded border border-lime-800 border-solid text-lime-800 placeholder-opacity-50 placeholder-gray-400"
      />
    </div>
  );
};

export default NumberPicker;
