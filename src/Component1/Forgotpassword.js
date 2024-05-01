import React, { useState } from "react";
// import imagelogo from "../image/logo.png";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import NavBar from "./NavBar";
import axiosConfig from "../axiosConfig";
import Footer from "./Footer";

function Passwordsucced(props) {
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
        Password updated successfully. Click to
        <span style={{ marginLeft: "5px" }}>
          <Link to={"/"}>Login.</Link>
        </span>
      </Modal.Body>
    </Modal>
  );
}

const Forgotpassword = () => {
  const [modalShow, setModalShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("gray");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [messageClass, setMessageClass] = useState(
    "Password must contain a combination of at least 8 characters, including lowercase letters, uppercase letters, numbers and special symbols"
  );
  const validatePassword = password => {
    // Regular expression to match the password requirements
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Reset previous errors
    // setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    // console.log(password, confirmPassword);

    if (!validatePassword(password)) {
      showMessage(
        "Password must contain a combination of at least 8 characters, including lowercase letters, uppercase letters, numbers and special symbols",
        "red"
      );
      // setNewPasswordError(
      //   "Password must contain a combination of at least 8 characters, including lowercase letters, uppercase letters, numbers and special symbols"
      // );
      return;
    } else if (validatePassword(password)) {
      showMessage("This is strong Password", "green");
    } else {
      showMessage(
        "Password must contain a combination of at least 8 characters, including lowercase letters, uppercase letters, numbers and special symbols",
        "gray"
      );
    }

    // Validation for confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Value Mismatch");
      return;
    }
    setModalShow(true);
    const userId = JSON.parse(localStorage.getItem("UserZimmedari"))._id;
    const payload = {
      // userId:userId,
      password: password,
      confirmPassword: confirmPassword,
    };
    axiosConfig
      .post(`/user/updated-password/${userId}`, payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    setPassword("");
    setConfirmPassword("");
  };
  const showMessage = (messageText, color) => {
    setMessage(messageText);
    setMessageColor(color);
  };
  return (
    <>
      <Passwordsucced show={modalShow} onHide={() => setModalShow(false)} />
      <div className="container-fluid " style={{ display: "inline-block" }}>
        <div
          class="header"
          style={{ marginLeft: "-15px", boxShadow: "0 0 10px  #2374ee" }}
        >
          <NavBar />
        </div>
        <div className="row " style={{ paddingTop: "5rem" }}>
          <div className="col-md-4 col-sm-1 col-lg-4 col-xl-4">
            <div></div>
          </div>
          <div className="col-md-4 col-sm-10 col-lg-4 col-xl-4">
            <div
              className="gdfhagfjhagjhfgagfjhaf"
              style={{
                margin: "1rem",
                marginTop: "3rem",
                borderRadius: "20px",
                backgroundColor: "white",
                paddingBottom: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(194, 215, 233)",
                  width: "100%",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  paddingLeft: "2rem",
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: "600" }}>
                  Forgot Password
                </div>
              </div>

              <div style={{ margin: "2rem" }}>
                <div className=" mt-2"></div>
                <div className="mt-2">
                  <form>
                    <fieldset
                      className="mt-2"
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        border: "1px solid rgb(114, 158, 216)",
                        borderRadius: "10px",
                        height: "4.5rem",
                        width: "100%",
                      }}
                    >
                      <legend
                        style={{
                          color: "rgb(82, 114, 161)",
                          marginBottom: "-5px",
                          fontSize: "16px",
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "8rem",
                        }}
                        for="Password"
                        className="form-label"
                      >
                        New Password <span style={{ color: "red" }}>*</span>
                      </legend>

                      <input
                        style={{
                          border: "none",
                          paddingTop: "6px",
                          outline: "none",
                          width: "100%",
                          paddingLeft: "15px",
                        }}
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </fieldset>

                    <fieldset
                      className="mt-4"
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        border: "1px solid rgb(114, 158, 216)",
                        borderRadius: "10px",
                        height: "4.5rem",
                        width: "100%",
                      }}
                    >
                      <legend
                        style={{
                          color: "rgb(82, 114, 161)",
                          marginBottom: "-5px",
                          fontSize: "16px",
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "9rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Confirm Password <span style={{ color: "red" }}>*</span>
                      </legend>

                      <input
                        style={{
                          border: "none",
                          paddingTop: "6px",
                          outline: "none",
                          width: "100%",
                          paddingLeft: "15px",
                        }}
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                      />
                    </fieldset>
                    {newPasswordError && (
                      <p style={{ color: "red" }} className="validationmobilefont">{newPasswordError}</p>
                    )}
                    <span className="validationmobilefont" style={{ color: messageColor }} >
                      {messageClass}
                    </span>

                    <div>
                      {confirmPasswordError && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {confirmPasswordError}
                        </span>
                      )}
                    </div>

                    <div className="mt-3">
                      <button
                        onClick={handleSubmit}
                        type="button"
                        class="btn mt-2"
                        style={{
                          width: "100%",
                          backgroundColor: "#4478c7",
                          color: "white",
                          height: "2.8rem",
                        }}
                      >
                        Submit
                      </button>
                    </div>
                    {/* <div className="mt-2">
                      <span
                        className="nav-link-inner--text"
                        style={{ color: "black" }}
                      >
                        Already have account?
                        <Link to={"/"} style={{ textDecoration: "none" }}>
                          <span
                            style={{ color: "rgb(57, 103, 204)" }}
                            className="ml-1"
                          >
                            Sign-in
                          </span>
                        </Link>
                      </span>
                    </div> */}
                  </form>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgotpassword;
