import React, { useState, useEffect } from 'react';
import LoginPage from '../../Pages/LoginPage';
import Button from '../Button';

interface HeaderProps {
  setIsAuthenticated: (value: boolean) => void;
  onSideBar: (isClicked: boolean) => void; // Função para emitir o evento booleano
  isAuthenticated: boolean; // Nova propriedade para verificar se o usuário está autenticado
}

const Header: React.FC<HeaderProps> = ({ setIsAuthenticated, onSideBar, isAuthenticated }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated); // Usar a variável isAuthenticated do pai
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  // Sincroniza isLoggedIn com isAuthenticated
  useEffect(() => {
    setIsLoggedIn(isAuthenticated); // Atualiza isLoggedIn sempre que isAuthenticated mudar
  }, [isAuthenticated]);

  // Sempre que isLoggedIn mudar, atualiza isAuthenticated
  useEffect(() => {
    setIsAuthenticated(isLoggedIn); // Atualiza o estado no pai sempre que isLoggedIn mudar
  }, [isLoggedIn, setIsAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        setUserName(token);
      }
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogin = (username: string, password: string) => {
    if (username) {
      setIsLoggedIn(true);
      setUserName(username);
      sessionStorage.setItem('authToken', username);
      setIsAuthenticated(true); // Atualiza o estado global na página
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

  const handleSideBarClick = () => {
    onSideBar(true);
  };

  return (
    <header className="flex flex-wrap gap-5 justify-between w-full max-w-[1232px] max-md:max-w-full">
      <div className="flex gap-5 text-3xl font-medium tracking-tight leading-none text-[#36b391]">
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
            <button
              onClick={handleSideBarClick}
              className="p-1 w-[30px] h-[30px] bg-transparent border-0 rounded-full"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/def97886f7fc40cbecb9bf0fdc4ff631c9da645840e7351d9cb6d7a9153d683b?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
                alt="User profile"
                className="object-contain w-full h-full rounded-full"
              />
            </button>
          </>
        ) : (
          <Button onClick={handleLoginClick} primary>
            Login
          </Button>
        )}
      </div>

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
