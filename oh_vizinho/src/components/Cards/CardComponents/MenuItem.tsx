import React from 'react';

interface MenuItemProps {
  text: string;
  marginTop: string;
  marginLeft?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, marginTop, marginLeft }) => {
  return (
    <div className={`relative ${marginTop} ${marginLeft || ''}`}>
      {text}
    </div>
  );
};

export default MenuItem;