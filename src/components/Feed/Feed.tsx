import React, { useState, useEffect } from 'react';
import style from './Feed.module.css';
import axios from 'axios';
import { useModal } from '../Publicacao/ModalContext';
import img6 from '../../assets/like.png';
import img7 from '../../assets/sms.png';
import img8 from '../../assets/tree.png';
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

interface FeedProps {
  userImage: string;
}

interface User {
  id: string;
  name: string;
  image: string;
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

const Feed: React.FC<FeedProps> = ({ userImage }) => {
  const { isModalOpen } = useModal();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [texto, setTexto] = React.useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const user_token = localStorage.getItem('token');
        if (!user_token) {
          throw new Error('Token do usuário não disponível');
        }

        const [postsResponse, usersResponse] = await Promise.all([
          axios.get('https://social-compass-server.onrender.com/posts', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user_token}`
            },
          }),
          axios.get('https://social-compass-server.onrender.com/users', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user_token}`,
            },
          }),
        ]);

        if (postsResponse.status === 200) {
          setPosts(postsResponse.data);
        } else {
          console.error('Erro ao buscar posts da API');
        }

        if (usersResponse.status === 200) {
          setUsers(usersResponse.data);
        } else {
          console.error('Erro ao buscar usuários da API');
        }
      } catch (error) {
        console.error('Erro ao buscar posts ou usuários da API', error);
      }
    };

    fetchData();
  }, []);

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
      if (user) {
        setUserInfo(user);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId: string): User | undefined => {
    return users.find((user) => user.id === userId);
  };
  return (
    <div className={`${style.feed} ${isModalOpen ? style.shrink : ''}`}>
      {posts.slice().reverse().map((post: Post) => (
        <div key={post.id} className={style.postContainer}>
          <div className={style.postHeader}>
            {getUserById(post.authorId) && (
              <img
                src={getUserById(post.authorId)!.image}
                alt="User Profile"
                className={style.profileImage}
              />
            )}
            <div className={style.userInfo}>
              {getUserById(post.authorId) && (
                <>
                  <h2 className={style.userName}>{getUserById(post.authorId)!.name}</h2>
                  <p className={style.userLocation}>{post.location}</p>
                </>
              )}
            </div>
          </div>
          <p className={style.postText}>{post.text}</p>
          {post.image && <img src={post.image} alt="Post" className={style.postImage} />}
          <div className={style.postActions}>
            <button
              className={style.likeButton}>
              <img src={img6} alt='Like' className={style.like} />
              Curtiu<span className={style.lks}>{post.likes}</span>
            </button>
            <button className={style.cmtButton}><img src={img7} alt='SMS' className={style.sms}></img>Comentários</button>
            <button className={style.shareButton}><img src={img8} alt='TREE' className={style.tree}></img>Compartilhar</button>
          </div>
          <div className={style.imgPerfil}>
            <img
              src={userImage}
              alt="User Profile"
              className={style.profileImage}
            />
            <div className={style.container}>
              <input
                type="text"
                onChange={(e) => setTexto(e.target.value)}
                value={texto}
                placeholder="Tem algo a dizer ?"
                className={style.textarea}
              />
              <button><img src={img1} alt="Imagem 1" className={style.camera} /></button>
              <button><img src={img2} alt="Imagem 2" className={style.quadro} /></button>
              <button><img src={img3} alt="Imagem 3" className={style.clip} /></button>
              <button><img src={img4} alt="Imagem 3" className={style.loc} /></button>
              <button><img src={img5} alt="Imagem 3" className={style.hpy} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
