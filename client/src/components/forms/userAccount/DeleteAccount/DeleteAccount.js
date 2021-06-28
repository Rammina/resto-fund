import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

// import { actionShowLoader } from "../../../redux/actions/loaderActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";

// import LoadingSpinner from "../../loaders/LoadingSpinner";

const DeleteAccount = (props) => {
  const onCloseHandler = () => {
    if (props.onClose) props.onClose();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const onSuccessCb = () => {
      if (props.onSuccessCb) props.onSuccessCb();
    };
    // props.actionShowLoader("deleteAccountForm", true);
    props.deleteAccount(props.account.id, onSuccessCb);
  };

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };
  /*
  const renderLoader = () => {
    return <LoadingSpinner className="white" showLoader={props.showLoader} />;
  };
*/
  const content = (
    <React.Fragment>
      <Modal
        componentClass="delete-account"
        headingText="Delete Account"
        autoFocusOnCancel={true}
        onModalClose={onCloseHandler}
      >
        <form
          id="delete-account-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="delete-account modal-form-content">
            <p className="modal__modal-p delete-account">
              Are you sure you want to delete this account?
            </p>
            <p className="modal__modal-p delete-account enlarged-text centered">
              {props.user.username}
            </p>
            <p
              id="delete-account-description-paragraph"
              className="modal__modal-p small-text danger"
            >
              Warning: Deleted accounts cannot be restored.
            </p>

            {renderErrorNotifications()}

            <button
              id="delete-account-submit"
              className={"form-button submit mt-20 danger"}
              type="submit"
              onClick={onSubmitHandler}
            >
              {/* renderLoader() */} Delete Account
            </button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  // showLoader: state.loader.showDeleteAccountFormLoader,
});

export default connect(mapStateToProps, {
  deleteAccount,
  // actionShowLoader,
})(DeleteAccount);
