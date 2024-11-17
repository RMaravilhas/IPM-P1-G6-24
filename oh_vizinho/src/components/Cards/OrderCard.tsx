import React from "react";

export interface OrderCardProps {
  product: string;
  quantity: string;
  customerName: string;
  address: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  product,
  quantity,
  customerName,
  address,
}) => {
  return (
    <article className="p-6 w-full max-w-screen-lg bg-stone-50 border-solid border-2 rounded-xl shadow-md flex flex-col gap-4 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">{product}</h2>

      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-me text-gray-600">
            <span className="font-medium text-gray-700">Nome:</span> {customerName}
          </p>
          <p className="text-me text-gray-600">
            <span className="font-medium text-gray-700">Morada:</span> {address}
          </p>
        </div>

        <div className="text-lg font-semibold text-lime-600 bg-[#E6F7F0] px-4 py-2 rounded-md flex-shrink-0">
          {quantity}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="flex items-center gap-2 px-6 py-2 bg-lime-600 text-white font-medium rounded-lg hover:bg-[#2e9578] transition"
        >
          <img
            src="https://i.ibb.co/gvTpvtM/paper-plane.png"
            alt="Ícone de avião de papel"
            className="w-5 h-5"
          />
          Contactar
        </button>
      </div>
    </article>
  );
};

export default OrderCard;
