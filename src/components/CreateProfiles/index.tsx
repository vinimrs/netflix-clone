import * as S from '../../styles/GlobalComponents';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { IImageData, ISession } from '../../services/auth/authService';
import { userService } from '../../services/auth/userService';
import { Router, useRouter } from 'next/router';
import { useUsuario } from '../../common/context/Usuario';

interface CreateCreateProfilesProps {
    session: ISession;
    images: IImageData[];
    setMessage: React.Dispatch<
        React.SetStateAction<{
            message: string;
            error: boolean;
        }>
    >;
    setSetingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProfiles: React.FC<CreateCreateProfilesProps> = ({
    session,
    images,
    setMessage,
    setSetingProfile,
}) => {
    const [preference, setPreference] = useState('');
    const [profileName, setProfileName] = useState('');
    const [imageData, setImageData] = useState({ id: '', data: '' });
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

    return (
        <S.CreateProfileForm
            onSubmit={e => {
                e.preventDefault();
                if (!imageData.id) {
                    setMessage({
                        message:
                            'Você deve escolher uma imagem para seu perfil',
                        error: true,
                    });
                    return;
                }

                if (session.profiles.length > 3) {
                    setMessage({
                        message: 'Você chegou no limite de perfis',
                        error: true,
                    });
                    return;
                }

                const slug = toSlug(profileName);
                const exists = session.profiles.find(prof => {
                    return prof.slug === slug;
                });

                if (exists) {
                    setMessage({
                        message: 'Nome de perfil já usado',
                        error: true,
                    });
                    return;
                }
                userService
                    .createNewProfile(
                        slug,
                        profileName,
                        preference,
                        imageData.id,
                        session.id
                    )
                    .then(res => {
                        console.log(res);
                        setMessage({
                            message: res.body.message,
                            error: !res.ok,
                        });
                        if (res.ok) {
                            setSetingProfile(false);
                            router.push('/select-profile');
                        }
                    })
                    .catch(err => console.log(err));
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
                                            data: convertImage(image.data),
                                        });
                                        // setImageId(e.target);
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
                            // helperText="O nome de usuário deve ser menor que 20 caracteres"
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
                                Qual gênero mais gosta?
                            </InputLabel>
                            <Select
                                color="secondary"
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={preference}
                                onChange={e => {
                                    setPreference(e.target.value);
                                }}
                                SelectDisplayProps={{
                                    style: {
                                        backgroundColor: '#333',
                                        color: '#eee',
                                        borderRadius: '5px',
                                        width: '100%',
                                    },
                                }}
                                inputProps={{
                                    style: { color: '#eee' },
                                }}
                                // autoWidth
                                label="Qual gênero mais gosta?"
                                MenuProps={{
                                    sx: {
                                        maxHeight: '200px',
                                    },
                                }}
                                required
                            >
                                <MenuItem value={'28'}>Ação</MenuItem>
                                <MenuItem value={'16'}>Animação</MenuItem>
                                <MenuItem value={'12'}>Aventura</MenuItem>
                                <MenuItem value={'99'}>Documentário</MenuItem>
                                <MenuItem value={'18'}>Drama</MenuItem>
                                <MenuItem value={'10751'}>
                                    Para a família
                                </MenuItem>
                                <MenuItem value={'14'}>Fantasia</MenuItem>
                                <MenuItem value={'36'}>História</MenuItem>
                                <MenuItem value={'35'}>Comédia</MenuItem>
                                <MenuItem value={'10752'}>Guerra</MenuItem>
                                <MenuItem value={'80'}>Crimes</MenuItem>
                                <MenuItem value={'10402'}>Música</MenuItem>
                                <MenuItem value={'9648'}>Mistério</MenuItem>
                                <MenuItem value={'10749'}>Romance</MenuItem>
                                <MenuItem value={'27'}>Terror</MenuItem>
                            </Select>
                        </FormControl>
                    </S.CreateProfileInputsWrapper>
                </S.CreateProfileEditSession>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', color: 'var(--white)' }}>
                        Seu novo perfil
                    </h2>
                    {imageData.data && (
                        <img
                            style={{
                                width: '200px',
                                borderRadius: '10px',
                                margin: '8px 0',
                            }}
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
                    width="50%"
                >
                    Criar
                </S.LoginButton>
                <S.LoginText
                    onClick={() => {
                        setSetingProfile(!setSetingProfile);
                    }}
                >
                    Voltar
                </S.LoginText>
            </div>
        </S.CreateProfileForm>
    );
};

export default CreateProfiles;
