import React from 'react';
import ProductCard, { ProductCardProps } from '../Cards/ProductCard';
import OrderCard, { OrderCardProps } from '../Cards/OrderCard';
import RecipeCard, { RecipeCardProps } from '../Cards/RecipeCard';

type CardType = 'product' | 'recipe' | 'order';

interface ProductGridProps {
  items: (ProductCardProps | RecipeCardProps | OrderCardProps)[];
  cardType: CardType;
}

const ProductGrid: React.FC<ProductGridProps> = ({ items, cardType }) => {
  const renderCard = (item: any, index: number) => {
    switch (cardType) {
      case 'product':
        return <ProductCard key={index} {...(item as ProductCardProps)} />;
      case 'recipe':
        return <RecipeCard key={index} {...(item as RecipeCardProps)} />;
      case 'order':
        return <OrderCard key={index} {...(item as OrderCardProps)} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 w-full max-w-[1248px] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        {items.map((item, index) => (
          <div key={index} data-layername="column" className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            {renderCard(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
