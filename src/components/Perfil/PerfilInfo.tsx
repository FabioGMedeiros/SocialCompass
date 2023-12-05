import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './PerfilInfo.css';
import body from '../../assets/user_login.png';
import card from '../../assets/card.png';
import gen from '../../assets/gen.png';
import birth from '../../assets/birth.png';
import node2 from '../../assets/node2.png';
import phone from '../../assets/phone.png';

interface UserData {
    name: string;
    occupation: string;
    sex: string;
    birthdate: string;
    address: string;
    phone: string;
    image: string;
}

export interface PerfilInfoProps {
    openModalRef: () => void;
    isOpen: boolean;
    closeModal: () => void;
    animate: boolean;
    userId: string;
}

function PerfilInfo({ openModalRef, isOpen, closeModal, animate, userId }: PerfilInfoProps) {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        occupation: '',
        sex: '',
        birthdate: '',
        address: '',
        phone: '',
        image: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedUserData: Partial<UserData> = {};
            for (const key in userData) {
                if (userData[key as keyof UserData] !== '') {
                    updatedUserData[key as keyof UserData] = userData[key as keyof UserData];
                }
            }

            console.log('Dados a serem enviados:', updatedUserData);

            await axios.put(`https://social-compass-server.onrender.com/users/${userId}`, updatedUserData);
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            if (error) {
                console.error('Detalhes do erro do servidor:', error);
            }
        }
    };
    
    const modalClassName = `modal ${animate ? 'animate' : ''}`;

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Editar Perfil"
                className={modalClassName}
            >
                <div className='modal-container'>
                    <div className='modal-content'>
                        <h1>Editar Perfil</h1>
                        <label>
                            <input placeholder='Nome' type="text" name="name" value={userData.name} onChange={handleChange} />
                            <img src={body} alt="Nome" />
                        </label>
                        <label>
                            <input placeholder='Cargo/Ocupação' type="text" name="occupation" value={userData.occupation} onChange={handleChange} />
                            <img src={card} alt="occupation" />
                        </label>
                        <label>
                            <input placeholder='Sexo' type="text" name="sex" value={userData.sex} onChange={handleChange} />
                            <img src={gen} alt="sex" />
                        </label>
                        <label>
                            <input placeholder='Data de Nascimento' type="text" name="birthdate" value={userData.birthdate} onChange={handleChange} />
                            <img src={birth} alt="birthdate" />
                        </label>
                        <label>
                            <input placeholder='Endereço' type="text" name="address" value={userData.address} onChange={handleChange} />
                            <img src={node2} alt="address" />
                        </label>
                        <label>
                            <input placeholder='Telefone' type="text" name="phone" value={userData.phone} onChange={handleChange} />
                            <img src={phone} alt="phone" />
                        </label>
                        <label>
                            <input placeholder='Imagem de Perfil (URL ou base64)' type="text" name="image" value={userData.image} onChange={handleChange} />
                            <img src={body} alt="image" />
                        </label>
                        <button onClick={closeModal} className='cancel-button'>Cancelar</button>
                        <button onClick={handleSave} className='save-button'>Salvar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PerfilInfo;
