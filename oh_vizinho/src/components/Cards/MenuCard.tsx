import React from 'react';
import MenuItem from './CardComponents/MenuItem';
import { logDOM } from '@testing-library/react';

// Definindo o tipo dos itens do menu
interface MenuItemData {
  text: string;
  marginTop: string;
  marginLeft?: string;
}

type CardType = 'product' | 'recipe' | 'order' | 'message' | 'myOffers' | 'myOrder' | 'pantry';

// Definindo os itens do menu
const menuItems: MenuItemData[] = [
  { text: "Perfil", marginTop: "mt-20" },
  { text: "Mensagens", marginTop: "mt-9" },
  { text: "Meus Pedidos", marginTop: "mt-9" },
  { text: "Minhas Ofertas", marginTop: "mt-9"},
  { text: "Dispensa", marginTop: "mt-9" }
];

interface MenuContainerProps {
  onMenuItemClick: (buttonName: CardType) => void;  // Função para receber o nome do item pressionado
  logout: (value: boolean) => void;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ onMenuItemClick, logout }) => {

    const handleLogout = () => {
        sessionStorage.removeItem('authToken'); // Remove o token de autenticação
        logout(false); // Atualiza o estado global na página
      };

  return (
    <nav className="flex flex-col mx-auto w-full text-3xl leading-tight text-center text-black max-w-[480px] bg-[#36b391]">
      <div className="flex relative flex-col items-center px-10 pt-7 w-full aspect-[0.341] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`text-white ${item.marginTop} py-3 px-6 mb-3 rounded-lg  hover:bg-[#248e67]`}
            onClick={() => onMenuItemClick(item.text as CardType)}  // Envia o nome do botão ao ser clicado
          >
            {item.text}
          </button>
        ))}
        <button
        className={`text-white mt-9 py-3 px-6 mb-3 rounded-lg hover:bg-[#248e67]`}
        onClick={handleLogout}  // Envia o nome do botão ao ser clicado
        >
        Logout
        </button>
      </div>
    </nav>
  );
};

export default MenuContainer;
