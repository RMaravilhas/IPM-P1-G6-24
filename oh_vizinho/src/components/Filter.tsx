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

  const [ingredientInput, setIngredientInput] = useState(''); // Estado para o valor do input de ingredientes

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

  // Atualiza o parametro name
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prevFilters) => ({
      ...prevFilters,
      name: event.target.value,
    }));
  };

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

  // Renderizar filtros baseados no tipo
  if (filterType === 'recipe') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div ref={ref} className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-bold mb-4">Filtros ({filterType})</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="block mb-2">
              <span className="text-gray-700">Buscar:</span>
              <input
                type="text"
                value={query.name || ''}
                onChange={handleNameChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder={`Filtrar ${filterType}`}
              />
            </label>

            {/* Campo para inserir ingredientes */}
            <label className="block mb-2">
              <span className="text-gray-700">Ingredientes:</span>
              <div className="flex">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={handleIngredientChange}
                  onKeyDown={handleKeyPress} // Adiciona o evento de keypress
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Adicionar ingrediente"
                />
              </div>
            </label>

            {/* Lista de ingredientes */}
            <div className="mt-4 space-y-1">
              {query.products && query.products.length > 0 && (
                <ul>
                  {query.products.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-gray-700 cursor-pointer"
                      onClick={() => removeIngredient(ingredient)}
                    >
                      <span className="text-red-500">❌</span>{ingredient}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Filtros de restrições alimentares */}
            <div className="mt-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={query.vegetarian || false}
                  onChange={() => handleFilterToggle('vegetarian')}
                  className="mr-2"
                />
                Vegetariano
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={query.spicy || false}
                  onChange={() => handleFilterToggle('spicy')}
                  className="mr-2"
                />
                Picante
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={query.glutenFree || false}
                  onChange={() => handleFilterToggle('glutenFree')}
                  className="mr-2"
                />
                Sem Glúten
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={query.lactoseFree || false}
                  onChange={() => handleFilterToggle('lactoseFree')}
                  className="mr-2"
                />
                Sem Lactose
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={query.vegan || false}
                  onChange={() => handleFilterToggle('vegan')}
                  className="mr-2"
                />
                Vegano
              </label>
            </div>

            <button
              type="button"
              onClick={handleApplyFilters}
              className="mt-4 w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Aplicar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default Filter;
