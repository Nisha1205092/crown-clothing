import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { loggerMiddleware } from "./middleware/logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// we only want to use logger in development mode
// as we don't want console.log()s in production mode
// .filter will remove any false value from the final array
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
