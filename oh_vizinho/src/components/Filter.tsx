import React, { useRef, useEffect, useState } from 'react';
import { Query } from '../types/Query';

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  filterType: string;
  onFilterChange: (query: Query) => void; // Callback para enviar a query completa
}

const Filter: React.FC<FilterProps> = ({ isOpen, onClose, filterType, onFilterChange }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState<Query>({
    name: '',
    products: [],
    vegetarian: false,
    spicy: false,
    glutenFree: false,
    lactoseFree: false,
    vegan: false,
  });
  const [ingredientInput, setIngredientInput] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Atualiza campos do filtro
  const handleFilterToggle = (key: keyof Query) => {
    setQuery((prevFilters) => ({
      ...prevFilters,
      [key]: !prevFilters[key],
    }));
  };

  // Atualiza os ingredientes
  const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientInput(event.target.value);
  };

  // Adiciona o ingrediente à lista de produtos
  const addIngredient = (ingredient: string) => {
    const ingredients = query.products;
    if(query.products && !query.products.includes(ingredient))
      ingredients?.push(ingredient);
    setQuery((prevQuery) => ({
      ...prevQuery,
      products: ingredients,
    }));
  };

  // Remove um ingrediente da lista
  const removeIngredient = (ingredient: string) => {
    const filteredIngredients = query.products?.filter(item => item !== ingredient);
    setQuery((prevQuery) => ({
      ...prevQuery,
      products: filteredIngredients,
    }));
  };

  // Função que lida com o pressionar tecla Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && ingredientInput.trim()) {
      addIngredient(ingredientInput);
      setIngredientInput(''); // Limpa o input após adicionar
    }
  };

  // Envia os filtros para o componente onde este está nested
  const handleApplyFilters = () => {
    onFilterChange(query);
    onClose();
  };

  const handleAddIngredient = () => {
    // Verificar se o ingrediente já existe na lista para evitar duplicação
    if (ingredientInput && query.products && !query.products.includes(ingredientInput)) {
      // Adicionar o ingrediente à lista de produtos
      const updatedProducts = [...query.products, ingredientInput];
  
      // Atualizar o estado com o novo ingrediente
      setQuery((prevQuery) => ({
        ...prevQuery,
        products: updatedProducts,
      }));
  
      // Limpar o campo de entrada
      setIngredientInput("");
    }
  };

  if (filterType === 'recipe') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div
          ref={ref}
          className="bg-[#fafaf5] p-8 rounded-xl shadow-lg w-full max-w-lg"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Filtrar
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Campo de entrada para ingredientes */}
            <label className="block">
              <span className="text-2xl font-medium text-gray-700">Alimento:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={handleIngredientChange}
                  onKeyDown={handleKeyPress}
                  className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#37b38f] focus:ring focus:ring-[#37b38f]/30 text-lg p-3 h-full self-end"
                  placeholder="Adicionar ingrediente"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient} // Supondo que você tenha a função handleAddIngredient para adicionar o ingrediente
                  className="px-4 text-lg font-semibold text-white bg-[#37b38f] rounded-lg hover:bg-[#32a382] focus:ring focus:ring-[#37b38f]/50 py-3 self-end leading-tight"
                >
                  Adicionar
                </button>
              </div>
            </label>

            {/* Lista de ingredientes */}
            {query.products && query.products?.length > 0 && (
              <ul className="space-y-2">
                {query.products.map((ingredient, index) => (
                  <li
                    key={index}
                    className="text-lg text-gray-700 flex items-center gap-3 cursor-pointer"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    <span className="text-red-500">❌</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}

            {/* Filtros de restrições */}
            <div className="space-y-4">
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={query.vegetarian || false}
                  onChange={() => handleFilterToggle("vegetarian")}
                  className="w-7 h-7 rounded-md border-gray-300 text-[#37b38f] focus:ring-[#37b38f] cursor-pointer"
                />
                <span className="text-xl">Vegetariano</span>
              </label>
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={query.spicy || false}
                  onChange={() => handleFilterToggle("spicy")}
                  className="w-7 h-7 rounded-md border-gray-300 text-[#37b38f] focus:ring-[#37b38f] cursor-pointer"
                />
                <span className="text-xl">Picante</span>
              </label>
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={query.glutenFree || false}
                  onChange={() => handleFilterToggle("glutenFree")}
                  className="w-7 h-7 rounded-md border-gray-300 text-[#37b38f] focus:ring-[#37b38f] cursor-pointer"
                />
                <span className="text-xl">Sem Glúten</span>
              </label>
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={query.lactoseFree || false}
                  onChange={() => handleFilterToggle("lactoseFree")}
                  className="w-7 h-7 rounded-md border-gray-300 text-[#37b38f] focus:ring-[#37b38f] cursor-pointer"
                />
                <span className="text-xl">Sem Lactose</span>
              </label>
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={query.vegan || false}
                  onChange={() => handleFilterToggle("vegan")}
                  className="w-7 h-7 rounded-md border-gray-300 text-[#37b38f] focus:ring-[#37b38f] cursor-pointer"
                />
                <span className="text-xl">Vegano</span>
              </label>
            </div>

            {/* Botão Aplicar */}
            <button
              type="button"
              onClick={handleApplyFilters}
              className="w-full py-3 text-lg font-semibold text-white bg-[#37b38f] rounded-lg hover:bg-[#32a382] transition duration-200"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    );
  }
  return null;
};

export default Filter;
