import styled from "styled-components";
import heroImage from '../../assets/hero-image-example.png'; 

export const HeroWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: start;
	align-items: center;

	background-image: linear-gradient(90deg, #000e 37.0%, #00000000 70.33%),
		url(${props => {
            console.log(props.$src);
            return props.$src ? props.$src : heroImage
        }});
	background-size: cover;
	background-position: center;

	@media (max-width: 768px) {
		margin: -68px 0 0 0;
        background-image: linear-gradient(90deg, #000e 60.0%, #00000000 95.33%),
		url(${props => {
            console.log(props.$src);
            return props.$src ? props.$src : heroImage
        }});
	}
`;

export const InfoFilm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
    padding-left: 32px;
    padding-bottom: 150px;
    padding-top: 70px;

    @media (max-width: 768px) {
		padding-left: 16px;
        padding-bottom: 80px;
        padding-top: 100px;

        max-width: 80vh;
	}
`;

export const FilmTitle = styled.h1`
	font-size: 72px;
	line-height: 78px;
	color: var(--white);
    max-width: 50%;

    @media (max-width: 768px) {
		font-size: 48px;
        max-width: 80%;
	}
`;

export const Details = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;

	order: 1;
	margin: 12px 0px;

    @media (max-width: 768px) {
		margin: 10px 0px;
	}
`;

export const DetailsText = styled.span` 
font-weight: 500;
font-size: 20px;
line-height: 23px;
color: var(${(props) => (props.score ? "--green" : "--white")});

order: 0;
margin-right: 12px;

@media (max-width: 768px) {
    font-size: 16px;
}
`;

export const FilmText = styled.p`
	font-size: 20px;
	line-height: 24px;
	color: var(--gray);

	order: 2;
	margin: 8px 0 8px 0;

    max-width: 40%;

    @media (max-width: 768px) {
        font-size: 16px;
        margin: 8px 0 8px 0;
        max-width: 80%;
    }
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	align-items: flex-start;

	order: 2;
	margin: 12px 0px;
    
    @media (max-width: 768px) {
        justify-content: space-between;
    }
`;

export const HeroButton = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 12px 22px;
	background: var(
		${(props) => (props.primary ? "--white" : "--light-black")}
	);
	border-radius: 6px;
    border: none;
	color: var(${(props) => (props.primary ? "--black" : "--white")});
    cursor: pointer;
    transition: .5s;

	/* Inside auto layout */

	order: ${(props) => (props.primary ? "0" : "1")};
	margin: 0px 8px;

    &:hover {
        background: var(
            ${(props) => (props.primary ? "--white-hover" : "--light-black-hover")}
        ); 
    }

    @media (max-width: 768px) {
        padding: 12px 24px;
    }
`;

export const ButtonText = styled.p`
	font-weight: 500;
	font-size: 20px;
	line-height: 24px;
    margin-left: 8px;

    @media (max-width: 768px) {
        font-size: 16px
    }
`;