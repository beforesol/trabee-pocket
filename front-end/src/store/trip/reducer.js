import {
  SET_CURRENT_TRIP_INFO
} from './action';

import Trip from '../../model/trip';

export const initialState = {

};

export default function tripReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_TRIP_INFO: {
    const { data } = action;
    let { currentTripInfo } = state;

    if (currentTripInfo && (currentTripInfo.id === data.id)) {
      Object.assign(currentTripInfo, data);
    } else {
      currentTripInfo = new Trip(data);
    }

    return {
      ...state,
      currentTripInfo
    };
  }

  default: {
    return state;
  }
  }
}
