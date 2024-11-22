import React, { useEffect, useRef, useState } from "react";
import ProfileSection from "./Profile";
import { User } from "../../types/User";

interface MenuItemData {
  text: string;
  marginTop: string;
}

type CardType =
  | "product"
  | "recipe"
  | "order"
  | "Perfil"
  | "Mensagens"
  | "Meus Pedidos"
  | "Minhas Ofertas"
  | "Despensa";

const menuItems: MenuItemData[] = [
  { text: "Perfil", marginTop: "mt-6" },
  { text: "Mensagens", marginTop: "mt-6" },
  { text: "Meus Pedidos", marginTop: "mt-6" },
  { text: "Minhas Ofertas", marginTop: "mt-6" },
  { text: "Despensa", marginTop: "mt-6" },
];

interface MenuContainerProps {
  onMenuItemClick: (buttonName: CardType) => void;
  logout: (value: boolean) => void;
  closeSideBar: () => void;
  users: User[];
  userName: string | null;
}

const MenuContainer: React.FC<MenuContainerProps> = ({
  onMenuItemClick,
  logout,
  closeSideBar,
  userName,
  users,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    logout(false);
  };

  const handleClick = (item: CardType) => {
    if (item === "Perfil") {
      setShowProfilePopup(true);
    } else {
      onMenuItemClick(item);
    }
  };

  // Fechar o menu se clicar fora da sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeSideBar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSideBar]);

  return (
    <nav
      ref={menuRef}
      className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#36b391] to-[#248e67] text-white"
    >
      <div className="flex flex-col items-center w-full max-w-md px-10 py-10">
        <button
          className="p-1 w-[40px] h-[40px] bg-transparent border-0 rounded-full transition-opacity mr-auto"
          onClick={closeSideBar}
        >
          <img
            loading="lazy"
            src="https://i.ibb.co/hmVX3kb/burger.png"
            alt="User profile"
            className="object-contain w-full h-full rounded-full"
          />
        </button>

        <h1 className="text-4xl font-bold mb-8 text-center">
          Bem-vindo {userName || "Visitante"}
        </h1>

        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full text-xl py-4 mb-5 rounded-lg bg-[#36b391] hover:bg-[#248e67] transition-all shadow-lg hover:shadow-xl"
            onClick={() => handleClick(item.text as CardType)}
          >
            {item.text}
          </button>
        ))}

        <button
          className="w-full text-xl py-4 mb-5 max-w-full whitespace-nowrap rounded-lg min-w-[126px] max-md:px-5 transition-colors duration-300 text-[#36b391] bg-white border border-[#36b391] border-solid hover:bg-[#36b391] hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Renderizar o pop-up do perfil */}
      {showProfilePopup && (
        <ProfileSection
          onClose={() => setShowProfilePopup(false)}
          users= {users}
          userName={userName}
        />
      )}
    </nav>
  );
};

export default MenuContainer;