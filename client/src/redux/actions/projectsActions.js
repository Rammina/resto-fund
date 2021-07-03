import axios from "axios";
import serverRest from "../../api/serverRest";
import cloudinaryRest from "../../api/cloudinaryRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
// import { actionShowLoader } from "./loaderActions";

import { renderNotification } from "../../helpers";

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
  UPLOAD_PROJECT_IMAGE_SUCCESS,
  UPLOAD_PROJECT_IMAGE_FAIL,
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

export const getAllProjects = (limit) => (dispatch /*, getState*/) => {
  console.log("getting the list of all projects");
  serverRest
    .get(`/projects?limit=${limit || 0}`)
    .then((res) => {
      let projects = res.data;
      console.log(projects);
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
      renderNotification({
        message: "Successfully updated the project.",
        type: "success",
      });
      // getProject()
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
    .delete(`https://resto-fund.herokuapp.com/projects/${projectId}`, {
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
      renderNotification({
        message: "Successfully deleted the project.",
        type: "dark",
      });
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

export const uploadProjectImage = (base64EncodedImage, projectId) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    try {
      await cloudinaryRest
        .patch(
          `/projects/${projectId}/upload_image`,
          JSON.stringify({ data: base64EncodedImage, userId })
        )
        .then((res) => {
          const project = res.data;
          dispatch({ type: UPLOAD_PROJECT_IMAGE_SUCCESS, payload: project });
          renderNotification({
            message: "Successfully uploaded project image.",
            type: "success",
          });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          UPLOAD_PROJECT_IMAGE_FAIL
        )
      );
      dispatch({ type: UPLOAD_PROJECT_IMAGE_FAIL });
    } finally {
      // dispatch(actionShowLoader("uploadProjectIconForm", false));
    }
  };
};
