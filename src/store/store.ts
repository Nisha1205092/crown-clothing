import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import { loggerMiddleware } from "./middleware/logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from 'redux-persist/lib/storage';
// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[] // or (keyof typeof rootReducer)[]
}
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

// use loggerMiddleware in development mode. Or return empty array

// ``Boolean(middleware)`` would still filter out elements 
// from the middlewares array 
// that are falsy (i.e., null, undefined, false, 0, NaN, or an empty string) 
// and only include truthy elements, 
// creates an intermediate filtered array

// The type assertion part ``:middleware is Middleware``
// ensures that only elements of type Middleware are included
// in the final filtered array.
const middlewares = [process.env.NODE_ENV === 'development'
    && logger,
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

// we use declare global to inform TypeScript 
// that we are adding a property __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
// to the global window object. 
// This is done because the window object is a global object in JavaScript 
// that represents the window of the web browser, 
// and it may have properties or methods that are not included in TypeScript's built-in typings.
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// to enable Redux Devtool chrome extension 
//the code is checking for the availability of window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
// and using it as a Redux store enhancer if it is available 
// and the environment is set to 'development', 
// otherwise falling back to the standard `compose` function provided by the Redux library.

// The compose function from the Redux library 
// is a utility function that is used 
// to compose multiple `store enhancers` into a single function. 
// `Store enhancers` are higher-order functions 
// that wrap the Redux store to add extra functionality, 
// such as middleware or additional capabilities, to the store.

// The compose function takes 
// one or more store enhancer functions 
// as arguments and 
// returns a new function 
// that can be used to enhance a `Redux store`.
const composeEnhancer = (
    process.env.NODE_ENV === 'development'
    && window
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
