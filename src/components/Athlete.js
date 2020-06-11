import React from 'react'
import { connect } from 'react-redux';
import { fetchAthlete } from '../actions';

class Athlete extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchAthlete();
    }
  }

  render() {
    return (
      <div class="ui container">
        <h2>Athlete</h2>
        {this.props.athlete && (
          <h3>Hello {this.props.athlete.firstname} {this.props.athlete.lastname}</h3> 
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    athlete: state.athlete
  };
}

export default connect(mapStateToProps, { fetchAthlete })(Athlete);
