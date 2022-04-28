import React, { useContext, useState } from 'react';
import { useUsuario, UsuarioContext } from '../common/context/Usuario';
import FirstHeader from '../components/FirstHeader';
import * as S from '../styles/GlobalComponents';
import { useRouter } from 'next/router';
import { withSession } from '../services/auth/session';
import { IImageData, ISession } from '../services/auth/authService';
import Head from 'next/head';
import { Add, DeleteOutline, RemoveCircleOutline } from '@mui/icons-material';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import CreateProfiles from '../components/CreateProfiles';
import { userService } from '../services/auth/userService';

const SelectProfile: React.FC<{
    session?: ISession;
    images?: IImageData[];
}> = ({ session, images }) => {
    const router = useRouter();
    const [confirmMessage, setConfirmMessage] = useState({
        message: '',
        error: false,
    });
    const [setingProfile, setSetingProfile] = useState(false);
    const [profileHovered, setProfileHovered] = useState('');

    const { storeProfile } = useUsuario();

    const convertImage = (bin: ArrayBuffer) => {
        const buff = Buffer.from(bin);
        return buff.toString('base64');
    };
    return (
        <>
            <Head>
                <title>Netflix - Select Profiles</title>
            </Head>
            <FirstHeader />
            <S.ProfileWrapper>
                <h1 style={{ color: 'var(--white)' }}>
                    {!setingProfile && 'Quem está assistindo?'}
                    {setingProfile && 'Crie seu perfil'}
                </h1>
                <S.ProfileContainer data-testid="profile-container">
                    {session.profiles.length < 4 && !setingProfile && (
                        <S.ProfileCreateProfileAnchor>
                            <S.ProfileBox
                                onClick={() => {
                                    setSetingProfile(!setingProfile);
                                }}
                            >
                                <Add
                                    fontSize="large"
                                    style={{ width: '190px', height: '190px' }}
                                />
                            </S.ProfileBox>
                            <h2>Criar um perfil</h2>
                        </S.ProfileCreateProfileAnchor>
                    )}
                    {setingProfile && (
                        <CreateProfiles
                            setSetingProfile={setSetingProfile}
                            images={images}
                            session={session}
                            setMessage={setConfirmMessage}
                        />
                    )}
                    {session.profiles.length > 0 &&
                        !setingProfile &&
                        session.profiles.map(prof => (
                            <S.ProfileImageBox
                                title="Entre com o perfil"
                                key={prof.image._id}
                                data-testid="profile"
                                onClick={() => {
                                    storeProfile(prof);
                                    router.push('/');
                                }}
                                onMouseEnter={() => {
                                    setProfileHovered(prof.image._id);
                                }}
                                onMouseLeave={() => {
                                    setProfileHovered('');
                                }}
                                role="img"
                                style={{ textAlign: 'center' }}
                            >
                                <S.ProfileImage
                                    src={`data:image/image/png;base64,${convertImage(
                                        prof.image.data
                                    )}`}
                                    alt={prof.slug}
                                />
                                <h2>{prof.name}</h2>
                                <DeleteOutline
                                    style={{
                                        transition: '0.3s',
                                        opacity:
                                            profileHovered === prof.image._id
                                                ? 1
                                                : 0,
                                        marginTop: 20,
                                        color: 'var(--white)',
                                    }}
                                    onClick={() => {
                                        userService
                                            .deleteUserProfile(
                                                prof.slug,
                                                session.id
                                            )
                                            .then(res => {
                                                if (res.ok) {
                                                    setConfirmMessage({
                                                        message:
                                                            'Perfil deletado com sucesso',
                                                        error: false,
                                                    });
                                                }
                                                router.push('/select-profile');
                                            })
                                            .catch(err => {
                                                setConfirmMessage({
                                                    message:
                                                        'Erro ao deletar o perfil',
                                                    error: true,
                                                });
                                            });
                                    }}
                                    titleAccess="Delete o perfil"
                                    fontSize="large"
                                />
                            </S.ProfileImageBox>
                        ))}
                </S.ProfileContainer>
                {confirmMessage.message.length > 0 && (
                    <S.StyledAlert
                        onClose={() => {
                            setConfirmMessage({ message: '', error: false });
                        }}
                        severity={confirmMessage.error ? 'error' : 'success'}
                    >
                        {confirmMessage.message}
                    </S.StyledAlert>
                )}
            </S.ProfileWrapper>
        </>
    );
};

export const getServerSideProps = withSession(async ctx => {
    const res = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image`,
        {
            method: 'GET',
        }
    );

    return {
        props: {
            images: res.body,
            session: ctx.req.session,
        },
    };
});

export default SelectProfile;
