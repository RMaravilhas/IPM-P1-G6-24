import React, { useState } from 'react';
import Button from '../Button';

interface PageHeadingProps {
  togglePopup: () => void;
  toggleCreatePopup: () => void;
  onViewChange: (type: CardType) => void;
  filterName: (name: string) => void;
  isAuthenticated: boolean;
  currentViewType: CardType;
}

type CardType = 'product' | 'recipe' | 'order' | 'Perfil' | 'Mensagens' | 'Meus Pedidos' | 'Minhas Ofertas' | 'Dispensa';

const PageHeading: React.FC<PageHeadingProps> = ({
  togglePopup,
  onViewChange,
  filterName,
  isAuthenticated,
  toggleCreatePopup,
  currentViewType,
}) => {
  const [name, setName] = useState<string>('');

  const handleSelect = (type: CardType) => {
    onViewChange(type);
  };

  const addNameToQuery = () => {
    filterName(name.trim());
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNameToQuery();
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    togglePopup();
  };

  const renderCreateButton = (selected: CardType) => {
    if (!isAuthenticated) return null;

    const buttonText = selected === 'product' ? 'Oferecer' : selected === 'order' ? 'Pedir' : null;
    if (!buttonText) return null;

    return <div className='text-3xl'>
            <Button secondary onClick={toggleCreatePopup}>{buttonText}</Button>
           </div>;
  };

  const toPortuguese = (type: string):string => {
    if(type === 'product')
      return 'Ofertas';
    else if(type === 'order')
      return 'Pedidos';
    else
      return 'Receitas';
  }

  return (
    <section
      data-layername="pageHeading"
      className="flex flex-col items-center self-stretch px-5 pt-20 pb-2 w-full text-black bg-white bg-opacity-0 max-md:px-5 max-md:max-w-full"
    >
      <div className="flex flex-wrap gap-5 justify-between items-start w-full max-md:max-w-full">
        <nav className="flex gap-10 mt-1.5 text-5xl tracking-tighter leading-tight whitespace-nowrap">
          {['recipe', 'product', 'order'].map((type) => (
            <div key={type} className="flex flex-col self-start">
              <div
                onClick={() => handleSelect(type as CardType)}
                data-layername={type}
                className={`grow my-auto cursor-pointer ${
                  currentViewType === type ? 'text-[#36b391]' : ''
                }`}
              >
                {toPortuguese(type)}
              </div>
              <div
                className={`z-10 shrink-0 border-solid border-[3px] border-[#36b391] border-opacity-40 h-[3px] ${
                  currentViewType === type ? 'block' : 'hidden'
                }`}
              />
            </div>
          ))}
        </nav>
        <div className="flex gap-6 text-base leading-tight text-center">
          {renderCreateButton(currentViewType)}
          <form className="flex gap-3 self-start">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f2b706baa8a6280aad87f218e314046f750e963a30f061d85b93262014e57b6?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
              alt=""
              className="object-contain shrink-0 aspect-square w-[40px]"
            />
            <div className="flex flex-col self-start mt-2">
              <label htmlFor="searchInput" className="sr-only">Pesquisar</label>
              <input
                id="searchInput"
                type="text"
                value={name}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyPress}
                onBlur={addNameToQuery}
                placeholder="Pesquisar . . ."
                className="self-start bg-transparent border-none outline-none text-3xl"
              />
              <div
                data-layername="divider"
                className="shrink-0 mt-1 h-0.5 border-2 border-solid border-neutral-200"
              />
            </div>
          </form>
          {currentViewType === 'recipe' ? (
            <button
              type="button"
              data-layername="listChip"
              onClick={handleFilterClick}
              className="overflow-hidden px-7 py-2.5 font-semibold text-[#36b391] text-3xl whitespace-nowrap bg-white rounded-3xl 
              border border-solid border-[#36b391] max-md:px-5 transition-colors duration-300 hover:bg-[#248e67] hover:text-white"
            >
              Filtrar
            </button>
          ) : null}
        </div>
      </div>
      <div
        data-layername="divider"
        className="shrink-0 mt-5 max-w-full h-0 border-2 border-solid border-neutral-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full"
      />
    </section>
  );
};

export default PageHeading;
