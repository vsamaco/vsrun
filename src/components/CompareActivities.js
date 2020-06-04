import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
import ActivityContext from '../contexts/ActivityContext';
import { secondsToMinutes } from '../runUtil';

import CompareChart from './CompareChart';
import ActivityMap from './ActivityMap';

class CompareActivities extends React.Component {
  static contextType = ActivityContext;

  renderMap(activity) {
    return (
      <div>
        <ActivityMap 
          position={[activity.start_latitude, activity.start_longitude]}
          polyline={activity.map.summary_polyline}
        />
      </div>
    );
  }

  renderActivities() {
    if (this.context.activities.length === 0) {
      return null;
    }

    const selectedActivities = this.props.activities
      .filter(activity => this.context.activities.includes(activity.id))
      .sort((a,b) => a.start_date_local > b.start_date_local);

    momentDurationFormat(moment);

    return (
      <div>
        {this.renderMap(selectedActivities[0])}
        <table className="ui table">
          <thead>
            <tr>
              <th colSpan="3">{selectedActivities[0].name}</th>
            </tr>
          </thead>
          <tbody>
          {selectedActivities.map((activity) => {
            return (
              <tr key={activity.id}>
                <td>
                  {moment(activity.start_date).format("MMMM DD")}
                </td>
                <td>
                  {moment.duration(activity.moving_time, 'seconds').format('h:mm:ss')}
                </td>
                <td>
                  <button onClick={() => this.context.handleActivityRemove(activity.id)}>Remove</button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <CompareChart activities={selectedActivities} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Selected Activities</h2>
        {this.renderActivities()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activities: Object.values(state.activities)
  }
}

export default connect(mapStateToProps, {})(CompareActivities);
