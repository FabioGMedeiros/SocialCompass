import { useState } from 'react';
import './Capa.css';
import img1 from '../../assets/capa.png';
import PerfilInfo from './PerfilInfo'; 

interface User {
  name: string;
  occupation: string;
  image: string;
}

interface CapaProps {
  user?: User;
  onEditButtonClick: () => void;
}

function Capa({ user, onEditButtonClick }: CapaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setAnimate(true);
    onEditButtonClick();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAnimate(false);
  };

  return (
    <div className="container">
      <div className='capa'>
        <img src={img1} alt="Imagem de Capa" className='imgCapa'/>
        <div className='user'>
          <img src={user?.image || ''} alt="imgPerfil" className='imgPerfil' />
          <div className='text'>
            <h2>{user?.name || 'Usuário'}</h2>
            <p>{user?.occupation || 'Cargo/Ocupação'}</p>
            <div className='btn-edit'>
              <button type="button" className='editButton' onClick={openModal}>
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PerfilInfo
          openModalRef={openModal}
          isOpen={isModalOpen}
          closeModal={closeModal}
          animate={animate} 
          userId={''} />
      )}
    </div>
  );
}

export default Capa;
