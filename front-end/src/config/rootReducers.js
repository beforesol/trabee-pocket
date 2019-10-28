import {
  combineReducers,
} from 'redux';
import user from '../store/user/reducer';
import trip from '../store/trip/reducer';

// reducer setting.
export default function createReducer(asyncReducer) {
  return combineReducers({
    user,
    trip
  });
}
