import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

import './assets/styles/style.sass';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
