import React from 'react';

export interface MyOrdersProps {
  orderId: string;
  product: string;
  quantity: string;
  customerName: string;
  address: string;
  status: string;
  onDelete: (orderId: string) => void;
  onEdit: (orderId: string) => void;
}

const MyOrders: React.FC<MyOrdersProps> = ({ orderId, product, address, quantity, customerName, status, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      <div className="flex flex-col justify-between gap-5 p-8 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 min-w-[500px]">
        <div className="flex justify-between text-4xl font-semibold text-black">
          <span>{product}</span>
          <span>{quantity}</span>
        </div>

        <div className="text-neutral-500 border-t text-2xl pt-3">
          <p>{address}</p>
        </div>

        <div className="flex justify-between mt-4">
          <button className="overflow-hidden px-10 py-px text-center text-black text-2xl bg-white rounded-lg border border-black border-solid max-md:px-5"
                  onClick={() => onEdit(orderId)}>
            Editar
          </button>
          <button
            className="overflow-hidden px-10 py-px text-center text-2xl text-white bg-red-700 rounded-lg border border-black border-solid max-md:px-5"
            onClick={() => onDelete(orderId)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-start mt-5 leading-tight whitespace-nowrap">
        {/* Botão Editar */}
        <button className="overflow-hidden px-10 py-px text-center text-black text-xl bg-white rounded-lg border border-black border-solid max-md:px-5">
          Editar
        </button>
        {/* Botão Eliminar */}
        <button
          className="overflow-hidden px-10 py-px text-center text-xl text-white bg-red-700 rounded-lg border border-black border-solid max-md:px-5"
          onClick={() => onDelete(orderId)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default MyOrders;
