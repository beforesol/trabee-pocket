import { createAction, handleActions } from 'redux-actions';
/**
 * onSuccess Api
 */
import { getHomeApi } from '@api/index.ts';
import Trip, { ITripInfo } from '@model/trip';

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
  [AXIOS_GET_ALL_TRIP_API_SUCCESS]: (state: any, action: any) => {
    // Success일때 데이터 모델링
    const { payload } = action;
    const tripList = payload.map((item: ITripInfo) => new Trip().setData(item));

    return {
      ...state,
      isLoaded: true,
      isFailed: false,
      tripList,
    };
  },
  [AXIOS_GET_ALL_TRIP_API_FAIL]: (state: any) => ({
    ...state,
    isLoaded: true,
    isFailed: true,
    tripList: [],
  }),
  [RESET_HOME_TRIP_INFO]: (state: any) => ({
    ...state,
    isLoaded: false,
    tripList: [],
  }),
};

export const homeActions: any = {
  axiosGetAllTripApiSuccess: createAction(AXIOS_GET_ALL_TRIP_API_SUCCESS),
  axiosGetAllTripApiFail: createAction(AXIOS_GET_ALL_TRIP_API_FAIL),
  axiosGetAllTripApi: createAction(AXIOS_GET_ALL_TRIP_API, (data: any) => ({
    api: getHomeApi(data),
    onSuccess: homeActions.axiosGetAllTripApiSuccess,
    onFail: homeActions.axiosGetAllTripApiFail,
  })),
  resetHomeTripInfo: createAction(RESET_HOME_TRIP_INFO)
};

export const home = handleActions(homeReducer, homeState);
