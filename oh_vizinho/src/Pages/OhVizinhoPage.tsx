import React, { useState } from 'react';
import Header from '../components/PageComponents/Header';
import PageHeading from '../components/PageComponents/PageHeading';
import ProductGrid from '../components/PageComponents/ProductGrid';
import Filter from '../components/Filter';

import { productData, recipeData, orderData } from '../data';

import { Query } from '../types/Query';

const OhVizinhoPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [viewType, setViewType] = useState<'product' | 'recipe' | 'order'>('recipe');
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

  const togglePopup = () => setShowPopup(!showPopup);

  const handleViewChange = (type: 'product' | 'recipe' | 'order') => {
    setViewType(type);
  };

  const getItemsByType = () => {
    switch (viewType) {
      case 'product':
        return productData;
      case 'recipe':
        return recipeData;
      case 'order':
        return orderData;
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

  return (
    <div data-layername="base" className="flex overflow-hidden flex-col items-center pt-4 bg-white pb-[548px] max-md:pb-24">
      <h1>{JSON.stringify(query)}</h1>
      <Header setIsAuthenticated={setIsAuthenticated}/>
      <PageHeading togglePopup={togglePopup} onViewChange={handleViewChange} filterName={handleFilterNameChange}/>
      
      {isAuthenticated || viewType === 'recipe' ? (
        <ProductGrid items={getItemsByType()} cardType={viewType} />
      ) : (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <p className="text-2xl font-semibold text-gray-500">
            Você precisa estar autenticado para acessar esta seção.
          </p>
        </div>
      )}
      
      <Filter isOpen={showPopup} onClose={togglePopup} filterType={viewType} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default OhVizinhoPage;
