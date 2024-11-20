import React from 'react';

interface CardContentProps {
  title: string;
  description: string;
  ingredientCount: number;
}

const CardContent: React.FC<CardContentProps> = ({ title, description, ingredientCount }) => {
  return (
    <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-1.5 text-xl font-semibold leading-tight flex-grow">
        {/* Title and Description */}
        <h2 className="self-start text-black">{title}</h2>
        <p className="text-base leading-6 text-neutral-500 line-clamp-3">{description}</p>
      </div>

      {/* Ingredient Count Aligned */}
      <div className="flex items-end justify-start mt-auto font-semibold text-xl mb-1 ml-2">
        <p className="text-[#36b391]">{ingredientCount} ingredientes</p>
      </div>
    </div>
  );
};

export default CardContent;
