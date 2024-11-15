import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import InputField from '../components/InputFieldLogin';
import InputFieldForm from '../components/InputFieldForm';
import DatePicker from '../components/DataPicker';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';

interface ProductCreationFormProps {}

const ProductCreationForm: React.FC<ProductCreationFormProps> = () => {
  const [productName, setProductName] = useState('');
  return (
    <main className="flex flex-col">
      <section className="px-8 pt-6 pb-10 w-full rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
            <ImageUploader />
          </div>
          <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
            <form className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-wrap gap-10 items-start w-full max-md:max-w-full">
                <InputFieldForm label='Nome do Produto:' id="produtoName" placeholder="Produto"/>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/29ad184c2c0f345f5b0015f682600371c63c52aedfc56bc72711cc62ac7878ae?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="" className="object-contain shrink-0 self-start w-10 aspect-square" />
              </div>
                <div className="flex flex-col items-start text-xl tracking-tight leading-tight text-black">
                  <InputFieldForm label='Localização:' id="localização" placeholder="Localização"/>
                  <div className="flex gap-2 self-stretch my-auto text-sm tracking-tight">
                    <input
                      type="checkbox"
                      id="useMyLocation"
                      className="flex shrink-0 w-5 h-5 bg-white rounded-md border border-lime-800 border-solid"
                    />
                    <label htmlFor="useMyLocation">Usar a minha localização</label>
                  </div>
                  <div className="flex gap-6 self-start mt-6">
                    <div className="flex gap-4 self-stretch mt-12 max-md:mt-10">
                      <NumberPicker label='Preço:'/>
                      <NumberPicker label='Quantidade:'/>
                    </div>
                  </div>
                  <div className="flex ">
                  <DatePicker label="Validade:" id="expiryDate" />
                  </div>
                </div>
              <Button primary onClick={function(){}}>Criar</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductCreationForm;