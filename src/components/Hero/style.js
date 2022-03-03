import styled from "styled-components";
import heroImage from "../../assets/hero-image-example.png";
import { gsap, Power3 } from "gsap";

export const handleOutInfoAnimation = () => {
	gsap.to("._filmTitle", {
		ease: Power3.easeInOut,
        fontSize: '52px',
		duration: 1,
		zIndex: -1,
	});
	gsap.to("._detailsDiv, ._filmDescription, ._filmGenres", {
		ease: Power3.easeInOut,
		display: "none",
		duration: 1,

		autoAlpha: 0,
	});
};

export const handleInInfoAnimation = () => {
	gsap.to("._filmTitle", {
		duration: 0.5,
        fontSize: '72px',
		ease: Power3.easeInOut,
		y: "inherit",
	});
	gsap.to("._detailsDiv, ._filmDescription, ._filmGenres", {
		ease: Power3.easeInOut,
		display: "inherit",
		duration: 0.5,
		autoAlpha: 1,
	});
};

export const HeroWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;

  background-image: linear-gradient(90deg, #000e 37%, #00000000 85.33%),
    url(${(props) => {
      return props.$src ? props.$src : "";
    }});
  background-size: cover;
  background-position: center;

  .video {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
  }

  @media (max-width: 768px) {
    margin: -68px 0 0 0;
    background-image: linear-gradient(0deg, #000e 40%, #00000000 95.33%),
      url(${(props) => {
        return props.$src ? props.$src : heroImage;
      }});
    background-position: center;
    align-items: end;
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
  z-index: 10;
  width: 100%;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-bottom: 150px;
    padding-top: 100px;
    max-width: 80vh;
    justify-content: end;
  }
`;

export const FilmTitle = styled.h1`
<<<<<<< HEAD
	font-size: 72px;
	color: var(--white);
	max-width: 45%;
	order: 1;

	@media (max-width: 768px) {
		font-size: 48px;
		max-width: 90%;
		line-height: 75px;
	}
=======
  font-size: 72px;
  color: var(--white);
  max-width: 45%;
  order: 1;

  @media (max-width: 768px) {
    font-size: 48px;
    max-width: 90%;
    line-height: 70px;
  }
>>>>>>> cfe527e6b4f665ce77a2cc39a52ef7adeca0aad0
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 35%;
  order: 2;
  margin-top: 12px;

  @media (max-width: 768px) {
    margin-top: 8px;
    max-width: 80%;
  }
`;

export const DetailsText = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;

  color: var(${(props) => (props.score ? "--green" : "--white")});

  margin-right: 12px;

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }
`;

export const FilmText = styled.p`
  font-size: 20px;
  line-height: 24px;
  color: var(--white);

  order: 4;
  margin: 8px 0;

  max-width: 35%;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 8px 0;
    max-width: 80%;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  order: 4;
  margin: 12px 0px;
  max-width: 45%;

  @media (max-width: 768px) {
    margin: 8px 0px;
    max-width: 100%;
    order: 5;
  }
`;

export const HeroButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 6px;

  padding: ${(props) => (!props.variant ? "10px 20px" : "12px 22px")};
  background-color: var(
    ${(props) => {
      switch (props.variant) {
        case "primary":
          return "--white";
        case "secondary":
          return "--light-black";
        default:
          return "--transparent";
      }
    }}
  );
  border: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "none";
      case "secondary":
        return "none";
      default:
        return "solid 2px var(--white)";
    }
  }};
  color: var(
    ${(props) => {
      switch (props.variant) {
        case "primary":
          return "--black";
        case "secondary":
          return "--white";
        default:
          return "--white";
      }
    }}
  );

  /* Inside auto layout */

  margin: 8px 8px;

  &:hover {
    background: var(
      ${(props) => {
        switch (props.variant) {
          case "primary":
            return "--white-hover";
          case "secondary":
            return "--light-black-hover";
          default:
            return "--light-black-hover";
        }
      }}
    );
    border-color: var(--light-black-hover);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    margin: 8px 4px;
    display: ${(props) => (props.disableMobile ? "none" : "flex")};
  }
`;

export const ButtonText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-left: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
