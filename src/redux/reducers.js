import { combineReducers } from 'redux';
import filesReducer from '../logic/reducer';

export default function createReducer() {
  return combineReducers({
    files: filesReducer,
  });
}
