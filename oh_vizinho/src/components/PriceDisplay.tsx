import React from 'react';

interface PriceDisplayProps {
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
  return (
    <div className="flex gap-4 mt-9 text-xl tracking-tight leading-tight text-black">
      <label htmlFor="price">Preço: </label>
      <input
        type="text"
        id="price"
        value={price}
        readOnly
        className="flex shrink-0 h-6 bg-white rounded border border-lime-800 border-solid w-[61px]"
        aria-label="Preço"
      />
    </div>
  );
};

export default PriceDisplay;