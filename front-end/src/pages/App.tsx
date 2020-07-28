import React, { Suspense } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import configureStore from '@config/store';
import createRoutes from '@config/routes';
import Login from '@pages/Login';
import { LOGIN } from '@modules/login';

const initialState = {};

const store = configureStore(initialState);
const routes = createRoutes();

const Loading = () => (
  <div>로딩...</div>
);

const Main = () => {
  const { isLogin } = useSelector((state: any) => state[LOGIN]);

  return (
    <>
      {isLogin ? (
        <BrowserRouter>
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
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  );
};
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);


export default App;
