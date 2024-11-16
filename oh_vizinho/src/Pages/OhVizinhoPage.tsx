import React, { useState } from 'react';
import Header from '../components/PageComponents/Header';
import PageHeading from '../components/PageComponents/PageHeading';
import ProductGrid from '../components/PageComponents/ProductGrid';
import Filter from '../components/Filter';
import MenuCard from '../components/Cards/MenuCard';

import { productData, recipeData, orderData } from '../data';

import { Query } from '../types/Query';
import CreateProduct from './CreateProduct';

const OhVizinhoPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [viewType, setViewType] = useState<'product' | 'recipe' | 'order' | 'message' | 'myOffers' | 'myOrder' | 'pantry'>('recipe');
  const [query, setQuery] = useState<Query>({
    name: '',
    products: [],
    vegetarian: false,
    spicy: false,
    glutenFree: false,
    lactoseFree: false,
    vegan: false
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>(productData);
  const [recipes, setRecipes] = useState<any[]>(recipeData);
  const [orders, setOrders] = useState<any[]>(orderData);

  const [isCreateProductPopupOpen, setCreateProductPopupOpen] = useState(false);
  const [isCreateOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);

  const [sideBar, setSideBar] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleViewChange = (type: 'product' | 'recipe' | 'order' | 'message' | 'myOffers' | 'myOrder' | 'pantry') => {
    setViewType(type);
  };

  const toogleCreatePopup = () =>  {
    if(viewType == 'product')
      setCreateProductPopupOpen(!isCreateProductPopupOpen);
    else
      setCreateOrderPopupOpen(!isCreateOrderPopupOpen);
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
      default: 
        return [];
    }
  };

  const handleFilterNameChange = (filterName: string) => {
    setQuery({...query, name: filterName})
  };

  const handleFilterChange = (filter: Query) => {
    const name = query.name;
    setQuery({...filter, name});
  };

  const handleSideBarClick = () => {
    setSideBar(!sideBar);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <div data-layername="base" className="flex overflow-hidden flex-col items-center pt-4 bg-white pb-[548px] max-md:pb-24">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} onSideBar={handleSideBarClick}/>
      <PageHeading 
          togglePopup={togglePopup} 
          onViewChange={handleViewChange} 
          filterName={handleFilterNameChange} 
          isAuthenticated={isAuthenticated} 
          toggleCreatePopup={toogleCreatePopup}
      />
      
      {isAuthenticated || viewType === 'recipe' ? (
        <ProductGrid items={getItemsByType()} cardType={viewType} query={query}/>
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
        onClose={toogleCreatePopup}
        create={createProduct}
      />
      {
      sideBar && isAuthenticated && (
      <div className="fixed top-0 right-0 w-[380px] h-full">
          <MenuCard onMenuItemClick={handleViewChange} logout={handleLogout}/>
      </div>)
      }
    </div>
  );
};

export default OhVizinhoPage;
