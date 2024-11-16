import React, { useEffect, useRef, useState } from 'react';
import InputField from '../components/InputFieldLogin';
import Button from '../components/Button';
import Divider from '../components/Divider';
import { User } from '../types/User';

interface RegisterPageProps {
  isOpen: boolean;
  onClose: () => void;
  register: (user: User) => void;
  goToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ isOpen, onClose, register, goToLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
        setName('');
        setPassword('');
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

  const handleRegister = () => {
    if(name == '' || password == ''){
        alert('Preencha todos os campos')
        return;
    }

    const user: User = {
        name: name,
        password: password
    }
    register(user);
    setName('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <main
        ref={ref}
        className="flex flex-col text-base font-semibold leading-tight text-black bg-white rounded-3xl shadow-lg w-[600px] max-w-full p-10"
      >
        <section className="flex flex-col gap-5 justify-between relative w-full min-h-[500px]">
          <div className="flex flex-col items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6a5e22b909dbeb49bdc3c77a3201f9e17ad4509c320946781fc0778bb7b428b?placeholderIfAbsent=true&apiKey=2b659d54d9c448a19edda772d8c18782"
              alt="Logo"
              className="object-contain self-center max-w-full aspect-square w-[198px]"
            />
            <form
              className="flex flex-col items-center w-full gap-4 mt-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <InputField
                label="Nome de Utilizador:"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Palavra Passe:"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button primary onClick={handleRegister}>
                Registar
              </Button>
              <Divider />
              <Button secondary onClick={goToLogin}>
                Voltar ao Login
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
