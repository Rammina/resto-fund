import "./UploadProjectImageButton.scss";

import React, { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Modal from "../../Modal/Modal";

// import { actionShowLoader } from "../../../../flux/actions/loaderActions";
import { uploadProjectImage } from "../../../../redux/actions/projectsActions";

import { WindowContext } from "../../../../AppContext";

// import LoadingSpinner from "../../../loaders/LoadingSpinner";

const UploadProjectImageButton = (props) => {
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { isNonMobileWidth, isNonMobileHeight } = useContext(WindowContext);

  //refs
  let inputImageRef = useRef(null);

  // guards against undefined errors
  const getAvatarUrl = () => {
    if (props.project) {
      if (props.project.image_url) {
        return props.project.image_url;
      }
    }
    return "";
  };

  const uploadButtonOnClickHandler = () => {
    // only perform action if input is assigned a ref to prevent errors
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  //////////////////// IMAGE upload related stuff////////////////////
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImageUploadName(file.name);
    previewFile(file);
  };

  const uploadImage = async (base64EncodedImage) => {
    await props.uploadProjectImage(base64EncodedImage, props.project.id);
    setImageUploadModalOpen(false);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (!previewSource) {
      return;
    }
    // props.actionShowLoader("uploadUploadProjectImageButtonForm", true);
    uploadImage(previewSource);
  };

  //////////////////// IMAGE upload related stuff is up there////////////////////

  // render functions
  // const renderLoader = () => <LoadingSpinner showLoader={props.showLoader} />;

  const renderImageUploadModal = () => {
    console.log(imageUploadName);
    console.log(imageUploadModalOpen);
    // do not render until image is chosen
    if (!imageUploadModalOpen) return null;
    return ReactDOM.createPortal(
      <React.Fragment>
        <Modal
          className="upload-project-image"
          onModalClose={() => {
            setImageUploadModalOpen(false);
          }}
          headerClassName="upload-project-image__header"
          headingText="Upload Room Icon"
        >
          <form
            id="upload-project-image__modal-form"
            encType="multipart/form-data"
            onSubmit={handleSubmitFile}
          >
            {previewSource && (
              <img
                id="upload-project-image__modal-image"
                src={previewSource}
                alt="Chosen Image"
              />
            )}
            <p className="upload-project-image__p">{imageUploadName}</p>

            <p className="upload-project-image__p">
              The uploaded image will look best at 16:9 aspect ratio and at the
              size of at least 600x340.
            </p>
            <div className="form-button-container">
              <button
                id="create-project-submit"
                className={"form-button submit mt-20"}
                type="submit"
                onClick={handleSubmitFile}
                autoFocus={true}
              >
                {/*renderLoader()*/}Upload Image
              </button>
            </div>
          </form>
        </Modal>
      </React.Fragment>,
      document.getElementById("modal")
    );
  };

  return (
    <form
      id="upload-project-image__form"
      encType="multipart/form-data"
      onSubmit={handleSubmitFile}
    >
      {/*this should not be visible to the user, and is just here for functionality purposes*/}
      <label
        htmlFor="upload-project-image__input"
        className=""
        id="upload-project-image__label"
      >
        Upload Project Image
      </label>
      <input
        ref={inputImageRef}
        tabIndex="-1"
        type="file"
        id="upload-project-image__input"
        name="project-image"
        accept="image/*"
        value={fileInputState}
        onChange={(e) => {
          console.log("image input change");
          setImageUploadModalOpen(true);
          handleImageInputChange(e);
        }}
      />
      {/*this is what the user sees, just a button*/}
      <button
        type="button"
        className="project__button"
        onClick={uploadButtonOnClickHandler}
      >
        Upload Project Image
      </button>
      {renderImageUploadModal()}
    </form>
  );
};
const mapStateToProps = (state) => ({
  error: state.error,
  // showLoader: state.loader.showUploadUploadProjectImageButtonFormLoader,
});

const uploadProjectImageButton = connect(mapStateToProps, {
  uploadProjectImage,
  // actionShowLoader,
})(UploadProjectImageButton);

export default uploadProjectImageButton;
