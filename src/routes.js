import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './components/Home';
import App from './components/App';
import Auth from './auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    debugger;
    //auth.handleAuthentication();
  }
}

const routes = () => (
  <Router history={history} component={Home}>
    <div>
      <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/callback" render={(props} => 
        handleAuthentication(props);
        return <Callback />)} />
    </div>
  </Router>
);

export default routes;