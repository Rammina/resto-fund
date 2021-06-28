// this just contains a list of all projects (not specific to one account only)
import {
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  UPLOAD_PROJECT_IMAGE_SUCCESS,
  UPLOAD_PROJECT_IMAGE_FAIL,
  CLOSE_PROJECT,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_SUCCESS:
    case EDIT_PROJECT_SUCCESS:
    case UPLOAD_PROJECT_IMAGE_SUCCESS:
      console.log(action.payload);
      return action.payload;
    // when you close a project page, it should reset back to {}
    case CLOSE_PROJECT:
      return {};
    case GET_PROJECT_FAIL:
    case EDIT_PROJECT_FAIL:
    case UPLOAD_PROJECT_IMAGE_FAIL:
    default:
      return state;
  }
};
