import strava from '../apis/strava';
import history from '../history';
import customData from '../stubs/activitiesData.json';

export const getAuthorizeUrl = () => {
  const api = new strava();
  return api.getAuthorizeUrl();
}

export const fetchAccessToken = (code) => async dispatch => {
  const api = new strava();
  const response = await api.getAccessToken(code);

  dispatch({ type: 'FETCH_ACCESS_TOKEN', payload: response.data });
  history.push('/');
}

export const fetchAuthentication = (auth) => {
  return {
    type: 'FETCH_AUTHENTICATION',
    payload: auth
  };
}

export const refreshToken = () => async (dispatch, getState) => {
  const { access_token, refresh_token } = getState().auth;
  const api = new strava({ access_token: access_token, refresh_token: refresh_token });

  const response = await api.refreshToken();
  dispatch({ type: 'REFRESH_TOKEN', payload: response.data });
  history.push('/');
}

export const logout = () => async (dispatch, getState) => {
  const { access_token } = getState().auth;
  const api = new strava({ access_token: access_token });

  try {
     await api.deauthorize();
  } catch (error) {
    console.log('deauth', error);
  }

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('state');

  dispatch({ type: 'LOGOUT' });

  history.push('/');
}

export const fetchAthlete = () => async (dispatch, getState) => {
  const { access_token } = getState().auth;
  const api = new strava({ access_token: access_token });
  const response = await api.get('/api/v3/athlete');

  dispatch({ type: 'FETCH_ATHLETE', payload: response.data });
}

export const fetchActivities = () => async (dispatch, getState) => {
  const { access_token } = getState().auth;
  const api = new strava({ access_token: access_token })
  const response = await api.get('/api/v3/athlete/activities?per_page=20');
  
  dispatch({ type: 'FETCH_ACTIVITIES', payload: response.data });
};

export const fetchActivity = (activity_id) => async (dispatch, getState) => {
  const { access_token } = getState().auth;
  const api = new strava({ access_token: access_token });
  const response = await api.get(`/api/v3/activities/${activity_id}`);

  dispatch({ type: 'FETCH_ACTIVITY', payload: response.data });
}

export const fetchSegmentEfforts = (segment_id) => async (dispatch, getState) => {
  const { access_token } = getState().auth;
  const api = new strava({ access_token: access_token });
  const response = await api.get(`/api/v3/segment_efforts`, {
    segment_id: segment_id
  });

  dispatch({ type: 'FETCH_SEGMENT_EFFORTS', payload: response.data });
}