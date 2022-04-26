import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useFilms } from '../common/context/Films';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import MoreInfoModal from '../components/MoreInfoModal.js/index.js';
import List from '../components/List';
import Loading from '../components/Loading';
import * as S from '../styles/GlobalComponents';
import { withSession } from '../services/auth/session';
import { json } from 'stream/consumers';
import { useRouter } from 'next/router';
import { authService } from '../services/auth/authService';

const Browse: React.FC = props => {
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

    console.log(props);
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
            {JSON.stringify(props)}
            {/* {modalInfo.id && modalInfo.type && (
                <MoreInfoModal
                    minutesToHours={toHoursAndMinutes}
                    {...modalInfo}
                    setModalInfo={setModalInfo}
                />
            )}
            <Header scroll={headerActive} />
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
            {heroFilm && (
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
            {list && <Footer />} */}
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

// export default function HomeScreen() {
//     const router = useRouter();
//     const [values, setValues] = React.useState({
//         usuario: 'viniromualdo082@gmail.com',
//         senha: '12345678',
//     });

//     function handleChange(event) {
//         const fieldValue = event.target.value;
//         const fieldName = event.target.name;
//         setValues(currentValues => {
//             return {
//                 ...currentValues,
//                 [fieldName]: fieldValue,
//             };
//         });
//     }

//     return (
//         <div>
//             <h1>Login</h1>
//             <form
//                 onSubmit={event => {
//                     // onSubmit -> Controller (pega os dados o usuário e passa para um serviço)
//                     // authService -> Serviço
//                     event.preventDefault();

//                     authService
//                         .login({
//                             email: values.usuario,
//                             password: values.senha,
//                         })
//                         .then(() => {
//                             // router.push('/auth-page-static');
//                             router.push('/select-profile');
//                         })
//                         .catch(err => {
//                             console.log(err);
//                             alert('Usuário ou senha estão incorretos.');
//                         });
//                 }}
//             >
//                 <input
//                     placeholder="Usuário"
//                     name="usuario"
//                     value={values.usuario}
//                     onChange={handleChange}
//                 />
//                 <input
//                     placeholder="Senha"
//                     name="senha"
//                     type="password"
//                     value={values.senha}
//                     onChange={handleChange}
//                 />
//                 {/* <pre>
//           {JSON.stringify(values, null, 2)}
//         </pre> */}
//                 <div>
//                     <button>Entrar</button>
//                 </div>
//                 <p>
//                     <a href="/auth-page-static">auth-page-static</a>
//                 </p>
//                 <p>
//                     <a href="/auth-page-ssr">auth-page-ssr</a>
//                 </p>
//             </form>
//         </div>
//     );
// }
