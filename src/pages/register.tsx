import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UsuarioContext } from '../common/context/Usuario';
import FirstHeader from '../components/FirstHeader';
import bgImage from '../../public/netflix-library.jpg';
import * as S from '../styles/GlobalComponents';
import Link from 'next/link';
import { userService } from '../services/userService';
import Head from 'next/head';

const Register: React.FC = () => {
    const [validity, setValidity] = useState({
        email: true,
        password: true,
        confirmPassword: true,
        name: true,
    });
    const {
        email,
        password,
        setEmail,
        setPassword,
        name,
        setName,
        setConfirmPassword,
        confirmPassword,
    } = useContext(UsuarioContext);
    const router = useRouter();

    const simpleCheck = (type: string, size: number, value: string) => {
        if (value.length > 0)
            setValidity(lastVal => {
                return { ...lastVal, [type]: !(value.length < size) };
            });
    };

    return (
        <S.Background src={bgImage.src}>
            <FirstHeader />
            <Head>
                <title>Netflix - Registro de Perfis</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <S.LoginContainer larger>
                <S.LoginForm
                    style={{ textAlign: 'center' }}
                    onSubmit={e => {
                        e.preventDefault();
                        userService
                            .registerUser(email, name, password)
                            .then(res => {
                                if (res.status === 201) {
                                    setConfirmPassword('');
                                    setEmail('');
                                    setName('');
                                    setPassword('');

                                    router.push('/email-confirmation');
                                }
                            });
                    }}
                >
                    <h1 style={{ textAlign: 'start', margin: '0 0 20px 0' }}>
                        {' '}
                        Cadastre-se
                    </h1>

                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}
                    >
                        <S.LoginTextfield
                            label="Nome"
                            width="95%"
                            variant="filled"
                            color="secondary"
                            value={name}
                            margin="normal"
                            onChange={e => {
                                simpleCheck('name', 2, e.target.value);
                                setName(e.target.value);
                            }}
                            error={!validity.name}
                            onBlur={e => {
                                simpleCheck('name', 2, e.target.value);
                            }}
                            helperText={
                                validity.name ? '' : 'Informe um nome válido'
                            }
                            FormHelperTextProps={{
                                style: {
                                    color: ' var(--red-netflix)',
                                    position: 'absolute',
                                    transform: 'translate(0px, 57px)',
                                },
                            }}
                            inputProps={{ sx: { color: 'var(--white)' } }}
                            InputLabelProps={{
                                style: { color: '#8c8c80' },
                            }}
                            type="name"
                            required
                        />
                        <S.LoginTextfield
                            label="Email"
                            width="95%"
                            variant="filled"
                            color="secondary"
                            value={email}
                            margin="normal"
                            onChange={e => {
                                simpleCheck('email', 10, e.target.value);
                                setEmail(e.target.value);
                            }}
                            error={!validity.email}
                            onBlur={e => {
                                simpleCheck('email', 10, e.target.value);
                            }}
                            helperText={
                                validity.email ? '' : 'Informe um Email válido'
                            }
                            FormHelperTextProps={{
                                style: {
                                    color: ' var(--red-netflix)',
                                    position: 'absolute',
                                    transform: 'translate(0px, 57px)',
                                },
                            }}
                            inputProps={{ sx: { color: 'var(--white)' } }}
                            InputLabelProps={{ style: { color: '#8c8c80' } }}
                            type="email"
                            required
                        />
                        <S.LoginTextfield
                            label="Senha"
                            width="45%"
                            color="secondary"
                            variant="filled"
                            value={password}
                            margin="normal"
                            error={!validity.password}
                            onBlur={e => {
                                simpleCheck('password', 4, e.target.value);
                            }}
                            helperText={
                                validity.password
                                    ? ''
                                    : 'Informe uma senha maior que 4 caracteres.'
                            }
                            onChange={e => {
                                simpleCheck('password', 4, e.target.value);
                                setPassword(e.target.value);
                            }}
                            FormHelperTextProps={{
                                style: {
                                    color: ' var(--red-netflix)',
                                    position: 'absolute',
                                    transform: 'translate(0px, 57px)',
                                },
                            }}
                            inputProps={{ sx: { color: 'var(--white)' } }}
                            InputLabelProps={{ style: { color: '#8c8c80' } }}
                            type="password"
                            required
                        />
                        <S.LoginTextfield
                            label="Confirme sua senha"
                            width="45%"
                            color="secondary"
                            variant="filled"
                            value={confirmPassword}
                            margin="normal"
                            error={!validity.confirmPassword}
                            onBlur={e => {
                                if (e.target.value.length > 0)
                                    setValidity(lastVal => {
                                        return {
                                            ...lastVal,
                                            ['confirmPassword']:
                                                e.target.value === password,
                                        };
                                    });
                            }}
                            helperText={
                                validity.confirmPassword
                                    ? ''
                                    : 'A senha não condiz com a senha escolhida.'
                            }
                            onChange={e => {
                                setValidity(lastVal => {
                                    return {
                                        ...lastVal,
                                        ['confirmPassword']:
                                            e.target.value === password,
                                    };
                                });
                                setConfirmPassword(e.target.value);
                            }}
                            FormHelperTextProps={{
                                style: {
                                    color: ' var(--red-netflix)',
                                    position: 'absolute',
                                    transform: 'translate(0px, 57px)',
                                },
                            }}
                            inputProps={{ sx: { color: 'var(--white)' } }}
                            InputLabelProps={{
                                style: { color: '#8c8c80' },
                            }}
                            type="password"
                            required
                        />
                    </div>
                    <p
                        style={{
                            color: '#ccc',
                            marginTop: '30px',
                            textAlign: 'justify',
                        }}
                    >
                        *TODOS os dados coletados não serão usados para promoção
                        ou qualquer outro fim. SOMENTE são usados para simular a
                        aplicação real, você pode deletar o usuário e seus dados
                        a qualquer momento.
                    </p>
                    <S.LoginButton
                        disabled={
                            !validity.email ||
                            !validity.password ||
                            !validity.name ||
                            !validity.confirmPassword ||
                            password.length < 1 ||
                            email.length < 1 ||
                            name.length < 1
                        }
                        type="submit"
                        width="100%"
                        data-testid="Entrar"
                    >
                        Cadastrar
                    </S.LoginButton>

                    <Link href="/login">
                        <S.LoginText
                            onClick={() => {
                                // setPassword('');
                                // setEmail('');
                                // setName('');
                            }}
                        >
                            Voltar
                        </S.LoginText>
                    </Link>
                </S.LoginForm>
            </S.LoginContainer>
        </S.Background>
    );
};

export default Register;
