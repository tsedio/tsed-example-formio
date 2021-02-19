import { loaderReducer } from "@project/shared";
import { defaultFormioReducer } from "@tsed/react-formio";
import { combine } from "@tsed/redux-utils";
import { connectRouter } from "connected-react-router";
import { reducer as toastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";

export const rootReducers = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    ...defaultFormioReducer,
    ...combine(loaderReducer("loader", { isActive: false }))
  });
