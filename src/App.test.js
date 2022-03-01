import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Login from './pages/Login';

describe('Página de Login', () => {
    describe('Quando o usuário insere a senha', () => {
        it('menor que 4', () => {
            render(<Login />);

            const botaoLogin = screen.getByText('entrar');
            console.log(botaoLogin);

            
        })
    })

})