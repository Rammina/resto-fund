import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../../../redux/actions/errorActions";
import serverRest from "../../../../api/serverRest";
import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";
// import { actionShowLoader } from "../../../../redux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IxJ2SIxV9qIAWAE0331WoGbLUtUd2dCTAM8mgZu4mhSs7euesdremY1D7olfsoqPx4gK1P7ChbIiRIXnxRRcrY300elzL1hA6"
);

const DonateForm = (props) => {
  // redux store variables
  const user = useSelector((state) => state.user.info);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  // submit handler
  const onSubmit = async (formValues) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await serverRest.post(
      `/projects/${props.project.id}/create-checkout-session`,
      {
        amount: formValues.amount,
        projectId: props.project.id,
        projectCreatorId: props.project.creator.id,
        userId: user ? user.id : null,
      }
    );
    const session = await response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    // note: still need to figure out what this does
    if (result.id && !result.error) {
      // handle success
      console.log("completed");
    }
    // handle error
    else if (result.error) {
      console.log("failure");
    }
  };

  const renderErrorNotifications = () => {
    const errorMessage = error.msg;
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

  const checkoutOnClickHandler = async (event) => {};

  const renderContent = () => {
    return (
      <form className="donate-form">
        {renderErrorNotifications()}
        <Field
          name="amount"
          component={ReduxInput}
          type="number"
          props={{
            formName: "project",
            inputProps: {
              placeholder: "Donation Amount (in USD)",
              className: "form__input",
              min: "1",
              autoComplete: "off",
              id: "donate-form-amount-field",
              type: "number",
              autoFocus: true,
            },
            labelProps: {
              className: "form__label",
              text: "Donation Amount (in USD) *",
              id: "donate-form-amount-label",
            },
          }}
        />

        <div className="form-button-container">
          <button
            className="form-button submit"
            role="link"
            onClick={props.handleSubmit(onSubmit)}
          >
            Checkout
          </button>
        </div>
      </form>
    );
  };

  return renderContent();
};

const validate = ({ amount }) => {
  const errors = {};
  if (!amount) {
    errors.amount = "Please input an amount to be donated.";
  }
  if (Number(amount) < 1) {
    errors.amount = "Donation amount cannot be lower than $1.";
  }
  return errors;
};

export default reduxForm({
  form: "donateFormModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(DonateForm);
