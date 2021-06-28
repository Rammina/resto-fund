import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../../../redux/actions/authActions";
// import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass, validateEmail } from "../../../../helpers";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";
import ReduxTextarea from "../../../../redux/FormComponents/ReduxTextarea/ReduxTextarea";
import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
// import LoadingSpinner from "../../loaders/LoadingSpinner";

const LoginForm = (props) => {
  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  // const renderLoader = () => <LoadingSpinner showLoader={props.showLoader} />;

  // submit handler
  const onSubmit = async (formValues) => {
    // props.actionShowLoader("loginForm", true);
    await props.loginUser(formValues);
  };

  return (
    <form className="auth__form" autoComplete="off">
      {renderErrorNotifications()}
      <Field
        name="email"
        component={ReduxInput}
        type="text"
        props={{
          inputProps: {
            placeholder: "Email",
            className: "form__input",
            maxLength: "64",
            autoComplete: "off",
            id: "login-form-email-field",
            autoFocus: true,
          },
          labelProps: {
            className: "form__label",
            text: "Email",
            id: "login-form-email-label",
          },
        }}
      />
      <Field
        name="password"
        component={ReduxInput}
        type="password"
        props={{
          inputProps: {
            placeholder: "Password",
            className: "form__input",
            maxLength: "30",
            autoComplete: "off",
            type: "password",
            id: "login-form-password-field",
          },
          labelProps: {
            className: "form__label",
            text: "Password",
            id: "login-form-password-label",
          },
        }}
      />
      <div className="form-button-container">
        <button
          className="form-button submit"
          type="submit"
          onClick={props.handleSubmit(onSubmit)}
        >
          {/*renderLoader()*/}Sign In
        </button>
      </div>
    </form>
  );
};

const validate = (formValues) => {
  console.log(formValues);
  const errors = {};
  if (!formValues.email) {
    errors.email = "Please input an email.";
  } else if (!validateEmail(formValues.email)) {
    errors.email = "Invalid email address.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
  // showLoader: state.loader.showLoginFormLoader,
});

const loginForm = connect(mapStateToProps, {
  loginUser,
  // actionShowLoader
})(LoginForm);

export default reduxForm({
  form: "loginForm",
  destroyOnUnmount: false,
  validate,
})(loginForm);
