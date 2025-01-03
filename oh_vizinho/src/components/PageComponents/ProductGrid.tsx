import React from 'react';
import ProductCard, { ProductCardProps } from '../Cards/ProductCard';
import OrderCard, { OrderCardProps } from '../Cards/OrderCard';
import RecipeCard, { RecipeCardProps } from '../Cards/RecipeCard';
import MyOrders, { MyOrdersProps } from '../Cards/MyOrders';
import MyOffers, { MyOffersProps } from '../Cards/MyOffers';
import PantryItem, { PantryItemProps } from '../Cards/Pantry';


import { Query } from '../../types/Query';
import { Product } from '../../types/Product';
import MyMessages, { MyMessagesProps } from '../Cards/MyMessages';
import { messageData } from '../../data';


type CardType = 'message' | 'product' | 'recipe' | 'order' | 'Perfil' | 'Mensagens' | 'Meus Pedidos' | 'Minhas Ofertas' | 'Despensa';

interface ProductGridProps {
  items: (ProductCardProps | RecipeCardProps | OrderCardProps)[];
  cardType: CardType;
  query: Query;
  onProductClick: (product: Product) => void;
  onSaveChange: (isSaving: any) => void;
  customer: string;
  deleteItem: (data: { item: string; orderId?: string; id?: { name: string; owner: string } }) => void;
  editItem: (data: { item: string; orderId?: string; id?: { name: string; owner: string } }) => void;
  onCardClick?: (item: any) => void;
  onContactClick?: (item: any, type: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  cardType,
  query,
  onProductClick,
  onSaveChange,
  customer,
  deleteItem,
  editItem,
  onCardClick,
  onContactClick,
}) => {
  const handleSaveChange = (saved: any) => {
    const toSend = saved;
    onSaveChange(toSend);
  };

  const handleOrderDelete = (orderId: string) => {
    deleteItem({ item: 'order', orderId });
  };

  const handleProductDelete = (name: string) => {
    deleteItem({ item: 'product', id: { name, owner: customer } });
  };

  const handleProductEdit = (product: string) => {
    editItem({ item: 'product', id: { name: product, owner: customer } });
  };

  const handleOrderEdit = (orderId: string) => {
    editItem({ item: 'order', orderId });
  };

  const renderCard = (item: any, index: number) => {
    switch (cardType) {
      case 'product':
        return <ProductCard
          key={index}
          {...(item as ProductCardProps)}
          onClick={() => onProductClick(item)}
          onContactClick={() => onContactClick?.(item, 'P')} />;
      case 'recipe':
        return (
          <RecipeCard
            key={index}
            {...(item as RecipeCardProps)}
            favorite={item.favorite}
            onSaveChange={handleSaveChange}
            onCardClick={() => onCardClick?.(item)}
          />
        );
      case 'order':
        return <OrderCard
          key={index}
          {...(item as OrderCardProps)}
          onContactClick={() => onContactClick?.(item, 'O')}
        />;
      case 'Minhas Ofertas':
        return <MyOffers key={index} {...(item as MyOffersProps)} onDelete={handleProductDelete} onEdit={handleProductEdit} />;
      case 'Meus Pedidos':
        return <MyOrders key={index} {...(item as MyOrdersProps)} onDelete={handleOrderDelete} onEdit={handleOrderEdit} />;
      case 'Despensa':
        return <PantryItem key={index} {...(item as PantryItemProps)} />;
      case 'Perfil':
      case 'Mensagens':
        return <MyMessages key={index} message={messageData[index] || []}  />;
      default:
        return null;
    }
  };

  const filterItems = () => {
    return items.filter((item: any) => {
      let valid = true;
      if (cardType === 'recipe') {
        if (query.name && !item.title.toLowerCase().includes(query.name.toLowerCase())) valid = false;
        if (query.vegetarian && !item.vegetarian) return false;
        if (query.spicy && !item.spicy) return false;
        if (query.glutenFree && !item.glutenFree) return false;
        if (query.lactoseFree && !item.lactoseFree) return false;
        if (query.vegan && !item.vegan) return false;
        if (query.favorite && !item.favorite) return false;
        if (query.products && query.products?.length > 0) {
          const ingredients = item.ingredients.map((a: string) => a.toLowerCase());
          const products = query.products.map((a) => a.toLowerCase());
          valid = products.every((a: string) =>
            ingredients.some((b: string) => b.includes(a) || a.includes(b))
          );
        }
      } else if (cardType === 'product') {
        if (query.name && !item.product.toLowerCase().includes(query.name.toLowerCase())) valid = false;
      } else if (cardType === 'order') {
        if (query.name && !item.product.toLowerCase().includes(query.name.toLowerCase())) valid = false;
      } else if (cardType === 'Minhas Ofertas' || cardType === 'Meus Pedidos') {
        valid = item.customerName === customer;
        if (query.name && !item.product.toLowerCase().includes(query.name.toLowerCase())) valid = false;
      }
      return valid;
    });
  };

  const nCols = (card: CardType): string => {
    switch (card) {
      case 'product':
      case 'order':
        return 'grid-cols-3';
      case 'recipe':
      case 'Meus Pedidos':
      case 'Minhas Ofertas':
        return 'grid-cols-4';
      case 'Despensa':
        return 'grid-cols-1';
      case 'Perfil':
      case 'Mensagens':
      default:
        return 'grid-cols-3';
    }
  };

  return (
    <div className="mt-8 w-full h-full">
      <h1 className="text-4xl font-bold text-center mb-4 text-[#36b391] pb-5">
        {cardType === 'Minhas Ofertas'
          ? 'Minhas Ofertas'
          : cardType === 'Meus Pedidos'
            ? 'Meus Pedidos'
            : cardType === 'Despensa'
              ? 'Despensa'
              : cardType === 'Mensagens'
                ? 'Mensagens'
                : ''}
      </h1>

      <div className={`grid ${nCols(cardType)} gap-5 max-md:grid-cols-2 w-full h-full px-10`}>
        {filterItems().map((item, index) => (
          <div key={index} data-layername="column" className="flex flex-col">
            {renderCard(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
