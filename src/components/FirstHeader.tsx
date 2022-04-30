import Image from 'next/image';
import React from 'react';
import logo from '../../public/netflix-logo.svg';

const FirstHeader: React.FC = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: '80px',
                paddingRight: '80vw',
                paddingLeft: '50px',
            }}
        >
            <Image
                src={logo.src}
                width="150px"
                height="100px"
                style={{ display: 'flex', justifyContent: 'start' }}
            />
        </div>
    );
};

export default FirstHeader;
