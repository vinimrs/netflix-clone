import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Checkbox, FormControlLabel } from '@mui/material';
import { UsuarioContext } from '../common/context/Usuario';
import bgImage from '../../public/netflix-library.jpg';
import load from '../../public/loading-white.svg';
import * as S from '../styles/GlobalComponents';
import { authService } from '../services/auth/authService';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import FirstHeader from '../components/FirstHeader';
import { regExp, MuiCustomInputProps } from '../common/constants';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validity, setValidity] = useState({
    email: true,
    password: true,
  });
  const [loading, setLoading] = useState(false);
  const { email, password, checked, setChecked, setEmail, setPassword } =
    useContext(UsuarioContext);
  const router = useRouter();

  const fieldValidation = (type: string, value: string) => {
    setValidity(lastVal => {
      return {
        ...lastVal,
        [type]: regExp[type].test(value) || value.length < 1,
      };
    });
  };

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    setLoading(true);

    authService
      .login({ email, password })
      .then(res => {
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
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
        setLoading(false);
      });
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    const type = e.target.type === 'text' ? 'password' : e.target.type;
    const value = e.target.value;
    fieldValidation(type, value);
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
  };

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    fieldValidation(e.target.type, e.target.value);
  };

  return (
    <S.Background src={bgImage.src}>
      <Head>
        <title>Netflix - Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FirstHeader />
      <S.LoginContainer>
        <S.LoginForm style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'start', margin: '0 0 20px 0' }}> Entrar</h1>

          <S.LoginTextfield
            label="Email"
            width="100%"
            variant="filled"
            color="secondary"
            value={email}
            margin="normal"
            onChange={handleChange}
            error={!validity.email}
            onBlur={handleBlur}
            helperText={validity.email ? '' : 'Informe um Email válido'}
            FormHelperTextProps={MuiCustomInputProps.formHelperText}
            inputProps={MuiCustomInputProps.input}
            InputLabelProps={MuiCustomInputProps.inputLabel}
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
              onBlur={handleBlur}
              helperText={
                validity.password
                  ? ''
                  : 'Mínimo de 8 caracteres, pelo menos uma letra e um número.'
              }
              onChange={handleChange}
              FormHelperTextProps={MuiCustomInputProps.formHelperText}
              inputProps={MuiCustomInputProps.input}
              InputLabelProps={MuiCustomInputProps.inputLabel}
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
            data-testid="Entrar"
            width="100%"
          >
            {!loading && 'Entrar'}
            {loading && (
              <Image
                width="30px"
                height="30px"
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
          <Link href="/register" passHref>
            <S.LoginText
              onClick={() => {
                setPassword('');
                setEmail('');
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
