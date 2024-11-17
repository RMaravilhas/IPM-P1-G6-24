import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import InputFieldForm from '../components/InputFieldForm';
import DatePicker from '../components/DataPicker';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';

interface ProductCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: (productData: any) => void; 
}

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ isOpen, onClose, create }) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('kg'); // Unidade ajustável
  const [expiryDate, setExpiryDate] = useState('');
  const [image, setImage] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const clearFields = () =>  {
    setProductName('');
    setLocation('');
    setPrice(0);
    setQuantity(0);
    setUnit('kg');
    setExpiryDate('');
    setImage(null);
  };

  const handleSubmit = () => {
    if (!image) {
      alert('Por favor, carregue uma imagem.');
      return;
    }
  
    const newProduct = {
      image: URL.createObjectURL(image), 
      name: productName,               
      address: location,               
      quantity: `${quantity}${unit}`, // Unidade ajustável (ex.: kg, g, un)
      expiry: expiryDate,               
      price: `${price.toFixed(2)}€`,    
    };
  
    console.log(newProduct);
    create(newProduct);
    clearFields();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section className="px-8 pt-6 pb-10 w-[70%] sm:w-[90%] max-w-[1200px] rounded-3xl shadow-lg bg-white relative">
        <button
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex gap-8 max-md:flex-col items-center justify-center">
  {/* Bloco da imagem */}
  <div className="flex flex-col w-[40%] max-md:w-full items-center">
    <ImageUploader onImageUpload={handleImageUpload} />
  </div>

  {/* Bloco do formulário */}
  <div className="flex flex-col w-[60%] max-md:w-full">
    <form className="flex flex-col">
      {/* Nome do Produto */}
      <div className="mb-6"> {/* Espaçamento reduzido */}
        <InputFieldForm
          label="Nome do Produto:"
          id="produtoName"
          placeholder="Produto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Localização */}
      <div className="mb-6"> {/* Espaçamento maior */}
        <InputFieldForm
          label="Localização:"
          id="localizacao"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

{/* Preço e Quantidade */}
<div className="flex gap-6 items-center mb-8">
  {/* Preço */}
  <NumberPicker
    label="Preço: "
    value={price}
    onChange={(e) => setPrice(Number(e.target.value))}
  />

  {/* Quantidade */}
  <div className="flex flex-col"> {/* Adicionado gap-2 para espaçamento vertical */}
    <div className="flex items-center gap-1 px-14"> {/* Espaçamento entre a caixa e o seletor */}
      <NumberPicker
        label="Quantidade:"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="w-20 px-2 py-1 ml-auto text-base font-semibold text-center bg-white rounded border border-lime-800 border-solid text-lime-800 placeholder-opacity-50 placeholder-gray-400"
      >
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="un">un</option>
        <option value="l">l</option>
        <option value="ml">ml</option>
      </select>
    </div>
  </div>
</div>



      {/* Validade */}
      <div className="mb-4">
        <DatePicker
          label="Validade:"
          id="expiryDate"
          value={expiryDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Botão Criar */}
      <div className="flex justify-end mt-4">
        <Button primary onClick={handleSubmit} className="text-xl px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white">
          Criar
        </Button>
      </div>
    </form>
  </div>
</div>

      </section>
    </div>
  );
};

export default ProductCreationForm;
