import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, primary, secondary, onClick, className }) => {
  const baseClasses = "flex justify-center items-center px-6 py-2 max-w-full text-center text-xl whitespace-nowrap rounded-lg min-w-[100px] max-md:px-5 transition-colors duration-300";
  const primaryClasses = "text-white bg-[#36b391] py-[9px] hover:bg-[#248e67] hover:text-white";
  const secondaryClasses = "text-[#36b391] bg-white border border-[#36b391] border-solid hover:bg-[#36b391] hover:text-white";

  if(className == "" || className == null)
    className = `${baseClasses} ${primary ? primaryClasses : ''} ${secondary ? secondaryClasses : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
