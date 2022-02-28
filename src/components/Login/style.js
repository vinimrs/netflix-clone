import styled from "styled-components";
import { Button, TextField } from "@mui/material";

export const Background = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(90deg, #000a 100%, #00000000 100%),
		url(${(props) => {
			return props.$src ? props.$src : "";
		}});
	background-size: cover;
	background-position: center;
	margin: 0;
	color: var(--white);

	h1 {
		margin-bottom: 12px;
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
`;

export const LoginForm = styled.form`
	padding: 12px 24px;

	// checkbox
	.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
	.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate,
	.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root {
		color: #fff6f6ee;
	}

	// inputs mui style
	.css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
		border-bottom: 2px solid var(--red-netflix);
	}
	.css-e4w4as-MuiFormLabel-root-MuiInputLabel-root,
	.css-o943dk-MuiFormLabel-root-MuiInputLabel-root,
	.css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
		color: #8c8c80;
	}

	.css-1wc848c-MuiFormHelperText-root {
		color: var(--red-netflix);
		position: absolute;
		transform: translate(0px, 57px);
	}


.css-1fu7jd5-MuiButtonBase-root-MuiButton-root.Mui-disabled {
    color: rgb(253 239 239 / 65%);
    background-color: rgb(102 0 0 / 97%);
    margin: 24px 0 12px 0;
}
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
	// margin: 12px 0 8px 0;
    margin: 24px 0 12px 0;

	&:hover {
		background-color: #bd0000;
	}
`;

export const SecLoginButton = styled.span`
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