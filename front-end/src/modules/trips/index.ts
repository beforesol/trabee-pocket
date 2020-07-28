import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */
import { getCurrentTripApi } from '@api/index';
import Trip from '@model/trip';

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
const AXIOS_GET_CURRENT_TRIP_API = `${TRIP}/AXIOS_GET_CURRENT_TRIP_API`;
const AXIOS_GET_CURRENT_TRIP_API_SUCCESS = `${TRIP}/AXIOS_GET_CURRENT_TRIP_API_SUCCESS`;
const AXIOS_GET_CURRENT_TRIP_API_FAIL = `${TRIP}/AXIOS_GET_CURRENT_TRIP_API_FAIL`;

const RESET_CURRENT_TRIP_INTO = `${TRIP}/RESET_CURRENT_TRIP_INTO`;
const SET_CURRENT_TRIP_INFO = `${TRIP}/SET_CURRENT_TRIP_INFO`;

/**
 * Reducer
 */
const tripReducer = {
  [AXIOS_GET_CURRENT_TRIP_API_SUCCESS]: (state: any, action: any) => {
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
  [AXIOS_GET_CURRENT_TRIP_API_FAIL]: (state: any) => ({
    ...state,
    isLoaded: true,
    isFailed: true,
    currentTripInfo: [],
  }),
  [SET_CURRENT_TRIP_INFO]: (state: any, action: any) => {
    const { payload } = action;
    const tripInfo = { ...state.currentTripInfo, ...payload };

    return {
      ...state,
      currentTripInfo: tripInfo
    };
  },
  [RESET_CURRENT_TRIP_INTO]: (state: any) => ({
    ...state,
    isLoaded: false,
    currentTripInfo: {
      ...new Trip(),
      status: STATUS.DELETE
    }
  }),
};

export const tripActions: any = {
  axiosGetCurrentTripApiSuccess: createAction(AXIOS_GET_CURRENT_TRIP_API_SUCCESS),
  axiosGetCurrentTripApiFail: createAction(AXIOS_GET_CURRENT_TRIP_API_FAIL),
  axiosGetCurrentTripApi: createAction(AXIOS_GET_CURRENT_TRIP_API, (data: any) => ({
    api: getCurrentTripApi(data),
    onSuccess: tripActions.axiosGetCurrentTripApiSuccess,
    onFail: tripActions.axiosGetCurrentTripApiFail,
  })),
  setCurrentTripInfo: createAction(SET_CURRENT_TRIP_INFO),
  resetCurrentTripInfo: createAction(RESET_CURRENT_TRIP_INTO)
};

export const trip = handleActions(tripReducer, tripState);
