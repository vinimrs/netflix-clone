import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UsuarioContext } from '../common/context/Usuario';
import FirstHeader from '../components/FirstHeader';
import bgImage from '../../public/netflix-library.jpg';
import * as S from '../styles/GlobalComponents';
import Link from 'next/link';

const Login: React.FC = () => {
    const { email, password, setEmail, setPassword, name, setName } =
        useContext(UsuarioContext);
    const router = useRouter();

    return (
        <S.Background>
            <FirstHeader />
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ color: 'red' }}>Conta Criada</h1>
                <h2>
                    Confirme em seu e-mail para completar o cadastro e faça seu
                    login!
                </h2>
                <Link href="/login">
                    <a style={{ color: 'white', margin: '30px' }}>
                        Voltar para o login
                    </a>
                </Link>
            </div>
        </S.Background>
    );
};

export default Login;
