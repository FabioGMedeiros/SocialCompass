import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import style from '../styles/MeuPerfil.module.css'
import { ModalProvider } from '../components/Publicacao/ModalContext';
import Header from '../components/Header/Header';
import Capa from '../components/Perfil/Capa';
import Sobre from '../components/Perfil/Sobre';
import PerfilInfo from '../components/Perfil/PerfilInfo';
import Posts from '../components/Perfil/Posts';
ReactModal.setAppElement('#root');
interface UserInfo {
    [x: string]: string;
    sex: string;
    birthdate: string;
    address: string;
    email: string;
    phone: string;
    name: string;
    image: string;
    occupation: string;
}


const getData = async () => {
    const user_id = localStorage.getItem('id');
    const user_token = localStorage.getItem('token');

    try {
        const response = await fetch(`https://social-compass-server.onrender.com/users/${user_id} `, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user_token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Erro ao conectar com o serviço', error);
    }
};

function MeuPerfil() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        sex: '',
        birthdate: '',
        address: '',
        email: '',
        phone: '',
        name: '',
        image: '',
        occupation: '',
    });


    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleModalClose = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = await getData();
            if (user) {
                setUserInfo(user);
            }
        };

        fetchData();
    }, []);



    return (
        <div className={style['meu-perfil']}>
            <ModalProvider>
                <Header userName={userInfo.name || ''} userImage={localStorage.getItem('image') || ''} />
                <Capa onEditButtonClick={handleEditClick} user={{ name: userInfo.name, image: userInfo.image, occupation: userInfo.occupation }} />
                <div className={style['user-info']}>
                    <Sobre userInfo={userInfo} />
                    <PerfilInfo
                        isOpen={isEditing}
                        openModalRef={handleEditClick}
                        closeModal={handleModalClose}
                        animate={true}
                        userId={localStorage.getItem('id') || ''}
                    />
                    <Posts />
                </div>
            </ModalProvider>
        </div>
    );
}

export default MeuPerfil;
