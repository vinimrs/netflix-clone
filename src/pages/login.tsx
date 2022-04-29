import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Checkbox, FormControlLabel } from '@mui/material';
import { UsuarioContext } from '../common/context/Usuario';
import FirstHeader from '../components/FirstHeader';
import bgImage from '../../public/netflix-library.jpg';
import load from '../../public/loading-white.svg';
import * as S from '../styles/GlobalComponents';
import { authService } from '../services/auth/authService';
import Link from 'next/link';
import Head from 'next/head';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [validity, setValidity] = useState({
        email: true,
        password: true,
        confirmPassword: true,
        name: true,
    });
    const [loading, setLoading] = useState(false);
    const { email, password, checked, setChecked, setEmail, setPassword } =
        useContext(UsuarioContext);
    const router = useRouter();

    const simpleCheck = (type: string, size: number, value: string) => {
        if (value.length > 0)
            setValidity(lastVal => {
                return { ...lastVal, [type]: !(value.length < size) };
            });
    };

    return (
        <S.Background src={bgImage.src}>
            <Head>
                <title>Netflix - Login</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <FirstHeader />
            <S.LoginContainer>
                <S.LoginForm
                    style={{ textAlign: 'center' }}
                    onSubmit={e => {
                        e.preventDefault();
                        setLoading(true);
                        authService
                            .login({ email, password })
                            .then(res => {
                                console.log(res);
                                if (res.error) {
                                    setErrorMessage(res.error);
                                    setLoading(false);
                                } else {
                                    router.push('/select-profile');
                                    setEmail('');
                                    setPassword('');
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                setLoading(false);
                            });
                    }}
                >
                    <h1 style={{ textAlign: 'start', margin: '0 0 20px 0' }}>
                        {' '}
                        Entrar
                    </h1>

                    <S.LoginTextfield
                        label="Email"
                        width="100%"
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
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <S.LoginTextfield
                            label="Senha"
                            width="100%"
                            color="secondary"
                            variant="filled"
                            value={password}
                            margin="normal"
                            error={!validity.password}
                            onBlur={e =>
                                simpleCheck('password', 4, e.target.value)
                            }
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
                                    color: 'var(--red-netflix)',
                                    position: 'absolute',
                                    transform: 'translate(0px, 57px)',
                                },
                                focused: false,
                            }}
                            inputProps={{
                                style: {
                                    color: 'var(--white)',
                                },
                            }}
                            InputLabelProps={{ style: { color: '#8c8c80' } }}
                            type={showPassword ? 'text' : 'password'}
                            required
                        />
                        {password.length > 0 && (
                            <S.TogglePasswordVisibility
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                MOSTRAR
                            </S.TogglePasswordVisibility>
                        )}
                    </div>
                    <S.LoginButton
                        disabled={
                            !validity.email ||
                            !validity.password ||
                            password.length < 1 ||
                            email.length < 1
                        }
                        type="submit"
                        variant="contained"
                        fullWidth
                        data-testid="Entrar"
                    >
                        {!loading && 'Entrar'}
                        {loading && (
                            <img
                                style={{
                                    width: '30px',
                                }}
                                src={load.src}
                                alt="Animação de carregamento"
                            />
                        )}
                    </S.LoginButton>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                        }}
                    >
                        <FormControlLabel
                            style={{
                                fontSize: '8px',
                                color: '#8C8C80',
                            }}
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            }
                            label="Lembre-se de mim"
                        />
                        <S.LoginText>Esqueceu a senha?</S.LoginText>
                    </div>
                    <Link href="/register">
                        <S.LoginText
                            onClick={() => {
                                setPassword('');
                                setEmail('');
                                // setChecked(false);
                                // router.push('/register');
                            }}
                        >
                            Ainda não tem cadastro?
                        </S.LoginText>
                    </Link>
                </S.LoginForm>
            </S.LoginContainer>
            {errorMessage.length > 0 && (
                <S.StyledAlert
                    onClose={() => {
                        setErrorMessage('');
                    }}
                    severity="error"
                >
                    {errorMessage} <strong>Tente Novamente!</strong>
                </S.StyledAlert>
            )}
        </S.Background>
    );
};

export default Login;
