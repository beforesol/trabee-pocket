import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import createReducer from './rootReducers';

import middleware from '../middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const devTools =
  process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f;

export default function configureStore(initialState: any, history: any) {
  const middlewares = [
    middleware,
    routerMiddleware(history),
  ];

  const enhancer = compose(applyMiddleware(...middlewares), devTools);

  const store = createStore(
    createReducer(),
    initialState,
    enhancer,
  );

  return store;
}
