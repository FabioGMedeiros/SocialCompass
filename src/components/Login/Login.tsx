import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img_right from '../../assets/img_login.png';
import body from '../../assets/user_login.png';
import pass from '../../assets/locker.png';
import './Login.css';

interface User {
  id: any;
  user: {
    id: string;
    name: string;
    image: string;
  };
  token: string;
}

interface LoginProps {
  onLoginSuccess: (userData: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const navigate = useNavigate();

  const validateField = (fieldValue: string, setValid: (value: boolean) => void): boolean => {
    const isValid = fieldValue.trim() !== '';
    setValid(isValid);
    return isValid;
  };

  const handleLogin = async () => {
    const isUserValid = validateField(username, setIsUsernameValid);
    const isPassValid = validateField(password, setIsPasswordValid);

    if (!isUserValid || !isPassValid) {
      setErrorMessage('Usuário e/ou Senha inválidos. Por favor, tente novamente!');
      return;
    }

    try {
      const response = await fetch('https://social-compass-server.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const userData: User = await response.json();
        if (!userData.user.id) {
          return;
        }
        const userId = userData.user.id;
        const userImage = userData.user.image;
        const token = userData.token;
        const id = userData.user.id;
        localStorage.setItem('image', userImage);
        localStorage.setItem('id', userId);
        localStorage.setItem('id', id);
        localStorage.setItem('token', token); 

        onLoginSuccess(userData);
        navigate('/Home');
      } else {
        setErrorMessage('Usuário e/ou Senha inválidos. Por favor, tente novamente!');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao realizar o login:', error.message);
      } else {
        console.error('Erro ao realizar o login: Erro desconhecido');
      }
      setErrorMessage('Erro ao conectar com o serviço. Por favor, tente mais tarde.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setField: (value: string) => void,
    setValid: (value: boolean) => void
  ) => {
    const value = e.target.value;
    setField(value);
    validateField(value, setValid);
  };

  return (
    <div className='login'>
      <div className='left-section2'>
        <div className='header2'>
          <h1>Olá,</h1>
          <p>Para continuar navegando de forma segura, efetue o login.</p>
        </div>
        <div className='formulario2'>
          <h2>Login</h2>
          <form>
            <label className={isUsernameValid ? '' : 'input-error'}>
              <input
                placeholder='Usuário'
                type="text"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername, setIsUsernameValid)}
              />
              <img src={body} alt="Usuário" />
            </label>
            < br />
            <label className={isPasswordValid ? '' : 'input-error'}>
              <input
                placeholder='Senha'
                type="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword, setIsPasswordValid)}
              />
              <img src={pass} alt="Senha" />
            </label>
            <br />
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <button className='btn-login' type="button" onClick={handleLogin}>
              <p>Entrar</p>
            </button>
          </form>
          <p className='last-p2'>Novo por aqui? <a href='/Cadastro'>Registre-se</a></p>
        </div>
      </div>
      <div className='img_compass2'>
        <img src={img_right} alt="Imagem 1" className="img_login" />
      </div>
    </div>
  );
};

export default Login;
export type { User };
