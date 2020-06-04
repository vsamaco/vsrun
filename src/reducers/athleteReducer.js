export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ATHLETE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
