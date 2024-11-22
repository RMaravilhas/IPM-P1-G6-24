import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import InputFieldForm from '../components/InputFieldForm';
import DatePicker from '../components/DataPicker';
import Button from '../components/Button';
import NumberPicker from '../components/NumberPicker';
import { parseISO, isAfter } from 'date-fns';

interface ProductCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  create: (productData: any) => void;
  editMode: boolean;
  prevData: any;
}

const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ isOpen, onClose, create, editMode, prevData }) => {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [productId, setProductId] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // Estados para erros
  const [errors, setErrors] = useState({
    productName: '',
    location: '',
    price: '',
    quantity: '',
    expiryDate: '',
    image: ''
  });

  useEffect(() => {
    const clearFields = () => {
      setProductName('');
      setLocation('');
      setPrice(0);
      setQuantity(0);
      setUnit("kg");
      setExpiryDate("");
      setImage(null);
      setErrors({
        productName: '',
        location: '',
        price: '',
        quantity: '',
        expiryDate: '',
        image: ''
      });
    };
  
    if (editMode) {
      setProductName(prevData.product || '');
      setLocation(prevData.address || '');
      setPrice(parseFloat(prevData.price) || 0);
      const quantityMatch = prevData.quantity?.match(/^(\d+)(\w+)$/);
      if (quantityMatch) {
        setQuantity(Number(quantityMatch[1]));
        setUnit(quantityMatch[2]);
      }
      setExpiryDate(prevData.expiry || '');
      if (prevData.image) {
        fetch(prevData.image)
          .then((response) => response.blob())
          .then((blob) => setImage(new File([blob], 'uploadedImage', { type: blob.type })));
      }
      setProductId(prevData.productId);
    } else {
      clearFields();
    }
    setErrors({
      productName: '',
      location: '',
      price: '',
      quantity: '',
      expiryDate: '',
      image: ''
    });
  }, [editMode, prevData]);
  

  if (!isOpen) return null;

  const validateFields = () => {
    const newErrors: any = {};

    if (!productName.trim()) newErrors.productName = "O nome do produto é obrigatório.";
    if (!location.trim()) newErrors.location = "A localização é obrigatória.";
    if (price < 0) newErrors.price = "O preço deve ser pelo menos 0.";
    if (quantity <= 0) newErrors.quantity = "A quantidade deve ser maior que 0.";
    if (!expiryDate || !isAfter(parseISO(expiryDate), new Date())) {
      newErrors.expiryDate = "A validade deve ser uma data futura.";
    }
    if (!image) newErrors.image = "A imagem do produto é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const clearFields = () => {
  setProductName('');
  setLocation('');
  setPrice(0);
  setQuantity(0);
  setUnit("kg");
  setExpiryDate("");
  setImage(null);
  setErrors({
    productName: '',
    location: '',
    price: '',
    quantity: '',
    expiryDate: '',
    image: ''
  });
};


  const handleSubmit = () => {
    if (!validateFields()) return;

    const newProduct = {
      image: URL.createObjectURL(image!),
      product: productName,
      address: location,
      quantity: `${quantity}${unit}`,
      expiry: expiryDate,
      price: `${price.toFixed(2)}€`,
      productId,
    };

    create(newProduct);
    clearFields();
    setIsPopUpOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
    setErrors((prev) => ({ ...prev, expiryDate: '' }));
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
            Tem a certeza que quer {editMode ? 'editar' : 'criar'} esta oferta?
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
        <section className="px-8 pt-6 pb-10 w-[70%] sm:w-[90%] max-w-[1200px] rounded-3xl shadow-lg bg-white relative">
          <button
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            ✖
          </button>
          <div className="flex gap-8 max-md:flex-col items-center justify-center">
            <div className="flex flex-col w-[40%] max-md:w-full items-center">
              <ImageUploader onImageUpload={handleImageUpload} error={!!errors.image} />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>

            <div className="flex flex-col w-[60%] max-md:w-full">
              <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
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
                    label="Preço: "
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                      setErrors((prev) => ({ ...prev, price: '' }));
                    }}
                    error={!!errors.price}
                  />
                  {errors.price && <p className="text-red-500">{errors.price}</p>}

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 px-14">
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
                        className="w-20 px-2 py-1 ml-auto text-base font-semibold text-center bg-white rounded border border-lime-800 border-solid text-lime-800 placeholder-opacity-50 placeholder-gray-400"
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="un">un</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                      </select>
                    </div>
                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <DatePicker
                    label="Validade:"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleDateChange}
                    error={!!errors.expiryDate}
                  />
                  {errors.expiryDate && <p className="text-red-500">{errors.expiryDate}</p>}
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    primary
                    onClick={openPopUp}
                    className="text-xl px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                  >
                    {editMode ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCreationForm;
