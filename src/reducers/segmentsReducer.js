import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SEGMENT_EFFORTS':
      const newEfforts = _.mapKeys(action.payload, 'id');
      return { ...state, ...newEfforts };
    default:
      return state;
  }
};
