import React from 'react';
import { connect } from 'react-redux';
import { fetchActivities } from '../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
import { metersToMiles } from '../runUtil';

import ActivityContext from '../contexts/ActivityContext';
import CompareActivities from './CompareActivities'

class Activities extends React.Component {
  static contextType = ActivityContext;

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchActivities();
    }
  }

  renderActivities() {
    if (!this.props.activities) {
      return;
    }

    return (
      <div>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th colSpan="4">My Activities</th>
            </tr>
          </thead>
          <tbody>
            {this.props.activities.map(activity => {
              return this.renderActivity(activity)
            })}
          </tbody>
        </table>
      </div>
    );
  }

  renderActivity(activity) {
    momentDurationFormat(moment);
    return (
      <tr key={activity.id}>
        <td>
          <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
          <br />
          {moment(activity.start_date).format("MM/DD/YYYY HH:mm A")}
        </td>
        <td>
          {metersToMiles(activity.distance)}
        </td>
        <td>
          {moment.duration(activity.moving_time, 'seconds').format('h:mm:ss')}
        </td>
        <td>
          <button onClick={() => this.context.handleActivityAdd(activity.id)}>Select</button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <div className="ui two column grid">
          <div className="nine wide column">
            {this.props.activities && this.renderActivities()}
          </div>
          <div className="seven wide column">
            <CompareActivities />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    activities: Object.values(state.activities).reverse()
  };
}

export default connect(mapStateToProps, { fetchActivities })(Activities);
