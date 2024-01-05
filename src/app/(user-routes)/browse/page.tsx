'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Hero from './Hero';
import Footer from '../../../components/Footer';
import MoreInfoModal from '../../../components/MoreInfoModal';
import { IMovieDataInfo } from '@types';
import Main from './Main';
import SelectProfile from './SelectProfile';
import Loading from 'src/components/Loading';
import { belongsToTheAccount } from '@utils';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { loadSession } from 'src/store/reducers/session';
import { loadFilms } from 'src/store/reducers/films';

const Browse = () => {
	const dispatch = useAppDispatch();
	const session = useAppSelector(state => state.session);
	const profile = useAppSelector(state => state.profile);

	const { status } = useAppSelector(state => state.films);

	const [headerActive, setHeaderActive] = useState(false);
	const [modalInfo, setModalInfo] = useState({
		id: '',
		success: true,
	});
	const [selectProfile, setSelectProfile] = useState(!profile);

	const handleSetModalInfo = (film: IMovieDataInfo) => {
		setModalInfo({ ...modalInfo, id: film.id!.toString() });
	};

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setHeaderActive(true);
			} else {
				setHeaderActive(false);
			}
		};

		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	useEffect(() => {
		if (!profile?.name || !belongsToTheAccount(session.profiles, profile)) {
			setSelectProfile(true);
		} else {
			setSelectProfile(false);
		}
	}, [profile, session]);

	useEffect(() => {
		dispatch(loadSession());
		if (profile) dispatch(loadFilms());
	}, [dispatch, profile]);

	if (status !== 'success' || !session?.id) return <Loading />;

	if (selectProfile) return <SelectProfile />;

	return (
		<>
			<Header session={session} scroll={headerActive} />
			{modalInfo.id && (
				<MoreInfoModal id={Number(modalInfo.id)} setModalInfo={setModalInfo} />
			)}

			<Hero handleSetModal={handleSetModalInfo} />
			<Main setModal={handleSetModalInfo} />

			<Footer />
		</>
	);
};

export default Browse;

