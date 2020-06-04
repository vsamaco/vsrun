import { combineReducers } from 'redux';
import authReducer from './authReducer';
import athleteReducer from './athleteReducer';
import activitiesReducer from './activitiesReducer';
import segmentsReducer from './segmentsReducer';

export default combineReducers({
  auth: authReducer,
  athlete: athleteReducer,
  activities: activitiesReducer,
  segmentEfforts: segmentsReducer,
});
