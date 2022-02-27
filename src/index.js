import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FilmsProvider } from './common/context/Films';

ReactDOM.render(
  <React.StrictMode>
      <FilmsProvider>
        <App />

      </FilmsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);