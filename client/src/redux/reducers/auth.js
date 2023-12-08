import * as actionType from '../const/actionTypes.js';


const authReducer = (state = { authData: null, errorMessage: null }, action) => {
  switch (action.type) {
    case actionType.PASSWORD:
      return state;
    case actionType.EMAIL:
      return state;
    case actionType.REGISTER:
      return { ...state, authData: null, errorMessage: null };
    case actionType.AUTH:
      localStorage.clear();
      localStorage.setItem('user_info', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, errorMessage: null };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, errorMessage: null };
    case actionType.AUTH_ERROR:
      return { ...state, authData: null, errorMessage: action.errorMessage }
    default:
      return state;
  }
};

export default authReducer;