import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/PageComponents/Header';
import PageHeading from '../components/PageComponents/PageHeading';
import ProductGrid from '../components/PageComponents/ProductGrid';
import Filter from '../components/Filter';
import MenuCard from '../components/Cards/MenuCard';
import RecipeCard, { RecipeCardProps } from '../components/Cards/RecipeCard';
import RecipePopup from '../components/RecipePopup';

import { productData, recipeData, orderData, pantryData, userData } from '../data';

import { Query } from '../types/Query';
import CreateProduct from './CreateProduct';
import CreateOrder from './CreateOrder';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { User } from '../types/User';
import { Product } from '../types/Product';
import ProductDetails from './ProductDetails';

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

  const [recipes, setRecipes] = useState<any[]>(recipeData);
  const [orders, setOrders] = useState<any[]>(orderData);
  const [pantry, setPantry] = useState<any[]>(pantryData);

  const [sideBar, setSideBar] = useState(false);
  const [users, setUsers] = useState<User[]>(userData);
  
  const [currentUser, setCurrentUser] = useState<User|null>();

  const togglePopup = () => setShowPopup(!showPopup);

  const handleViewChange = (type: CardType) => {
    setViewType(type);
    if(type === 'Meus Pedidos' || type === 'Minhas Ofertas' || type === 'Dispensa'){
      const newQuery = {
        name: '',
        products: [],
        vegetarian: false,
        spicy: false,
        glutenFree: false,
        lactoseFree: false,
        vegan: false,
        favorite: false,
        owner: currentUser ? currentUser.name: ''
      }
      setQuery(newQuery);
    }
  };

  const toggleCreatePopup = () => {
    if (viewType === 'product' || viewType === 'Minhas Ofertas') setCreateProductPopupOpen(!isCreateProductPopupOpen);
    else if(viewType === 'order' || viewType === 'Meus Pedidos') setCreateOrderPopupOpen(!isCreateOrderPopupOpen);
    setEditProduct(false);
    setEditOrder(false);
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
  // Recipe Popup
  //////////////////////////////////
  const [isRecipePopupOpen, setRecipePopupOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeCardProps | null>(null);
  
  const handleRecipeClick = (recipe: RecipeCardProps) => {
    setSelectedRecipe(recipe);
    setRecipePopupOpen(true);
  };
  
  
  const closeRecipePopup = () => {
      setRecipePopupOpen(false);
      setSelectedRecipe(null);
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
  };


  //////////////////////////////////
  // CreateProduct
  //////////////////////////////////
  const [isCreateProductPopupOpen, setCreateProductPopupOpen] = useState(false);

  const createProduct = (productData: any) => {
    if(productData) {
      console.log(JSON.stringify(productData))
      const updatedProducts = products.map((item) => {
        if(item.productId === productData.productId)
          return { ...item, ...productData };
        return item;
      })
      setProducts(updatedProducts);
    } else {
      const owner = currentUser ? currentUser.name: '';
      const updatedProduct = [...products, {...productData, customerName: owner, productId: uuidv4()}];
      setProducts(updatedProduct); 
    }
      setCreateProductPopupOpen(false); 
  };

  //////////////////////////////////
  // CreateOrder
  //////////////////////////////////
  const [isCreateOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);

  const createOrder = (orderData: any) => {
    if(editOrder){
      const updatedOrders = orders.map((item) => {
        if (item.orderId === orderData.orderId) {
          return { ...item, ...orderData };
        }
        return item;
      });
      setOrders(updatedOrders);
    } else {
      const owner = currentUser ? currentUser.name: '';
      const updatedOrders = [...orders, {...orderData, customerName: owner, orderId: uuidv4()}];
      setOrders(updatedOrders);
    } 
    setCreateOrderPopupOpen(false); 
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
    const newRecipies = recipes.map((recipe) => {
      if (recipe.title === item.title) {
        return { ...recipe, favorite: item.saved }; 
      }
      return recipe;
    });
    setRecipes([...newRecipies]);
  };

  const handleDeleteItem = (
    data: {  item:string;
    orderId?: string;
    id?: {
      name: string;
      owner: string;
    };
  }) => {
    if(data.item === 'order') {
      const updatedOrders = orders.filter((item) => {
        return item.orderId !== data.orderId;
      })
      setOrders(updatedOrders);
    } else if (data.item === 'product') {
      const updatedProducts = products.filter((item) => {
        return !(item.product === data.id?.name && item.customerName === data.id?.owner); 
      })
      setProducts(updatedProducts);
    }
  }

  const [editOrder, setEditOrder] = useState(false);
  const [prevOrder, setPrevOrder] = useState<any>({});
  const [editProduct, setEditProduct] = useState(false);
  const [prevProduct, setPrevProduct] = useState<any>({});

  const toggleEdit = (
    data: {  item:string;
            orderId?: string;
            id?: {
              name: string;
              owner: string;
            };
  }) => {
    if(data.item === 'order') {
      const prev = orders.find((item) => {
        return item.orderId === data.orderId;
      });
      setPrevOrder(prev);
      setEditOrder(true);
      setCreateOrderPopupOpen(true);
    } else if (data.item === 'product') {
      const prev = products.find((item) => {
        return (item.product === data.id?.name && item.customerName === data.id?.owner);
      });
      setPrevProduct(prev);
      setEditProduct(true);
      setCreateProductPopupOpen(true);
    }
  }

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
      
      {isAuthenticated || viewType === 'recipe' ? (
        <ProductGrid items={getItemsByType()} cardType={viewType} query={query} onCardClick={handleRecipeClick}/>
      ) : (
        <div className="flex items-center justify-center h-[50vh] text-center">
          <p className="text-2xl font-semibold text-gray-500">
            Você precisa estar autenticado para acessar esta seção.
          </p>
        </div>
      )}
        />
      </div>

      <div className="flex flex-col flex-grow w-full px-4"> 
        {isAuthenticated || viewType === 'recipe' ? (
          <ProductGrid 
            items={getItemsByType()} 
            cardType={viewType} 
            query={query} 
            onProductClick={handleOpenProductDetails}
            onSaveChange={handleSaveChange}
            customer={currentUser ? currentUser.name : ''}
            deleteItem={handleDeleteItem}
            editItem={toggleEdit}
            />
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
        editMode={editProduct}
        prevData={prevProduct}
      />

      <CreateOrder
        isOpen={isCreateOrderPopupOpen}
        onClose={toggleCreatePopup}
        create={createOrder}
        editMode={editOrder}
        prevData={prevOrder}
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
      <RecipePopup
        isOpen={isRecipePopupOpen}
        recipe={selectedRecipe}
        onClose={closeRecipePopup}
      />
      <ProductDetails 
        isOpen={isDetailsOpen} 
        onClose={handleCloseProductDetails} 
        product={selectedProduct} />
      
      {sideBar && isAuthenticated && (
        <div className="fixed top-0 right-0 w-[400px] h-full">
          <MenuCard onMenuItemClick={handleViewChange} logout={handleLogout} closeSideBar={handleSideBarClick}  users = {users} userName={(currentUser)?currentUser.name:''}/>
        </div>
      )}
    </div>

  );
};

export default OhVizinhoPage;
