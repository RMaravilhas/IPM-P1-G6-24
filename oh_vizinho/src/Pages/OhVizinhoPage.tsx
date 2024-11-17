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
    vegan: false,
    favorite: false
  });

  const [products, setProducts] = useState<any[]>(productData);
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
    if(type === 'Meus Pedidos' || type === 'Minhas Ofertas' || type === 'Dispensa')
      resetQuery();
      setQuery({
        owner: currentUser ? currentUser.name: ''
      })
  };

  const resetQuery = () => {
    setQuery({
      name: '',
      products: [],
      vegetarian: false,
      spicy: false,
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
      favorite: false
    }) 
  }

  const toggleCreatePopup = () => {
    if (viewType === 'product') setCreateProductPopupOpen(!isCreateProductPopupOpen);
    else setCreateOrderPopupOpen(!isCreateOrderPopupOpen);
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
  // Cards Filter
  //////////////////////////////////
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

  /**
   * Save Recipe
   */
  const handleSaveChange = (item: any) => {
    console.log(JSON.stringify(item));
    const newRecipies = recipes.map((recipe) => {
      if (recipe.title === item.title) {
        return { ...recipe, favorite: item.saved }; 
      }
      return recipe;
    });
    setRecipes([...newRecipies]);
  };

  return (
    <div data-layername="base" className="flex overflow-hidden flex-col items-center pt-4 bg-white pb-[548px] max-md:pb-24 w-full h-full">
      <div className="flex flex-col flex-grow w-full px-6">
        <Header
          isAuthenticated={isAuthenticated}
          onSideBar={handleSideBarClick}
          sideBar={sideBar} 
          toggleLoginPopup={toggleLoginPopup}
        />
      </div>
      
      <div className="flex flex-col flex-grow w-full px-6">
        <PageHeading
          togglePopup={togglePopup}
          onViewChange={handleViewChange}
          filterName={handleFilterNameChange}
          isAuthenticated={isAuthenticated}
          toggleCreatePopup={toggleCreatePopup}
          currentViewType={viewType}
        />
      </div>

      <div className="flex flex-col flex-grow w-full px-4"> 
        {isAuthenticated || viewType === 'recipe' ? (
          <ProductGrid items={getItemsByType()} cardType={viewType} query={query} onSaveChange={handleSaveChange}/>
        ) : (
          <div className="flex items-center justify-center h-[50vh] text-center">
            <p className="text-2xl font-semibold text-gray-500">
              Você precisa estar autenticado para acessar esta seção.
            </p>
          </div>
        )}
      </div>
      
      <Filter isOpen={showPopup} onClose={togglePopup} filterType={viewType} onFilterChange={handleFilterChange} />
      
      <CreateProduct 
        isOpen={isCreateProductPopupOpen}
        onClose={toggleCreatePopup}
        create={createProduct}
      />

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
      
      {sideBar && isAuthenticated && (
        <div className="fixed top-0 right-0 w-[400px] h-full">
          <MenuCard onMenuItemClick={handleViewChange} logout={handleLogout} closeSideBar={handleSideBarClick} userName={(currentUser)?currentUser.name:''}/>
        </div>
      )}
    </div>

  );
};

export default OhVizinhoPage;
