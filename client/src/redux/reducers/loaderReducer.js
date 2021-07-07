import { ACTION_SHOW_LOADER } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SHOW_LOADER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
