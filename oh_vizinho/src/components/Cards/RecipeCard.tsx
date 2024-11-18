// src/components/RecipeCard.tsx
import React, { useState } from 'react';
import CardContent from './CardComponents/CardContent';
import CardButton from './CardComponents/CardButton';
import CardImage from './CardComponents/CardImage';

export interface RecipeCardProps {
  image: string;
  title: string;
  description: string;
  ingredientCount: number;
  ingredients: string[];
  steps: string[];
  favorite?: boolean;
  onSaveChange: (isSaving: any) => void;
  onCardClick?: (item: RecipeCardProps) => void; // Optional handler for card clicks
}

const RecipeCard: React.FC<RecipeCardProps> = ({ image, title, description, ingredientCount, ingredients, steps, favorite, onSaveChange }) => {

  const handleSaveChange = (saved: boolean) => {
    const toSend = {saved: saved, title: title};
    onSaveChange(toSend)
  };

const RecipeCard: React.FC<RecipeCardProps> = ({
  image,
  title,
  description,
  ingredientCount,
  ingredients,
  steps,
  onCardClick,
}) => {
  console.log('Image path:', image); // Debugging image path

  const handleClick = () => {
    // Trigger the click handler with the recipe's data
    if (onCardClick) {
      onCardClick({
        image,
        title,
        description,
        ingredientCount,
        ingredients,
        steps,
      });
    }
  };

  return (
    <article className="overflow-hidden px-5 py-6 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-w-[550px]">
    <article
      onClick={handleClick} // Add the click handler here
      className="overflow-hidden px-5 py-6 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-w-[400px] cursor-pointer"
    >
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
          <CardImage src={image} alt={title} />
          <CardButton onSaveChange={handleSaveChange} favorite={favorite}/>
        </div>
        <CardContent
          title={title}
          description={description}
          ingredientCount={ingredientCount}
        />
      </div>
    </article>
  );
};

export default RecipeCard;
