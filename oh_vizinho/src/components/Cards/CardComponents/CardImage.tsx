import React from 'react';

interface CardImageProps {
  src: string;
  alt: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt }) => {
  return (
    <div className="flex flex-col w-full text-base font-semibold leading-tight text-center text-lime-800 whitespace-nowrap">
      <img src={src} alt={alt} className="object-contain rounded-xl aspect-[1.34] w-[187px]" />
    </div>
  );
};

export default CardImage;