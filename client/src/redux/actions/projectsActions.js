import axios from "axios";
import serverRest from "../../api/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
// import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";

import {
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  GET_ALL_USER_PROJECTS_SUCCESS,
  GET_ALL_USER_PROJECTS_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  CANCEL_PROJECT_SUCCESS,
  CANCEL_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_FAIL,
  /*
  note: will likely be relevant in the future (tella)
  please do not remove

  DONATE_TO_PROJECT_SUCCESS,
  DONATE_TO_PROJECT_FAIL,
  UPDATE_PROJECT_NAME_SUCCESS,
  UPDATE_PROJECT_NAME_FAIL,
  
  EDIT_PROJECT_ICON_SUCCESS,
  EDIT_PROJECT_ICON_FAIL,
  */
} from "./types";
//this is clearly a function
export const getProject = (projectId) => (dispatch /* getState*/) => {
  console.log("getting a project");
  serverRest
    .get(`/projects/${projectId}`)
    .then((res) => {
      let project = res.data;
      console.log(project);
      dispatch({
        type: GET_PROJECT_SUCCESS,
        payload: project,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_PROJECT_FAIL,
      });
    });
};

export const getAllProjects = () => (dispatch /*, getState*/) => {
  console.log("getting the list of all projects");
  serverRest
    .get(`/projects`)
    .then((res) => {
      let projects = res.data;
      let sortedData = null;
      console.log(projects);
      // note: think about how projects should be sorted (tella)
      /*
      // first check if it contains projects
      if (typeof projects !== "undefined" && projects.length > 0) {
        // the array is defined and has at least one element
        let data = null;
        sortedData = projects.sort(compareValues("name"));
        console.log(sortedData);
      }
      */
      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: /*sortedData ||*/ projects,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_ALL_PROJECTS_FAIL,
      });
    });
};

export const getAllUserProjects = (id) => (dispatch, getState) => {
  console.log("getting the list of all projects");
  // retrieve the user ID
  const userId = id || getState().user.info._id || getState().user.info.id;
  // send a POST request to the server
  serverRest
    .get(`/users/${userId}/userProjects/`)
    .then((res) => {
      let projects = res.data;
      console.log(projects);
      // change Redux store state, and pass the updated user and project payload
      dispatch({
        type: GET_ALL_USER_PROJECTS_SUCCESS,
        payload: projects,
      });
      dispatch(clearErrors());
    })
    // if fail, show the error on a notification
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_ALL_USER_PROJECTS_FAIL,
      });
    });
};

export const createProject =
  (formValues, successCb) => (dispatch, getState) => {
    // retrieve the ID of the active user from the redux store
    const creatorId = getState().user.info._id || getState().user.info.id;
    console.log(formValues); /*just to check if data is being correctly sent*/
    // send a POST request to the server
    serverRest
      .post(`/projects/`, { ...formValues, creatorId })
      .then((res) => {
        const project = res.data;
        // change Redux store state, and pass the updated user and project payload
        dispatch({
          type: CREATE_PROJECT_SUCCESS,
          payload: project,
        });
        dispatch(clearErrors());
        if (successCb) successCb();
        // redirect to the created project page after successful creation
        history.push(`/projects/${project.id}`);
      })
      // if fail, show the error on a notification
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: CREATE_PROJECT_FAIL,
        });
      });
    // .finally(() => {
    //   dispatch(actionShowLoader("createProjectModalForm", false));
    // });
  };

export const editProject = (formValues, successCb) => (dispatch, getState) => {
  // retrieve the ID of the active user from the redux store
  const creatorId = getState().user.info._id || getState().user.info.id;
  console.log(formValues); /*just to check if data is being correctly sent*/
  // send a POST request to the server
  serverRest
    .patch(`/projects/${formValues.projectId}/edit_project`, {
      ...formValues,
      creatorId,
    })
    .then((res) => {
      const project = res.data;
      // change Redux store state, and pass the updated user and project payload
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: project,
      });
      dispatch(clearErrors());
      if (successCb) successCb();
      // redirect to the edited project page after successful creation
      history.push(`/projects/${project.id}`);
    })
    // if fail, show the error on a notification
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EDIT_PROJECT_FAIL,
      });
    });
  // .finally(() => {
  //   dispatch(actionShowLoader("editProjectModalForm", false));
  // });
};

export const cancelProject = (projectId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(projectId);

  serverRest
    .patch(`/projects/${projectId}/cancel`, { projectId, userId })
    .then((res) => {
      dispatch({
        type: CANCEL_PROJECT_SUCCESS,
        payload: res.data /* project object will be returned from the backend*/,
      });
      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CANCEL_PROJECT_FAIL,
      });
    })
    .finally(() => {});
};

export const deleteProject = (projectId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(projectId);

  axios /*please replace the URL here for production environment*/
    .delete(`http://localhost:5000/projects/${projectId}`, {
      data: { projectId, userId },
    })
    .then((res) => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
      });
      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: DELETE_PROJECT_FAIL,
      });
    });
  // .finally(() => {
  //   dispatch(actionShowLoader("deleteProjectForm", false));
  // });
};

/* note: probably will be used for the future (tella)
PLEASE DO NOT REMOVE

export const updateProjectName =
  (formValues, successCb) => (dispatch, getState) => {
    const userId = getState().user.info._id || getState().user.info.id;

    // note:might want to change this to projectId in the future
    serverRest
      .patch(`/projects/${formValues.projectId}/update_name`, {
        ...formValues,
        userId,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_PROJECT_NAME_SUCCESS,
          payload: {
            ...res.data,
          },
        });
        dispatch(clearErrors());
        if (successCb) successCb();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: UPDATE_PROJECT_NAME_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("updateProjectNameModalForm", false));
      });
  };

export const editProject = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;

  serverRest
    .patch(`/projects/${formValues.projectId}/edit_project`, {
      ...formValues,
      userId,
    })
    .then((res) => {
      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: {
          ...res.data,
        },
      });

      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: EDIT_PROJECT_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("editProjectModalForm", false));
    });
};

export const editProjectIcon = (base64EncodedImage, projectId) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    try {
      await cloudinaryRest
        .patch(
          `/projects/${projectId}/upload_icon`,
          JSON.stringify({ data: base64EncodedImage, userId })
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: EDIT_PROJECT_ICON_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_PROJECT_ICON_FAIL"
        )
      );
      dispatch({ type: EDIT_PROJECT_ICON_FAIL });
    } finally {
      dispatch(actionShowLoader("uploadProjectIconForm", false));
    }
  };
};

*/
