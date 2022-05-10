import { MuiCustomInputProps, regExp } from '@constants';
import { userService } from '@services';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	FormEventHandler,
	useState,
} from 'react';

// import { Container } from './styles';

import * as S from './styles';

const Register: React.FC = () => {
	const [validity, setValidity] = useState({
		email: true,
		password: true,
		confirmPassword: true,
		name: true,
	});
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const router = useRouter();

	const fieldValidation = (type: string, value: string) => {
		const typeName = type === 'text' ? 'name' : type;
		setValidity(lastVal => {
			return {
				...lastVal,
				[typeName]: regExp[type].test(value) || value.length < 1,
			};
		});
	};

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault();
		userService.registerUser(email, name, password).then(res => {
			if (res.status === 201) {
				setConfirmPassword('');
				setEmail('');
				setName('');
				setPassword('');

				router.push('/email-confirmation');
			}
		});
	};

	const handleChange: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = e => {
		fieldValidation(e.target.type, e.target.value);
		if (e.target.type === 'email') setEmail(e.target.value);
		if (e.target.type === 'password') setPassword(e.target.value);
		if (e.target.type === 'text') setName(e.target.value);
	};

	const handleBlur: FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = e => {
		fieldValidation(e.target.type, e.target.value);
	};

	return (
		<S.CustomContainer larger>
			<S.CustomForm style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
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
					<S.CustomTextField
						label="Nome"
						width="95%"
						variant="filled"
						color="secondary"
						value={name}
						margin="normal"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!validity.name}
						helperText={validity.name ? '' : 'Informe um nome válido'}
						FormHelperTextProps={MuiCustomInputProps.formHelperText}
						inputProps={MuiCustomInputProps.input}
						InputLabelProps={MuiCustomInputProps.inputLabel}
						type="name"
						required
					/>
					<S.CustomTextField
						label="Email"
						width="95%"
						variant="filled"
						color="secondary"
						value={email}
						margin="normal"
						onChange={handleChange}
						onBlur={handleBlur}
						error={!validity.email}
						helperText={validity.email ? '' : 'Informe um Email válido'}
						FormHelperTextProps={MuiCustomInputProps.formHelperText}
						inputProps={MuiCustomInputProps.input}
						InputLabelProps={MuiCustomInputProps.inputLabel}
						type="email"
						required
					/>
					<S.CustomTextField
						label="Senha"
						width="45%"
						color="secondary"
						variant="filled"
						value={password}
						margin="normal"
						error={!validity.password}
						onBlur={handleBlur}
						onChange={handleChange}
						helperText={
							validity.password
								? ''
								: 'Mínimo de 8 caracteres, pelo menos uma letra e um número.'
						}
						FormHelperTextProps={MuiCustomInputProps.formHelperText}
						inputProps={MuiCustomInputProps.input}
						InputLabelProps={MuiCustomInputProps.inputLabel}
						type="password"
						required
					/>
					<S.CustomTextField
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
										['confirmPassword']: e.target.value === password,
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
									['confirmPassword']: e.target.value === password,
								};
							});
							setConfirmPassword(e.target.value);
						}}
						FormHelperTextProps={MuiCustomInputProps.formHelperText}
						inputProps={MuiCustomInputProps.input}
						InputLabelProps={MuiCustomInputProps.inputLabel}
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
					*TODOS os dados coletados não serão usados para promoção ou qualquer
					outro fim. SOMENTE são usados para simular a aplicação real, você pode
					deletar o usuário e seus dados a qualquer momento.
				</p>
				<S.CustomButton
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
				</S.CustomButton>

				<Link href="/login" passHref>
					<S.CustomText>Voltar</S.CustomText>
				</Link>
			</S.CustomForm>
		</S.CustomContainer>
	);
};

export default Register;
