import React from 'react';

export interface PantryItemProps {
  product: string;
  quantity: number;
  expiry: string;
};

const PantryItem: React.FC<PantryItemProps> = ({ product, quantity, expiry }) => {
  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-16 py-6 
                    mt-9 max-w-full rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 w-[1256px] max-md:px-5">
      <div className="flex gap-10 items-center w-full max-w-[992px] max-md:max-w-full">
        <div className="grow shrink self-stretch my-auto w-[130px]">
          {product}
        </div>
        <div className="shrink-0 self-stretch w-px border border-solid border-neutral-400 h-[42px]" />
        <div className="self-stretch my-auto">Qtd: {quantity}</div>
        <div className="shrink-0 self-stretch w-px border border-solid border-neutral-400 h-[42px]" />
        <div className="grow shrink self-stretch my-auto w-[205px]">
          Validade: {expiry}
        </div>
      </div>
    </div>
  );
};

export default PantryItem;