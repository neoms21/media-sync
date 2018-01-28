import { combineReducers } from 'redux';
import filesReducer from '../logic/files-reducer';

export default function createReducer() {
  return combineReducers({
    files: filesReducer,
  });
}
