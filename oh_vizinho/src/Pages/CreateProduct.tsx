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
    setExpiryDate('');
    setImage(null);
  }

  const handleSubmit = () => {
    if (!image) {
      alert('Por favor, carregue uma imagem.');
      return;
    }
  
    const newProduct = {
      image: URL.createObjectURL(image), 
      name: productName,               
      address: location,               
      quantity: `${quantity}kg`, // TODO: Create a select to change the type of quantity       
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
                  <NumberPicker label="Preço:" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  <NumberPicker label="Quantidade:" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
                <div className="flex mt-6">
                  <DatePicker label="Validade:" id="expiryDate" value={expiryDate} onChange={handleDateChange} />
                </div>
              </div>
              <div className="mt-auto ml-auto">
                <Button primary onClick={handleSubmit}>Criar</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};


export default ProductCreationForm;
