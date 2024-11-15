import React from 'react';
import ProductCard, { ProductCardProps } from '../Cards/ProductCard';
import OrderCard, { OrderCardProps } from '../Cards/OrderCard';
import RecipeCard, { RecipeCardProps } from '../Cards/RecipeCard';

import { Query } from '../../types/Query';

type CardType = 'product' | 'recipe' | 'order';

interface ProductGridProps {
  items: (ProductCardProps | RecipeCardProps | OrderCardProps)[];
  cardType: CardType;
  query: Query;
}

const ProductGrid: React.FC<ProductGridProps> = ({ items, cardType, query }) => {
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

  const filterItems = () => {
    return items.filter((item: any) => {
      let valid = true;
      if(cardType == 'recipe'){
        if(query.name && !item.title.toLowerCase().includes(query.name.toLowerCase()))
          valid = false;
      if(query.vegetarian && !item.vegetarian)
        return false;
      if(query.spicy && !item.spicy)
        return false;
      if(query.glutenFree && !item.glutenFree)
        return false;
      if(query.lactoseFree && !item.lactoseFree)
        return false;
      if(query.vegan && !item.vegan)
        return false;
      }
      else if(cardType == 'product'){
        if(query.name && !item.name.toLowerCase().includes(query.name.toLowerCase()))
          valid = false;
      }
      else{
        if(query.name && !item.product.toLowerCase().includes(query.name.toLowerCase()))
          valid = false;
      }
      return valid;
    });
  };

  return (
    <div className="mt-8 w-full max-w-[1248px] max-md:max-w-full">
      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        {filterItems().map((item, index) => (
          <div 
            key={index} 
            data-layername="column" 
            className="flex flex-col"
          >
            {renderCard(item, index)}
          </div>
        ))}
      </div>
    </div>


  );
};

export default ProductGrid;
