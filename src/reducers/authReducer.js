const INITIAL_STATE = {
  isSignedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ACCESS_TOKEN':
      return { ...state, isSignedIn: true, ...action.payload };
    case 'REFRESH_TOKEN':
      return { ...state, isSignedIn: true, ...action.payload };
    case 'LOGOUT':
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
