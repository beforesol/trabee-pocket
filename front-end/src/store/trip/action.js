export const SET_CURRENT_TRIP_INFO = 'SET_CURRENT_TRIP_INFO';

export function setCurrentTripInfo(data) {
  return {
    type: SET_CURRENT_TRIP_INFO,
    data
  };
}
