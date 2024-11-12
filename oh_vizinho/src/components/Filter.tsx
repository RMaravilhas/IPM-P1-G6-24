import React from 'react';

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <form>
          <label className="block mb-2">
            <span className="text-gray-700">Ingrediente:</span>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option value="todos">Todos</option>
              <option value="ofertas">Ofertas</option>
              <option value="receitas">Receitas</option>
              <option value="pedidos">Pedidos</option>
            </select>
          </label>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Aplicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
