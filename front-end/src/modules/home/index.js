import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */
import { getHomeApi } from '../../api';
import Trip from '../../model/trip';

// initial State
const homeState = {
  isLoaded: false,
  isFailed: false,
  tripList: []
};

// Domain
export const HOME = 'home';

/**
 * Actions
 */

const AXIOS_GET_ALL_TRIP_API = `${HOME}/AXIOS_GET_ALL_TRIP_API`;
const AXIOS_GET_ALL_TRIP_API_SUCCESS = `${HOME}/AXIOS_GET_ALL_TRIP_API_SUCCESS`;
const AXIOS_GET_ALL_TRIP_API_FAIL = `${HOME}/AXIOS_GET_ALL_TRIP_API_FAIL`;

const RESET_HOME_TRIP_INFO = `${HOME}/RESET_HOME_TRIP_INFO`;

/**
 * Reducer
 */
const homeReducer = {
  [AXIOS_GET_ALL_TRIP_API_SUCCESS]: (state, action) => {
    // Success일때 데이터 모델링
    const { payload } = action;
    const tripList = payload.map(item => new Trip().setData(item));

    return {
      ...state,
      isLoaded: true,
      isFailed: false,
      tripList,
    };
  },
  [AXIOS_GET_ALL_TRIP_API_FAIL]: state => ({
    ...state,
    isLoaded: true,
    isFailed: true,
    tripList: [],
  }),
  [RESET_HOME_TRIP_INFO]: state => ({
    ...state,
    isLoaded: false,
    tripList: [],
  }),
};

export const homeActions = {
  axiosGetAllTripApiSuccess: createAction(AXIOS_GET_ALL_TRIP_API_SUCCESS),
  axiosGetAllTripApiFail: createAction(AXIOS_GET_ALL_TRIP_API_FAIL),
  axiosGetAllTripApi: createAction(AXIOS_GET_ALL_TRIP_API, data => ({
    api: getHomeApi(data),
    onSuccess: homeActions.axiosGetAllTripApiSuccess,
    onFail: homeActions.axiosGetAllTripApiFail,
  })),
  resetHomeTripInfo: createAction(RESET_HOME_TRIP_INFO)
};

export const home = handleActions(homeReducer, homeState);
