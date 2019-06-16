import * as React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Index from '../components/Home/index';
import DynamicPage from '../components/DynamicPage/index';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/dynamic" component={DynamicPage} />
      </Switch>
    </div>
  </Router>
);


export default App;
