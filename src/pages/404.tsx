import Head from 'next/head';
import Image from 'next/image';
import logo from '../../public/netflix-logo.svg';

export default function Custom404() {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Head>
                <title>404 - Página não encontrada</title>
            </Head>
            <Image src={logo.src} width="300px" height="150px" />
            <h1>Oops - Página não encontrada</h1>
        </div>
    );
}
