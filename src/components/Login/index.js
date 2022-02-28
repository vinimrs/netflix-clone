import React, { useContext, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as S from "./style";
import bgImage from "../../assets/netflix-library.jpg";
import { UsuarioContext } from "../../common/context/Usuario";
import { useNavigate } from "react-router-dom";
import FirstHeader from "../FirstHeader";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [validity, setValidity] = useState({ email: true, password: true });
	const { email, password, checked, setChecked, setEmail, setPassword } =
		useContext(UsuarioContext);
	const history = useNavigate();

	const simpleCheck = (type, size, value) => {
		setValidity((lastVal) => {
			return { ...lastVal, [type]: !(value.length < size) };
		});
	};

	return (
		<S.Background $src={bgImage}>
			<FirstHeader />
			<S.LoginContainer>
				<S.LoginForm>
					<h1>Entrar</h1>

					<S.LoginTextfield
						label="Email"
						variant="filled"
						value={email}
						margin="normal"
						onChange={(e) => setEmail(e.target.value)}
						error={!validity.email}
						onBlur={(e) => {
							console.log("blur");
							simpleCheck("email", 10, e.target.value);
						}}
						helperText={
							validity.email ? "" : "Informe um Email válido"
						}
						FormHelperTextProps={{
							style: {
								color: " var(--red-netflix)",
								position: "absolute",
								transform: "translate(0px, 57px)",
							},
						}}
						inputProps={{ sx: { color: "var(--white)" } }}
						InputLabelProps={{ style: { color: "#8c8c80" } }}
						type="email"
					/>
					<div style={{ position: "relative", width: "100%" }}>
						<S.LoginTextfield
							label="Senha"
							variant="filled"
							value={password}
							margin="normal"
							error={!validity.password}
							onBlur={(e) =>
								simpleCheck("password", 4, e.target.value)
							}
							helperText={
								validity.password
									? ""
									: "Informe uma senha maior que 4 caracteres."
							}
							onChange={(e) => setPassword(e.target.value)}
							FormHelperTextProps={{
								style: {
									color: " var(--red-netflix)",
									position: "absolute",
									transform: "translate(0px, 57px)",
								},
							}}
							inputProps={{ sx: { color: "var(--white)" } }}
							InputLabelProps={{ style: { color: "#8c8c80" } }}
							type={showPassword ? "text" : "password"}
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
						onClick={(e) => {
							e.preventDefault();
							setPassword("");
							setEmail("");
							history("/select-profile");
						}}
						disabled={
							!validity.email ||
							!validity.password ||
							password.length < 1 ||
							email.length < 1
						}
						type="submit"
						variant="contained"
						fullWidth
					>
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
						<S.LoginText>Esqueceu a senha?</S.LoginText>
					</div>
				</S.LoginForm>
			</S.LoginContainer>
		</S.Background>
	);
}

export default Login;
