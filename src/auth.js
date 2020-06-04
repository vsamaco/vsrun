import history from './history';
import strava from './apis/strava';

class auth {
  constructor(props) {
    this.strava = new strava();

    if (this.isAuthenticated()) {
      this.loadSession();
    }
  }

  loginUrl = () => {
    return this.strava.getAuthorizeUrl();
  }

  handleAuthentication = async (code) => {
    try {
      const authRes = await this.strava.getAccessToken(code);
      this.setSession(authRes);
    } catch (error) {
      console.log('err', error);
    }
    history.push('/');
  }

  setSession = (data) => {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('expires_at', data.expires_at);
    localStorage.setItem('expires_in', data.expires_in);
  }

  loadSession() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    const expires_at = localStorage.getItem('expires_at');

    if (expires_at && expires_at !== 'undefined') {
      this.strava.config.access_token = access_token;
      this.strava.config.refresh_token = refresh_token;
      this.strava.config.expires_at = expires_at;
    }
  }

  logout = async () => {
    await this.strava.deauthorize();
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('state');

    history.replace('/home');
  }

  isAuthenticated = () => {
    let expiresAt = null;
    const tryExpiresAt = localStorage.getItem('expires_at');
    try {
      expiresAt = JSON.parse(tryExpiresAt);
      return (new Date().getTime() / 1000) < expiresAt;
    } catch {
      return false;
    }
  }
}

export default auth;
