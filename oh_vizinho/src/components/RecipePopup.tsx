import React, { useState, useEffect } from 'react';

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

interface RecipePopupProps {
  isOpen: boolean;
  recipe: RecipeCardProps | null; // Recipe object or null
  onClose: () => void; // Close handler
}

const RecipePopup: React.FC<RecipePopupProps> = ({ recipe, onClose }) => {
  const [portions, setPortions] = useState(1);
  const [saved, setSaved] = useState(false); // Track if the recipe is saved

  // Reset the saved state when the popup opens with a new recipe
  useEffect(() => {
    if (recipe) {
      setSaved(false); // Default state for each popup
    }
  }, [recipe]);

  if (!recipe) return null;

  const { title, description, image, ingredients, steps } = recipe;

  const handlePortionChange = (increment: boolean) => {
    setPortions((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(newValue, 1), 5); // Keep between 1 and 5
    });
  };

  // Adjust ingredient quantities based on portions
  const adjustedIngredients = ingredients.map((ingredient) => {
    const match = ingredient.match(/^(\d+)(.*)/); // Regex to extract leading number
    if (match) {
      const quantity = parseInt(match[1], 10) * portions;
      return `${quantity}${match[2]}`;
    }
    return ingredient; // If no number, keep the string as is
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-3xl w-[90%] max-w-[800px] p-8 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Title Section */}
        <div className="flex items-start gap-6">
          <img
            src={image}
            alt={title}
            className="w-1/3 rounded-lg object-contain"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-700 mt-4">{description}</p>
            <div className="flex gap-4 mt-4">
              <button className="flex overflow-hidden flex-1 gap-10 px-5 py-1.5 bg-white rounded-lg border border-lime-800 border-solid">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa92b76d5e87ed1da66371da49cb75e2ab2b11fa2bc50048a610ca1141aa4006?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
                  alt=""
                  className="object-contain shrink-0 w-5 aspect-[0.91]"
                />
                <span>Gostar</span>
              </button>
              {/* Guardar Button */}
              <button
                onClick={() => setSaved((prev) => !prev)} // Toggle saved state
                className="flex overflow-hidden flex-1 gap-9 px-5 py-1.5 bg-white rounded-lg border border-lime-800 border-solid"
              >
                <img
                  loading="lazy"
                  src={
                    saved
                      ? "https://cdn.builder.io/api/v1/image/assets/TEMP/52de4c485b08f4ec7547ae7403afac43a842d86eb2b5d406f35f3de37ebbf4f1?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
                      : "https://cdn.builder.io/api/v1/image/assets/TEMP/24bd3405bf22d0cc1a62e1782ae07ab26108841dde891636183a8733a62d3056?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
                  }
                  alt=""
                  className="object-contain shrink-0 rounded-sm aspect-[1.05] w-[22px]"
                />
                <span>{saved ? "Guardado" : "Guardar"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Portion Selector */}
        <div className="mt-8 mb-4">
          <div className="flex items-center gap-4">
            <label htmlFor="portions" className="text-lg font-semibold">
              Nº de Porções:
            </label>
            <button
              onClick={() => handlePortionChange(false)}
              className="bg-lime-600 p-1 w-8 h-8 rounded text-white text-lg font-bold hover:bg-[#2e9578] text-center flex items-center justify-center"
              disabled={portions <= 1}
            >
              -
            </button>
            <input
              id="portions"
              type="number"
              className="bg-transparent focus:outline-none p-0 appearance-none"
              value={portions}
              readOnly
              style={{ textAlign: "center", width: "30px", marginLeft: "10px" }}
            />
            <button
              onClick={() => handlePortionChange(true)}
              className="bg-lime-600 p-1 w-8 h-8 rounded text-white text-lg font-bold hover:bg-[#2e9578] text-center flex items-center justify-center"
              disabled={portions >= 5}
            >
              +
            </button>
          </div>
        </div>

        {/* Ingredients and Preparation Steps */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients Section */}
          <div>
            <h2 className="text-lg font-semibold">Ingredients:</h2>
            <div>
              <ul className="list-disc ml-4 space-y-2">
                {adjustedIngredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Preparation Steps Section */}
          <div>
            <h2 className="text-lg font-semibold">Preparation Steps:</h2>
            <div>
              <ol className="list-decimal ml-4 space-y-2">
                {steps.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePopup;
