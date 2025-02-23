import {lazy, Suspense} from 'react';
import {HashRouter, Route, Routes} from 'react-router';
import {Provider} from 'react-redux';

import lazyHOC from './components/lazyHOC.js';
import Home from './pages/index.jsx';
import NotFound from './pages/404/index.jsx';
import store from './store/index.js';

var HeavyExp = lazyHOC(() => import(/* webpackChunkName: 'heavy-exp' */'./pages/heavy-exp/index.jsx'));

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" index Component={Home} />
          <Route path='/heavy-exp' Component={HeavyExp} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
