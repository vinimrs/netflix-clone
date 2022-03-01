import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle` 
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


`;

export default GlobalStyle;
