import React, { useEffect, useState } from 'react';
import * as S from '../styles/GlobalComponents';
import Header from '../components/Browse/Header';
import Hero from '../components/Browse/Hero';
import Footer from '../components/Footer';
import MoreInfoModal from '../components/MoreInfoModal';
import List from '../components/Browse/List';
import Loading from '../components/Loading';
import { withSession, withSessionHOC } from '../services/auth/session';
import { ISession, IMovieDataInfo } from '@types';
import { useHomeList, useHeroData } from '@hooks';
import Layout from 'src/components/Layout';
import { GetServerSideProps } from 'next';

const Browse: React.FC<{ session: ISession }> = ({ session }) => {
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
// export const getServerSideProps: GetServerSideProps = withSession(ctx => {
// 	return {
// 		props: {
// 			session: ctx.req.session,
// 		},
// 	};
// });

export default withSessionHOC(Browse);
