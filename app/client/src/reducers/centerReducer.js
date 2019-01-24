import update from 'immutability-helper';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function centerReducer(state=initialState.centers, action) {
  let newState;
  switch (action.type) {
    case types.FETCH_CENTERS_SUCCESS:
      newState = update(state, {
        centers: { $set: action.centers }
      });
      return newState;
    case types.ADD_CENTER_SUCCESS:
      newState = update(state, {
        center: { $set: action.center },
        message: { $set: 'Center created successfully' },
        isLoading: { $set: false },
        toastType: { $set: 'is-success' }
      });
      return newState;
    case types.ADD_CENTER_FAILURE:
      newState = update(state, {
        message: { $set: action.error.message },
        toastType: { $set: 'is-danger' },
        isLoading: { $set: false }
      });
      return newState;
    case types.ADD_CENTER_LOADING:
      newState = update(state, {
        isLoading: { $set: true }
      });
      return newState;
    case types.CLEAR_CENTER_ACTION_MESSAGE:
      newState = update(state, {
        message: { $set: '' },
        toastType: { $set: '' },
      });
      return newState;
    default:
      return state;
  }
}
