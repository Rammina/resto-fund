// this just contains a list of all projects (not specific to one account only)
import {
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_OUT,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  EDIT_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  CLEAR_PROJECT_LIST,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_SIGN_IN_FAIL:
    case GOOGLE_SIGN_OUT:
    case CLEAR_PROJECT_LIST:
      //note: either empty the list or reset it to 9 or the amount for a one page (tella)
      return [];
    case GET_ALL_PROJECTS_SUCCESS:
      return action.payload;
    case EDIT_PROJECT_SUCCESS:
      return state.map((project) => {
        if (project.id == action.payload._id) {
          project = action.payload;
        }
        return project;
      });
    case DELETE_PROJECT_SUCCESS:
      return state.filter((project) => project.id != action.payload.projectId);

    case GET_ALL_PROJECTS_FAIL:
    default:
      return state;
  }
};
