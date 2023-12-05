import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './MenuModal.module.css';
import logo from '../../assets/logo.png';

interface MenuModalProps {
  onClose: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose, onNavigate, onLogout }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>('Página Inicial'); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    setSelectedButton(pathname === '/Home' ? 'Página Inicial' : pathname === '/Profile' ? 'Meu Perfil' : pathname.replace('/', ''));
  }, [location.pathname]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === 'Sair') {
      onLogout();
      navigate('/');
    } else if (buttonName === 'Página Inicial') {
      navigate('/Home');
    } else if (buttonName === 'Meu Perfil') {
      navigate('/Profile');
    } else {
      navigate('/' + buttonName.replace(/ /g, ''));
    }
  };

  return (
    <div className={styles.menuModalOverlay} onClick={onClose}>
      <div className={styles.menuModalContent} onClick={(e) => e.stopPropagation()}>
        <img className={styles.img_menu} src={logo} alt="UOL_logo" />

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.menuButton} ${selectedButton === 'Página Inicial' ? styles.selectedButton : ''}`}
            onClick={() => handleButtonClick('Página Inicial')}
          >
            Página Inicial
          </button>
          <button
            className={`${styles.menuButton} ${selectedButton === 'Meu Perfil' ? styles.selectedButton : ''}`}
            onClick={() => handleButtonClick('Meu Perfil')}
          >
            Meu Perfil
          </button>
          <button
            className={`${styles.menuButton} ${selectedButton === 'Marketplace' ? styles.selectedButton : ''}`}
            onClick={() => handleButtonClick('Marketplace')}
          >
            Marketplace
          </button>
          <button
            className={`${styles.menuButton} ${selectedButton === 'Sair' ? styles.selectedButton : ''}`}
            onClick={() => handleButtonClick('Sair')}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
export {};
