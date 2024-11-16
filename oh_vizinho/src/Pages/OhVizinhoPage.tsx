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

  const [products, setProducts] = useState<any[]>(productData);
  const [recipes, setRecipes] = useState<any[]>(recipeData);
  const [orders, setOrders] = useState<any[]>(orderData);
  const [pantry, setPantry] = useState<any[]>(pantryData);

  const [isCreateOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);

  const [sideBar, setSideBar] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
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
    const username = sessionStorage.getItem('authToken');
    if (username) {
      const user = users.find((u) => u.name === username);
      if (user) {
        setCurrentUser(user); 
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
      sessionStorage.setItem('authToken', username);
      setIsAuthenticated(true);
      setIsLoginPopupOpen(false);
    } else {
      alert('Utilizador ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('authToken'); 
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
        handleLogout={handleLogout}
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
    </div>
  );
};

export default OhVizinhoPage;
