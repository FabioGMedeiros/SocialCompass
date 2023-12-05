import React, { useEffect, useState } from 'react';
import styles from './Amigos.module.css';
import Seta from '../../assets/Frame.png';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
}

interface AmigosProps {
    onToggleBoxVisibility: (visible: boolean | ((prevState: boolean) => boolean)) => void;
}

const Amigos: React.FC<AmigosProps> = ({ onToggleBoxVisibility }) => {
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_token = localStorage.getItem('token');

                if (!user_token) {
                    throw new Error('Token do usuário não disponível');
                }

                const response = await axios.get('https://social-compass-server.onrender.com/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user_token}`
                    }
                });

                if (response.status === 200) {
                    const firstFiveUsers = response.data.slice(0, 5);
                    setUsers(firstFiveUsers);
                } else {
                    throw new Error(`Falha ao obter dados do usuário. Status: ${response.status}`);
                }
            } catch (error: any) {
                console.error('Erro ao buscar usuários:', error.message);
                setError('Erro ao buscar usuários');
            }
        };

        fetchData();
    }, []);

    const toggleBoxVisibility = () => {
        setIsBoxVisible(prevState => !prevState);
        onToggleBoxVisibility(!isBoxVisible);
    };

    return (
        <div className={styles['amigos-card']}>
            <div className={styles['amigos-header']} onClick={toggleBoxVisibility}>
                <p>Meus Amigos</p>
                <img src={Seta} alt="Botão" className={`${styles['button-img']} ${isBoxVisible ? styles['rotated'] : ''}`} />
            </div>
            {isBoxVisible && (
                <div className={styles['amigos-box']}>
                    {users.length > 0 ? (
                        users.map(user => (
                            <div key={user.id} className={styles[`amigo`]}>
                                <img src={user.image} alt={`${user.name}`} className={styles['globo']} />
                                <p>{user.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum usuário encontrado.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Amigos;
