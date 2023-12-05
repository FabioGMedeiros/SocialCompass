import React, { useState } from 'react';
import img_right from '../../assets/img_login.png';
import body from '../../assets/user_login.png';
import user from '../../assets/digital.png';
import birth from '../../assets/birth.png';
import arroba from '../../assets/email.png';
import pass from '../../assets/locker.png';
import cpass from '../../assets/shield.png';
import './Cadastro.css';

    interface CadastroProps {
        onRegistrationSuccess: (userData: any) => void;
    }

const Cadastro: React.FC<CadastroProps> = ({ onRegistrationSuccess }) => {
    const initialFormState = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthdate: '',
    };

    const [form, setForm] = useState(initialFormState);
    const [validationErrors, setValidationErrors] = useState({
        isUsernameValid: true,
        isBirthdateValid: true,
        isEmailValid: true,
        isPasswordValid: true,
        isConfirmPasswordValid: true,
    });
    const [submitted, setSubmitted] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);


    const validateForm = () => {
        const { name, username, email, password, confirmPassword, birthdate } = form;
        const isNameValid = !!name && name.length <= 255;
        const isUsernameValid = !!username && username.length <= 255;
        const isBirthdateValid = /^\d{2}\/\d{2}\/\d{4}$/.test(birthdate);
        const isEmailValid = !!email && email.length <= 255 && email.includes('@');
        const isPasswordValid = password.length >= 6 && password.length <= 50;
        const isConfirmPasswordValid = confirmPassword === password;

        setValidationErrors({
            isUsernameValid,
            isBirthdateValid,
            isEmailValid,
            isPasswordValid,
            isConfirmPasswordValid,
        });
        return isNameValid && isUsernameValid && isBirthdateValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };

    const handleRegistration = async () => {
        setSubmitted(true);

        if (!validateForm()) {
            return;
        }

        try {
            const formattedForm = { ...form, birthdate: form.birthdate.split('/').reverse().join('-') };
            const response = await fetch('https://social-compass-server.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedForm),
            });

            if (response.ok) {
                const userData = await response.json();
                onRegistrationSuccess(userData);
            } else {
                console.error('Erro ao cadastrar usuário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error instanceof Error ? error.message : 'Erro desconhecido');
        }
    };

    return (
        <div className='cadastro'>
            <div className='left-section'>
                <div className='header'>
                    <h1>Olá,</h1>
                    <p>Por favor, registre-se para continuar.</p>
                </div>
                <div className='formulario'>
                    <h2>Cadastro</h2>
                    <form>
                        <label className={` ${submitted && (!form.name || form.name.length > 255) ? 'input-error' : ''}`}>
                            <input
                                placeholder='Nome'
                                type="text"
                                value={form.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                            />
                            <img src={body} alt="Nome" />
                        </label>
                        <br />
                        <label className={`${submitted && (!form.username || form.username.length > 255) ? 'input-error' : ''}`}>
                            <input
                                placeholder='Usuário'
                                type="text"
                                value={form.username}
                                onChange={(e) => handleInputChange(e, 'username')}
                            />
                            <img src={user} alt="Usuário" />
                        </label>
                        <br />
                        <label className={`${submitted && (!form.birthdate || !/^\d{2}\/\d{2}\/\d{4}$/.test(form.birthdate)) ? 'input-error' : ''}`}>
                            <input
                                placeholder='Nascimento: dd/mm/aaaa'
                                type="text"
                                value={form.birthdate}
                                onChange={(e) => handleInputChange(e, 'birthdate')}
                            />
                            <img src={birth} alt="Nascimento" />
                        </label>
                        <br />
                        <label className={`${submitted && (!form.email || form.email.length > 255 || !form.email.includes('@')) ? 'input-error' : ''}`}>
                            <input
                                placeholder='Email'
                                type="email"
                                value={form.email}
                                onChange={(e) => handleInputChange(e, 'email')}
                            />
                            <img src={arroba} alt="Email" />
                        </label>
                        <br />
                        <label className={`${submitted && (!form.password || form.password.length < 6 && form.password.length <= 50) ? 'input-error' : ''}`}>
                            <input
                                placeholder='Senha'
                                type="password"
                                value={form.password}
                                onChange={(e) => handleInputChange(e, 'password')}
                            />
                            <img src={pass} alt="Senha" />
                        </label>
                        <br />
                        <label className={`last-label${submitted && (form.password !== form.confirmPassword) ? 'input-error' : ''}`}>
                            <input
                                placeholder='Confirmar Senha'
                                type="password"
                                value={form.confirmPassword}
                                onChange={(e) => handleInputChange(e, 'confirmPassword')}
                            />
                            <img src={cpass} alt="Confirmar Senha" />
                        </label>
                        {submitted && (form.password !== form.confirmPassword) && <p className="error-message">As senhas não correspondem!</p>}
                        <button className='btn-cadastro' type="button" onClick={handleRegistration}>
                            Registrar-se
                        </button>
                    </form>
                    <p className='last-p'>Já possui uma conta? <a href='/'>Faça login</a></p>
                </div>
            </div>
            <div className='img_compass'>
                <img src={img_right} alt="Imagem 1" className="img_login" />
            </div>
        </div>
    );
};

export default Cadastro;
