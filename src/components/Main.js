import React from 'react';
import styled from 'styled-components';
import List from './List';

const MainWrapper = styled.main`
    overflow-x: hidden;
    margin-top: -150px;

    @media (max-width: 768px) {
        margin-top: -80px;
    }
`;

function Main({ list }) {
    return ( 
        <MainWrapper>
            {list.map((category, key) => {
                return (
                    <List key={key} list={category} />
                )
            })}
        </MainWrapper>
     );
}

export default Main;
