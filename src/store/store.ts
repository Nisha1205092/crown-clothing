import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import { loggerMiddleware } from "./middleware/logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;
// we only want to use logger in development mode
// as we don't want console.log()s in production mode
// .filter will remove any false value from the final array
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

// use loggerMiddleware in development mode. Or return empty array
const middlewares = [process.env.NODE_ENV === 'development'
    && logger,
    sagaMiddleware
].filter(Boolean);

// to enable Redux Devtool chrome extension 
const composeEnhancer = (
    process.env.NODE_ENV === 'development'
    && window
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
