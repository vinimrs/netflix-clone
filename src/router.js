import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FilmsProvider } from "./common/context/Films";
import { UsuarioProvider } from "./common/context/Usuario";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import SelectProfile from "./pages/SelectProfile";

export default function AppRoutes() {
  return (
    <Router>
      <UsuarioProvider>
        <FilmsProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/select-profile" element={<SelectProfile />} />

            <Route path="/browse" element={<Browse />} />
          </Routes>
        </FilmsProvider>
      </UsuarioProvider>
    </Router>
  );
}
