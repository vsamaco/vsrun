import React from 'react';
import { Link } from 'react-router-dom';

import StravaAuth from './StravaAuth';

class Header extends React.Component {
  render() {
    return (
      <div className="ui large top fixed hidden menu">
        <div className="ui container">
          <Link to="/" className="header item">
            vs.run
          </Link>
          <Link to="/" className="item">
            Home
          </Link>
          <div className="right menu">
            <StravaAuth />
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
