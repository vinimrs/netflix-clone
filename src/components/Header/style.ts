import styled from 'styled-components';

export const StyledHeader = styled.header<{ $active?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 32px;
    transition: all ease 0.2s;
    background-color: ${props =>
        props.$active ? 'var(--black)' : '#00000000'};
    z-index: 1000;

    .css-6hp17o-MuiList-root-MuiMenu-list {
        background-color: #111;
        color: green;
        top: 32;
    }

    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
        color: green;
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
    }
`;

export const LogoNetflix = styled.img`
    width: 117px;
    height: 66px;
    z-index: 100;

    @media (max-width: 768px) {
        width: 92px;
        height: 52px;
    }
`;

export const PerfilNetflix = styled.img`
    width: 65px;
    height: 64px;
    border-radius: 8px;
    z-index: 100;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 53px;
        height: 52px;
    }
`;

export const ContainerMenu = styled.div`
    background-color: #000000d1;
    border-radius: 4px;
    width: 250px;
    position: absolute;
    transition: 0.5s;
    top: 87px;
    right: 24px;
    color: var(--white);
    padding: 12px;
    visibility: hidden;
    opacity: 0;

    @media (max-width: 768px) {
        top: 65px;
    }
`;

export const Menu = styled.ul`
    list-style: none;
`;

export const MenuItem = styled.li`
    display: flex;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;

    &:hover {
        span {
            text-decoration: underline;
        }
    }
`;

export const MenuImage = styled.img`
    width: 35px;
    border-radius: 4px;
`;

export const MenuText = styled.span`
    font-family: Open sans;
    font-size: 14px;
    margin-left: 8px;
`;
