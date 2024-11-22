import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  error ?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, error}) => {
  const [preview, setPreview] = useState<string>(''); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageUpload(file); 
    }
  };

  return (
    <div className={`flex flex-col mt-2.5 w-full text-base font-semibold leading-tight text-center ${error ? 'border-red-500' : 'border-lime-800' } max-md:mt-10`}>
      {preview ? (
        <img
          loading="lazy"
          src={preview}
          alt="Product preview"
          className="object-contain w-full rounded-xl aspect-[1.6]"
        />
      ) : (
        <div className="object-contain w-full rounded-xl aspect-[1.6] bg-gray-200 flex items-center justify-center">
          <p>Preview da imagem</p>
        </div>
      )}
      <div className="flex gap-6 mt-7 justify-center w-full">
        <label className={`overflow-hidden text-lime-800 bg-white border ${error ? 'border-red-500' : 'border-lime-800' } border-solid px-10 py-3.5 w-[390px] text-center whitespace-nowrap rounded-lg max-md:px-5 cursor-pointer`}>
          📷 Adicionar Imagem
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
