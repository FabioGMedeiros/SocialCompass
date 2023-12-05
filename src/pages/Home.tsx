import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { User } from '../components/Login/Login';
import Header from '../components/Header/Header';
import Amigos from '../components/Cards/Amigos';
import Itens from '../components/Cards/Itens';
import Post from '../components/Publicacao/Post';
import Feed from '../components/Feed/Feed';
import { ModalProvider } from '../components/Publicacao/ModalContext';
import { useNavigate } from 'react-router-dom';

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

interface HomeProps {
  isModalOpen: boolean;
  onToggleModal: () => void;
}

interface PostItem {
  id: string;
  text: string;
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

const Home: React.FC<HomeProps> = ({ isModalOpen, onToggleModal }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/');
    } else {
      setLoggedInUser(JSON.parse(user));
    }
  }, [navigate]);

  const handleLoginSuccess = (userData: User) => {
    setLoggedInUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userId', userData.user.id);
  };

  const addPost = (text: string) => {
    const newPost: PostItem = {
      id: String(posts.length + 1),
      text
    };
    setPosts([...posts, newPost]);
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
  const userName = loggedInUser?.user?.name || '';
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
    <div className={styles['pagina-inicial']}>
      <ModalProvider>
        <div className={styles.fix}>
          <Header userName={userInfo.name || ''} userImage={localStorage.getItem('image') || ''} />
          <Amigos onToggleBoxVisibility={function (visible: boolean | ((prevState: boolean) => boolean)): void { }} />
          <Itens />
        </div>
          <Post onPublish={addPost} loggedInUser={loggedInUser} userImage={localStorage.getItem('image') || ''} />
        <div className={styles['feed-container']}>
          <Feed  userImage={localStorage.getItem('image') || ''}/>
        </div>
      </ModalProvider>
    </div>
  );
};

export default Home;
