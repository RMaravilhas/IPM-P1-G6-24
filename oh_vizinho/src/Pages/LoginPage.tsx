import React, { useRef, useEffect, useState } from 'react';
import Logo from '../components/Logo';
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
  const ref = useRef<HTMLDivElement | null>(null);

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

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <main
        ref={ref} // Aqui está o ref corretamente atribuído
        className="flex flex-col text-base font-semibold leading-tight text-black bg-white rounded-3xl shadow-lg w-[600px] max-w-full p-10"
      >
        <section className="flex flex-col gap-5 justify-between relative w-full min-h-[500px]">
          <div className="flex flex-col items-center">
            <Logo />
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
              <Button primary onClick={handleLogin}>
                Entrar
              </Button>
              <Divider />
              <Button secondary onClick={register}>
                Registar
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};


export default LoginPage;
