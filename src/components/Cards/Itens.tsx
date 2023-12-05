import React, { useState } from 'react';
import styles from './Itens.module.css';
import image1 from '../../assets/Armario.png';
import Seta from '../../assets/Frame.png';
import Amigos from './Amigos';

const Itens = () => {
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [amigosExpanded, setAmigosExpanded] = useState(false);

    const handleToggleBoxVisibility = (visible: boolean | ((prevState: boolean) => boolean)) => {
        setAmigosExpanded(visible);
    };

    const toggleBoxVisibility = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    return (
        <div className={styles['itens-card']} style={{ top: amigosExpanded ? 470 : 192 }}>
            <div className={styles['itens-header']} onClick={toggleBoxVisibility}>
                <p>Itens em Destaque</p>
                <img src={Seta} alt="Botão" className={`${styles['button-img']} ${isBoxVisible ? styles['rotated'] : ''}`} />
            </div>
            {isBoxVisible && (
                <div className={styles['itens-box']}>
                    <div className={styles['item1']}>
                        <img src={image1} alt="Imagem 1" className={styles['globo']} />
                        <p>Armário Grande<br /><span className={styles.preco}>R$ 300,00</span></p>
                    </div>
                    <div className={styles['item1']}>
                        <img src={image1} alt="Imagem 1" className={styles['globo']} />
                        <p>Armário Grande<br /><span className={styles.preco}>R$ 400,00</span></p>
                    </div>
                    <div className={styles['item1']}>
                        <img src={image1} alt="Imagem 1" className={styles['globo']} />
                        <p>Armário Grande<br /><span className={styles.preco}>R$ 500,00</span></p>
                    </div>
                    <div className={styles['item1']}>
                        <img src={image1} alt="Imagem 1" className={styles['globo']} />
                        <p>Armário Grande<br /><span className={styles.preco}>R$ 600,00</span></p>
                    </div>
                </div>
            )}
            <Amigos onToggleBoxVisibility={handleToggleBoxVisibility} />
        </div>
    );
};

export default Itens;
