import * as React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/Home';
import DynamicPage from '../components/DynamicPage';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dynamic" component={DynamicPage} />
      </Switch>
    </div>
  </Router>
);


export default App;
