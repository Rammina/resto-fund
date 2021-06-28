import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { cancelProject } from "../../../../redux/actions/projectsActions";
// import { actionShowLoader } from "../../../redux/actions/loaderActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";

// import LoadingSpinner from "../../loaders/LoadingSpinner";

const CancelProject = (props) => {
  const onCloseHandler = () => {
    console.log("closing cancel-project modal");
    props.onClose();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // props.actionShowLoader("cancelProjectForm", true);
    props.cancelProject("60a8db0e87442224787e6005");
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
        componentClass="cancel-project"
        headingText="Cancel Project"
        autoFocusOnCancel={true}
        onModalClose={onCloseHandler}
      >
        <form
          id="cancel-project-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="cancel-project modal-form-content">
            <p className="modal__modal-p cancel-project">
              Are you sure you want to cancel this project?
            </p>
            <p className="modal__modal-p cancel-project enlarged-text centered">
              Revive our Papa John's branch
            </p>
            <p
              id="cancel-project-description-paragraph"
              className="modal__modal-p small-text danger"
            >
              Warning: Canceled projects cannot be active again. You must create
              a new project to start over.
            </p>

            {renderErrorNotifications()}

            <button
              id="cancel-project-submit"
              className={"form-button submit mt-20 danger"}
              type="submit"
              onClick={onSubmitHandler}
            >
              {/* renderLoader() */} Cancel Project
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
  isSignedIn: state.auth.isSignedIn,
  error: state.error,
  // showLoader: state.loader.showCancelProjectFormLoader,
});

export default connect(mapStateToProps, {
  cancelProject,
  // actionShowLoader,
})(CancelProject);
