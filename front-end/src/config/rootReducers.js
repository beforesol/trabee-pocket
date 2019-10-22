import {
  combineReducers,
} from 'redux';
import search from '../store/search/reducer';

// reducer setting.
export default function createReducer(asyncReducer) {
  return combineReducers({
    search,
  });
}
