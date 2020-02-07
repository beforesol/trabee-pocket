import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { createHashHistory } from 'history';
import configureStore from '@config/store';
import createRoutes from '@config/routes';

const initialState = {};

const history = createHashHistory();
const store = configureStore(initialState, history);
const routes = createRoutes();

const Loading = () => (
  <div>로딩...</div>
)

const App = () => (
  <>
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={Loading()}>
          <Switch>
            {
              routes.map((item: any) => (
                <Route
                  key={item.name}
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                />))
            }
          </Switch>
        </Suspense>
      </HashRouter>
    </Provider>
  </>
);


export default App;
