import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FilmsProvider } from "./common/context/Films";
import { UsuarioProvider } from "./common/context/Usuario";
import React from 'react';
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import SelectProfile from "./pages/SelectProfile";

const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#E50914',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#00f',
        main: '#f5f5f5',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Usado pelas funções abaixo para mudança de uma cor de luminância por aproximadamente
      // dois índices dentro de sua paleta tonal.
      // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
      tonalOffset: 0.2,
      warning: {
          main: '#E50930'
      },
      transparent: '#0000',
    },
});

export default function AppRoutes() {
	return (
        <ThemeProvider theme={theme}>
            <Router>
                <UsuarioProvider>
                        <FilmsProvider>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route
                                    path="/select-profile"
                                    element={<SelectProfile />}
                                />

                                <Route path="/browse" element={<Browse />} />
                            </Routes>
                        </FilmsProvider>
                </UsuarioProvider>
            </Router>

        </ThemeProvider>
	);
}
