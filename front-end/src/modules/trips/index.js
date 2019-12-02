import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */
import { getTripApi } from '../../api';
import Trip from '../../model/trip';

// initial State
const tripState = {
  isLoaded: false,
  isFailed: false,
  currentTripInfo: { ...new Trip() },
};

export const STATUS = {
  EDIT: 'EDIT',
  NEW: 'NEW',
  DELETE: 'DELETE'
};

// Domain
export const TRIP = 'trip';

/**
 * Actions
 */
const AXIOS_GET_TRIP_API = `${TRIP}/AXIOS_GET_TRIP_API`;
const AXIOS_GET_TRIP_API_SUCCESS = `${TRIP}/AXIOS_GET_TRIP_API_SUCCESS`;
const AXIOS_GET_TRIP_API_FAIL = `${TRIP}/AXIOS_GET_TRIP_API_FAIL`;

const RESET_CURRENT_TRIP_INTO = 'RESET_CURRENT_TRIP_INTO';
const SET_CURRENT_TRIP_INFO = 'SET_CURRENT_TRIP_INFO';

/**
 * Reducer
 */
const tripReducer = {
  [AXIOS_GET_TRIP_API_SUCCESS]: (state, action) => {
    // Success일때 데이터 모델링
    const { payload } = action;
    const currentTripInfo = new Trip();

    currentTripInfo.setData(payload);

    return {
      ...state,
      isLoaded: true,
      isFailed: false,
      currentTripInfo,
    };
  },
  [AXIOS_GET_TRIP_API_FAIL]: state => ({
    ...state,
    isLoaded: true,
    isFailed: true,
    currentTripInfo: [],
  }),
  [SET_CURRENT_TRIP_INFO]: (state, action) => {
    const { payload } = action;
    let { currentTripInfo } = state;

    currentTripInfo = { ...currentTripInfo, ...payload };

    return {
      ...state,
      currentTripInfo
    };
  },
  [RESET_CURRENT_TRIP_INTO]: state => ({
    ...state,
    currentTripInfo: {
      ...new Trip(),
      status: STATUS.DELETE
    }
  })
};

export const tripActions = {
  axiosGetTripApiSuccess: createAction(AXIOS_GET_TRIP_API_SUCCESS),
  axiosGetTripApiFail: createAction(AXIOS_GET_TRIP_API_FAIL),
  axiosGetTripApi: createAction(AXIOS_GET_TRIP_API, data => ({
    api: getTripApi(data),
    onSuccess: tripActions.axiosGetTripApiSuccess,
    onFail: tripActions.axiosGetTripApiFail,
  })),
  setCurrentTripInfo: createAction(SET_CURRENT_TRIP_INFO),
  resetCurrentTripInfo: createAction(RESET_CURRENT_TRIP_INTO)
};

export const trip = handleActions(tripReducer, tripState);
