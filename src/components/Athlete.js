import React from 'react'
import { connect } from 'react-redux';
import { fetchAthlete } from '../actions';
// import athleteData from '../stubs/athleteData';

class Athlete extends React.Component {
  componentDidMount() {
    if (this.props.auth.isSignedIn) {
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
    auth: state.auth,
    athlete: state.athlete
  };
}

export default connect(mapStateToProps, { fetchAthlete })(Athlete);
