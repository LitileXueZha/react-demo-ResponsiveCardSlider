import {createRoot} from 'react-dom/client';

import './index.scss';
import App from './App.jsx';

var $app = document.getElementById('app');
var root = createRoot($app, {
  onUncaughtError: console.error,
});
root.render(<App />);
