import Logo from '../../public/netflix-logo.svg';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import { authService } from '../services/auth/authService';

export const Header = styled.header`
    text-align: left;
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px 0 0 32px;
`;

const FirstHeader: React.FC = () => {
    const router = useRouter();
    return (
        <Header>
            <div style={{ cursor: 'pointer' }}>
                <img
                    src={Logo.src}
                    onClick={() => {
                        router.push('/logout');
                    }}
                />
                {/* <Logo onClick={() => router.back()} /> */}
            </div>
        </Header>
    );
};

export default FirstHeader;
