'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Hero from './Hero';
import Footer from '../../../components/Footer';
import MoreInfoModal from '../../../components/MoreInfoModal';
import { IMovieDataInfo, IProfile, Session } from '@types';
import { useHomeList, useHeroData, useProfile, useSession } from '@hooks';
import Main from './Main';
import { useLoading } from 'src/state/hooks/useLoading';
import { useRouter } from 'next/navigation';
import SelectProfile from './SelectProfile';
import { useUserProfiles } from 'src/state/hooks/useUserProfiles';
import { authService } from '@services';
import Loading from 'src/components/Loading';
import { belongsToTheAccount } from '@utils';

const Browse: React.FC<Session> = () => {
	const { session, setSession } = useSession();
	const { profile, setProfile } = useProfile();
	const heroData = useHeroData();
	const homeList = useHomeList();
	// const { loading, setLoading } = useLoading();
	const { setProfiles } = useUserProfiles();
	const { loading, setLoading } = useLoading();

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
		const asyncData = async () => {
			const session = await authService.getSession();
			setSession(session);
			setProfiles(session.profiles);

			if (
				Object.keys(profile).length === 0 ||
				!belongsToTheAccount(session.profiles, profile)
			) {
				setSelectProfile(true);
				setLoading(false);
			} else {
				setSelectProfile(false);
			}

			if (heroData.state !== 'loading' && homeList.state !== 'loading') {
				setLoading(false);
			}
		};

		setLoading(true);
		asyncData();
	}, [profile, heroData.state, homeList.state]);

	if (loading) return <Loading />;

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

