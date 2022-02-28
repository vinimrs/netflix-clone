import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FilmsProvider } from "./common/context/Films";
import { UsuarioProvider } from "./common/context/Usuario";
import Browse from "./components/Browse";
import Login from "./components/Login";
import SelectProfile from "./components/SelectProfile";

export default function AppRoutes() {
	return (
		<Router>
			<UsuarioProvider>
				<FilmsProvider>
					<Routes>
						<Route path="/" element={<Login/>} />
						<Route path="/browse" element={<Browse />} />
						<Route path="/select-profile" element={<SelectProfile />} />
					</Routes>
				</FilmsProvider>
			</UsuarioProvider>
		</Router>
	);
}
