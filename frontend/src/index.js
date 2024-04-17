// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));


// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';

// project imports
// import * as serviceWorker from 'serviceWorker';
import App from './App';

// style + assets
import './assets/scss/style.scss';
import config from './config';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
);
