import React, { useRef } from "react";
import ReactDom from "react-dom";
import Slots from "../Slots/Slots";
import "./styles.css";

export const ReBookingModal = ({ setShowModal, setNewSlots }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>Select Slots</h2>
        <button onClick={() => setShowModal(false)}>X</button>
        <div className="modalContent">
          <Slots setNewSlots={setNewSlots} />
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
