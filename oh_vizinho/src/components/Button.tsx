import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, primary, secondary, onClick }) => {
  const baseClasses = "overflow-hidden self-center px-10 py-3.5 mt-7 max-w-full text-center whitespace-nowrap rounded-lg w-[126px] max-md:px-5";
  const primaryClasses = "text-white bg-lime-800";
  const secondaryClasses = "text-lime-800 bg-white border border-lime-800 border-solid";

  const className = `${baseClasses} ${primary ? primaryClasses : ''} ${secondary ? secondaryClasses : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;