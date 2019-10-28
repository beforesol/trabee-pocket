export const SET_CURRENT_TRIP_INFO = 'SET_CURRENT_TRIP_INFO';
export const RESET_CURRENT_TRIP_INTO = 'RESET_CURRENT_TRIP_INTO';

export function setCurrentTripInfo(data) {
  return {
    type: SET_CURRENT_TRIP_INFO,
    data
  };
}

export function resetCurrentTripInfo() {
  return {
    type: RESET_CURRENT_TRIP_INTO
  };
}
