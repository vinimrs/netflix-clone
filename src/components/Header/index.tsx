import * as S from './style';
import React, { useEffect, useState } from 'react';
import { useUsuario } from '@contexts';
import { useRouter } from 'next/router';
import logo from '../../../public/netflix-logo.svg';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ISession } from '@types';
import DeleteAccountModal from '../DeleteAccountModal';
import Link from 'next/link';
import Image from 'next/image';

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

  const handleOpenDropdown = () => setDropdown(true);

  const handleCloseDropdown = () => setDropdown(false);

  useEffect(() => {
    if (profile === undefined || profile === null)
      setProfile(getStorageProfile());
  }, [profile]);

  return (
    <S.StyledHeader $active={scroll}>
      <Link href="/select-profile" passHref>
        <S.LogoNetflix
          src={logo.src}
          alt="Logo da Netflix"
          style={{ cursor: 'pointer' }}
        />
      </Link>
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
      <S.WrappedMenu>
        <S.ContainerMenu
          animate={{
            opacity: dropdown ? 1 : 0,
            visibility: dropdown ? 'inherit' : 'hidden',
            rotateX: dropdown ? 0 : -15,
          }}
          transition={{
            opacity: { duration: 0.05 },
            rotateX: { duration: 0.05 },
          }}
        >
          <ul onMouseLeave={handleCloseDropdown}>
            {list?.map(item => {
              return (
                <li
                  onClick={() => {
                    handleCloseDropdown();
                    changeProfile(item);
                    router.reload();
                  }}
                  key={item.slug}
                >
                  <Image
                    src={`data:image/image/png;base64,${convertImage(
                      item.image.data
                    )}`}
                    alt="Imagem de perfil"
                    width="35px"
                    height="35px"
                  />
                  <span>{item.name}</span>
                </li>
              );
            })}
            <li
              onClick={() => {
                handleCloseDropdown();
                router.push('/select-profile');
              }}
            >
              <EditOutlinedIcon />
              <span>Gerenciar Perfis</span>
            </li>
            <li onClick={handleCloseDropdown}>
              <div
              // style={{
              //   borderBottom: '1px solid #f5f5f5b1',
              //   height: '1px',
              //   width: '100%',
              //   margin: '8px 0',
              // }}
              ></div>
            </li>
            <li onClick={handleCloseDropdown}>
              <span>Infantis</span>
            </li>
            <li onClick={handleCloseDropdown}>
              <div
              // style={{
              //   borderBottom: '1px solid #f5f5f5b1',
              //   height: '1px',
              //   width: '100%',
              //   margin: '8px 0',
              // }}
              ></div>
            </li>
            <li onClick={handleCloseDropdown}>
              <PersonOutlineOutlinedIcon />
              <span>Conta</span>
            </li>
            <li onClick={handleCloseDropdown}>
              <HelpOutlineOutlinedIcon />
              <span>Centro de Ajuda</span>
            </li>
            <li>
              <div
              // style={{
              //   borderBottom: '1px solid #f5f5f5b1',
              //   height: '1px',
              //   width: '100%',
              //   margin: '8px 0',
              // }}
              ></div>
            </li>
            <li
              onClick={() => {
                handleCloseDropdown();
                router.push('/logout');
              }}
            >
              <span>Sair da Netflix</span>
            </li>
            <li
              onClick={() => {
                handleCloseDropdown();
                setOpenDeleteModal(true);
              }}
            >
              <span
                style={{
                  color: 'var(--red-netflix)',
                  fontWeight: '800',
                }}
              >
                Apagar conta
              </span>
            </li>
          </ul>
        </S.ContainerMenu>
      </S.WrappedMenu>
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
