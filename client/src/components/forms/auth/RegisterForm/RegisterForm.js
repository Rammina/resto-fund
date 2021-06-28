import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../../../redux/actions/authActions";
// import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass, validateEmail } from "../../../../helpers";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";
import ReduxTextarea from "../../../../redux/FormComponents/ReduxTextarea/ReduxTextarea";
import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
// import LoadingSpinner from "../../loaders/LoadingSpinner";

const RegisterForm = (props) => {
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
    // props.actionShowLoader("registerForm", true);
    await props.registerUser(formValues);
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
            id: "register-form-email-field",
            autoFocus: true,
          },
          labelProps: {
            className: "form__label",
            text: "Email",
            id: "register-form-email-label",
          },
        }}
      />
      <Field
        name="username"
        component={ReduxInput}
        type="text"
        props={{
          inputProps: {
            placeholder: "Username",
            className: "form__input",
            maxLength: "30",
            autoComplete: "off",
            id: "register-form-username-field",
          },
          labelProps: {
            className: "form__label",
            text: "Username",
            id: "register-form-username-label",
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
            id: "register-form-password-field",
          },
          labelProps: {
            className: "form__label",
            text: "Password",
            id: "register-form-password-label",
          },
        }}
      />
      <div className="form-button-container">
        <button
          className="form-button submit"
          type="submit"
          onClick={props.handleSubmit(onSubmit)}
        >
          {/*renderLoader()*/}Sign Up
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
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  } else if (formValues.password.length < 6) {
    errors.password = "Password needs to be at least 6 characters.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
  // showLoader: state.loader.showRegisterFormLoader,
});

const registerForm = connect(mapStateToProps, {
  registerUser,
  // actionShowLoader
})(RegisterForm);

export default reduxForm({
  form: "registerForm",
  destroyOnUnmount: false,
  validate,
})(registerForm);
