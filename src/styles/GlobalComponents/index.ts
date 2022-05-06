import { Select, TextField } from '@mui/material';
import styled from 'styled-components';
import { Alert } from '@mui/material';

export const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 40px;
  left: 32px;
  z-index: 99999;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MainWrapper = styled.main`
  overflow-x: hidden;
  margin-top: -150px;

  @media (max-width: 768px) {
    margin-top: -80px;
  }
`;

// login

export const Background = styled.div<{ src?: string }>`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  background-image: linear-gradient(90deg, #000a 100%, #00000000 100%),
    url(${props => (props.src ? props.src : '')});
  background-size: cover;
  background-position: center;
  color: var(--white);

  h1 {
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
  }
`;

export const LoginContainer = styled.div<{ larger?: boolean }>`
  background-color: #000000b1;
  width: ${props => (props.larger ? '650px' : '450px')};
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
    margin-top: 20px;
    overflow-x: hidden;
  }
`;

export const LoginForm = styled.form`
  padding: 12px 24px;
`;

export const LoginTextfield = styled(TextField)<{ width?: string }>`
  color: #eee;
  background-color: #333;
  border-radius: 5px;
  width: ${props => props.width};
  margin: 16px 0;
`;

export const CustomSelectField = styled(Select)<{ width?: string }>`
  color: #eee;
  background-color: #333;
  border-radius: 5px;
  width: ${props => props.width};
  margin: 18px 0 16px 0;
`;

export const LoginButton = styled.button<{ width?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
  vertical-align: middle;
  text-transform: uppercase;
  font-family: 'Roboto';
  padding: 12px 48px;
  margin: 32px 0 12px 0;
  outline: 0;
  border-radius: 4px;
  border: 0;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
  background-color: var(--red-netflix);
  color: var(--white);
  cursor: pointer;
  transition: 0.3s;

  width: ${props => props.width};

  &:hover {
    background-color: #bd0000;
  }

  &:disabled {
    color: #aaa;
    background-color: rgb(102 0 0 / 97%);
  }

  @media (max-width: 768px) {
    width: 100%;
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
  margin-top: 5px;
  cursor: pointer;
  transition: 0.5s;
  transform: translate(-97px, 30px);
  color: var(--white);
`;

// Select-profile
export const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  color: var(--gray);
  margin-top: 35px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const ProfileBox = styled.div`
  text-align: center;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  margin: 8px 0;
  border: 2px solid #8c8c80;
  transition: all 0.3s;

  &:hover {
    border: 2px solid var(--white);
    color: var(--white);
  }
`;

export const ProfileWrapper = styled.div<{ manage?: boolean }>`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 52px;
    font-family: Open Sans;

    margin-bottom: 32px;
  }

  h2 {
    font-size: ${({ manage }) => (manage ? '32px' : '24px')};
    font-weight: 700;
    color: #8c8c80;
    transition: 0.3s;
  }

  h3 {
    font-size: 22px;
    font-weight: 500;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    height: auto;
    margin-top: 140px;
    margin-bottom: 70px;
    h1 {
      font-size: 32px;
      margin-bottom: 12px;
    }
    h2 {
      font-size: ${({ manage }) => (manage ? '28px' : '18px')};
    }
    h3 {
      font-size: 22px;
    }
  }
`;

export const ProfileImageBox = styled.div`
  text-align: center;
  cursor: pointer;
  margin: 8px 0;
  position: relative;

  &:hover {
    h2 {
      color: var(--white);
    }
  }

  @media (max-width: 768px) {
    margin: 12px 0;

    h2 {
      color: var(--white);
    }
  }
`;

export const ProfileCreateProfileAnchor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  transition: all 0.3s;

  &:hover {
    color: var(--white);

    h2 {
      color: var(--white);
    }
  }

  @media (max-width: 768px) {
    width: 150px;
    margin: 8px 0;
  }
`;

export const ProfileImage = styled.img`
  width: 200px;
  margin: 0px 10px 0px 10px;
  transition: 0.3s;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--white);
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const CreateProfileForm = styled.form`
  width: 100%;
  /* max-width: 1000px; */
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const CreateProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: space-around;
    flex-direction: column-reverse;
  }
`;

export const CreateProfileImagesWrapper = styled.div`
  padding: 12px 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 0 0 20px;
    margin-top: 20px;
  }
`;

export const CreateProfileInputsWrapper = styled.div`
  margin: 0;
  width: 100%;
  padding: 0 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    margin: 0 12px;
  }
`;

export const CreateProfileEditSession = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 768px;
  }
`;

export const CreateProfileImageBox = styled.img<{ checked?: boolean }>`
  width: 200px;
  margin: 8px 20px 8px 0px;
  padding: 0;
  transition: 0.3s;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  /* border-color: ${props => (props.checked ? 'var(--white)' : '')}; */

  &:hover {
    border-color: var(--white);
  }

  @media (max-width: 768px) {
    border: 4px solid transparent;
    width: 100px;
  }
`;
