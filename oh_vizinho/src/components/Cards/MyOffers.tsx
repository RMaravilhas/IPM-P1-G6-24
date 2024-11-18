import React from 'react';

export interface MyOffersProps {
  image: string;
  product: string;
  address: string;
  quantity: string;
  expiry: string;
  price: string;
  onDelete: (product: string) => void;
  onEdit: (product: string) => void;
};

const MyOffers: React.FC<MyOffersProps> = ({ image, product, address, quantity, expiry, price, onDelete, onEdit }) => {
  return (
    <article className="flex overflow-hidden flex-col px-6 py-6 mt-9 w-full text-base font-semibold rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:pl-5">
      <div className="flex flex-wrap gap-3 text-black">
        <img loading="lazy" src={image} alt={product} className="object-contain shrink-0 max-w-full rounded-xl aspect-[1.35] w-[189px]" />
        <div className="flex flex-col items-start self-start mt-1.5">
          <h3 className="text-4xl leading-tight px-4">{product}</h3>
          <p className="self-stretch text-neutral-500 text-xl px-4">{address}</p>
          <p className="mt-10 leading-tight">
            <span className="text-xl pl-4">Quantidade:</span>{" "}
            <span className="text-2xl font-light">{quantity}</span>
          </p>
          <p className="mt-1.5 leading-tight">
            <span className="text-xl pl-4">Validade:</span>{" "}
            <span className="text-xl font-light">{expiry}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-start mt-5 leading-tight text-[#36b391] whitespace-nowrap">
        <button className="overflow-hidden grow px-10 py-px text-center text-black text-xl bg-white rounded-lg border border-black border-solid max-md:px-5"
                onClick={() => onEdit(product)}>
          Editar
        </button>
        <button className="overflow-hidden grow px-10 py-px text-center text-xl text-white bg-red-700 rounded-lg border border-black border-solid max-md:px-5"
                onClick={() => onDelete(product)}>
          Eliminar
        </button>
        <span className="self-stretch text-3xl text-black">{price}</span>
      </div>
    </article>
  );
};

export default MyOffers;