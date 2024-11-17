import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import InputFieldForm from '../components/InputFieldForm';
import DatePicker from '../components/DataPicker';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';

interface OrderCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: (productData: any) => void; 
}

const OrderCreationForm: React.FC<OrderCreationFormProps> = ({ isOpen, onClose, create }) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('kg');

  if (!isOpen) return null;

  const clearFields = () =>  {
    setProductName('');
    setLocation('');
    setQuantity(0);
    setUnit('kg');
  };

  const handleSubmit = () => {
  
    const newOrder = {
      product: productName,               
      address: location,               
      quantity: `${quantity}${unit}`, // Unidade ajustável (ex.: kg, g, un)
    };
  
    create(newOrder);
    clearFields();
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
                <div className="flex flex-col w-[60%] max-md:w-full">
                    <form className="flex flex-col">
                        <div className="mb-6">
                            <InputFieldForm
                            label="Nome do Produto:"
                            id="produtoName"
                            placeholder="Produto"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <InputFieldForm
                            label="Localização:"
                            id="localizacao"
                            placeholder="Localização"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-6 items-center mb-8">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 px-14">
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

export default OrderCreationForm;
