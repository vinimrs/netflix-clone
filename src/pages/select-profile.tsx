import React, { useContext, useEffect, useState } from 'react';
import { useUsuario, UsuarioContext } from '../common/context/Usuario';
import FirstHeader from '../components/FirstHeader';
import * as S from '../styles/GlobalComponents';
import { useRouter } from 'next/router';
import { withSession } from '../services/auth/session';
import { IImageData, ISession } from '../services/auth/authService';
import Head from 'next/head';
import {
    Add,
    DeleteOutline,
    EditOutlined,
    RemoveCircleOutline,
} from '@mui/icons-material';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import CreateProfiles from '../components/ManageProfiles';
import { userService } from '../services/userService';
import Link from 'next/link';
import useWindowDimensions from '../common/context/WindowDimensions';

const SelectProfile: React.FC<{
    session?: ISession;
    images?: IImageData[];
}> = ({ session }) => {
    const router = useRouter();
    const [confirmMessage, setConfirmMessage] = useState({
        message: '',
        error: false,
    });
    const [profileHovered, setProfileHovered] = useState('');
    const { storeProfile } = useUsuario();
    const { width } = useWindowDimensions();

    const convertImage = (bin: ArrayBuffer) => {
        const buff = Buffer.from(bin);
        return buff.toString('base64');
    };
    return (
        <>
            <Head>
                <title>Netflix - Select Profiles</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <FirstHeader />
            <S.ProfileWrapper>
                <h1 style={{ color: 'var(--white)' }}>Quem está assistindo?</h1>
                <S.ProfileContainer data-testid="profile-container">
                    {session.profiles.length < 4 && (
                        <S.ProfileCreateProfileAnchor>
                            <S.ProfileBox
                                onClick={() => {
                                    router.push('/manage-profile?create=true');
                                }}
                            >
                                <Add
                                    fontSize="large"
                                    style={{
                                        width: width < 768 ? '140px' : '190px',
                                        height: width < 768 ? '140px' : '190px',
                                    }}
                                />
                            </S.ProfileBox>
                            <h2>Criar um perfil</h2>
                        </S.ProfileCreateProfileAnchor>
                    )}

                    {session.profiles.length > 0 &&
                        // !setingProfile &&
                        // !editProfile &&
                        session.profiles.map((prof, index) => (
                            <S.ProfileImageBox
                                title="Entre com o perfil"
                                key={index}
                                data-testid="profile"
                                onMouseEnter={() => {
                                    setProfileHovered(index.toString());
                                }}
                                onMouseLeave={() => {
                                    setProfileHovered('');
                                }}
                                role="img"
                                style={{ textAlign: 'center' }}
                            >
                                <S.ProfileImage
                                    onClick={() => {
                                        storeProfile(prof);
                                        router.push('/');
                                    }}
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
                                            profileHovered ===
                                                index.toString() || width < 768
                                                ? 1
                                                : 0,
                                        marginTop: 15,
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
                                <Link href={`/manage-profile?edit=${index}`}>
                                    <EditOutlined
                                        style={{
                                            transition: '0.3s',
                                            opacity:
                                                profileHovered ===
                                                    index.toString() ||
                                                width < 768
                                                    ? 1
                                                    : 0,
                                            color: 'var(--white)',
                                            margin:
                                                width < 768
                                                    ? '15px 0 0 30px'
                                                    : '15px 0 0 20px',
                                        }}
                                        titleAccess="Edite o perfil"
                                        fontSize="large"
                                    />
                                </Link>
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
    return {
        props: {
            session: ctx.req.session,
        },
    };
});

export default SelectProfile;
