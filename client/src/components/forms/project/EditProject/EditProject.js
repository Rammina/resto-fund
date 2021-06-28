import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../redux/actions/errorActions";
import { editProject } from "../../../../redux/actions/projectsActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";
import ReduxTextarea from "../../../../redux/FormComponents/ReduxTextarea/ReduxTextarea";

// import { actionShowLoader } from "../../../../redux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";

const EditProject = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const onModalCloseHandler = () => {
    if (props.onModalClose) props.onModalClose();
  };
  // submit handler
  const onSubmit = async (formValues) => {
    const editProjectSuccessCb = () => {
      onModalCloseHandler();
    };
    console.log(formValues);
    formValues.projectId = props.project.id;
    // run an action
    // props.actionShowLoader("editProjectModalForm", true);
    await props.editProject(formValues, editProjectSuccessCb);
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
        componentClass="edit-project"
        headingText="Edit Project"
        onModalClose={onModalCloseHandler}
      >
        <form id="edit-project-form" autoComplete="off">
          <div className="edit-project form__form-content modal-form-content">
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
                  id: "edit-project-name-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Project Name *",
                  id: "edit-project-name-label",
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
                  id: "edit-project-description-field",
                },
                labelProps: {
                  className: "form__label",
                  text: "Description ",
                  id: "edit-project-description-label",
                },
              }}
            />
            <div className="form-button-container">
              <button
                id="edit-project-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={props.handleSubmit(onSubmit)}
              >
                Edit Project
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
  console.log(formValues);
  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input a project name.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  // showLoader: state.loader.showEditProjectFormLoader,
});

const editProjectModalComponent = connect(mapStateToProps, {
  // actionShowLoader,
  editProject,
})(EditProject);

export default reduxForm({
  form: "editProjectModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(editProjectModalComponent);
