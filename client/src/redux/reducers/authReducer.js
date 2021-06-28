// Reducer related to authentication status
import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isSignedIn: false,
  userId: null,
  // the app will tried to load the user at first anyway, so may as well set it to true
  isLoading: true,
};

let sanitizedAuthPayload = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isSignedIn: true,
        userId: action.payload.user.id,
        isLoading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      sanitizedAuthPayload = {
        isSignedIn: true,
        isLoading: false,
        userId: action.payload.user.id,
      };
      return {
        ...state,
        ...sanitizedAuthPayload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      sanitizedAuthPayload = {
        userId: action.payload.user.id,
        isSignedIn: true,
        isLoading: false,
      };
      console.log(sanitizedAuthPayload);
      return {
        ...state,
        ...sanitizedAuthPayload,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case GOOGLE_SIGN_OUT:
    case GOOGLE_SIGN_IN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isSignedIn: false,
        userId: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
