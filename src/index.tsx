import React from 'react';
import ReactDOM from 'react-dom';

import Style from './index.module.sass';

const App = () => <h1 className={Style.title}>Hi there!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
