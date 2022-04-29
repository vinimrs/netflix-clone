import * as S from './style';
import React, { useEffect, useState } from 'react';
import { gsap, Power3 } from 'gsap';
import { useUsuario } from '../../common/context/Usuario';
import { useRouter } from 'next/router';
import logo from '../../../public/netflix-logo.svg';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ISession } from '../../services/auth/authService';
import DeleteAccountModal from '../DeleteAccountModal';

interface HeaderProps {
    scroll: boolean;
    session: ISession;
}

const Header: React.FC<HeaderProps> = ({ scroll, session }) => {
    const {
        profile,
        setProfile,
        changeProfile,
        getStorageProfile,
        filterToAnothersProfiles,
        convertImage,
    } = useUsuario();
    const router = useRouter();
    const [dropdown, setDropdown] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const list = filterToAnothersProfiles(session.profiles, profile);

    const handleOpenDropdown = () => {
        setDropdown(true);
        gsap.to('._containerMenu', {
            duration: 0.1,
            ease: Power3.easeInOut,
            autoAlpha: 1,
        });
    };

    const handleCloseDropdown = () => {
        setDropdown(false);
        gsap.to('._containerMenu', {
            duration: 0.1,
            ease: Power3.easeInOut,
            autoAlpha: 0,
        });
    };

    useEffect(() => {
        if (profile === undefined || profile === null)
            setProfile(getStorageProfile());
        profile;
    });
    return (
        <S.StyledHeader $active={scroll}>
            <S.LogoNetflix
                onClick={() => router.push('/select-profile')}
                src={logo.src}
                alt="Logo da Netflix"
                style={{ cursor: 'pointer' }}
            />
            {profile?.image.data && (
                <S.PerfilNetflix
                    onClick={() =>
                        dropdown ? handleCloseDropdown() : handleOpenDropdown()
                    }
                    src={`data:image/image/png;base64,${convertImage(
                        profile.image.data
                    )}`}
                    onMouseEnter={() =>
                        dropdown ? handleCloseDropdown() : handleOpenDropdown()
                    }
                    alt="Perfil do usuário"
                />
            )}

            <S.ContainerMenu className="_containerMenu">
                <S.Menu onMouseLeave={handleCloseDropdown}>
                    {list?.map(item => {
                        return (
                            <S.MenuItem
                                onClick={() => {
                                    handleCloseDropdown();
                                    changeProfile(item);
                                    router.reload();
                                }}
                                key={item.slug}
                            >
                                <S.MenuImage
                                    src={`data:image/image/png;base64,${convertImage(
                                        item.image.data
                                    )}`}
                                    alt="Imagem de perfil"
                                />
                                <S.MenuText>{item.name}</S.MenuText>
                            </S.MenuItem>
                        );
                    })}
                    <S.MenuItem
                        onClick={() => {
                            handleCloseDropdown();
                            router.back();
                        }}
                    >
                        <EditOutlinedIcon />
                        <S.MenuText>Gerenciar Perfis</S.MenuText>
                    </S.MenuItem>
                    <S.MenuItem onClick={handleCloseDropdown}>
                        <div
                            style={{
                                borderBottom: '1px solid #f5f5f5b1',
                                height: '1px',
                                width: '100%',
                                margin: '8px 0',
                            }}
                        ></div>
                    </S.MenuItem>
                    <S.MenuItem onClick={handleCloseDropdown}>
                        <S.MenuText>Infantis</S.MenuText>
                    </S.MenuItem>
                    <S.MenuItem onClick={handleCloseDropdown}>
                        <div
                            style={{
                                borderBottom: '1px solid #f5f5f5b1',
                                height: '1px',
                                width: '100%',
                                margin: '8px 0',
                            }}
                        ></div>
                    </S.MenuItem>
                    <S.MenuItem onClick={handleCloseDropdown}>
                        <PersonOutlineOutlinedIcon />
                        <S.MenuText>Conta</S.MenuText>
                    </S.MenuItem>
                    <S.MenuItem onClick={handleCloseDropdown}>
                        <HelpOutlineOutlinedIcon />
                        <S.MenuText>Centro de Ajuda</S.MenuText>
                    </S.MenuItem>
                    <S.MenuItem>
                        <div
                            style={{
                                borderBottom: '1px solid #f5f5f5b1',
                                height: '1px',
                                width: '100%',
                                margin: '8px 0',
                            }}
                        ></div>
                    </S.MenuItem>
                    <S.MenuItem
                        onClick={() => {
                            handleCloseDropdown();
                            router.push('/logout');
                        }}
                    >
                        <S.MenuText>Sair da Netflix</S.MenuText>
                    </S.MenuItem>
                    <S.MenuItem
                        onClick={() => {
                            handleCloseDropdown();
                            setOpenDeleteModal(true);
                        }}
                    >
                        <S.MenuText
                            style={{
                                color: 'var(--red-netflix)',
                                fontWeight: '800',
                            }}
                        >
                            Apagar conta
                        </S.MenuText>
                    </S.MenuItem>
                </S.Menu>
            </S.ContainerMenu>
            {openDeleteModal && (
                <DeleteAccountModal
                    userId={session.id}
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                />
            )}
        </S.StyledHeader>
    );
};

export default Header;