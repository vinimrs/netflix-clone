import React, { useEffect, useState } from 'react';
import * as S from '../styles/GlobalComponents';
import Header from '../components/Browse/Header';
import Hero from '../components/Browse/Hero';
import Footer from '../components/Footer';
import MoreInfoModal from '../components/MoreInfoModal';
import List from '../components/Browse/List';
import Loading from '../components/Loading';
import { withSession } from '../services/auth/session';
import { ISession, IMovieDataInfo } from '@types';
import { useHomeList, useHeroData, useProfile } from '@hooks';
import Layout from 'src/components/Layout';
import { GetServerSideProps } from 'next';
import NeedToChooseAProfile from 'src/components/Browse/NeedToChooseAProfile';

const Browse: React.FC<{ session: ISession }> = ({ session }) => {
	const { profile } = useProfile();

	const belongsToTheAccount = session.profiles.some(prof => {
		if (prof.slug === profile.slug) {
			const isEqualPreferences = prof.preference.every((pref, index) => {
				return pref === profile.preference[index];
			});
			const isEqualImage = profile.image._id === prof.image._id;
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
		setModalInfo({ ...modalInfo, id: film.id.toString() });
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
		<Layout title="Netflix">
			<Header session={session} scroll={headerActive} />
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
		</Layout>
	);
};

// Decorator Pattern
export const getServerSideProps: GetServerSideProps = withSession(ctx => {
	return {
		props: {
			session: ctx.req.session,
		},
	};
});

// export default withSessionHOC(Browse);
export default Browse;
