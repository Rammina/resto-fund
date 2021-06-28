import { FETCH_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  console.log(msg);
  return {
    type: FETCH_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// note: make a clear errors version that is selective
