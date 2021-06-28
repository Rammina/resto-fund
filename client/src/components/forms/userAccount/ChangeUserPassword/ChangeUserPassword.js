import React from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";
import ReduxTextarea from "../../../../redux/FormComponents/ReduxTextarea/ReduxTextarea";

// import { actionShowLoader } from "../../../../redux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";

const ChangeUserPassword = (props) => {
  const onModalCloseHandler = () => {
    if (props.onModalClose) props.onModalClose();
  };
  // submit handler
  const onSubmit = async (formValues) => {
    const changeUserPasswordSuccessCb = () => {
      onModalCloseHandler();
    };
    console.log(formValues);
    // run an action
    // props.actionShowLoader("changeUserPasswordModalForm", true);
    await props.changeUserPassword(formValues, changeUserPasswordSuccessCb);
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
        componentClass="change-user-password"
        headingText="Create a Project"
        onModalClose={onModalCloseHandler}
      >
        <form id="change-user-password-form" autoComplete="off">
          <div className="change-user-password form__form-content modal-form-content">
            {renderErrorNotifications()}
            <Field
              name="name"
              component={ReduxInput}
              type="password"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Current Password",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "change-user-password-name-field",
                  type: "password",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Current Password *",
                  id: "change-user-password-name-label",
                },
              }}
            />
            <Field
              name="name"
              component={ReduxInput}
              type="password"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "New Password",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "change-user-password-name-field",
                  type: "password",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "New Password *",
                  id: "change-user-password-name-label",
                },
              }}
            />
            <Field
              name="name"
              component={ReduxInput}
              type="password"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Confirm New Password",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "change-user-password-name-field",
                  type: "password",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Confirm New Password *",
                  id: "change-user-password-name-label",
                },
              }}
            />

            <div className="form-button-container">
              <button
                id="change-user-password-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={props.handleSubmit(onSubmit)}
              >
                Change User Password
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
  if (!formValues.target_goal) {
    errors.target_goal = "Please input the target goal amount.";
  }
  if (!formValues.deadline) {
    errors.deadline = "Please input the project's deadline.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  // showLoader: state.loader.showChangeUserPasswordFormLoader,
});

const changeUserPasswordModalComponent = connect(mapStateToProps, {
  // actionShowLoader,
  changeUserPassword,
})(ChangeUserPassword);

export default reduxForm({
  form: "changeUserPasswordModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(changeUserPasswordModalComponent);
