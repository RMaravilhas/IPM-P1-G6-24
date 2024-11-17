import React from 'react';

export interface MyOrdersProps {
  orderId: string;
  product: string;
  quantity: string;
  customerName: string;
  address: string;
  status: string;
  onDelete: (orderId: string) => void;
}

const MyOrders: React.FC<MyOrdersProps> = ({ orderId, product, address, quantity, customerName, status, onDelete }) => {
  return (
    <article className="flex overflow-hidden flex-col px-6 py-6 mt-9 w-full text-base font-semibold rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:pl-5">
      <div className="flex gap-3 text-black">
        <div className="flex flex-col items-start self-start mt-1.5">
          {/* Nome do Produto */}
          <h3 className="text-4xl leading-tight px-4">{product}</h3>
          {/* Endereço */}
          <p className="self-stretch text-neutral-500 text-xl px-4">{address}</p>
          {/* Quantidade */}
          <p className="mt-10 leading-tight">
            <span className="text-xl pl-4">Quantidade:</span>{" "}
            <span className="text-2xl font-light">{quantity}</span>
          </p>
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
