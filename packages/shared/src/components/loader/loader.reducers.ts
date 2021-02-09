import { createReducer } from "@tsed/redux-utils";
import { hideLoader, showLoader } from "./loader.actions";

export interface LoaderState {
  isActive: boolean;
}

const createInitialState = (options = {}) => ({
  isActive: false,
  ...options
});

export const loaderReducer = createReducer<LoaderState>(
  {
    [hideLoader.toString()](state) {
      return {
        ...state,
        isActive: false
      };
    },
    [showLoader.toString()](state) {
      return {
        ...state,
        isActive: true
      };
    }
  },
  createInitialState
);
