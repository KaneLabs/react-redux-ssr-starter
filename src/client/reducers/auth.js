import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_ERROR } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return { data: action.payload};
    case LOGIN_LOADING:
      return { loading: true };
    case LOGIN_ERROR:
      return { error: action.payload };
    default:
    return state;
  }
}
