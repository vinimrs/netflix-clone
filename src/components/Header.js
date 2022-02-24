import React from 'react';
import styled from 'styled-components';
import logo from '../assets/netflix-logo.svg';
import perfil from '../assets/perfil-net.svg';

const StyledHeader = styled.header` 
    position: fixed;
    top: 0 ;
    left: 0;   
    right: 0; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 32px;
    transition: all ease .2s;
    background-color: ${props => props.$active ? 'var(--black)' : '#00000000' }; 
    z-index: 100;

    

    @media (max-width: 768px) {
        padding: 8px 16px;
    }
`;

const LogoNetflix = styled.img` 
    width: 117px;
    height: 66px;
    z-index: 100;

    @media (max-width: 768px) {
        width: 92px;
        height: 52px;
    }
`;

const PerfilNetflix = styled.img` 
    width: 65px;
    height: 64px;
    border-radius: 10px;
    z-index: 100;

    @media (max-width: 768px) {
        width: 53px;
        height: 52px;
        
    }
`;

function Header({ scroll }) {
    return ( 
        <StyledHeader $active={scroll}>
            <LogoNetflix src={logo} alt='Logo da Netflix' />
            <PerfilNetflix src={perfil} alt='Perfil do usuário' />
        </StyledHeader>
    );
}

export default Header;