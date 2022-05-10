import Image from 'next/image';
import React, { FormEventHandler, useState } from 'react';
import * as S from './styles';
import {
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box,
} from '@mui/material';
import { ISession } from '@types';
import { userService } from '@services';
import { moviesGenres } from '@constants';
import { CustomButton, CustomTextField } from 'src/styles/GlobalComponents';
import { toSlug } from '@utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAlert, useSession } from '@hooks';
import ProfileImages from './ProfileImages';
import Loading from '../Loading';

const ManageProfileContainer: React.FC<{ editProfile: string }> = ({
	editProfile,
}) => {
	const [preferences, setPreferences] = useState<string[]>([]);
	const [profileName, setProfileName] = useState('');
	const [imageData, setImageData] = useState({ id: '', data: '' });
	const [loading, setLoading] = useState(false);

	const alertActions = useAlert();
	const loadableSession = useSession().session;
	const router = useRouter();

	const validations = (
		pref: string[],
		imageInfo: { data: string; id: string },
		profName: string,
		session: ISession
	) => {
		if (pref.length < 6) {
			alertActions.error('Você deve escolher no mínimo 6 gêneros!');
			return false;
		}
		if (!imageInfo.id) {
			alertActions.error('Você deve escolher uma imagem para seu perfil');
			return false;
		}

		if (session.profiles.length > 3 && !editProfile) {
			alertActions.error('Você chegou no limite de perfis');
			return false;
		}

		const slug = toSlug(profName);
		const exists = session.profiles.find(prof => {
			return prof.slug === slug;
		});

		if (exists) {
			alertActions.error('Nome de perfil já usado');
			return false;
		}
		return true;
	};

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault();
		setLoading(true);

		if (!validations(preferences, imageData, profileName, session)) {
			setLoading(false);
			return;
		}

		const slug = toSlug(profileName);
		const preferencesId = preferences.map(pref => {
			const genre = moviesGenres.find(genre => genre.title === pref);
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
		if (res.ok) {
			alertActions.success(res.body.message);
			router.push('/select-profile');
		} else {
			alertActions.error(res.body.message);
		}
	};

	const handleSelectChange = e => {
		let value = e.target.value;
		if (typeof value === 'string') {
			value = value.split(',');
		}
		if (value.length < 7) setPreferences(value);
	};

	if (loadableSession.state === 'loading') return <Loading />;
	const session = loadableSession.getValue();

	return (
		<S.ManageProfileContainer>
			<div>
				<h1 style={{ color: 'var(--white)' }}>
					{!editProfile && 'Crie seu perfil'}
					{editProfile && 'Edite o seu perfil'}
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="profile-inputs__wrapper">
						<div className="profile__edit-session">
							<div>
								<h3>Escolha sua imagem</h3>
								<ProfileImages setImageData={setImageData} />
							</div>
							<div className="inputs-wrapper">
								<CustomTextField
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
										Quais gêneros gostaria de ver por aqui?
									</InputLabel>
									<Select
										color="secondary"
										size="medium"
										labelId="demo-simple-select-autowidth-label"
										id="demo-simple-select-autowidth"
										multiple
										value={preferences}
										onChange={handleSelectChange}
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
										label="Quais gêneros gostaria de ver por aqui?"
										MenuProps={{
											sx: {
												maxHeight: '200px',
											},
										}}
										renderValue={(selected: string[]) => (
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
															backgroundColor: '#ff1111',
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
											<MenuItem value={genre.title} key={genre.id}>
												{genre.title}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</div>
						<div className="preview-container">
							<h2>Seu novo perfil</h2>
							{imageData.data && (
								<Image
									width="200px"
									height="200px"
									style={{ borderRadius: '10px' }}
									src={`data:image/image/png;base64,${imageData.data}`}
								/>
							)}
							{!profileName && <p>Insira um nome...</p>}
							{profileName && <h3>{profileName}</h3>}
						</div>
					</div>
					<div className="profile-buttons__wrapper">
						<CustomButton type="submit" data-testid="Entrar" width="40%">
							{loading && (
								<Image
									width="30px"
									height="30px"
									src="/loading-white.svg"
									alt="Animação de carregamento"
								/>
							)}
							{editProfile && !loading && 'Editar'}
							{!editProfile && !loading && 'Criar'}
						</CustomButton>
						<Link href="/select-profile" passHref>
							<span>Voltar</span>
						</Link>
					</div>
				</form>
			</div>
		</S.ManageProfileContainer>
	);
};

export default ManageProfileContainer;
