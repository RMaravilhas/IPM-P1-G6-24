import React from 'react';

interface NumberPickerProps {
  label: string;
}

const NumberPicker: React.FC<NumberPickerProps> = ({label}) => {
  return (
    <div className="flex gap-1.5 self-stretch mt-3.5 whitespace-nowrap">
      <div className="flex gap-1">
        <label htmlFor="quantity" className="grow text-xl tracking-tight leading-tight text-black">
          {label}
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          defaultValue="1"
          className="flex overflow-hidden flex-col self-start w-20 text-base font-semibold leading-tight text-center bg-white rounded border border-lime-800 border-solid text-lime-800 text-opacity-30 max-md:px-1"
        />
      </div>
    </div>
  );
}

export default NumberPicker;