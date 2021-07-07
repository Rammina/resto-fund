import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import allProjectsReducer from "./allProjectsReducer";
import userProjectsReducer from "./userProjectsReducer";
import selectedProjectReducer from "./selectedProjectReducer";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  allProjects: allProjectsReducer,
  userProjects: userProjectsReducer,
  selectedProject: selectedProjectReducer,
  error: errorReducer,
  loader: loaderReducer,
});
