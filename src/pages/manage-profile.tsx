import * as S from '../styles/GlobalComponents';
import { Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IImageData, ISession } from '../services/auth/authService';
import { userService } from '../services/userService';
import { useRouter } from 'next/router';
import { useUsuario } from '../common/context/Usuario';
import { Box } from '@mui/system';
import { moviesGenres } from '../services/moviesService';
import { withSession } from '../services/auth/session';
import Head from 'next/head';
import Link from 'next/link';
import { HttpClient } from '../infra/HttpClient/HttpClient';
import load from '../../public/loading-white.svg';
import Image from 'next/image';

interface CreateManageProfilesProps {
    session: ISession;
    images: IImageData[];
    setConfirmMessage?: React.Dispatch<
        React.SetStateAction<{
            message: string;
            error: boolean;
        }>
    >;
    setSetingProfile?: React.Dispatch<React.SetStateAction<boolean>>;
    editProfile?: string;
}

const ManageProfiles: React.FC<CreateManageProfilesProps> = ({
    session,
    images,
}) => {
    const [preferences, setPreferences] = useState<string[]>([]);
    const [profileName, setProfileName] = useState('');
    const [imageData, setImageData] = useState({ id: '', data: '' });
    // const [setingProfile, setSetingProfile] = useState(false);
    const [editProfile, setEditProfile] = useState('');
    const [confirmMessage, setConfirmMessage] = useState({
        message: '',
        error: false,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toSlug } = useUsuario();

    const filteredImages = (
        imgs: { _id: string; data: ArrayBuffer; contentType: string }[]
    ) => {
        return imgs.filter(img => {
            const exists = session.profiles.find(prof => {
                return prof.image._id === img._id;
            });
            return exists ? false : true;
        });
    };

    const convertImage = (bin: ArrayBuffer) => {
        const buff = Buffer.from(bin);
        return buff.toString('base64');
    };

    const validations = (
        pref: string[],
        imageInfo: { data: string; id: string },
        profName: string,
        session: ISession
    ) => {
        if (pref.length < 6) {
            setConfirmMessage({
                message: 'Você deve escolher no mínimo 6 gêneros!',
                error: true,
            });
            return false;
        }
        if (!imageInfo.id) {
            setConfirmMessage({
                message: 'Você deve escolher uma imagem para seu perfil',
                error: true,
            });
            return false;
        }

        if (session.profiles.length > 3 && !editProfile) {
            setConfirmMessage({
                message: 'Você chegou no limite de perfis',
                error: true,
            });
            return false;
        }

        const slug = toSlug(profName);
        const exists = session.profiles.find(prof => {
            return prof.slug === slug;
        });

        if (exists) {
            setConfirmMessage({
                message: 'Nome de perfil já usado',
                error: true,
            });
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (router.query.create) setEditProfile('');
        if (typeof router.query.edit === 'string') {
            setEditProfile(router.query.edit);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Netflix - Manage Profiles</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <S.ProfileWrapper>
                <S.ProfileContainer>
                    <h1 style={{ color: 'var(--white)' }}>
                        {!editProfile && 'Crie seu perfil'}
                        {editProfile && 'Edite o seu perfil'}
                    </h1>
                    <S.CreateProfileForm
                        onSubmit={async e => {
                            e.preventDefault();
                            setLoading(true);

                            if (
                                !validations(
                                    preferences,
                                    imageData,
                                    profileName,
                                    session
                                )
                            ) {
                                setLoading(false);
                                return;
                            }

                            const slug = toSlug(profileName);

                            const preferencesId = preferences.map(pref => {
                                const genre = moviesGenres.find(
                                    genre => genre.title === pref
                                );
                                return genre.id.toString();
                            });

                            let res;
                            if (!editProfile) {
                                res = await userService.createNewProfile(
                                    slug,
                                    profileName,
                                    preferencesId,
                                    imageData.id,
                                    session.id
                                );
                            } else {
                                res = await userService.updateUserProfile(
                                    slug,
                                    profileName,
                                    preferencesId,
                                    imageData.id,
                                    session.id,
                                    editProfile
                                );
                            }
                            setConfirmMessage({
                                message: res.body.message,
                                error: !res.ok,
                            });
                            if (res.ok) {
                                router.push('/select-profile');
                            }
                        }}
                    >
                        <S.CreateProfileWrapper>
                            <S.CreateProfileEditSession>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '20px',
                                        width: '100%',
                                    }}
                                >
                                    <h3>Escolha sua imagem</h3>
                                    <S.CreateProfileImagesWrapper>
                                        {filteredImages(images).map(image => (
                                            <div
                                                key={image._id}
                                                id={image._id}
                                                onClick={() => {
                                                    setImageData({
                                                        id: image._id,
                                                        data: convertImage(
                                                            image.data
                                                        ),
                                                    });
                                                }}
                                            >
                                                <S.CreateProfileImageBox
                                                    src={`data:image/image/png;base64,${convertImage(
                                                        image.data
                                                    )}`}
                                                    style={{
                                                        width: '100px',
                                                        borderRadius: '10px',
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </S.CreateProfileImagesWrapper>
                                </div>
                                <S.CreateProfileInputsWrapper>
                                    <S.LoginTextfield
                                        label="Nome do perfil"
                                        width="100%"
                                        color="secondary"
                                        variant="filled"
                                        value={profileName}
                                        margin="normal"
                                        onChange={e => {
                                            if (e.target.value.length < 11)
                                                setProfileName(e.target.value);
                                        }}
                                        inputProps={{
                                            style: {
                                                color: 'var(--white)',
                                            },
                                        }}
                                        InputLabelProps={{
                                            style: { color: '#8c8c80' },
                                        }}
                                        required
                                    />
                                    <FormControl
                                        variant="filled"
                                        sx={{
                                            m: 1,
                                            minWidth: 280,
                                            margin: 0,
                                        }}
                                    >
                                        <InputLabel
                                            style={{ color: '#8c8c80' }}
                                            id="demo-simple-select-autowidth-label"
                                        >
                                            Quais gêneros gostaria de ver por
                                            aqui?
                                        </InputLabel>
                                        <Select
                                            color="secondary"
                                            size="medium"
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            multiple
                                            value={preferences}
                                            onChange={e => {
                                                let value = e.target.value;
                                                if (typeof value === 'string') {
                                                    value = value.split(',');
                                                }
                                                if (value.length < 7)
                                                    setPreferences(value);
                                            }}
                                            SelectDisplayProps={{
                                                style: {
                                                    backgroundColor: '#333',
                                                    color: '#eee',
                                                    borderRadius: '5px',
                                                    width: '100%',
                                                    minWidth: '400px',
                                                    // minWidth: '400px',
                                                },
                                            }}
                                            inputProps={{
                                                style: { color: '#eee' },
                                            }}
                                            label="Quais gêneros gostaria de ver por aqui?"
                                            MenuProps={{
                                                sx: {
                                                    maxHeight: '200px',
                                                },
                                            }}
                                            renderValue={(
                                                selected: string[]
                                            ) => (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {selected.map(value => (
                                                        <Chip
                                                            style={{
                                                                color: 'white',
                                                                backgroundColor:
                                                                    '#ff1111',
                                                            }}
                                                            key={value}
                                                            label={value}
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                            required
                                        >
                                            {moviesGenres.map(genre => (
                                                <MenuItem
                                                    value={genre.title}
                                                    key={genre.id}
                                                >
                                                    {genre.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </S.CreateProfileInputsWrapper>
                            </S.CreateProfileEditSession>
                            <div style={{ textAlign: 'center' }}>
                                <h2
                                    style={{
                                        fontSize: '32px',
                                        color: 'var(--white)',
                                    }}
                                >
                                    Seu novo perfil
                                </h2>
                                {imageData.data && (
                                    <Image
                                        style={{
                                            borderRadius: '10px',
                                            margin: '8px 0',
                                        }}
                                        width="200px"
                                        height="200px"
                                        src={`data:image/image/png;base64,${imageData.data}`}
                                    />
                                )}
                                {!profileName && <p>Insira um nome...</p>}
                                {profileName && (
                                    <h3
                                        style={{
                                            textTransform: 'uppercase',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {profileName}
                                    </h3>
                                )}
                            </div>
                        </S.CreateProfileWrapper>
                        <div
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <S.LoginButton
                                type="submit"
                                variant="contained"
                                data-testid="Entrar"
                                width="40%"
                            >
                                {loading && (
                                    <img
                                        style={{
                                            width: '30px',
                                        }}
                                        src={load.src}
                                        alt="Animação de carregamento"
                                    />
                                )}
                                {editProfile && !loading && 'Editar'}
                                {!editProfile && !loading && 'Criar'}
                            </S.LoginButton>
                            <Link href="/select-profile">
                                <S.LoginText>Voltar</S.LoginText>
                            </Link>
                        </div>
                    </S.CreateProfileForm>
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

export default ManageProfiles;
