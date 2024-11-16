import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = 'text', value, onChange }) => (
  <>
    <label htmlFor={id} className="self-start mt-10 text-3xl tracking-tighter leading-tight max-md:mt-10">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full mt-2 p-2 border border-black rounded"
      aria-label={label}
    />
  </>
);

export default InputField;
