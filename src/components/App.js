import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import Callback from './Callback';
import Home from './Home';
import Activity from './Activity';
import SegmentEfforts from './SegmentEfforts';

const App = () => {
  return (
    <Router history={history} component={Home}>
      <div>
        <Header />
        <div className="ui main text container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/activities/:id" component={Activity} />
            <Route exact path="/segment_efforts/:id" component={SegmentEfforts} />
            <Route exact path="/callback" component={Callback} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
