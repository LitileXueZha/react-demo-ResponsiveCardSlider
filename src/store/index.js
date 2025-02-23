import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {thunk} from 'redux-thunk';

import card from './card.js';

const reducers = combineReducers({
  card,
});

let composeWithDevTools = compose;
// 非生产环境添加 redux-devtools-extension
if (__DEV__) {
  composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
