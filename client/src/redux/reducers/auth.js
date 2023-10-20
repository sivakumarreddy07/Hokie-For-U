import * as actionType from '../const/actionTypes.js';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.PASSWORD:
      return state;
    case actionType.EMAIL:
      return state;
    case actionType.REGISTER:
      return {...state, authData: null};
    case actionType.AUTH:
      localStorage.clear();
      localStorage.setItem('user_info', JSON.stringify({ ...action?.data }));
      console.log(action.data)
      return { ...state, authData: action.data };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;