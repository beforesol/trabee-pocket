import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import DynamicPage from '../components/DynamicPage';

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dynamic" component={DynamicPage} />
    </Switch>
  </HashRouter>
);


export default App;
