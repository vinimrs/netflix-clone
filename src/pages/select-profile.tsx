import React, { Props } from 'react';
import { useUsuario } from '../common/context/Usuario';
import FirstHeader from '../components/FirstHeader';
import * as S from '../styles/GlobalComponents';
import { useRouter } from 'next/router';
import { withSession } from '../services/auth/session';
import { ISession } from '../services/auth/authService';
import plus from '../../public/plus.svg';
import Head from 'next/head';

const SelectProfile: React.FC<{ session?: ISession }> = ({ session }) => {
    const profiles = session.data?.profiles;
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Netflix - Select Profiles</title>
            </Head>
            <FirstHeader />
            <S.ProfileWrapper>
                <h1 style={{ color: 'var(--white)' }}>Quem está assistindo?</h1>
                <S.ProfileContainer data-testid="profile-container">
                    {!profiles && (
                        <div>
                            Criar um perfil
                            <img src={plus.src} />
                        </div>
                    )}
                    {/* {profiles.map(prof => (
                        <div
                            key={prof.slug}
                            data-testid="profile"
                            onClick={() => {
                                setProfileBySlug(prof.slug);
                                router.push('/login');
                            }}
                            role="img"
                        >
                            <S.ProfileImage src={prof.image} alt={prof.slug} />
                            <h2>{prof.name}</h2>
                        </div>
                    ))} */}
                    {JSON.stringify(session)}
                </S.ProfileContainer>
            </S.ProfileWrapper>
        </>
    );
};

export const getServerSideProps = withSession(ctx => {
    return {
        props: {
            session: ctx.req.session,
        },
    };
});

export default SelectProfile;
