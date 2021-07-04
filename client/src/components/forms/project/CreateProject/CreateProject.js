import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../redux/actions/errorActions";
import isAfter from "date-fns/isAfter";

import { createProject } from "../../../../redux/actions/projectsActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";
import ReduxTextarea from "../../../../redux/FormComponents/ReduxTextarea/ReduxTextarea";

// import { actionShowLoader } from "../../../../redux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";

const CreateProject = (props) => {
  //refs
  let inputDateRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const setMinimumDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    inputDateRef.current.setAttribute("max", today);
  };

  useEffect(() => {
    if (!inputDateRef.current) setMinimumDate();
  }, [inputDateRef.current]);

  const onModalCloseHandler = () => {
    if (props.onModalClose) props.onModalClose();
  };
  // submit handler
  const onSubmit = async (formValues) => {
    const createProjectSuccessCb = () => {
      onModalCloseHandler();
    };
    console.log(formValues);
    // run an action
    // props.actionShowLoader("createProjectModalForm", true);
    await props.createProject(formValues, createProjectSuccessCb);
  };

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  // note: can be used later
  // const renderLoader = () => {
  //   return <LoadingSpinner showLoader={props.showLoader} />;
  // };

  const renderContent = () => {
    return (
      <Modal
        componentClass="create-project"
        headingText="Create a Project"
        onModalClose={onModalCloseHandler}
      >
        <form id="create-project-form" autoComplete="off">
          <div className="create-project form__form-content modal-form-content">
            {renderErrorNotifications()}
            <Field
              name="name"
              component={ReduxInput}
              type="text"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Project Name",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "create-project-name-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Project Name *",
                  id: "create-project-name-label",
                },
              }}
            />
            <Field
              name="target_goal"
              component={ReduxInput}
              type="number"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Target Goal (in USD)",
                  className: "form__input",
                  autoComplete: "off",
                  id: "create-project-target_goal-field",
                  type: "number",
                  min: "100",
                },
                labelProps: {
                  className: "form__label",
                  text: "Target Goal (in USD) *",
                  id: "create-project-target_goal-label",
                },
              }}
            />
            <Field
              name="deadline"
              component={ReduxInput}
              type="date"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Deadline",
                  className: "form__input",
                  autoComplete: "off",
                  id: "create-project-deadline-field",
                  type: "date",
                  ref: inputDateRef,
                },
                labelProps: {
                  className: "form__label",
                  text: "Deadline *",
                  id: "create-project-deadline-label",
                },
              }}
            />
            <Field
              name="description"
              component={ReduxTextarea}
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Description",
                  className: "form__input",
                  autoComplete: "off",
                  id: "create-project-description-field",
                },
                labelProps: {
                  className: "form__label",
                  text: "Description ",
                  id: "create-project-description-label",
                },
              }}
            />
            <div className="form-button-container">
              <button
                id="create-project-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={props.handleSubmit(onSubmit)}
              >
                Create Project
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  };

  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("modal")
  );
};

const validate = (formValues) => {
  console.log(formValues.deadline);
  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input a project name.";
  }
  if (!formValues.target_goal) {
    errors.target_goal = "Please input the target goal amount.";
  }
  if (Number(formValues.target_goal) < 100) {
    errors.target_goal = "The minimum target goal amount should be $100.";
  }
  if (!formValues.deadline) {
    errors.deadline = "Please input the project's deadline.";
  }
  if (isAfter(new Date(), new Date(formValues.deadline))) {
    errors.deadline = "Deadline has passed. Choose a valid date.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  // showLoader: state.loader.showCreateProjectFormLoader,
});

const createProjectModalComponent = connect(mapStateToProps, {
  // actionShowLoader,
  createProject,
})(CreateProject);

export default reduxForm({
  form: "createProjectModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(createProjectModalComponent);
