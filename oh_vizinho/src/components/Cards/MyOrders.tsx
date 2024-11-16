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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      {/* Card */}
      <div className="flex flex-col justify-between gap-5 p-8 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 min-w-[350px]">
        {/* Informação do Produto */}
        <div className="flex justify-between text-xl font-semibold text-black">
          <span>{product}</span>
          <span>{quantity}</span>
        </div>

        {/* Endereço */}
        <div className="text-base text-neutral-500 border-t pt-3">
          <p>{address}</p>
        </div>

        {/* Botões */}
        <div className="flex justify-between mt-4">
          <button className="overflow-hidden px-10 py-px text-center bg-white rounded-lg border border-lime-800 border-solid max-md:px-5">
            Editar
          </button>
          <button className="overflow-hidden px-10 py-px text-center text-white bg-red-700 rounded-lg border border-lime-800 border-solid max-md:px-5">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
