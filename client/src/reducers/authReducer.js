import update from 'immutability-helper';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  let newState = {};
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      newState = update(state, {
        authenticated: {  $set: true },
        currentUser: { $set: action.user },
        toastType: { $set: 'is-success' },
        message: { $set: 'Signed up successfully' }
      });
      return newState;
    case types.SIGNUP_FAILURE:
      newState = update(state, {
        message: { $set: action.data.message },
        toastType: { $set: 'is-danger' }
      });
      return newState;
    case types.CLEAR_AUTH_MESSAGE:
      newState = update(state, {
        message: { $set: '' },
        toastType: { $set: '' },
      });
      return newState;
    case types.LOGIN_SUCCESS:
      newState = update(state, {
        authorization: { $set: true },
        currentUser: { $set: action.user },
        isLoading: { $set: false },
        toastType: { $set: 'is-success' },
        message: { $set: 'Logged in successfully' }
      });
      return newState;
    case types.LOGIN_FAILURE:
      newState = update(state, {
        isLoading: { $set: false },
        toastType: { $set: 'is-danger' },
        message: { $set: 'Invalid username/password' }
      })
    case types.AUTH_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    case types.LOGOUT_SUCCESS:
      newState = update(state, {
        authenticated: { $set: false },
        currentUser: { $set: '' },
        isLoading: { $set: false }
      });
      return newState;
    default:
      return state;
  }
}
