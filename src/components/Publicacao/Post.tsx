import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Post.module.css';
import { useModal } from './ModalContext';
import img1 from '../../assets/camera.png';
import img2 from '../../assets/quadro.png';
import img3 from '../../assets/clip.png';
import img4 from '../../assets/loc.png';
import img5 from '../../assets/hpy.png';

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

interface User {
    [x: string]: any;
    id: string;
    name: string;
    image: string;
    token: string;
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

interface PostProps {
    onPublish: (text: string, userId: string) => void;
    loggedInUser: User | null;
    userImage: string;
}

const Post: React.FC<PostProps> = ({ onPublish, loggedInUser, userImage }) => {
    const { isModalOpen } = useModal();
    const [texto, setTexto] = React.useState('');

    const handlePublish = async () => {
        try {
            if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.id) {
                console.log('loggedInUser:', loggedInUser);
                return;
            }

            if (texto.trim() === '') {
                console.log('O texto está vazio. Não será enviado.');
                return;
            }

            const userId = localStorage.getItem('id');
            if (!userId) {
                console.log('ID do usuário não encontrado no localStorage.');
                return;
            }

            onPublish(texto, loggedInUser.user.id);

            const imageData = '';
            const locationData = 'Garanhuns';

            const authorId = loggedInUser.user.id;
            const postData = {
                text: texto,
                location: locationData,
                image: imageData,
                authorId: authorId,
            };

            const token = localStorage.getItem('token');
            if (!token) {
                console.log('Token não encontrado no localStorage. Redirecionando para a página de login...');
                return;
            }

            console.log('Post Data:', postData);
            const response = await axios.post('https://social-compass-server.onrender.com/posts', postData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setTexto('');
        } catch (error) {
            console.error('Erro ao criar post:', error);
        }
    };

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
    useEffect(() => {
        const fetchData = async () => {
            const user = await getData();
            console.log('Dados do usuário:', user);
            if (user) {
                setUserInfo(user);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={style['post-section']}>
            <div className={`${style.postForm} ${isModalOpen ? style.shrink : ''}`}>
                <div className={style.imgPerfil}>
                    <button><img src={userImage} alt="Imagem 3" className={style.user} /></button>
                    <input
                        type="text"
                        onChange={(e) => setTexto(e.target.value)}
                        value={texto}
                        placeholder="No que você está pensando?"
                        className={style.textarea}
                    />
                </div>
                <div className={style.buttons}>
                    <div className={style.leftButton}>
                        <button><img src={img1} alt="Imagem 1" className={style.camera} /></button>
                        <button><img src={img2} alt="Imagem 2" className={style.quadro} /></button>
                        <button><img src={img3} alt="Imagem 3" className={style.clip} /></button>
                        <button><img src={img4} alt="Imagem 3" className={style.loc} /></button>
                        <button><img src={img5} alt="Imagem 3" className={style.hpy} /></button>
                    </div>
                    <div className={style['btn-postar']}>
                        <button type="button" onClick={handlePublish} className={style.submitButton}>
                            Postar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
