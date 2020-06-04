import React from 'react';
import { connect } from 'react-redux';
import { fetchSegmentEfforts } from '../actions';

class SegmentEfforts extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchSegmentEfforts(this.props.match.params.id);
    }
  }

  renderSegmentEfforts() {
    return (
      <ul>
        {this.props.segmentEfforts.map((segment_effort) => {
          return <li key={segment_effort.id}>{segment_effort.name}-{segment_effort.moving_time}</li>
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h2>Segment Efforts</h2>
        {this.renderSegmentEfforts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    segmentEfforts: Object.values(state.segmentEfforts),
  }
}

export default connect(mapStateToProps, { fetchSegmentEfforts })(SegmentEfforts);
