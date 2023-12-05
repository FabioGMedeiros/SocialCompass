import React from 'react';
import { format } from 'date-fns';
import './Sobre.css';
import Person from '../../assets/person.png';
import Cake from '../../assets/cake.png';
import Location from '../../assets/Location.png';
import Message from '../../assets/Message.png';
import Call from '../../assets/Call.png';
import ptBR from 'date-fns/locale/pt-BR';

interface UserInfo {
    sex: string;
    birthdate: string;
    address: string;
    email: string;
    phone: string;
}

interface SobreProps {
    userInfo: UserInfo;
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const Sobre: React.FC<SobreProps> = ({ userInfo }) => {
    return (
        <div className='card-info'>
            <h1>Sobre</h1>
            <p>
                <img src={Person} alt="body" />
                {userInfo.sex || 'Não informado'}
            </p>
            <p>
                <img src={Cake} alt="cake" />
                {userInfo.birthdate ? `Nascido(a) em ${capitalizeFirstLetter(format(new Date(userInfo.birthdate), "dd 'de' MMMM, yyyy", { locale: ptBR }))}`
                    : 'Não informado'}
            </p>
            <p>
                <img src={Location} alt="node" />
                {userInfo.address || 'Não informado'}
            </p>
            <p>
                <img src={Message} alt="letter" />
                {userInfo.email || 'Não informado'}
            </p>
            <p>
                <img src={Call} alt="phone" />
                {userInfo.phone || 'Não informado'}
            </p>
        </div>
    );
};

export default Sobre;
