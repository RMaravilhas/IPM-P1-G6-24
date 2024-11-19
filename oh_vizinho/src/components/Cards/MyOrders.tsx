import React, { useState } from "react";

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

const MyOrders: React.FC<MyOrdersProps> = ({
  orderId,
  product,
  address,
  quantity,
  customerName,
  status,
  onDelete,
  onEdit,
}) => {

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleDeletePress = () => {
    setIsPopUpOpen(true);
  }

  const closePopUp = () => {
    setIsPopUpOpen(false);
  }

  const deleteItem = () => {
    onDelete(orderId)
    setIsPopUpOpen(false);
  }

  return (
    <article className="flex overflow-hidden flex-col px-6 py-6 mt-9 w-full text-base font-semibold rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:pl-5">
      {isPopUpOpen ? (
        <div className="flex flex-col items-center gap-6 text-black">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#000000] text-center">
            Tem a certeza que quer eliminar este pedido?
          </h1>
          <div className="flex gap-4 w-full justify-center">
            <button
              type="button"
              onClick={closePopUp}
              className="py-3 px-6 text-lg font-semibold text-white bg-[#ea4903] rounded-lg hover:bg-[#ef590f] transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={deleteItem}
              className="py-3 px-6 text-lg font-semibold text-white bg-[#37b38f] rounded-lg hover:bg-[#32a382] transition duration-200"
            >
              Confirmar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-3 text-black">
            <div className="flex flex-wrap flex-col items-start self-start mt-1.5">
              {/* Nome do Produto */}
              <h3 className="text-4xl leading-tight px-4">{product}</h3>
              {/* Endereço */}
              <p className="self-stretch text-neutral-500 text-xl px-4">
                {address}
              </p>
              {/* Quantidade */}
              <p className="mt-10 leading-tight">
                <span className="text-xl pl-4">Quantidade:</span>{" "}
                <span className="text-2xl font-light">{quantity}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-start mt-5 leading-tight whitespace-nowrap">
            <button
              className="overflow-hidden grow px-10 py-px text-center text-black text-xl bg-white rounded-lg border border-black border-solid max-md:px-5"
              onClick={() => onEdit(orderId)}
            >
              Editar
            </button>
            <button
              className="overflow-hidden grow px-10 py-px text-center text-xl text-white bg-[#ea4903] rounded-lg border border-black border-solid max-md:px-5"
              onClick={handleDeletePress}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default MyOrders;
