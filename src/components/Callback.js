import React from 'react';
import { connect } from 'react-redux';
import { fetchAccessToken } from '../actions';

class Callback extends React.Component {
  componentDidMount() {
    const code = new URLSearchParams(this.props.history.location.search).get('code');
    this.props.fetchAccessToken(code)
  }

  render() {
    return (
      <div className="container">
        <h4>Loading...</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchAccessToken })(Callback);
