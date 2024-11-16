import React from 'react';
import ProductCard, { ProductCardProps } from '../Cards/ProductCard';
import OrderCard, { OrderCardProps } from '../Cards/OrderCard';
import RecipeCard, { RecipeCardProps } from '../Cards/RecipeCard';
import MyOrders, { MyOrdersProps } from '../Cards/MyOrders';
import MyOffers, { MyOffersProps } from '../Cards/MyOffers';
import PantryItem, {PantryItemProps} from '../Cards/Pantry';

import { Query } from '../../types/Query';

type CardType = 'product' | 'recipe' | 'order' | 'Perfil' | 'Mensagens' | 'Meus Pedidos' | 'Minhas Ofertas' | 'Dispensa';

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
      case 'Minhas Ofertas':
        return <MyOffers key={index} {...(item as MyOffersProps)} />;
      case 'Meus Pedidos':
        return <MyOrders key={index} {...(item as MyOrdersProps)} />;
      case 'Dispensa':
        return <PantryItem key={index} {...(item as PantryItemProps)} />;
      case 'Perfil':
      case 'Mensagens':
      default:
        return null;
    }
  };

  /**
   * FIXME:Deviamos remover as nossas offers e orders das tabs de offers e order???
   * @returns 
   */
  const filterItems = () => {
    return items.filter((item: any) => {
      let valid = true;
      if(cardType === 'recipe'){
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
        if(query.products && query.products?.length > 0){
          const ingredients = item.ingredients.map((a:string) => a.toLowerCase());
          const products = query.products.map(a => a.toLowerCase())
          valid = products.every((a:string) => ingredients.some((b:string) => b.includes(a) || a.includes(b)));
        }
      }
      else if(cardType === 'product'){
        if(query.name && !item.name.toLowerCase().includes(query.name.toLowerCase()))
          valid = false;
      }
      else if(cardType === 'order'){
        if(query.name && !item.product.toLowerCase().includes(query.name.toLowerCase()))
          valid = false;
      }
      else if(cardType === 'Minhas Ofertas' || cardType === 'Meus Pedidos') {
        valid = item.customerName === 'admin'
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
