import React from 'react';

export interface PantryItemProps {
  product: string;
  quantity: number;
  expiry: string;
};

const PantryItem: React.FC<PantryItemProps> = ({ product, quantity, expiry }) => {
  return (
    <div className="flex flex-col justify-between gap-5 p-8 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 min-w-[500px]">
      <div className="flex gap-10 items-center w-full max-w-full max-md:max-w-full">
        <div className="grow shrink self-stretch my-auto w-full text-center text-3xl">
          {product}
        </div>
        <div className="shrink-0 self-stretch w-px border border-solid border-neutral-400 h-[40px]" />
        <div className="self-stretch my-auto text-center text-3xl w-full">Qtd: {quantity}</div>
        <div className="shrink-0 self-stretch w-px border border-solid border-neutral-400 h-[40px]" />
        <div className="grow shrink self-stretch text-center my-auto text-3xl w-full">
          Validade: {expiry}
        </div>
      </div>
    </div>
  );
};

export default PantryItem;