import React from 'react';
import { connect } from 'react-redux';
import { fetchActivity } from '../actions';
import { Link } from 'react-router-dom';
import SplitChart from './SplitChart';
//import customData from '../stubs/activityData';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format';
import { metersToMiles, metersToFeet, secondsToMinutes, averagePace, averagePaceSeconds } from '../runUtil';
import ActivityMap from './ActivityMap';

class Activity extends React.Component {
  componentDidMount() {
    this.props.fetchActivity(this.props.match.params.id);
  }

  renderSegmentEfforts() {
    if (!this.props.activity.segment_efforts) {
      return null;
    }
  
    return (
      <div>
        <ul>
          {this.props.activity.segment_efforts.map((segment_effort) => {
            return (
              <li key={segment_effort.id}>
                <Link to={`/segment_efforts/${segment_effort.id}`}>{segment_effort.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }

  renderSplits() {
    if (!this.props.activity.splits_standard) {
      return null;
    }

    momentDurationFormat(moment);

    let labels = [];
    let data = [];

    this.props.activity.splits_standard.forEach((split) => {
      if (split.split === this.props.activity.splits_standard.length) {
        labels.push(metersToMiles(split.distance));
      } else {
        labels.push(split.split);
      }
      //data.push(split.moving_time);
      data.push(averagePaceSeconds(split.moving_time, split.distance))
    });
    console.log('data', data);
    return (
      <div className="ui container grid">
        <div className="ui column six wide">
          <table className="ui table">
            <thead>
              <tr>
                <th>Mile</th>
                <th>Pace</th>
                <th>Elevation</th>
              </tr>
            </thead>
            <tbody>
            {this.props.activity.splits_standard.map((split, index) => {
              return (
                <tr key={index}>
                  <td>{labels[index]}</td>
                  <td>{averagePace(split.moving_time, split.distance)}</td>
                  <td>{metersToFeet(split.elevation_difference)}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        <div className="ui column ten wide">
          <SplitChart labels={labels} dataset={data}/>
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.activity) {
      return (
        <div>Activity {this.props.match ? this.props.match.params.id : ''}</div>
      );
    }

    const position = [this.props.activity.start_latitude, this.props.activity.start_longitude];

    return (
      <div className="ui container">
        <h1>Activity</h1>
        <div className="ui container">
          <dl>
            <dt>Name</dt>
            <dd>{this.props.activity.name}</dd>
            <dt>Date</dt>
            <dd>{moment(this.props.activity.start_date_local).format("MM/DD/YYYY HH:mm A")}</dd>
            <dt>Time</dt>
            <dd>{moment.duration(this.props.activity.moving_time, "seconds").format("HH:mm:ss")}</dd>
            <dt>Distance</dt>
            <dd>{metersToMiles(this.props.activity.distance)}</dd>
            <dt>Pace</dt>
            <dd>
              {averagePace(this.props.activity.moving_time, this.props.activity.distance)}</dd>
            <dt>Segment Efforts</dt>
            <dd>{this.renderSegmentEfforts()}</dd>
            <dt>Splits</dt>
            <dd>{this.renderSplits()}</dd>
          </dl>
        </div>
        <div className="ui container">
          <ActivityMap position={position} polyline={this.props.activity.map.polyline}/>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    activity: state.activities[ownProps.match.params.id],
  }
};

export default connect(mapStateToProps, { fetchActivity })(Activity);
