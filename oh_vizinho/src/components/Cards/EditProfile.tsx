import React, { useState } from "react";
import { ProfileInfo } from "./Profile";

interface EditProfileSectionProps {
  profileInfo: ProfileInfo;
  onSave: (updatedInfo: ProfileInfo) => void;
  onClose: () => void;
}

const EditProfileSection: React.FC<EditProfileSectionProps> = ({
  profileInfo,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<ProfileInfo>({
    ...profileInfo,
    imageUrl:
      profileInfo.imageUrl ||
      "https://cdn.builder.io/api/v1/image/assets/TEMP/55c88b218a49c9733dc8350ff6b37938ca9b9b776aed3b31c919a69dd1465644?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(formData.imageUrl || null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? parseInt(value, 10) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Atualiza a visualização da imagem
      setFormData({
        ...formData,
        imageUrl, // Salva a URL da imagem no estado
      });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
          <img
            src={previewImage || ""}
            alt="Profile Preview"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="px-6 py-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Editar Perfil
          </h2>

          {/* Formulário de edição */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alterar Imagem
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome (não editável)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled
                className="w-full px-3 py-2 border rounded-md shadow-sm bg-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Idade
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          {/* Botões de ação */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSection;
