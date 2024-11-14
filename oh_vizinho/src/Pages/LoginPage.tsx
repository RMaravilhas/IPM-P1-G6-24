import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';

interface LoginPageProps {
  isOpen: boolean;
  onClose: () => void; 
  login: (username: string, password: string) => void;
  register: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isOpen, onClose, login, register }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = () => {
    login(username, password); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <main className="flex flex-col text-base font-semibold leading-tight text-black bg-white rounded-3xl shadow-lg w-[600px] max-w-full p-10">
        <section className="flex flex-col gap-5 justify-between relative w-full min-h-[500px]">
          <div className="flex flex-col items-center">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6a5e22b909dbeb49bdc3c77a3201f9e17ad4509c320946781fc0778bb7b428b?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782" alt="Logo" className="object-contain self-center max-w-full aspect-square w-[198px]" />
            <form
              className="flex flex-col items-center w-full gap-4 mt-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <InputField 
                label="Nome de Utilizador:" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <InputField 
                label="Palavra Passe:" 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Button primary onClick={handleLogin}>Entrar</Button>
              <Divider />
              <Button secondary onClick={register}>Registar</Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
