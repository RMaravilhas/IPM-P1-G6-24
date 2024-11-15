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

  const handleFilterChange = (filter: Query) => {
    setQuery({...filter});
  };

  return (
    <div data-layername="base" className="flex overflow-hidden flex-col items-center pt-4 bg-white pb-[548px] max-md:pb-24">
      <Header />
      <PageHeading togglePopup={togglePopup} onViewChange={handleViewChange} />
      <ProductGrid items={getItemsByType()} cardType={viewType} />
      <Filter isOpen={showPopup} onClose={togglePopup} filterType={viewType} onFilterChange={handleFilterChange}/>
    </div>
  );
};

export default OhVizinhoPage;
