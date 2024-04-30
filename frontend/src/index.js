
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
