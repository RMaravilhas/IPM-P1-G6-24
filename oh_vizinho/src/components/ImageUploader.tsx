import React from 'react';
import Button from './Button';

interface ImageUploaderProps {}

const ImageUploader: React.FC<ImageUploaderProps> = () => {
  return (
    <div className="flex flex-col mt-2.5 w-full text-base font-semibold leading-tight text-center text-lime-800 max-md:mt-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/66a0f8bfb3bf53d3a18e6deaa37426beea3884f44de6e7d19a35c3d726a948fb?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="Product preview" className="object-contain w-full rounded-xl aspect-[1.6]" />
      <div className="flex gap-6 mt-7 max-md:mr-0.5">
        <Button secondary onClick={function(){}}> Adicionar Imagem </Button>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3efd9d85293e4bc8931187af81618c07dd2f4d5ef6aeca2b1b98e248d7682b64?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="" className="object-contain shrink-0 w-12 rounded-lg aspect-square" />
      </div>
    </div>
  );
}

export default ImageUploader;