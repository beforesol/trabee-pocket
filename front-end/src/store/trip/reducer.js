import {
  SET_CURRENT_TRIP_INFO,
  RESET_CURRENT_TRIP_INTO
} from './action';

import Trip from '../../model/trip';

export const initialState = {
  currentTripInfo: { ...new Trip() }
};

export const STATUS = {
  EDIT: 'EDIT',
  NEW: 'NEW',
  DELETE: 'DELETE'
};

export default function tripReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_TRIP_INFO: {
    const { data } = action;
    const status = data.id ? STATUS.EDIT : STATUS.NEW;
    let { currentTripInfo } = state;

    currentTripInfo = { ...currentTripInfo, ...data, status };

    return {
      ...state,
      currentTripInfo
    };
  }

  case RESET_CURRENT_TRIP_INTO: {
    return {
      ...state,
      currentTripInfo: {
        ...new Trip(),
        status: STATUS.DELETE
      }
    };
  }

  default: {
    return state;
  }
  }
}
