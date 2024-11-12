import React from 'react';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';

interface LoginPageProps {
  isOpen: boolean;
  onClose: () => void; // função para fechar o popup
  login: () => void;
  register: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isOpen, onClose, login, register }) => {
  if (!isOpen) return null; // Se o popup não estiver aberto, não renderiza

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <main className="flex flex-col text-base font-semibold leading-tight text-black bg-white rounded-3xl shadow-lg w-[600px] max-w-full p-10"> {/* Ajuste na largura e fundo branco */}
    <section className="flex flex-col gap-5 justify-between relative w-full min-h-[500px]"> {/* Ajuste na altura mínima */}
      <div className="flex flex-col items-center">
        <Logo />
        <form className="flex flex-col items-center w-full gap-4 mt-6">
          <InputField label="Nome de Utilizador:" id="username" />
          <InputField label="Palavra Passe:" id="password" type="password" />
          <Button primary onClick={login}>Entrar</Button>
          <Divider />
          <Button secondary onClick={register}>Registar</Button>
        </form>
      </div>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/29ad184c2c0f345f5b0015f682600371c63c52aedfc56bc72711cc62ac7878ae?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" 
        alt="Decorative icon" 
        className="object-contain self-start w-10 aspect-square" 
      />
    </section>
  </main>
</div>
  );
};

export default LoginPage;
