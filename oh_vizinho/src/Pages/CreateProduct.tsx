import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import InputField from '../components/InputFieldLogin';
import InputFieldForm from '../components/InputFieldForm';
import DatePicker from '../components/DataPicker';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';

interface ProductCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: () => void;
}

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ isOpen, onClose, create }) => {
  const [productName, setProductName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section className="px-8 pt-6 pb-10 w-[60%] sm:w-[80%] max-w-[1000px] rounded-3xl shadow-lg bg-white relative">
        <button
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
            <ImageUploader />
          </div>
          <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
            <form className="flex flex-col flex-grow w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-wrap gap-10 items-start w-full max-md:max-w-full">
                <InputFieldForm label='Nome do Produto:' id="produtoName" placeholder="Produto" />
              </div>
              <div className="flex flex-col items-start text-xl tracking-tight leading-tight text-black mt-6">
                <InputFieldForm label='Localização:' id="localização" placeholder="Localização" />
                <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                  <a></a> {/* Usado apenas para permitir o alinhamento correto */}
                  <div className="flex gap-2 self-stretch my-auto text-sm tracking-tight mt-2">
                    <input
                      type="checkbox"
                      id="useMyLocation"
                      className="flex shrink-0 w-5 h-5 bg-white rounded-md border border-lime-800 border-solid"
                    />
                    <label htmlFor="useMyLocation">Usar a minha localização</label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <NumberPicker label="Preço:" />
                  <NumberPicker label="Quantidade:" />
                </div>
                <div className="flex mt-6">
                  <DatePicker label="Validade:" id="expiryDate" />
                </div>
              </div>
              <div className="mt-auto ml-auto">
                <Button primary onClick={create}>Criar</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCreationForm;
