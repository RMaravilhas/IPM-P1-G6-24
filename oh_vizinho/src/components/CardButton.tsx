import React from 'react';

const CardButton: React.FC = () => {
  return (
    <button className="flex overflow-hidden gap-6 px-5 py-1.5 mt-5 bg-white rounded-lg border border-lime-800 border-solid">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/24bd3405bf22d0cc1a62e1782ae07ab26108841dde891636183a8733a62d3056?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="" className="object-contain shrink-0 rounded-sm aspect-[1.05] w-[22px]" />
      <span className="grow shrink w-[103px]">Guardar</span>
    </button>
  );
};

export default CardButton;