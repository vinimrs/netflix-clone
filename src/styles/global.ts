import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle` 
    ${normalize}

    :root {
        --black: #111;
        --white: #f5f5f5;
        --white-hover: #f5f5f5e1;
        --green: #46d369;
        --gray: #9A9A9A;
        --light-black: #363636a1;
        --light-black-hover: #363636a1;
        --transparent: #00000000;
        --red-netflix: #E50914;
        --red-netflix-darker: #E50930;
    }

    html {
        scroll-behavior: smooth;
    }

    * {
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
        margin: 0;
        padding: 0;
        text-decoration: none;
    }


    body {
        background-color: var(--black);
        overflow-x: hidden;
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
    }

    h1, h2, h3 {
        color: var(--white);
        margin: 0;
    }
`;

export default GlobalStyle;
