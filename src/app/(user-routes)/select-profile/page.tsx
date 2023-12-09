'use client';
import { useAlert, useProfile, useWindowDimensions } from '@hooks';
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IImageData, IProfile, ISession } from '@types';
import { userService } from '@services';
import { convertImage } from '@utils';
import * as S from './styles';
import { useSession } from 'next-auth/react';
import { useProfileImages } from 'src/state/hooks/useImages';

const SelectProfile: React.FC = () => {
	const { data: session, status } = useSession();
	const imagesData = useProfileImages().getValue();

	console.log(`select profile ${session} status ${status}`);
	const [profileHovered, setProfileHovered] = useState('');
	const [profiles, setProfiles] = useState<IProfile[]>([]);
	const { width } = useWindowDimensions();
	const { setProfile } = useProfile();
	const alertActions = useAlert();

	const router = useRouter();

	const handleDeleteProfile = (prof: IProfile) => {
		userService
			.deleteUserProfile(
				prof.slug as string,
				session!.id,
				session?.tokens.accessToken!,
			)
			.then(res => {
				if (res?.ok) {
					alertActions.success('Perfil deletado com sucesso');
				}
				const currentProfiles = profiles.filter(p => p.slug !== prof.slug);
				setProfiles(currentProfiles);
			})
			.catch(() => {
				alertActions.error('Erro ao deletar o perfil');
			});
	};

	useEffect(() => {
		if (status === 'authenticated') setProfiles(session.profiles);
	}, [status]);

	const handleMouseOn = (index: number) => {
		setProfileHovered(index.toString());
	};
	const handleMouseOff = () => setProfileHovered('');

	const getImageFromList = (image: IImageData): IImageData => {
		console.log(image._id);
		return imagesData.find(img => img._id === image._id)!;
	};

	return (
		<S.ProfileWrapper>
			<h1>Quem está assistindo?</h1>
			<div data-testid="profile-container">
				{status === 'loading' && (
					<div className="create-profile__container">...</div>
				)}
				{status === 'authenticated' && profiles.length < 4 && (
					<div className="create-profile__container">
						<div
							onClick={() => {
								router.push('/manage-profile?create=true');
							}}
							title="Crie um novo perfil"
						>
							<Add
								fontSize="large"
								style={{
									width: width < 768 ? '140px' : '190px',
									height: width < 768 ? '140px' : '190px',
								}}
							/>
						</div>
						<h2>Criar um perfil</h2>
					</div>
				)}

				{profiles.length > 0 &&
					profiles.map((prof, index) => (
						<div
							className="profile-image__box"
							title="Entre com o perfil"
							key={index}
							data-testid="profile"
							onMouseEnter={() => handleMouseOn(index)}
							onMouseLeave={handleMouseOff}
							role="img"
							style={{ textAlign: 'center' }}
						>
							<S.CustomImage
								onClick={() => {
									setProfile({ ...prof, image: getImageFromList(prof.image) });
									router.push('/dashboard');
								}}
								src={`data:image/image/png;base64,${convertImage(
									getImageFromList(prof.image).data!,
								)}`}
								alt={prof.slug}
							/>
							<h2>{prof.name}</h2>
							<DeleteOutline
								style={{
									transition: '0.3s',
									opacity:
										profileHovered === index.toString() || width < 768 ? 1 : 0,
									marginTop: 15,
									color: 'var(--white)',
								}}
								onClick={() => handleDeleteProfile(prof)}
								titleAccess="Delete o perfil"
								fontSize="large"
							/>
							<Link href={`/manage-profile?edit=${index}`} passHref>
								<EditOutlined
									style={{
										transition: '0.3s',
										opacity:
											profileHovered === index.toString() || width < 768
												? 1
												: 0,
										color: 'var(--white)',
										margin: width < 768 ? '15px 0 0 30px' : '15px 0 0 20px',
									}}
									titleAccess="Edite o perfil"
									fontSize="large"
								/>
							</Link>
						</div>
					))}
			</div>
		</S.ProfileWrapper>
	);
};

export default SelectProfile;
