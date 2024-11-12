import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = 'text' }) => (
  <>
    <label htmlFor={id} className="self-start mt-10 text-3xl tracking-tighter leading-tight max-md:mt-10">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="w-full mt-2 p-2 border border-black rounded"
      aria-label={label}
    />
    <div className="shrink-0 mt-11 h-px border border-black border-solid max-md:mt-10 max-md:max-w-full" />
  </>
);

export default InputField;