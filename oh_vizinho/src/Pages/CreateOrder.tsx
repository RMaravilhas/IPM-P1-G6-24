import React, { useEffect, useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';

interface OrderCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: (productData: any) => void;
  editMode: boolean;
  prevData: any;
}

const OrderCreationForm: React.FC<OrderCreationFormProps> = ({ isOpen, onClose, create, editMode, prevData }) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (editMode) {
      setProductName(prevData.product || '');
      setLocation(prevData.address || '');
      const match = prevData.quantity?.match(/^(\d+)(\w+)$/);
      if (match) {
        setQuantity(Number(match[1]));
        setUnit(match[2]);
      }
      setOrderId(prevData.orderId)
    }
  }, [editMode, prevData]);

  if (!isOpen) return null;

  const clearFields = () => {
    setProductName('');
    setLocation('');
    setQuantity(0);
    setUnit('kg');
  };

  const handleSubmit = () => {
    const newOrder = {
      product: productName,
      address: location,
      quantity: `${quantity}${unit}`,
      orderId
    };

    create(newOrder);
    clearFields();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Criar Novo Pedido</h2>
        <form className="space-y-6">

                <InputFieldForm
                  label="Nome do Produto:"
                  id="produtoName"
                  placeholder="Produto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <InputFieldForm
                  label="Localização:"
                  id="localizacao"
                  placeholder="Localização"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

              <div className="flex gap-1 items-center">
                    <NumberPicker
                      label="Quantidade:"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-20 px-2 py-1 text-base font-semibold text-center bg-white rounded border border-lime-800 border-solid text-lime-800 placeholder-opacity-50 placeholder-gray-400"
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="un">un</option>
                      <option value="l">l</option>
                      <option value="ml">ml</option>
                    </select>
                  </div>

              <div className="text-right">
                <Button
                  primary
                  onClick={handleSubmit}
                  className="px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  {editMode ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
      </section>
    </div>
  );
};

export default OrderCreationForm;
