import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css';
import img1 from '../../assets/camera.png';
import img2 from '../../assets/quadro.png';
import img3 from '../../assets/clip.png';
import img4 from '../../assets/loc.png';
import img5 from '../../assets/hpy.png';
import img6 from '../../assets/like.png';
import img7 from '../../assets/sms.png';
import img8 from '../../assets/tree.png';

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

interface Post {
    id: string;
    text: string;
    image: string;
    authorId: string;
    location: string;
    likes: string;
    createdAt: string;
}

const Posts: React.FC = () => {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
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
    const [texto, setTexto] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('id');
                const user_token = localStorage.getItem('token');

                if (!user_id || !user_token) {
                    throw new Error('ID do usuário ou token não disponível');
                }

                const userResponse = await axios.get(`https://social-compass-server.onrender.com/users/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user_token}`
                    },
                });

                if (userResponse.status === 200) {
                    setUserInfo(userResponse.data);
                    setUserPosts(userResponse.data.posts || []);
                } else {
                    console.error('Erro ao buscar dados do usuário da API');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário ou posts da API', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container1">
            <div className='container3'>
                <div className='headerP'>
                    <p>Followers</p>
                    <p>Following</p>
                    <p className='main'>Posts</p>
                </div>
                <div className='userPosts'>
                    {userPosts.slice().reverse().map((post: Post) => (
                        <div key={post.id} className='postContainer'>
                            <div className='postHeader'>
                                <img
                                    src={userInfo.image}
                                    alt='User Profile'
                                    className='profileImage'
                                />
                                <div className='userInfo'>
                                    <h2 className='userName'>{userInfo.name}</h2>
                                    <p className='userLocation'>{post.location}</p>
                                </div>
                            </div>
                            <p className='postText'>{post.text}</p>
                            {post.image && <img src={post.image} alt='Post' className='postImage' />}
                            <div className='postActions'>
                                <button
                                    className='likeButton'>
                                    <img src={img6} alt='Like' className='like' />
                                    Curtiu<span className='lks'>{post.likes}</span>
                                </button>
                                <button className='cmtButton'><img src={img7} alt='SMS' className='sms'></img>Comentários</button>
                                <button className='shareButton'><img src={img8} alt='TREE' className='tree'></img>Compartilhar</button>
                            </div>
                            <div className='imgPerfil5'>
                                <img
                                    src={userInfo.image}
                                    alt='User Profile'
                                    className='profileImage'
                                />
                                <div className='container2'>
                                    <input
                                        type='text'
                                        onChange={(e) => setTexto(e.target.value)}
                                        value={texto}
                                        placeholder='Tem algo a dizer?'
                                        className='textarea'
                                    />
                                    <button><img src={img1} alt="Imagem 1" className='camera' /></button>
                                    <button><img src={img2} alt="Imagem 2" className='quadro' /></button>
                                    <button><img src={img3} alt="Imagem 3" className='clip' /></button>
                                    <button><img src={img4} alt="Imagem 3" className='loc' /></button>
                                    <button><img src={img5} alt="Imagem 3" className='hpy' /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
