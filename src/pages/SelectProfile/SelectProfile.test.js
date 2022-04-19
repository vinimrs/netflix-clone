import { screen, render } from "@testing-library/react";
import { Router, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UsuarioProvider } from "../../common/context/Usuario";
import SelectProfile from ".";

const renderizaSelectProfile = () => {
  const history = createMemoryHistory();
  return (
    <UsuarioProvider>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/" element={<SelectProfile />} />
        </Routes>
      </Router>
    </UsuarioProvider>
  );
};

describe("Página de Seleção de Perfil de Usuário:", () => {
  describe("Quando o usuário abrir a página:", () => {
    it("mostra texto auxiliar", () => {
      render(renderizaSelectProfile());

      expect(screen.getByText("Quem está assistindo?")).toBeInTheDocument();
    });
    it("mostra os perfis para seleção:", () => {
      render(renderizaSelectProfile());

      expect(screen.getByTestId("profile-container")).toBeInTheDocument();
    });
  });
});
