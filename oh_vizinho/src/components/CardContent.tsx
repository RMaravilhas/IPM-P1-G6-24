import React from 'react';

interface CardContentProps {
  title: string;
  description: string;
  ingredientCount: number;
}

const CardContent: React.FC<CardContentProps> = ({ title, description, ingredientCount }) => {
  return (
    <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-1.5 text-xl font-semibold leading-tight">
        <h2 className="self-start text-black">{title}</h2>
        <p className="text-base leading-6 text-neutral-500">{description}</p>
        <p className="mt-16 ml-3 text-lime-800">{ingredientCount} ingredientes</p>
      </div>
    </div>
  );
};

export default CardContent;