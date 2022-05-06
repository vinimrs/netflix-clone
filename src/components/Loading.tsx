import React from 'react';
import styled from 'styled-components';
import loading from '../../public/loading1.gif';

const LoadingImg = styled.img`
  width: 100vw;
`;

const Loading: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: '900',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <LoadingImg src={loading.src} alt="Animação de carregamento" />
    </div>
  );
};

export default Loading;
