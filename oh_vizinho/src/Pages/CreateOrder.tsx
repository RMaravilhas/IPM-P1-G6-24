import React, { useEffect, useState } from 'react';
import InputFieldForm from '../components/InputFieldForm';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';

interface OrderCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: (orderData: any) => void;
  editMode: boolean;
  prevData: any;
}

const OrderCreationForm: React.FC<OrderCreationFormProps> = ({ isOpen, onClose, create, editMode, prevData }) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [orderId, setOrderId] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // Estados para erros
  const [errors, setErrors] = useState({
    productName: '',
    location: '',
    quantity: '',
  });

  useEffect(() => {
    const clearFields = () => {
      setProductName('');
      setLocation('');
      setQuantity(0);
      setUnit('kg');
      setErrors({
        productName: '',
        location: '',
        quantity: '',
      });
    };

    if (editMode) {
      setProductName(prevData.product || '');
      setLocation(prevData.address || '');
      const match = prevData.quantity?.match(/^(\d+)(\w+)$/);
      if (match) {
        setQuantity(Number(match[1]));
        setUnit(match[2]);
      }
      setOrderId(prevData.orderId);
    } else {
      clearFields();
    }
  }, [editMode, prevData]);

  if (!isOpen) return null;

  const validateFields = () => {
    const newErrors: any = {};

    if (!productName.trim()) newErrors.productName = 'O nome do produto é obrigatório.';
    if (!location.trim()) newErrors.location = 'A localização é obrigatória.';
    if (quantity <= 0) newErrors.quantity = 'A quantidade deve ser maior que 0.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFields = () => {
    setProductName('');
    setLocation('');
    setQuantity(0);
    setUnit('kg');
    setErrors({
      productName: '',
      location: '',
      quantity: '',
    });
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const newOrder = {
      product: productName,
      address: location,
      quantity: `${quantity}${unit}`,
      orderId,
    };

    create(newOrder);
    clearFields();
    setIsPopUpOpen(false);
  };

  const handleClose = () => {
    clearFields();
    onClose();
  };

  const openPopUp = () => {
    if (validateFields()) {
      setIsPopUpOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {isPopUpOpen ? (
        <section className="px-8 pt-6 pb-6 w-[50%] sm:w-[90%] max-w-[800px] rounded-3xl shadow-lg bg-white relative">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#000000] mb-6 text-center">
            Tem a certeza que quer {editMode ? 'editar' : 'criar'} este pedido?
          </h1>
          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={() => setIsPopUpOpen(false)}
              className="flex-1 py-3 text-lg font-semibold text-white bg-[#ea4903] rounded-lg hover:bg-[#ef590f] transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 py-3 text-lg font-semibold text-white bg-[#37b38f] rounded-lg hover:bg-[#32a382] transition duration-200"
            >
              Confirmar
            </button>
          </div>
        </section>
      ) : (
        <section className="px-8 pt-6 pb-10 w-[70%] sm:w-[70%] max-w-[1200px] rounded-3xl shadow-lg bg-white relative">
          <button
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            ✖
          </button>
          <div className="flex flex-col w-full">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-6">
                <InputFieldForm
                  label="Nome do Produto:"
                  id="produtoName"
                  placeholder="Produto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  error={!!errors.productName}
                />
                {errors.productName && <p className="text-red-500">{errors.productName}</p>}
              </div>

              <div className="mb-6">
                <InputFieldForm
                  label="Localização:"
                  id="localizacao"
                  placeholder="Localização"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={!!errors.location}
                />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
              </div>

              <div className="flex gap-6 items-center mb-8">
                <NumberPicker
                  label="Quantidade:"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                    setErrors((prev) => ({ ...prev, quantity: '' }));
                  }}
                  error={!!errors.quantity}
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
              {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}

              <div className="flex justify-end">
                <Button
                  primary
                  onClick={openPopUp}
                  className="px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  {editMode ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default OrderCreationForm;
