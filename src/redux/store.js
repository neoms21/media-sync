import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import createReducer from './reducers';
import {rootEpic} from "../epics/root-epics";

const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const epicMiddleware = createEpicMiddleware(rootEpic);

const configureStore = (initialState = {}) => {
    return createStore(
        createReducer(),
        initialState,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );
};

export default configureStore;
