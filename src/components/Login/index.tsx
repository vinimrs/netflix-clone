import React, {
	ChangeEventHandler,
	FormEventHandler,
	useRef,
	useState,
} from 'react';
import { useRouter } from 'next/router';
import { Checkbox, FormControlLabel } from '@mui/material';
import * as S from './styles';
import { authService } from '@services';
import Link from 'next/link';
import Image from 'next/image';
import FirstHeader from '../FirstHeader';
import { MuiCustomInputProps } from '@constants';
import { useAlert } from '@hooks';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [checked, setChecked] = useState(true);

	const alertActions = useAlert();
	const [loading, setLoading] = useState(false);

	const button = useRef<HTMLButtonElement>(null);
	const router = useRouter();

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault();
		setLoading(true);
		button.current?.focus();

		authService
			.login({ email, password })
			.then(res => {
				if (res.error) {
					alertActions.error(res.error);
					setLoading(false);
				} else {
					router.push('/select-profile');
					setEmail('');
					setPassword('');
				}
			})
			.catch(err => {
				if (err instanceof Error) {
					alertActions.error(err.message);
				}
				setLoading(false);
			});
	};

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = e => {
		const type = e.target.type === 'text' ? 'password' : e.target.type;
		const value = e.target.value;
		if (type === 'email') setEmail(value);
		if (type === 'password') setPassword(value);
	};
	return (
		<S.CustomBackground src="/netflix-library.jpg">
			<FirstHeader />
			<S.CustomContainer>
				<S.CustomForm style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
					<h1 style={{ textAlign: 'start', margin: '0 0 20px 0' }}> Entrar</h1>

					<S.CustomTextField
						label="Email"
						width="100%"
						variant="filled"
						color="secondary"
						value={email}
						margin="normal"
						onChange={handleChange}
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
						<S.CustomTextField
							label="Senha"
							width="100%"
							color="secondary"
							variant="filled"
							value={password}
							margin="normal"
							onChange={handleChange}
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
					<S.CustomButton
						ref={button}
						disabled={password.length < 1 || email.length < 1}
						type="submit"
						data-testid="Entrar"
						width="100%"
					>
						{!loading && 'Entrar'}
						{loading && (
							<Image
								width="30px"
								height="30px"
								src="/loading-white.svg"
								alt="Animação de carregamento"
							/>
						)}
					</S.CustomButton>
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
						<S.CustomText>Esqueceu a senha?</S.CustomText>
					</div>
					<Link href="/register" passHref>
						<S.CustomText
							onClick={() => {
								setPassword('');
								setEmail('');
							}}
						>
							Ainda não tem cadastro?
						</S.CustomText>
					</Link>
				</S.CustomForm>
			</S.CustomContainer>
		</S.CustomBackground>
	);
};

export default Login;
