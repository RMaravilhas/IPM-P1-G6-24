import React, { useEffect, useRef } from 'react';
import { Product } from '../types/Product';

interface ProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null; 
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ isOpen, onClose, product }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Retorna nulo se não for para exibir o modal
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section
        ref={ref}
        className="px-8 pt-6 pb-10 w-[60%] sm:w-[80%] max-w-[1000px] rounded-3xl shadow-lg bg-white relative">
        <button
          className="absolute top-4 right-5 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
            <img src={product.image} alt={product.product} className="w-full h-auto rounded-lg" />
          </div>
          <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-10 items-start w-full max-md:max-w-full">
                <h2 className="text-3xl font-semibold text-black">{product.product}</h2>
              </div>
              <div className="flex flex-col items-start text-xl tracking-tight leading-tight text-black mt-6">
                <p><strong>Localização:</strong> {product.address}</p>
                <p><strong>Preço:</strong> {product.price}</p>
                <p><strong>Quantidade:</strong> {product.quantity}</p>
                <p><strong>Validade:</strong> {product.expiry}</p>
              </div>

              <div className="flex flex-col mt-6">
                <label htmlFor="productDescription" className="text-xl tracking-tight leading-tight text-black">
                  Descrição do Produto:
                </label>
                <p className="mt-2 text-base font-semibold leading-tight text-black">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
