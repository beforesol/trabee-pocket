import React, { Suspense } from 'react';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import configureStore from '@config/store';
import createRoutes from '@config/routes';
import Login from '@pages/Login';
import { LOGIN } from '@modules/login';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <meta property="og:title" content="네이버 오토 브랜드 위크" />
        <meta property="og:description" content="자동차브랜드의 공식 컨텐츠를 한 자리에서 즐겨보세요!" />
        <meta property="og:image" content="https://motorshow.naver.com/assets/pc/img/ogImage.png" />
        <meta name="description" content="자동차브랜드의 공식 컨텐츠를 한 자리에서 즐겨보세요!" />

        <meta name="twitter:title" content="네이버 오토 브랜드 위크" />
        <meta name="twitter:description" content="자동차브랜드의 공식 컨텐츠를 한 자리에서 즐겨보세요!" />
        <meta name="twitter:image" content="https://motorshow.naver.com/assets/pc/img/ogImage.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>네이버 오토 브랜드 위크</title>
      </Helmet>
      {/* {isLogin ? (
        <>
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
        </>
      ) : (
        <Login />
      )} */}
    </>
  );
};
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);


export default App;
