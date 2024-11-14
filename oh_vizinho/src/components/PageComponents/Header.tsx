import React, { useState, useEffect } from 'react';
import LoginPage from '../../Pages/LoginPage';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setUserName(token); 
    }
  }, []);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      setUserName(username);
      sessionStorage.setItem('authToken', username); 
      setIsLoginPopupOpen(false); 
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };

  const handleRegister = () => {
    console.log("Redirecting to registration page...");
  };

  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <header className="flex flex-wrap gap-5 justify-between w-full max-w-[1232px] max-md:max-w-full">
      <div className="flex gap-5 text-3xl font-medium tracking-tight leading-none text-lime-800">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1646e1c35932c1c4f10ba894d7b9696b5a28da4a7adc8802e846ac0a87806369?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" 
          alt="Oh Vizinho! logo" 
          className="object-contain shrink-0 w-20 aspect-square" 
        />
        <div data-layername="ohVizinho" className="my-auto basis-auto">Oh Vizinho!</div>
      </div>

      <div className="flex gap-6 my-auto text-base leading-tight text-center text-black">
        {isLoggedIn ? (
          <>
            <div data-layername="userName" className="my-auto basis-auto">{userName}</div>
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/def97886f7fc40cbecb9bf0fdc4ff631c9da645840e7351d9cb6d7a9153d683b?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" 
              alt="User profile" 
              className="object-contain shrink-0 aspect-square w-[30px]" 
            />
          </>
        ) : (
          <button onClick={handleLoginClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Login
          </button>
        )}
      </div>

      {/* Popup de login */}
      <LoginPage
        isOpen={isLoginPopupOpen}
        onClose={handleClosePopup}
        login={handleLogin}       
        register={handleRegister}  
      />
    </header>
  );
};

export default Header;
