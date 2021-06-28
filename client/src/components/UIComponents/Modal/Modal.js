import "./Modal.scss";

import React, { useState, useEffect } from "react";

import ModalHeader from "./ModalHeader/ModalHeader";

import { clearErrors } from "../../../redux/actions/errorActions";
import { connect } from "react-redux";

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {}, []);

  const getModalOpenClass = () => (modalOpen ? "show" : "hide");

  const modalOnCloseHandler = () => {
    setModalOpen(false);

    setTimeout(() => {
      console.log("closing modal");
      props.onModalClose();
      props.clearErrors(); /*Remove errors*/
    }, 300);
  };

  const getModalId = () => (props.modalId ? props.modalId : "");

  // render functions

  const renderModalHeader = () => {
    if (props.noHeader) return null;
    return (
      <ModalHeader
        className={`${props.className}`}
        headerClassName={props.headerClassName}
        onModalClose={modalOnCloseHandler}
        headingText={props.headingText || null}
      />
    );
  };

  return (
    <>
      <div
        className={`backdrop ${getModalOpenClass()} ${props.className}`}
        onClick={modalOnCloseHandler}
      ></div>
      <section
        className={`modal ${getModalOpenClass()} ${props.className}`}
        id={getModalId()}
        style={props.modalStyle || {}}
      >
        {renderModalHeader()}
        {props.children}
      </section>{" "}
    </>
  );
};
export default connect(null, { clearErrors })(Modal);
