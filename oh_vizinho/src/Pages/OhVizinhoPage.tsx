import React, { useState } from 'react';
import Header from '../components/PageComponents/Header';
import PageHeading from '../components/PageComponents/PageHeading';
import ProductGrid from '../components/PageComponents/ProductGrid';
import Filter from '../components/Filter';
import MenuCard from '../components/Cards/MenuCard';

import { productData, recipeData, orderData, pantryData } from '../data';

import { Query } from '../types/Query';
import CreateProduct from './CreateProduct';

type CardType = 'product' | 'recipe' | 'order' | 'Perfil' | 'Mensagens' | 'Meus Pedidos' | 'Minhas Ofertas' | 'Dispensa';

const OhVizinhoPage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [viewType, setViewType] = useState<CardType>('recipe');
  const [query, setQuery] = useState<Query>({
    name: '',
    products: [],
    vegetarian: false,
    spicy: false,
    glutenFree: false,
    lactoseFree: false,
    vegan: false,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>(productData);
  const [recipes, setRecipes] = useState<any[]>(recipeData);
  const [orders, setOrders] = useState<any[]>(orderData);
  const [pantry, setPantry] = useState<any[]>(pantryData);

  const [isCreateProductPopupOpen, setCreateProductPopupOpen] = useState(false);
  const [isCreateOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);

  const [sideBar, setSideBar] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleViewChange = (type: CardType) => {
    setViewType(type);
  };

  const toggleCreatePopup = () => {
    if (viewType === 'product') setCreateProductPopupOpen(!isCreateProductPopupOpen);
    else setCreateOrderPopupOpen(!isCreateOrderPopupOpen);
  };

  const createProduct = (productData: any) => {
    setProducts([...products, productData]);
    setCreateProductPopupOpen(false);
  };

  const getItemsByType = () => {
    switch (viewType) {
      case 'product':
        return products;
      case 'recipe':
        return recipes;
      case 'order':
        return orders;
      case 'Minhas Ofertas':
        return products;
      case 'Meus Pedidos':
        return orders;
      case 'Dispensa':
        return pantry;
      case 'Perfil':
      case 'Mensagens':
      default:
        return [];
    }
  };

  const handleFilterNameChange = (filterName: string) => {
    setQuery({ ...query, name: filterName });
  };

  const handleFilterChange = (filter: Query) => {
    const name = query.name;
    setQuery({ ...filter, name });
  };

  const handleSideBarClick = () => {
    setSideBar(!sideBar);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    //setUserName(null);
  };


  return (
    <div data-layername="base" className="flex overflow-hidden flex-col items-center pt-4 bg-white pb-[548px] max-md:pb-24 w-full">
      {/* Passamos `sideBar` como prop para o Header */}
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        onSideBar={handleSideBarClick}
        sideBar={sideBar} // Estado que controla a visibilidade do botão
        onSetUserName={setUserName}
      />
      <PageHeading
        togglePopup={togglePopup}
        onViewChange={handleViewChange}
        filterName={handleFilterNameChange}
        isAuthenticated={isAuthenticated}
        toggleCreatePopup={toggleCreatePopup}
        currentViewType={viewType}
      />

      {isAuthenticated || viewType === 'recipe' ? (
        <ProductGrid items={getItemsByType()} cardType={viewType} query={query} />
      ) : (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <p className="text-2xl font-semibold text-gray-500">
            Você precisa estar autenticado para acessar esta seção.
          </p>
        </div>
      )}

      <Filter isOpen={showPopup} onClose={togglePopup} filterType={viewType} onFilterChange={handleFilterChange} />
      <CreateProduct
        isOpen={isCreateProductPopupOpen}
        onClose={toggleCreatePopup}
        create={createProduct}
      />
      {sideBar && isAuthenticated && (
        <div className="fixed top-0 right-0 w-[350px] h-full">
          <MenuCard onMenuItemClick={handleViewChange} logout={handleLogout} closeSideBar={handleSideBarClick} userName={userName}/>
        </div>
      )}
    </div>
  );
};

export default OhVizinhoPage;
