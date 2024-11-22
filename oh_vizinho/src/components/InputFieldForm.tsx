import React from 'react';

interface InputFieldFormProps {
  label: string;
  placeholder?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const InputFieldForm: React.FC<InputFieldFormProps> = ({ label, placeholder, id, value, onChange, error }) => {
  return (
    <div className="grid grid-cols-[200px_1fr] items-center gap-4">
      <label htmlFor={id} className="text-xl tracking-tight leading-tight text-black">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 text-base font-semibold leading-tight bg-white rounded border border-solid 
          ${error ? 'border-red-500' : 'border-lime-800'} 
          text-lime-800 placeholder-opacity-50 placeholder-gray-400`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFieldForm;
