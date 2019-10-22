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

const devTools =
  process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

export default function configureStore(initialState, history) {
  const middlewares = [
    middleware,
    routerMiddleware(history),
  ];

  const enhancer = compose(applyMiddleware(...middlewares), devTools);

  const store = createStore(
    createReducer({
      router: routerReducer,
    }),
    initialState,
    enhancer,
  );

  return store;
}
