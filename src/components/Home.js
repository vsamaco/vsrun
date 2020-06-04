import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityStore } from '../contexts/ActivityContext';

import Activities from './Activities';

class Home extends Component {
  render() {
    return (
      <ActivityStore>
        <div className="container ui">
          <h1>Home</h1>
          <Activities />
        </div>
      </ActivityStore>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, {})(Home);
