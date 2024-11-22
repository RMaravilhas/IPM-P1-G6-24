import React from 'react';

interface NumberPickerProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const NumberPicker: React.FC<NumberPickerProps> = ({ label, value, onChange, error }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="quantity" className="text-xl tracking-tight leading-tight text-black">
        {label}
      </label>
      <input
        type="number"
        id="quantity"
        min="0"
        defaultValue=""
        placeholder="0"
        value={value}
        onChange={onChange}
        className={`w-20 px-2 py-1 ml-auto text-base font-semibold text-center bg-white rounded border 
          ${error ? 'border-red-500' : 'border-lime-800'} border-solid 
          placeholder-opacity-50 placeholder-gray-400`}
      />
    </div>
  );
};



export default NumberPicker;
