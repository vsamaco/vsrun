import axios from 'axios';
import querystring from 'querystring';

const api = axios.create({
  baseURL: 'https://www.strava.com'
});


const defaults = {
  client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
  client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
  callback_url: process.env.REACT_APP_STRAVA_CALLBACK_URL,
  access_token: null,
  refresh_token: null
}

class strava {
  constructor(options) {
    const config = Object.assign({}, defaults, options);

    this.config = config;
  }

  getAuthorizeUrl = () => {
    const authorizeUri = 'https://www.strava.com/oauth/authorize';
    const params = {
      client_id: this.config.client_id,
      redirect_uri: this.config.callback_url,
      response_type: 'code',
      approval_prompt: 'auto',
      scope: 'read,activity:read_all'
    };

   return `${authorizeUri}?${querystring.stringify(params)}`;
  }

  getAccessToken = (code) => {
    return api.post('/api/v3/oauth/token', {
      client_id: this.config.client_id,
      client_secret: this.config.client_secret,
      code: code,
      grant_type: 'authorization_code'
    });
  }

  refreshToken() {
    return api.post(
      '/oauth/token', null, {
          params: {
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            grant_type: 'refresh_token',
            refresh_token: this.config.refresh_token
          }
        }
    );
  }

  deauthorize = () => {
    return api.post(
      '/oauth/deauthorize',
      null,
      { params: { access_token: this.config.access_token } }
    );
  }

  get(path, options) {
    if (!this.config.access_token) {
      console.error('access token required');
    }
  
    const params = Object.assign({}, options);

    return api.get(path, {
      headers: {
        "Authorization": `Bearer ${this.config.access_token}`
      },
      params: params
    })
  }
}

export default strava;
