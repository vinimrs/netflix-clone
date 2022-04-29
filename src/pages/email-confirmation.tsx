import React from 'react';
import FirstHeader from '../components/FirstHeader';
import * as S from '../styles/GlobalComponents';
import Link from 'next/link';
import Head from 'next/head';

const Login: React.FC = () => {
    return (
        <S.Background>
            <Head>
                <title>Netflix - Confirmação de Email</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <FirstHeader />
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ color: 'red' }}>Conta Criada!</h1>
                <h2 style={{ maxWidth: '600px' }}>
                    Confirme em seu e-mail para completar o cadastro e faça seu
                    login normalmente!
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
