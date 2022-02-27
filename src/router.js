import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { FilmsProvider } from "./common/context/Films";
import { UsuarioProvider } from "./common/context/Usuario";
import Login from "./components/Login";

export default function AppRoutes() {
	return (
		<Router>
			<UsuarioProvider>
				<FilmsProvider>
					<Routes>
						<Route path="/" element={<Login/>} />
						<Route path="/browse" element={<App />} />
					</Routes>
				</FilmsProvider>
			</UsuarioProvider>
		</Router>
	);
}
