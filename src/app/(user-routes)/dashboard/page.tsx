'use client';
import React, { useEffect, useState } from 'react';
import * as S from '../../../styles/GlobalComponents';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Footer from '../../components/Footer';
import NeedToChooseAProfile from '../../components/NeedToChooseAProfile';
import MoreInfoModal from '../../../components/MoreInfoModal';
import List from '../../components/List';
import Loading from '../../components/Loading';
import { IMovieDataInfo, Session } from '@types';
import { useHomeList, useHeroData, useProfile } from '@hooks';
import { useSession } from 'next-auth/react';

const Browse: React.FC<Session> = () => {
	const session = useSession();
	console.log(session);
	const { profile } = useProfile();

	const belongsToTheAccount =
		session.data?.profiles !== undefined &&
		session.data.profiles.some(prof => {
			if (prof.slug === profile.slug && prof.preference !== undefined) {
				const isEqualPreferences = prof.preference.every((pref, index) => {
					return profile.preference !== undefined
						? pref === profile.preference[index]
						: false;
				});
				const isEqualImage =
					profile.image !== undefined && prof.image !== undefined
						? profile.image._id === prof.image._id
						: null;
				return isEqualPreferences && isEqualImage;
			}
		});

	// Loadable because the method is Async and not support React Suspense
	const loadableHeroData = useHeroData();
	const loadableList = useHomeList();

	const [headerActive, setHeaderActive] = useState(false);
	const [modalInfo, setModalInfo] = useState({
		id: '',
		success: true,
	});

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

	if (
		loadableList.state === 'loading' ||
		loadableHeroData.state === 'loading'
	) {
		return <Loading />;
	}

	if (!profile || !belongsToTheAccount) {
		return <NeedToChooseAProfile />;
	}

	const list = loadableList.getValue();

	return (
		<>
			<Header session={session.data!} scroll={headerActive} />
			{modalInfo.id && (
				<MoreInfoModal id={Number(modalInfo.id)} setModalInfo={setModalInfo} />
			)}

			<Hero handleSetModal={handleSetModalInfo} />
			<S.MainWrapper>
				{list.map((category, key) => {
					return (
						<List key={key} setModal={handleSetModalInfo} list={category} />
					);
				})}
			</S.MainWrapper>
			<Footer />
		</>
	);
};

export default Browse;

