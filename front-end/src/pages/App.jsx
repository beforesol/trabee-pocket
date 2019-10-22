import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { createHashHistory } from 'history';
import configureStore from '../config/store';
import createRoutes from '../config/routes';

const initialState = {};

const history = createHashHistory();
const store = configureStore(initialState, history);
const routes = createRoutes(store);

const App = () => (
  <HashRouter>
    <Switch>
      {
        routes.map(item => (<Route key={item.name} {...item} />))
      }
    </Switch>
  </HashRouter>
);


export default App;
