import styled from 'styled-components';

export const ModalBG = styled.div`
    background-color: #000000c1;
    position: fixed;
    z-index: 10000;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const ModalContainer = styled.div`
    margin: 5vh 0;
    width: 700px;
    height: 90vh;

    background-color: var(--black);
    position: relative;
    color: var(--white);
    border-radius: 8px;
    overflow-y: scroll;

    visibility: hidden;
    opacity: 0;

    span {
        font-weight: 600;
        font-size: 16px;
        padding: 8px;
    }

    h1 {
        padding-bottom: 24px;
        padding-top: 12px;
    }

    h2 {
        padding: 18px 0 12px 0;
    }

    p {
        padding: 0px 8px 12px 8px;
        line-height: 26px;
    }

    @media (max-width: 768px) {
        width: 95vw;
        margin: 100px 0;
        h1 {
            padding-bottom: 12px;
            padding-top: 22px;
        }

        h2 {
            padding: 22px 0 12px 0;
        }
    }
`;

export const CloseModal = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 30000;
`;

export const ModalBanner = styled.div<{ src?: string }>`
    width: 100%;
    height: 400px;
    background-image: linear-gradient(90deg, #000e 37%, #00000000 85.33%),
        url(${props => (props.src ? props.src : '')});
    background-size: cover;
    background-position: center;
`;

export const FilmInfosWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 24px 32px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 8px 12px 24px 12px;
    }
`;

export const MovieDetails = styled.div`
    display: flex;
    // padding: 8px 0;
`;

export const MovieProductionCompanies = styled.div`
    background-color: var(--white);
    color: var(--black);
    border-radius: 4px;
    margin-top: 24px;
    padding: 8px 10px 12px 10px;

    h2 {
        padding-top: 0px;
    }
`;

export const CompaniesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const CompaniesBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin: 4px 0;

    img {
        width: 80px;
    }
`;
