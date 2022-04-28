import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useFilms } from '../common/context/Films';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MoreInfoModal from '../components/MoreInfoModal';
import List from '../components/List';
import Loading from '../components/Loading';
import * as S from '../styles/GlobalComponents';
import { withSession } from '../services/auth/session';
import { useRouter } from 'next/router';
import { authService, ISession } from '../services/auth/authService';

const Browse: React.FC<{ session: ISession }> = ({ session }) => {
    const { list, heroFilm } = useFilms();
    const [headerActive, setHeaderActive] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        id: '',
        type: '',
        success: true,
    });

    const handleSetModalInfo = film => {
        const type = film.number_of_seasons ? 'tv' : 'movie';
        setModalInfo({ ...modalInfo, id: film.id, type: type });
    };

    const toHoursAndMinutes = useCallback(totalMinutes => {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        return `${hours < 1 ? '' : `${hours}h`}${
            minutes < 1 ? '' : `${minutes}min`
        }`;
    }, []);

    console.log(list, heroFilm);
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

    return (
        <>
            {/* {JSON.stringify(props)} */}
            {modalInfo.id && modalInfo.type && (
                <MoreInfoModal
                    minutesToHours={toHoursAndMinutes}
                    {...modalInfo}
                    setModalInfo={setModalInfo}
                />
            )}
            <Header session={session} scroll={headerActive} />
            {!modalInfo.success && (
                <S.StyledAlert
                    onClose={() => {
                        setModalInfo({ ...modalInfo, success: true });
                    }}
                    severity="error"
                >
                    Opa! Esse filme não foi encontrado!{' '}
                    <strong>Tente Outro!</strong>
                </S.StyledAlert>
            )}
            {heroFilm.title && (
                <Hero
                    setModal={handleSetModalInfo}
                    minutesToHours={toHoursAndMinutes}
                />
            )}
            {list && (
                <S.MainWrapper>
                    {list.map((category, key) => {
                        return (
                            <List
                                key={key}
                                setModal={handleSetModalInfo}
                                list={category}
                            />
                        );
                    })}
                </S.MainWrapper>
            )}
            {(!list || !heroFilm) && <Loading />}
            {list && <Footer />}
        </>
    );
};

// Decorator Pattern
export const getServerSideProps = withSession(ctx => {
    return {
        props: {
            session: ctx.req.session,
        },
    };
});

export default Browse;
