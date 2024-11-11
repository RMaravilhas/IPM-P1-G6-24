import React, { useState } from 'react';

interface PageHeadingProps {
    togglePopup: () => void;
    onViewChange: (type: 'product' | 'recipe' | 'order') => void;
}

const PageHeading: React.FC<PageHeadingProps> = ({ togglePopup, onViewChange }) => {
  const [selected, setSelected] = useState<'recipe' | 'product' | 'order'>('recipe');

  const handleSelect = (type: 'recipe' | 'product' | 'order') => {
    setSelected(type); 
    onViewChange(type); 
  };

  return (
    <section data-layername="pageHeading" className="flex flex-col items-center self-stretch px-20 pt-20 pb-2 w-full text-black bg-white bg-opacity-0 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between items-start w-full max-w-[1248px] max-md:max-w-full">
        <nav className="flex gap-7 mt-1.5 text-3xl tracking-tighter leading-tight whitespace-nowrap">
        <div className="flex flex-col self-start">
          <div 
            onClick={() => handleSelect('recipe')} 
            data-layername="receitas" 
            className={`grow my-auto cursor-pointer ${selected === 'recipe' ? 'text-lime-800' : ''}`}
          >
            Receitas
          </div>
          <div className={`z-10 shrink-0 border-solid border-[3px] border-black border-opacity-20 h-[3px] ${selected === 'recipe' ? 'block' : 'hidden'}`} />
          </div>
          <div className="flex flex-auto gap-3.5">
            <div className="shrink-0 w-px border border-solid border-neutral-400 h-[42px]" />
            <div className="flex flex-col self-start">
              <div 
                onClick={() => handleSelect('product')} 
                data-layername="ofertas" 
                className={`self-center cursor-pointer ${selected === 'product' ? 'text-lime-800' : ''}`}
              >
                Ofertas
              </div>
              <div className={`z-10 shrink-0 border-solid border-[3px] border-black border-opacity-20 h-[3px] ${selected === 'product' ? 'block' : 'hidden'}`} />
            </div>
            <div className="shrink-0 w-px border border-solid border-neutral-400 h-[42px]" />
            <div className="flex flex-col self-start">
            <div 
              onClick={() => handleSelect('order')} 
              data-layername="pedidos" 
              className={`my-auto basis-auto cursor-pointer ${selected === 'order' ? 'text-lime-800' : ''}`}
            >
              Pedidos
            </div>
            <div className={`z-10 shrink-0 border-solid border-[3px] border-black border-opacity-20 h-[3px] ${selected === 'order' ? 'block' : 'hidden'}`} />
            </div>
          </div>
        </nav>
        <div className="flex gap-6 text-base leading-tight text-center">
          <form className="flex gap-3 self-start">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f2b706baa8a6280aad87f218e314046f750e963a30f061d85b93262014e57b6?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="" className="object-contain shrink-0 aspect-square w-[35px]" />
            <div className="flex flex-col self-start mt-2">
              <label htmlFor="searchInput" className="sr-only">Pesquisar</label>
              <input
                id="searchInput"
                type="search"
                placeholder="Pesquisar . . ."
                className="self-start bg-transparent border-none outline-none"
              />
              <div data-layername="divider" className="shrink-0 mt-1 h-0.5 border-2 border-solid border-neutral-200" />
            </div>
          </form>
          <button data-layername="listChip" onClick={togglePopup} className="overflow-hidden px-7 py-2.5 font-semibold whitespace-nowrap bg-white rounded-3xl border border-solid border-stone-300 max-md:px-5">
            Filtrar
          </button>
        </div>
      </div>
      <div data-layername="divider" className="shrink-0 mt-7 max-w-full h-0 border-2 border-solid border-neutral-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[1248px]" />
    </section>
  );
};

export default PageHeading;
