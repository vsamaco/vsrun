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
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route exact path="/home" render={(props) => <Home {...props} />} />
            <Route exact path="/activities/:id" render={(props) => <Activity {...props} />} />
            <Route exact path="/segment_efforts/:id" render={(props) => <SegmentEfforts {...props} />} />
            <Route exact path="/callback" render={(props) => <Callback {...props} />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
