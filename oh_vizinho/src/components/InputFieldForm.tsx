import React from 'react';

interface InputFieldFormProps {
  label: string;
  placeholder?: string;
  id: string;
}

const InputFieldForm: React.FC<InputFieldFormProps> = ({label, placeholder, id}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="text-xl tracking-tight leading-tight text-black">
          {label}
        </label>
        <input
          type="text"
          id={id}
          className="flex-1 px-4 py-2 text-base font-semibold leading-tight bg-white rounded border border-lime-800 border-solid text-lime-800 text-opacity-30"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputFieldForm;
