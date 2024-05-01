import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export const ErrorModal = props => {
  console.log(props.message);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          justifyContent: "right",
          display: "flex",
          padding: "0.1rem 0.1rem",
          border: "none",
        }}
      ></Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>{props.message}</Modal.Body>
    </Modal>
  );
};

export const Savepassword = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          justifyContent: "right",
          display: "flex",
          padding: "0.1rem 0.1rem",
          border: "none",
        }}
      ></Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        Password Reset Successfully
      </Modal.Body>
    </Modal>
  );
};

export const Createpassword = props => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{
            justifyContent: "right",
            display: "flex",
            padding: "0.1rem 0.1rem",
            border: "none",
          }}
        ></Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          New password sent to
          <span className="p-1">
            {JSON.parse(localStorage.getItem("UserZimmedari")).email}
          </span>
          {/* </>
            )} */}
        </Modal.Body>
      </Modal>
    </>
  );
};
