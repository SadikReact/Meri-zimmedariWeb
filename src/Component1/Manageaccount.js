import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import {
  Savepassword,
  ErrorModal,
  Createpassword,
} from "./ManageAccount/ErrorModal";
import axiosConfig from "../axiosConfig";
import Mynavbar from "./Mynavbar";

const Manageaccount = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const [message, setMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const handleGeneratePassword = () => {
    let userData = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    console.log(userData);
    setIsLoader(true);
    axiosConfig
      .post("/user/generate-password", {
        email: userData?.email,
      })
      .then(response => {
        if (response.status == 200) {
          setIsLoader(false);
          setModalShow(true);
        }
      })
      .catch(error => {
        setIsLoader(false);
        setErrModal(true);
      });
  };

  const validatePassword = password => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handleSavePassWord = e => {
    e.preventDefault();

    // Reset previous errors
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    if (!oldPassword) {
      setOldPasswordError("* indicates required field");
      return;
    }
    // Validation for new password
    if (!validatePassword(newPassword)) {
      setNewPasswordError(
        "Password must contain a combination of at least 8 characters, including lowercase letters, uppercase letters, numbers, and special symbols."
      );
      return;
    }
    // Validation for confirm password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Value Mismatch");
      return;
    }

    let payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    setIsError(false);
    axiosConfig
      .post("/user/save-password", payload)
      .then(response => {
        setModalShow1(true);

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch(error => {
        // console.log(error);
        setErrModal(true);
        setMessage("Something Went wrong");
      });
  };

  return (
    <>
      <Mynavbar />
      <div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              <span>Delete Account</span>
            </Modal.Title>
            <span
              style={{ textAlign: "right", cursor: "pointer" }}
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="red"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </span>
          </Modal.Header>
          <Modal.Body className="text-center">
            Are you sure to permanently delete the account?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Savepassword show={modalShow1} onHide={() => setModalShow1(false)} />
      {errModal && (
        <ErrorModal
          show={errModal}
          message={message}
          onHide={() => setErrModal(false)}
        />
      )}

      <Createpassword show={modalShow} onHide={() => setModalShow(false)} />
      <div>
        <p
          style={{
            fontSize: "22px",
            color: "rgb(43, 77, 129)",
            fontWeight: "400",
            backgroundImage:
              "linear-gradient(to right, rgb(194, 215, 233) , rgb(229, 234, 238))",
          }}
        >
          <span className="ml-3">My Account </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </span>
          <span> Manage Account</span>
        </p>
      </div>
      <div className="container">
        <div className="mt-5">
          <fieldset
            style={{
              color: "rgb(82, 114, 161)",
              fontSize: "20px",
              fontFamily: "Calibri",
              border: "1px solid rgb(114, 158, 216)",
              borderRadius: "10px",
            }}
          >
            <legend
              style={{
                color: "rgb(82, 114, 161)",
                marginBottom: "-5px",
                fontSize: "28px",
                textAlign: "center",
                fontFamily: "Calibri",
                marginLeft: "15px",
                width: "13.5rem",
              }}
              for="exampleInputPassword1"
              class="form-label"
            >
              Reset Password
            </legend>
            <div className="row m-2">
              <div className="col-md-4  col-xl-4 xol-lg-4">
                {newPasswordError && (
                  <span
                    style={{
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    .
                  </span>
                )}

                <fieldset
                  style={{
                    color: "rgb(82, 114, 161)",
                    fontSize: "20px",
                    fontFamily: "Calibri",
                    border: "1px solid rgb(114, 158, 216)",
                    borderRadius: "10px",
                  }}
                >
                  <legend
                    style={{
                      color: "rgb(82, 114, 161)",
                      marginBottom: "-5px",
                      fontSize: "16px",
                      fontFamily: "Calibri",
                      marginLeft: "15px",
                      width: "auto",
                      paddingLeft: "5px",
                    }}
                    for="exampleInputPassword1"
                    class="form-label"
                  >
                    Old Password
                    <span style={{ color: "red" }}> *</span>
                  </legend>
                  <input
                    type="password"
                    style={{
                      border: "none",
                      width: "95%",
                      outline: "none",
                      paddingLeft: "15px",
                      marginTop: "-15px",
                      paddingBottom: "10px",
                      marginBottom: "5px",
                    }}
                    id="password"
                    name="oldPass"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                  />
                </fieldset>
                {oldPasswordError && (
                  <p style={{ color: "red" }} className="validationmobilefont">
                    {oldPasswordError}
                  </p>
                )}
              </div>
              <div className="col-md-4  col-xl-4 xol-lg-4">
                {newPasswordError && <span style={{ color: "white" }}>.</span>}
                <fieldset
                  style={{
                    color: "rgb(82, 114, 161)",
                    fontSize: "20px",
                    fontFamily: "Calibri",
                    border: "1px solid rgb(114, 158, 216)",
                    borderRadius: "10px",
                  }}
                >
                  <legend
                    style={{
                      color: "rgb(82, 114, 161)",
                      marginBottom: "-5px",
                      fontSize: "16px",
                      fontFamily: "Calibri",
                      marginLeft: "15px",
                      width: "auto",
                      paddingLeft: "5px",
                    }}
                    for="exampleInputPassword1"
                    class="form-label"
                  >
                    New Password
                    <span style={{ color: "red" }}> *</span>
                  </legend>
                  <input
                    type="password"
                    style={{
                      border: "none",
                      width: "95%",
                      outline: "none",
                      paddingLeft: "15px",
                      marginTop: "-15px",
                      paddingBottom: "10px",
                      marginBottom: "5px",
                    }}
                    name="newPass"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </fieldset>
                {newPasswordError && (
                  <p style={{ color: "red" }} className="validationmobilefont">
                    {newPasswordError}
                  </p>
                )}
              </div>
              <div className="col-md-4  col-xl-4 xol-lg-4">
                {newPasswordError && <span style={{ color: "white" }}>.</span>}
                <fieldset
                  style={{
                    color: "rgb(82, 114, 161)",
                    fontSize: "20px",
                    fontFamily: "Calibri",
                    border: "1px solid rgb(114, 158, 216)",
                    borderRadius: "10px",
                  }}
                >
                  <legend
                    style={{
                      color: "rgb(82, 114, 161)",
                      marginBottom: "-5px",
                      fontSize: "16px",
                      fontFamily: "Calibri",
                      marginLeft: "15px",
                      width: "auto",
                      paddingLeft: "5px",
                    }}
                    for="exampleInputPassword1"
                    class="form-label"
                  >
                    Confirm Password
                    <span style={{ color: "red" }}> *</span>
                  </legend>
                  <input
                    type="password"
                    style={{
                      border: "none",
                      width: "95%",
                      outline: "none",
                      paddingLeft: "15px",
                      marginTop: "-15px",
                      paddingBottom: "10px",
                      marginBottom: "5px",
                    }}
                    name="ConfirmPass"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </fieldset>
                {confirmPasswordError && (
                  <span
                    style={{ color: "red" }}
                    className="validationmobilefont"
                  >
                    {confirmPasswordError}
                  </span>
                )}
              </div>
            </div>
            <div
              className="row mt-4 "
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            >
              <div className="col-md-4 col-xl-4 col-lg-4"></div>
              <div className="col-md-4 col-xl-4 col-lg-4"></div>
              {isLoader ? (
                <Spinner
                  animation="border"
                  role="status"
                  style={{ marginLeft: "85px" }}
                ></Spinner>
              ) : (
                <div className="col-md-4 col-xl-4 col-lg-4">
                  <div style={{ textAlign: "center" }}>
                    <Link
                      onClick={handleGeneratePassword}
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "22px",
                        textDecoration: "underline",
                      }}
                    >
                      Generate Random Password
                    </Link>
                  </div>
                </div>
              )}

              <div className="col-md-4 col-xl-4 col-lg-4"></div>
              <div
                className="col-md-4 col-xl-4 col-lg-4 cssforsavepasswordtoppadding"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <button
                  onClick={handleSavePassWord}
                  style={{
                    width: "80%",
                    fontSize: "24px",
                    color: "white",
                    backgroundColor: "rgb(82, 114, 161)",
                    border: "1px solid rgb(82, 114, 161)",
                    height: "3rem",
                    borderTopLeftRadius: "80px",
                    borderTopRightRadius: "80px",
                  }}
                >
                  Save Password
                </button>
              </div>
              <div className="col-md-4 col-xl-4 col-lg-4"></div>
            </div>
          </fieldset>
        </div>
        <div className="mt-5">
          <fieldset
            style={{
              color: "rgb(82, 114, 161)",
              fontSize: "20px",
              fontFamily: "Calibri",
              border: "1px solid rgb(114, 158, 216)",
              borderRadius: "10px",
            }}
          >
            <legend
              style={{
                color: "rgb(82, 114, 161)",
                marginBottom: "-5px",
                fontSize: "28px",
                textAlign: "center",
                fontFamily: "Calibri",
                marginLeft: "15px",
                width: "12.5rem",
              }}
              for="exampleInputPassword1"
              class="form-label"
            >
              {" "}
              Delete Account
            </legend>
            <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              <p style={{ fontSize: "20px" }}>
                Deleting the account will result in the permanent removal of all
                stored information from the portal, with no possibility of
                recovery. Additionally, any subscription fee paid by the user
                will not be refunded, and the Meri Zimmedari will not be liable
                to offer any services to the user or their nominee thereafter.
              </p>
            </div>

            <div
              className="row mt-2 "
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            >
              <div className="col-md-4 col-xl-4 col-lg-4"></div>
              <div
                className="col-md-4 col-xl-4 col-lg-4"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <button
                  onClick={handleShow}
                  style={{
                    width: "80%",
                    fontSize: "24px",
                    color: "white",
                    backgroundColor: "rgb(82, 114, 161)",
                    border: "1px solid rgb(82, 114, 161)",
                    height: "3rem",
                    borderTopLeftRadius: "80px",
                    borderTopRightRadius: "80px",
                  }}
                >
                  Delete Account
                </button>
              </div>
              <div className="col-md-4 col-xl-4 col-lg-4"></div>
            </div>
          </fieldset>
        </div>

        <div className="container mt-2">
          <div style={{ float: "left" }}>
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <p
                style={{
                  color: "rgb(82, 114, 161)",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                  </svg>
                </span>
                <span className="ml-3">BACK</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manageaccount;
