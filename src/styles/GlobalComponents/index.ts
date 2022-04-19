import { Button, TextField } from '@mui/material'
import styled from 'styled-components'
import { Alert } from '@mui/material'

export const StyledAlert = styled(Alert)`
    position: fixed;
    bottom: 40px;
    left: 32px;
    z-index: 99999;
    font-size: 18px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

export const MainWrapper = styled.main`
    overflow-x: hidden;
    margin-top: -150px;

    @media (max-width: 768px) {
        margin-top: -80px;
    }
`

// login

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;

    background-image: linear-gradient(90deg, #000a 100%, #00000000 100%),
        url(${props => {
            return props.$src ? props.$src : ''
        }});
    background-size: cover;
    background-position: center;
    color: var(--white);

    h1 {
        margin-bottom: 12px;
    }

    @media (max-width: 768px) {
    }
`

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
`

export const LoginForm = styled.form`
    padding: 12px 24px;
`

export const LoginTextfield = styled(TextField)`
    color: #eee;
    background-color: #333;
    border-radius: 5px;
    width: 100%;
    margin: 12px 0 16px 0;
`

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
`

export const LoginText = styled.span`
    color: #8c8c80;
    padding: 12px 0;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
        color: var(--white);
    }
`

export const TogglePasswordVisibility = styled.span`
    position: absolute;
    left: 10;
    cursor: pointer;
    transition: 0.5s;
    transform: translate(-97px, 30px);
    color: var(--white);
`

// Select-profile
export const ProfileContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    color: var(--gray);

    div {
        text-align: center;
        cursor: pointer;
        margin: 8px 0;
    }

    div:hover {
        color: var(--white);
    }
`

export const ProfileWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 52px;
        font-family: Open Sans;

        margin-bottom: 52px;
    }

    h2 {
        font-size: 22px;
        font-weight: 500;
        color: inherit;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 24px;
            margin-bottom: 12px;
        }
        h2 {
            font-size: 12px;
        }
    }
`

export const ProfileImage = styled.img`
    width: 200px;
    margin: 8px 10px 0px 10px;
    transition: 0.3s;
    border: 2px solid transparent;

    &:hover {
        border-color: var(--white);
    }

    @media (max-width: 768px) {
        width: 100px;
    }
`
