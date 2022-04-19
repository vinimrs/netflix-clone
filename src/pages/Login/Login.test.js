import React from "react";
import { screen, render } from "@testing-library/react";
import Login from ".";
import { UsuarioProvider } from "../../common/context/Usuario";
import { Router, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import SelectProfile from "../SelectProfile";

const renderizaLogin = () => {
  const history = createMemoryHistory();
  return (
    <UsuarioProvider>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </UsuarioProvider>
  );
};

describe("Página de Login", () => {
  describe("Quando o usuário entra na página", () => {
    it("mostra inputs e buttons", () => {
      render(renderizaLogin());

      const botaoLogin = screen.getByTestId("Entrar");
      const inputSenha = screen.getByLabelText("Senha");
      const inputEmail = screen.getByLabelText("Email");
      expect(botaoLogin).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputSenha).toBeInTheDocument();
    });

    it("botao inicia desabilitado", () => {
      render(renderizaLogin());
      const botaoLogin = screen.getByTestId("Entrar");
      expect(botaoLogin).toHaveAttribute("disabled");
    });
  });

  describe("Ao inserir no input Email:", () => {
    it("dispara erro se for menor que 10", () => {
      render(renderizaLogin());

      const inputEmail = screen.getByLabelText("Email");
      const botaoLogin = screen.getByTestId("Entrar");

      userEvent.type(inputEmail, "testando1");

      expect(inputEmail).toHaveAttribute("aria-invalid", "true");
      expect(botaoLogin).toHaveAttribute("disabled");
    });

    it("aceita se for maior ou igual a 10", () => {
      render(renderizaLogin());
      const inputEmail = screen.getByLabelText("Email");

      userEvent.type(inputEmail, "10caracteres");

      expect(inputEmail).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("Ao inserir no campo Senha:", () => {
    it("dispara erro se for menor que 4", () => {
      render(renderizaLogin());
      const inputSenha = screen.getByLabelText("Senha");

      userEvent.type(inputSenha, "car");

      expect(inputSenha).toHaveAttribute("aria-invalid", "true");
    });
    it("aceita se for maior ou igual a 4", () => {
      render(renderizaLogin());
      const inputSenha = screen.getByLabelText("Senha");

      userEvent.type(inputSenha, "caractere");

      expect(inputSenha).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("Ao preencher os dois campos o botao:", () => {
    it("[DISABLED] se qualquer um dos dois for invalido", () => {
      render(renderizaLogin());
      const inputEmail = screen.getByLabelText("Email");
      const inputSenha = screen.getByLabelText("Senha");
      const botaoLogin = screen.getByTestId("Entrar");

      userEvent.type(inputEmail, "car"); // errado
      userEvent.type(inputSenha, "caractere"); // certo

      expect(botaoLogin).toHaveAttribute("disabled");

      userEvent.clear(inputSenha);
      userEvent.clear(inputEmail);

      userEvent.type(inputEmail, "carac@hotmail.com");
      userEvent.type(inputSenha, "car");

      expect(botaoLogin).toHaveAttribute("disabled");
    });

    it("[NOT-DISABLED] se os dois forem validos", () => {
      render(renderizaLogin());
      const inputEmail = screen.getByLabelText("Email");
      const inputSenha = screen.getByLabelText("Senha");
      const botaoLogin = screen.getByTestId("Entrar");

      userEvent.type(inputEmail, "carac@hotmail.com"); // certo
      userEvent.type(inputSenha, "caractere"); // certo

      expect(botaoLogin).not.toHaveAttribute("disabled");
    });
  });

  describe("Ao clicar no Botao", () => {
    it("será redirecionado para Select-Profile", () => {
      const history = createMemoryHistory();
      history.push("/select-profile");
      render(
        <UsuarioProvider>
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route path="/select-profile" element={<SelectProfile />} />
            </Routes>
          </Router>
        </UsuarioProvider>
      );

      expect(screen.getByText("Quem está assistindo?")).toBeInTheDocument();
    });
  });
});
