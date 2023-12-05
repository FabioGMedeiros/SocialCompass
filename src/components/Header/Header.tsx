import React from 'react';
import style from './Header.module.css';
import postImage from '../../assets/post.png';
import postLeftImage from '../../assets/postLeft.png';
import image1 from '../../assets/globo.png';
import image2 from '../../assets/Bell.png';
import MenuModal from './MenuModal';
import { useModal } from '../Publicacao/ModalContext'; 

interface HeaderProps {
  userName: string;
  userImage: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userImage }) => {
  const { isModalOpen, toggleModal } = useModal(); 

  return (
    <header className={`${style.header} ${isModalOpen ? style.shrink : ''}`}>
      <div className={style.leftSection}>
        <button className={style.menuButton} onClick={toggleModal}>
          <img src={isModalOpen ? postLeftImage : postImage} alt="Botão Menu" className={style.menuButtonImage} />
        </button>
        <p>SocialCompass</p>
        {isModalOpen && <MenuModal onClose={toggleModal} onNavigate={function (route: string): void { } } onLogout={function (): void {} } />}
      </div>
      <div className={style.rightSection}>
        <button><img src={image1} alt="Imagem 1" className={style.globo} /></button>
        <button><img src={image2} alt="Imagem 2" className={style.Bell} /></button>
        <p>{userName}</p>
        <button><img src={userImage} alt="Imagem do Usuário" className={style.user} /></button>
      </div>
    </header>
  );
};

export default Header;
