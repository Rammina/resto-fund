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

const EditAccount = (props) => {
  const onModalCloseHandler = () => {
    if (props.onModalClose) props.onModalClose();
  };
  // submit handler
  const onSubmit = async (formValues) => {
    const editAccountSuccessCb = () => {
      onModalCloseHandler();
    };
    console.log(formValues);
    // run an action
    // props.actionShowLoader("editAccountModalForm", true);
    await props.editAccount(formValues, editAccountSuccessCb);
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
        componentClass="edit-account"
        headingText="Create a Project"
        onModalClose={onModalCloseHandler}
      >
        <form id="edit-account-form" autoComplete="off">
          <div className="edit-account form__form-content modal-form-content">
            {renderErrorNotifications()}

            <Field
              name="username"
              component={ReduxInput}
              type="text"
              props={{
                formName: "project",
                inputProps: {
                  placeholder: "Username",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "edit-account-name-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Username *",
                  id: "edit-account-name-label",
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
                  placeholder: "Password",
                  className: "form__input",
                  maxLength: "60",
                  autoComplete: "off",
                  id: "edit-account-name-field",
                  type: "password",
                  autoFocus: true,
                },
                labelProps: {
                  className: "form__label",
                  text: "Password *",
                  id: "edit-account-name-label",
                },
              }}
            />

            <div className="form-button-container">
              <button
                id="edit-account-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={props.handleSubmit(onSubmit)}
              >
                Edit Account
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
  if (!formValues.password) {
    errors.password = "Please input a project password.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  // showLoader: state.loader.showEditAccountFormLoader,
});

const editAccountModalComponent = connect(mapStateToProps, {
  // actionShowLoader,
  editAccount,
})(EditAccount);

export default reduxForm({
  form: "editAccountModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(editAccountModalComponent);
