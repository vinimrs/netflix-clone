import styled from "styled-components";
import { Button, TextField } from "@mui/material";

export const Background = styled.div`
	width: 100vw;
	height: 100vh;
    overflow-x: hidden;
    

	background-image: linear-gradient(90deg, #000a 100%, #00000000 100%),
		url(${(props) => {
			return props.$src ? props.$src : "";
		}});
	background-size: cover;
	background-position: center;
	color: var(--white);

	h1 {
		margin-bottom: 12px;
	}

    @media (max-width: 768px) {
    
    }
`;


export const LoginContainer = styled.div`
	background-color: #000000b1;
	width: 450px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
	padding: 62px 32px;

    @media (max-width: 768px) {
        width: 100vw;
        padding: 24px 8px;
        margin: 0;
        overflow-x: hidden;
    }
`;

export const LoginForm = styled.form`
	padding: 12px 24px;
`;

export const LoginTextfield = styled(TextField)`
	color: #eee;
	background-color: #333;
	border-radius: 5px;
	width: 100%;
	margin: 12px 0 16px 0;
`;

export const LoginButton = styled(Button)`
	background-color: var(--red-netflix);
	padding: 12px 24px;
    margin: 24px 0 12px 0;

	&:hover {
		background-color: #bd0000;
	}

    &:disabled {
        color: rgb(253 239 239 / 65%);
        background-color: rgb(102 0 0 / 97%);
        margin: 24px 0 12px 0;
    }
`;

export const LoginText = styled.span`
	color: #8c8c80;
	padding: 12px 0;
	font-size: 16px;
	cursor: pointer;
	transition: 0.5s;
	&:hover {
		color: var(--white);
	}

`;

export const TogglePasswordVisibility = styled.span`
	position: absolute;
	left: 10;
	cursor: pointer;
	transition: 0.5s;
	transform: translate(-97px, 30px);
	color: var(--white);
`;