import React from 'react';

export interface OrderCardProps {
  orderId: string;
  product: string;
  quantity: string;
  customerName: string;
  address: string;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderId, product, address, quantity, customerName, status }) => {
  return (
    <article data-layername="tomato" className="overflow-hidden grow p-6 w-full rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:pl-5 max-md:mt-6">
      <div className="flex gap-5 max-md:flex-col">
        <div data-layername="column" className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full text-lg leading-tight text-black whitespace-nowrap max-md:mt-9">
            {/* <img loading="lazy" src={image} alt={name} className="object-contain aspect-[1.35] w-[189px]" /> */}
            <div className="flex gap-2 justify-center px-2.5 py-1.5 mt-5 bg-white border border-solid border-black border-opacity-10">
              <img src="email.png" alt="" className="object-contain shrink-0 aspect-square w-[25px]" />
              <button data-layername="contactar" className="self-start">Contactar</button>
            </div>
          </div>
        </div>
        <div data-layername="column" className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start mt-1.5 text-base font-semibold text-black max-md:mt-10">
            {/* <h2 data-layername="tomates" className="text-xl leading-tight">{name}</h2> */}
            <p data-layername="ruaDosCliquesN20" className="self-stretch text-neutral-500">{address}</p>
            <p data-layername="quantidade2Kg" className="mt-10 leading-tight">
              <span className="text-xs">Quantidade:</span>{" "}
              <span className="text-xs font-light">{quantity}</span>
            </p>
            <p data-layername="validade01012025" className="mt-1.5 leading-tight">
              <span className="text-xs">Validade:</span>{" "}
              {/* <span className="text-xs font-light">{expiry}</span> */}
            </p>
            {/* <p data-layername="599€" className="self-end mt-6 text-xl leading-tight text-lime-800">{price}</p> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;