import CenterApi from '../api/centerApi';
import {
  ADD_CENTER_FAILURE,
  ADD_CENTER_LOADING,
  ADD_CENTER_SUCCESS,
  CLEAR_CENTER_ACTION_MESSAGE,
  FETCH_SINGLE_CENTER_SUCCESS, UPDATE_CENTER_FAILURE, UPDATE_CENTER_LOADING, UPDATE_CENTER_SUCCESS
} from './actionTypes';

export function fetchCentersSuccess(centers) {
  return { type: 'FETCH_CENTERS_SUCCESS', centers };
}

export function addCenterSuccess(center) {
  return { type: ADD_CENTER_SUCCESS, center };
}
export function addCenterFailure(error) {
  return { type: ADD_CENTER_FAILURE, error };
}
export function addCenterLoading() {
  return { type: ADD_CENTER_LOADING };
}

export function updateCenterSuccess(center) {
  return { type: UPDATE_CENTER_SUCCESS, center };
}
export function updateCenterFailure(error) {
  return { type: UPDATE_CENTER_FAILURE, error };
}
export function updateCenterLoading() {
  return { type: UPDATE_CENTER_LOADING };
}

export function clearCenterActionMessage() {
  return { type: CLEAR_CENTER_ACTION_MESSAGE };
}

export function fetchSingleCenterSuccess(center) {
  return { type: FETCH_SINGLE_CENTER_SUCCESS, center };
}

export function fetchSingleCenterFailure(error) {
  return { type: FETCH_SINGLE_CENTER_SUCCESS, error };
}

export function fetchSingleCenterLoading() {
  return { type: FETCH_SINGLE_CENTER_SUCCESS };
}

export function fetchCenters() {
  return (dispatch) => {
    return CenterApi.getCenters()
      .then((response) => {
        dispatch(fetchCentersSuccess(response.data.data.centers));
      })
      .catch((error) => {
        throw (error);
      });
  };
}

export function addCenter(center) {
  return (dispatch) => {
    dispatch(addCenterLoading());
    return CenterApi.addCenter(center)
      .then((response) => {
        dispatch(addCenterSuccess(response.data.data.center));
        dispatch(clearCenterActionMessage());
      })
      .catch((error) => {
        dispatch(addCenterFailure(error.response.data));
        dispatch(clearCenterActionMessage());
        throw error.response.data;
      });
  };
}

export function fetchSingleCenter(id) {
  return (dispatch) => {
    dispatch(fetchSingleCenterLoading());
    return CenterApi.fetchOne(id)
      .then((response) => {
        dispatch(fetchSingleCenterSuccess(response.data.data.center));
      })
      .catch((error) => {
        console.log(error.response)
        dispatch(fetchSingleCenterFailure(error.response.data));
        throw error.response.data;
      });
  };
}

export function updateCenter(id, center) {
  return (dispatch) => {
    dispatch(updateCenterLoading());
    return CenterApi.updateCenter(id, center)
      .then((response) => {
        dispatch(updateCenterSuccess(response.data.data.center));
        dispatch(clearCenterActionMessage());
      })
      .catch((error) => {
        dispatch(updateCenterFailure(error.response.data));
        dispatch(clearCenterActionMessage());
        throw error.response.data;
      });
  };
}
