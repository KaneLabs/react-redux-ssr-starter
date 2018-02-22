export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_LOADING = 'LOGIN_LOADING';

import { API_URL } from '../../utils';

const psuedoNetworkRequest = (username, password) => {
  // // Example Real Network Request
  // const res = await fetch(`${API_URL}/auth.login`, {
  //   method: 'POST',
  //   body: JSON.stringify({ username, password }),
  //   'Content-Type': 'application/json',
  // })
  // .then(rawRes => rawRes.json())

  // Fake Network Request
  return new Promise((resolve, reject) => setTimeout(() => {
    // Fake API errors
    if (username.length < 1) {
      return resolve({ error: 'Username Is Empty.' })
    }

    // Fake API errors
    if (password.length < 6) {
      return resolve({ error: 'Password must be at least 6 characters' })
    }

    // fails 10% of the time
    const randomNum0To100 = (Math.random() * 100);
    if (randomNum0To100 < 10) {
      return resolve({ error: 'Unexpected Error.' })
    }

    const authObject = { id: 1, username };

    return resolve({ success: true, data: authObject });
  }, 2000));
};

export const login = (username, password) => async (dispatch, store, api) => {
  dispatch({ type: LOGIN_LOADING });

  const res = await psuedoNetworkRequest(username, password);

  if (res.error) {
    return dispatch({ type: LOGIN_ERROR, payload: res.error });
  }

  if (res.success) {
    return dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  }
}
