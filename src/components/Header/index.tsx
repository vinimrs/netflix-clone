'use client';
import * as S from './style';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { IProfile, ISession } from '@types';
import DeleteAccountModal from '../DeleteAccountModal';
import Link from 'next/link';
import Image from 'next/image';
import { convertImage } from '@utils';
import { useProfile } from '@hooks';
import { useUserProfiles } from 'src/state/hooks/useUserProfiles';

interface HeaderProps {
	scroll: boolean;
	session: ISession;
}

const Header: React.FC<HeaderProps> = ({ scroll, session }) => {
	const { profile, setProfile } = useProfile();
	const { profiles } = useUserProfiles();

	const [dropdown, setDropdown] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const router = useRouter();

	const filterToAnothersProfiles = (profiles: IProfile[], prof: IProfile) => {
		if (prof) {
			const result = profiles.filter(p => p.slug !== prof.slug);
			return result;
		}
	};

	const list =
		profiles !== undefined ? filterToAnothersProfiles(profiles, profile) : [];

	const handleOpenDropdown = () => setDropdown(true);

	const handleCloseDropdown = () => setDropdown(false);

	// const getImageFromList = (image: IImageData): IImageData => {
	// 	return images.find(img => img._id === image._id)!;
	// };

	return (
		<S.StyledHeader $active={scroll}>
			<Link href="/browse" passHref>
				<S.LogoNetflix
					src="/netflix-logo.svg"
					alt="Logo da Netflix"
					style={{ cursor: 'pointer' }}
				/>
			</Link>
			{profile.image?.data && (
				<S.PerfilNetflix
					onClick={() =>
						dropdown ? handleCloseDropdown() : handleOpenDropdown()
					}
					src={`data:image/image/png;base64,${convertImage(
						profile.image.data,
					)}`}
					onMouseEnter={() =>
						dropdown ? handleCloseDropdown() : handleOpenDropdown()
					}
					alt="Perfil do usuário"
				/>
			)}
			<S.WrappedMenu
				animate={{
					opacity: dropdown ? 1 : 0,
					visibility: dropdown ? 'inherit' : 'hidden',
				}}
				transition={{
					opacity: { duration: 0.1 },
					visibility: { delay: 0.1, duration: 0 },
				}}
			>
				<S.ContainerMenu
					animate={{
						rotateX: dropdown ? 0 : -15,
					}}
					transition={{
						duration: 0.05,
					}}
				>
					<ul onMouseLeave={handleCloseDropdown}>
						{list !== undefined &&
							list.map(item => {
								return (
									<li
										onClick={() => {
											handleCloseDropdown();
											setProfile(item);
											window !== undefined && location.reload();
											/* Agora Recoil gerencia atualizações necessárias em filhos que 
											 utilizam seus átomos */
										}}
										key={item.slug}
									>
										<Image
											src={`data:image/image/png;base64,${convertImage(
												item.image.data!,
											)}`}
											alt="Imagem de perfil"
											width="35"
											height="35"
										/>
										<span>{item.name}</span>
									</li>
								);
							})}
						<li
							onClick={() => {
								handleCloseDropdown();
								setProfile({} as IProfile);
							}}
						>
							<EditOutlinedIcon />
							<span>Gerenciar Perfis</span>
						</li>
						<li onClick={handleCloseDropdown}>
							<div />
						</li>
						<li onClick={handleCloseDropdown}>
							<span>Infantis</span>
						</li>
						<li onClick={handleCloseDropdown}>
							<div />
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
							<div />
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
