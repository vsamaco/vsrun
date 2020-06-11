import React, { Component } from 'react';
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

export default Home;
