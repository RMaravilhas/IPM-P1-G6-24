import React from 'react';

export interface ProductCardProps {
  image: string;
  product: string;
  address: string;
  quantity: string;
  expiry: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  product,
  address,
  quantity,
  expiry,
  price,
}) => {
  return (
    <article className="p-6 w-full max-w-screen-lg bg-stone-50 border-solid border-2 rounded-xl shadow-md flex flex-col gap-4 mx-auto">
      {/* Estrutura Principal */}
      <div className="flex gap-6 items-start flex-wrap">
        {/* Imagem */}
        <img
          src={image}
          alt={product}
          className="object-contain rounded-l w-full max-w-[187px] flex-1 aspect-[1.34]"
        />

        {/* Informações */}
        <div className="flex flex-col gap-2 flex-[2]">
          <h2 className="text-2xl font-semibold text-gray-800">{product}</h2>
          <p className="text-base text-gray-600">
            <span className="font-medium text-gray-700">Morada:</span> {address}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-medium text-gray-700">Quantidade:</span> {quantity}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-medium text-gray-700">Validade:</span> {expiry}
          </p>
        </div>
      </div>

      {/* Preço e Botão */}
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <p className="text-lg font-semibold text-lime-600 bg-[#E6F7F0] px-4 py-2 rounded-md">{price}</p>
        <button className="flex items-center gap-2 px-6 py-2 bg-lime-600 text-white font-medium rounded-lg hover:bg-[#2e9578] transition">
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

export default ProductCard;
