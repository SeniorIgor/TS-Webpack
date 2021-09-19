import React from 'react';
import ReactDOM from 'react-dom';

import Style from './index.module.sass';
import './assets/styles/style.sass';

const App = () => (
  <div className="wrapper">
    <h1 className={Style.title}>Hi there!</h1>
    <img
      src={new URL('./assets/images/landscape.jpg', import.meta.url)}
      className={Style.image}
    />
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
