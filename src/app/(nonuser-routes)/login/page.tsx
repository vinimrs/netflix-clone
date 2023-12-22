'use client';
import React, {
	ChangeEventHandler,
	FormEventHandler,
	useRef,
	useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox, FormControlLabel } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { MuiCustomInputProps } from '@constants';
import { useAlert, useSession } from '@hooks';
import * as S from '../../../styles/GlobalComponents';
import { authService, tokenService } from '@services';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [checked, setChecked] = useState(true);

	const alertActions = useAlert();
	const [loading, setLoading] = useState(false);

	const button = useRef<HTMLButtonElement>(null);
	const router = useRouter();

	const { setSession } = useSession();

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault();
		setLoading(true);
		button.current?.focus();

		try {
			setLoading(true);

			const res = await authService.login({ email, password });

			if (res?.error) {
				throw new Error(res.error);
			}

			const tokenRes = await tokenService.save(res.access, res.refresh_token);

			const session = await authService.getSession();
			setSession(session);

			setLoading(false);

			router.push('/browse');

			console.log(res, tokenRes, session);

			setEmail('');
			setPassword('');
		} catch (error: any) {
			setLoading(false);
			alertActions.error(error.message);
		}
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
					autoComplete="email"
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
							width="30"
							height="30"
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
	);
};

export default Login;
