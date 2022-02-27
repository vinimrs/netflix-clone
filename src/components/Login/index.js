import React, { useContext, useState } from "react";
import {
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import * as S from './style';
import bgImage from "../../assets/netflix-library.jpg";
import { ReactComponent as Logo } from "../../assets/netflix-logo.svg";
import { UsuarioContext } from "../../common/context/Usuario";
import { useNavigate } from 'react-router-dom';

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const {email, password, checked, setChecked, setEmail, setPassword} = useContext(UsuarioContext);
    const history = useNavigate();

	return (
		<S.Background $src={bgImage}>
			<S.Header>
				<Logo />
			</S.Header>
			<S.LoginContainer>
				<S.LoginForm>
					<h1>Entrar</h1>

					<S.LoginTextfield
						label="Email"
						variant="filled"
						value={email}
						margin="normal"
						onChange={(e) => setEmail(e.target.value)}
						error={email.length < 9}
						helperText={
							email.length < 9 ? "Informe um Email válido" : ""
						}
						inputProps={{ sx: { color: "var(--white)" } }}
						type="email"
					/>
					<div style={{ position: "relative", width: "100%" }}>
						<S.LoginTextfield
							label="Senha"
							variant="filled"
							value={password}
							margin="normal"
							error={password.length < 4}
                            // onBlur={() => simpleCheck('password', 4)}
							helperText={
								password.length < 4
									? "Informe uma senha maior que 4 caracteres."
									: ""
							}
							onChange={(e) => setPassword(e.target.value)}
							inputProps={{ sx: { color: "var(--white)" } }}
							type={showPassword ? "text" : "password"}
						/>
						{password.length > 4 && (
							<S.TogglePasswordVisibility
								onClick={() => setShowPassword(!showPassword)}
							>
								MOSTRAR
							</S.TogglePasswordVisibility>
						)}
					</div>
					<S.LoginButton onClick={(e) => {
                        e.preventDefault();
                        history('/browse');
                        }} type="submit" variant="contained" fullWidth>
						Entrar
					</S.LoginButton>
					<div style={{ display: "flex" }}>
						<FormControlLabel
							style={{ fontSize: "8px", color: "#8C8C80" }}
							control={
								<Checkbox
									checked={checked}
									onChange={() => setChecked(!checked)}
								/>
							}
							label="Lembre-se de mim"
						/>
						<S.SecLoginButton>Esqueceu a senha?</S.SecLoginButton>
					</div>
				</S.LoginForm>
			</S.LoginContainer>
		</S.Background>
	);
}

export default Login;
