import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { twitReducer } from "./Twit/Reducer";

const rootReduceer = combineReducers({

    auth:authReducer,
    twit:twitReducer,

});

export const store =legacy_createStore(rootReduceer,applyMiddleware(thunk));