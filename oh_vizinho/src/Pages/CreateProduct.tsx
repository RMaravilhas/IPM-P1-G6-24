import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import InputFieldForm from '../components/InputFieldForm';
import DatePicker from '../components/DataPicker';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';
import { Product } from '../types/Product';

interface ProductCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: (productData: Product) => void; 
}

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ isOpen, onClose, create }) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const clearFields = () =>  {
    setProductName('');
    setLocation('');
    setPrice(0);
    setQuantity(0);
    setExpiryDate('');
    setImage(null);
    setDescription('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Por favor, carregue uma imagem.');
      return;
    }

    if (!productName.trim() || !location.trim() || price <= 0 || quantity <= 0 || !expiryDate) {
      alert('Por favor, preencha todos os campos necessários.');
      return;
    }

    const newProduct: Product = {
      image: URL.createObjectURL(image),
      name: productName,
      address: location,
      quantity: `${quantity}kg`,
      expiry: expiryDate,
      price: `${price.toFixed(2)}€`,
      description: description,
    };

    create(newProduct);
    clearFields();
    onClose();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

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
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
          <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
            <form className="flex flex-col flex-grow w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-wrap gap-10 items-start w-full max-md:max-w-full">
                <InputFieldForm
                  label="Nome do Produto:"
                  id="produtoName"
                  placeholder="Produto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start text-xl tracking-tight leading-tight text-black mt-6">
                <InputFieldForm
                  label="Localização:"
                  id="localização"
                  placeholder="Localização"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <NumberPicker id="preco" label="Preço:" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  <NumberPicker id="qnt" label="Quantidade:" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
                <div className="flex mt-6">
                  <DatePicker label="Validade:" id="expiryDate" value={expiryDate} onChange={handleDateChange} />
                </div>
              </div>

              <div className="flex items-start gap-4 mt-3">
                <div className="flex flex-col w-[70%]">
                  <label htmlFor="productDescription" className="text-xl tracking-tight leading-tight text-black">
                    Descrição do Produto:
                  </label>
                  <textarea
                    id="productDescription"
                    placeholder="Descreva o produto"
                    className="w-full px-4 py-2 text-base font-semibold leading-tight bg-white rounded border border-lime-800 border-solid text-lime-800 placeholder-opacity-50 placeholder-gray-400 h-20 resize-none mt-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center mt-auto ml-auto">
                  <Button primary onClick={handleSubmit}>Criar</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCreationForm;
