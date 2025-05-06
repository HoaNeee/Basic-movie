import React from "react";
import Modal from "react-modal";

const MyModal = ({ children, isOpen, onRequestClose, image }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 999,
      backgroundColor: image ? "" : "white",
      border: image ? "none" : "2px solid #ddd",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 99,
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
