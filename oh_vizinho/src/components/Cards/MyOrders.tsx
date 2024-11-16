import React from 'react';

export interface MyOrdersProps {
  orderId: string;
  product: string;
  quantity: string;
  customerName: string;
  address: string;
  status: string;
};

const MyOrders: React.FC<MyOrdersProps> = ({ orderId, product, address, quantity, customerName, status }) => {
  return (
    <div className="flex overflow-hidden gap-5 justify-between items-center self-center px-10 py-6 mt-9 w-full rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-w-[1256px] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-3 self-stretch my-auto text-xl leading-tight text-black whitespace-nowrap">
        <div className="grow">{product}</div>
        <div>{quantity}</div>
      </div>
      <div className="flex gap-10 self-stretch">
        <div className="shrink-0 w-px border border-solid border-neutral-400 h-[42px]" />
        <div className="my-auto text-base basis-auto text-neutral-500">
          {address}
        </div>
        <div className="shrink-0 w-px border border-solid border-neutral-400 h-[42px]" />
        <div className="my-auto text-xl font-semibold leading-tight text-lime-800">
          {/* {price} */}
        </div>
      </div>
      <div className="flex gap-10 self-stretch my-auto text-base font-semibold leading-tight text-center whitespace-nowrap max-md:max-w-full">
        <button className="overflow-hidden px-16 py-1 text-lime-800 bg-white rounded-lg border border-lime-800 border-solid max-md:px-5">
          Editar
        </button>
        <button className="overflow-hidden px-16 py-1 text-white bg-red-700 rounded-lg border border-lime-800 border-solid max-md:px-5">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MyOrders;