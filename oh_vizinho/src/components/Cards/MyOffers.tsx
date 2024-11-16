import React from 'react';

export interface MyOffersProps {
  image: string;
  title: string;
  address: string;
  quantity: string;
  expiry: string;
  price: string;
};

const MyOffers: React.FC<MyOffersProps> = ({ image, title, address, quantity, expiry, price }) => {
  return (
    <article className="flex overflow-hidden flex-col px-6 py-6 mt-9 w-full text-base font-semibold rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:pl-5">
      <div className="flex gap-3 text-black">
        <img loading="lazy" src={image} alt={title} className="object-contain shrink-0 max-w-full rounded-xl aspect-[1.35] w-[189px]" />
        <div className="flex flex-col items-start self-start mt-1.5">
          <h3 className="text-xl leading-tight">{title}</h3>
          <p className="self-stretch text-neutral-500">{address}</p>
          <p className="mt-10 leading-tight">
            <span className="text-xs">Quantidade:</span>{" "}
            <span className="text-xs font-light">{quantity}</span>
          </p>
          <p className="mt-1.5 leading-tight">
            <span className="text-xs">Validade:</span>{" "}
            <span className="text-xs font-light">{expiry}</span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-start mt-5 leading-tight text-lime-800 whitespace-nowrap">
        <button className="overflow-hidden px-10 py-px text-center bg-white rounded-lg border border-lime-800 border-solid max-md:px-5">
          Editar
        </button>
        <button className="overflow-hidden px-10 py-px text-center text-white bg-red-700 rounded-lg border border-lime-800 border-solid max-md:px-5">
          Eliminar
        </button>
        <span className="self-stretch text-xl">{price}</span>
      </div>
    </article>
  );
};

export default MyOffers;