import React, { useState, useEffect } from 'react';

interface CardButtonProps {
  onSaveChange: (isSaving: boolean) => void;
  favorite?: boolean;
}

const CardButton: React.FC<CardButtonProps> = ({ onSaveChange, favorite }) => {
  const [saved, setSaved] = useState<boolean>(favorite ? favorite : false);

  const handleClick = () => {
    const save = !favorite;
    setSaved(save);
    onSaveChange(save);
  };

  return (
    <button
      onClick={handleClick}
      className="flex overflow-hidden gap-6 px-5 py-1.5 mt-5 bg-white rounded-lg border border-lime-800 border-solid"
    >
      <img
        loading="lazy"
        src={ saved ?
          `${process.env.PUBLIC_URL}/images/yellow_star_icon.png` :
          "https://cdn.builder.io/api/v1/image/assets/TEMP/24bd3405bf22d0cc1a62e1782ae07ab26108841dde891636183a8733a62d3056?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
        }
        alt=""
        className="object-contain shrink-0 rounded-sm aspect-[1.05] w-[22px]"
      />
      <span className="grow shrink w-[103px]">
        {saved ? 'Guardado' : 'Guardar'}
      </span>
    </button>
  );
};

export default CardButton;
