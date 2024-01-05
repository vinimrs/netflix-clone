'use client';
import {
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Box,
} from '@mui/material';
import { userService } from '@services';
import { moviesGenres } from '@constants';
import { CustomButton, CustomTextField } from 'src/styles/GlobalComponents';
import { toSlug } from '@utils';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileImages from './ProfileImages';
import { IImageData, IProfile } from '@types';
import Link from 'next/link';
import React, { FormEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import { setError, setSuccess } from 'src/store/reducers/alert';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { updateProfiles } from 'src/store/reducers/session';

const FormProfile: React.FC<{ images: IImageData[] }> = ({ images }) => {
	const dispatch = useDispatch();
	const session = useAppSelector(state => state.session);
	const [preferences, setPreferences] = useState<string[]>([]);
	const [profileName, setProfileName] = useState('');
	const [imageData, setImageData] = useState({ id: '', data: '' });
	const [loading, setLoading] = useState(false);
	const [editProfile, setEditProfile] = useState('');

	const { profiles } = useAppSelector(state => state.session);
	const router = useRouter();

	const validations = (
		pref: string[],
		imageInfo: { data: string; id: string },
		profName: string,
		profiles: IProfile[],
	) => {
		if (pref.length < 6) {
			dispatch(setError('Você deve escolher no mínimo 6 gêneros!'));
			return false;
		}
		if (!imageInfo.id) {
			dispatch(setError('Você deve escolher uma imagem para seu perfil'));
			return false;
		}

		if (profiles?.length > 3 && !editProfile) {
			dispatch(setError('Você chegou no limite de perfis'));
			return false;
		}

		const slug = toSlug(profName);
		const exists = profiles?.find(prof => {
			return prof.slug === slug;
		});

		if (exists) {
			dispatch(setError('Nome de perfil já usado'));
			return false;
		}
		return true;
	};

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault();
		setLoading(true);

		if (!validations(preferences, imageData, profileName, profiles)) {
			setLoading(false);
			return;
		}

		const slug = toSlug(profileName);
		const preferencesId = preferences.map(pref => {
			const genre = moviesGenres.find(genre => genre.title === pref);
			return genre?.id.toString();
		});

		let res;

		if (!editProfile) {
			res = await userService.createNewProfile(
				slug,
				profileName,
				preferencesId as string[],
				imageData.id,
				session?.id,
			);
		} else {
			res = await userService.updateUserProfile(
				slug,
				profileName,
				preferencesId as string[],
				imageData.id,
				session?.id,
				editProfile,
			);
		}

		if (res.ok) {
			// atualizando a sessão

			dispatch(setSuccess(res.body.message));
			router.push('/browse');

			dispatch(
				updateProfiles([
					...profiles,
					{
						name: profileName,
						slug,
						image: { _id: imageData.id },
						preference: preferencesId as string[],
					},
				]),
			);
		} else {
			dispatch(setError(res.body.message));
		}
	};

	const handleSelectChange = e => {
		let value = e.target.value;
		if (typeof value === 'string') {
			value = value.split(',');
		}
		if (value.length < 7) setPreferences(value);
	};

	const searchParams = useSearchParams();

	useEffect(() => {
		const edit = searchParams?.get('edit');
		if (edit !== undefined && edit !== null) {
			setEditProfile(edit);
		} else {
			setEditProfile('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
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
							<ProfileImages setImageData={setImageData} images={images} />
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
								alt="Imagem do seu perfil."
								width="200"
								height="200"
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
								width="30"
								height="30"
								src="/loading-white.svg"
								alt="Animação de carregamento."
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
	);
};

export default FormProfile;

