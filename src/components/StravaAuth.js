import React from 'react';
import { connect } from 'react-redux';
import { getAuthorizeUrl, logout, refreshToken } from '../actions/index';

class StravaAuth extends React.Component {
  render() {
    const isAuthenticated = this.props.isSignedIn;
    return (
      <React.Fragment>
        { isAuthenticated && (
          <React.Fragment>
            <div className="item">
              <button className="ui button" onClick={this.props.refreshToken}>Refresh</button>
            </div>
            <div className="item">
              <button className="ui button" onClick={this.props.logout}>Logout</button>
            </div>
          </React.Fragment>
        )}
        { !isAuthenticated && (
          <a href={this.props.getAuthorizeUrl()}>
            <div className="item">
              <button className="ui green button">
                Login with Strava
              </button>
            </div>
          </a>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { getAuthorizeUrl, logout, refreshToken })(StravaAuth);
