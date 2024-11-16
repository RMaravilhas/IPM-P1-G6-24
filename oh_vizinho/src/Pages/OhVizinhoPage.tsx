import React, { useEffect, useState } from 'react';
import Header from '../components/PageComponents/Header';
import PageHeading from '../components/PageComponents/PageHeading';
import ProductGrid from '../components/PageComponents/ProductGrid';
import Filter from '../components/Filter';
import MenuCard from '../components/Cards/MenuCard';

import { productData, recipeData, orderData, pantryData } from '../data';

import { Query } from '../types/Query';
import CreateProduct from './CreateProduct';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { User } from '../types/User';
import ProductDetails from './ProductDetails';
import { Product } from '../types/Product';

type CardType = 'product' | 'recipe' | 'order' | 'Perfil' | 'Mensagens' | 'Meus Pedidos' | 'Minhas Ofertas' | 'Dispensa';

const OhVizinhoPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [viewType, setViewType] = useState<CardType>('recipe');
  const [query, setQuery] = useState<Query>({
    name: '',
    products: [],
    vegetarian: false,
    spicy: false,
    glutenFree: false,
    lactoseFree: false,
    vegan: false
  });


  const [recipes, setRecipes] = useState<any[]>(recipeData);
  const [orders, setOrders] = useState<any[]>(orderData);
  const [pantry, setPantry] = useState<any[]>(pantryData);

  const [isCreateOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);

  const [sideBar, setSideBar] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      name: 'admin',
      password: '1234',
      location: 'Default City',
      image: 'https://example.com/default-avatar.png',
    },
  ]);
  
  const [currentUser, setCurrentUser] = useState<User|null>();

  const togglePopup = () => setShowPopup(!showPopup);

  const handleViewChange = (type: CardType) => {
    setViewType(type);
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

  //////////////////////////////////
  // Login Popup
  //////////////////////////////////
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('authToken');
    if (username) {
      const user = users.find((u) => u.name === username);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true); 
      }
    }
  }, [users]);
  
  const toggleLoginPopup = () => {
    if(isRegisterPopupOpen)
      setRegisterPopupOpen(false)
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const handleLogin = (username: string, password: string) => {
    const user = users.find((u) => u.name === username && u.password === password);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('authToken', username);
      setIsAuthenticated(true);
      setIsLoginPopupOpen(false);
    } else {
      alert('Utilizador ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken'); 
    setIsAuthenticated(false); 
  };

  //////////////////////////////////
  // Register Popup
  //////////////////////////////////  
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);

  const toggleRegisterPopup = () => {
    setRegisterPopupOpen(!isRegisterPopupOpen);
  }

  const toggleFromRegisterToLoginPopup = () => {
    setRegisterPopupOpen(!isRegisterPopupOpen);
    setIsLoginPopupOpen(!isLoginPopupOpen);
  }

  const handleRegister = (newUser: User) => {
    setUsers([...users, newUser]);
    toggleRegisterPopup();
    toggleLoginPopup();

    console.log(users)
  };


  //////////////////////////////////
  // CreateProduct
  //////////////////////////////////
  const [isCreateProductPopupOpen, setCreateProductPopupOpen] = useState(false);

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


  //////////////////////////////////
  // Product Details
  //////////////////////////////////
  const [products, setProducts] = useState<any[]>(productData);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenProductDetails = (product: Product) => {
    setIsDetailsOpen(true);
    setSelectedProduct(product);
    
  }
  const handleCloseProductDetails = () =>  {
    setIsDetailsOpen(false);
    setSelectedProduct(null);
  }

  //////////////////////////////////
  // Cards Filter
  //////////////////////////////////
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

  return (
    <div data-layername="base" className="flex overflow-hidden flex-col items-center pt-4 bg-white pb-[548px] max-md:pb-24 w-full">
      <Header 
        isAuthenticated={isAuthenticated} 
        toggleLoginPopup={toggleLoginPopup}
        username={(currentUser) ? currentUser.name : ''}
        onSideBar={handleSideBarClick}
        />
      <PageHeading 
          togglePopup={togglePopup} 
          onViewChange={handleViewChange} 
          filterName={handleFilterNameChange} 
          isAuthenticated={isAuthenticated} 
          toggleCreatePopup={toogleCreatePopup}
          currentViewType={viewType}
      />
      
      {isAuthenticated || viewType === 'recipe' ? (
        <ProductGrid 
          items={getItemsByType()} 
          cardType={viewType} 
          query={query}
          onProductClick={handleOpenProductDetails}
          />
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
      <div className="fixed top-0 right-0 w-[350px] h-full">
          <MenuCard onMenuItemClick={handleViewChange} logout={handleLogout}/>
      </div>)
      }
      <LoginPage
        isOpen={isLoginPopupOpen}
        onClose={toggleLoginPopup}
        login={handleLogin}       
        register={toggleFromRegisterToLoginPopup}  
      />
      <RegisterPage
        isOpen={isRegisterPopupOpen}
        onClose={toggleRegisterPopup}
        register={handleRegister}  
        goToLogin={toggleFromRegisterToLoginPopup}
      />
      <ProductDetails 
        isOpen={isDetailsOpen} 
        onClose={handleCloseProductDetails} 
        product={selectedProduct} />

    </div>
  );
};

export default OhVizinhoPage;
