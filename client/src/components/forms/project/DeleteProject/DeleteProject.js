import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../redux/actions/errorActions";

import { deleteProject } from "../../../../redux/actions/projectsActions";
// import { actionShowLoader } from "../../../redux/actions/loaderActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
import Modal from "../../../UIComponents/Modal/Modal";

// import LoadingSpinner from "../../loaders/LoadingSpinner";

const DeleteProject = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const onCloseHandler = () => {
    if (props.onClose) props.onClose();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const onSuccessCb = () => {
      if (props.onSuccessCb) props.onSuccessCb();
    };
    // props.actionShowLoader("deleteProjectForm", true);
    props.deleteProject(props.project.id, onSuccessCb);
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
        componentClass="delete-project"
        headingText="Delete Project"
        autoFocusOnCancel={true}
        onModalClose={onCloseHandler}
      >
        <form
          id="delete-project-form"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <div className="delete-project modal-form-content">
            <p className="modal__modal-p delete-project">
              Are you sure you want to delete this project?
            </p>
            <p className="modal__modal-p delete-project enlarged-text centered">
              {props.project.name}
            </p>
            <p
              id="delete-project-description-paragraph"
              className="modal__modal-p small-text danger"
            >
              Warning: Deleted projects cannot be restored.
            </p>

            {renderErrorNotifications()}

            <button
              id="delete-project-submit"
              className={"form-button submit mt-20 danger"}
              type="submit"
              onClick={onSubmitHandler}
            >
              {/* renderLoader() */} Delete Project
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
  // showLoader: state.loader.showDeleteProjectFormLoader,
});

export default connect(mapStateToProps, {
  deleteProject,
  // actionShowLoader,
})(DeleteProject);
