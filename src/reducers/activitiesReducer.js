import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ACTIVITIES':
      const newActivities = _.mapKeys(action.payload, 'id');
      return { ...state, ...newActivities };
    case 'FETCH_ACTIVITY':
      return { ...state, [action.payload.id]: action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
