import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import axiosConfig from "./../axiosConfig";
import { OTP_main } from "./Api";
import EmailModal from "./nominee/EmailModal";
import PhoneOtp from "./nominee/phoneOtp";
const Nomineedetailsedit = () => {
  const [modalShow, setModalShow] = useState(false);
  const [newOtp, setNewOtp] = useState(null);
  const [myNumber, setMyNumber] = useState("");
  const [modalShowmail, setModalShowmail] = useState(false);
  const [nomineedetail, setNomineedetails] = useState("");
  const [modalSendOtp, setModalSendOtp] = useState(false);
  const [myEmail, setMyEmail] = useState("");
  const [formValues, setFormValues] = useState([
    {
      nomineeName: "",
      nomineeEmailId: "",
      NomineePhoneNumber: null,
      relationWithNominee: "",
    },
  ]);
  const [formError, setFormError] = useState({
    IsnomineeName: false,
    IsnomineeEmailId: false,
    IsNomineePhoneNumber: false,
    IsrelationWithNominee: false,
  });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state) {
      console.log(location?.state);
      setFormValues(location.state);
      setNomineedetails(location.state);
    }
  }, []);
  const handleSelect = e => {
    setFormValues({ ...formValues, relationWithNominee: e.target.value });
  };
  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = e => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    console.log(user?._id);
    formValues.userId = user?._id;
    e.preventDefault();

    let errors = {};
    if (!formValues.nomineeName) errors.IsnomineeName = true;
    let mobileNum = document.getElementById("NomineePhoneNumber").value;
    if (mobileNum?.length !== 10) errors.IsNomineePhoneNumber = true;
    if (!formValues.relationWithNominee) errors.IsrelationWithNominee = true;

    if (Object.keys(errors)?.length === 0) {
      // console.log(formValues);
      axiosConfig
        .put(`/asset/update-nominee/${location.state._id}`, formValues)
        .then(response => {
          setFormValues({
            nomineeName: "",
            nomineeEmailId: "",
            NomineePhoneNumber: "",
            relationWithNominee: "",
          });
          setFormError("");
          navigate("/nomineedetails");
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      setFormError(errors);
    }
  };
  const generateOTP = () => {
    // Generate a random 6-digit number
    const myOtp = Math.floor(100000 + Math.random() * 900000);
    console.log(myOtp);
    return myOtp.toString(); // Convert number to string
  };
  const sendSMS = async number => {
    const newOTP = generateOTP();
    setNewOtp(newOTP);
    try {
      const apiKey = OTP_main;
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&variables_values=${newOTP}&route=otp&numbers=${number}`;

      const response = await axiosConfig.get(url);
      // setResponse(response.data);
      console.log(response.data);
      document.getElementById("alert").innerHTML = "";
    } catch (error) {
      if (error?.response?.data?.message) {
        document.getElementById("alert").innerHTML =
          "Sending multiple sms to same number is not allowed";
      }
    }
  };
  const handlePhoneModal = number => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    if (number) {
      let payload = {
        userId: user?._id,
        mobileNo: Number(number),
      };
      axiosConfig
        .post("/asset/otp-mobile", payload)
        .then(response => {
          console.log("response", response.data.message);
          sendSMS(number);
          setMyNumber(number);
          setModalShow(true);
          setModalShowmail(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const handleEmailModal = currentEmail => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    if (currentEmail) {
      let payload = {
        userId: user?._id,
        email: currentEmail,
      };
      axiosConfig
        .post("/asset/otp-email", payload)
        .then(response => {
          console.log("response", response.data.message);
          setModalShowmail(true);
          setModalShow(false);
          setMyEmail(currentEmail);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Mynavbar />
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
          <span> Nominee Details</span>
        </p>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3">
            <div>
              <div className="mt-4">
                <div className="mb-3">
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
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Nominee Name
                      <span style={{ color: "red" }}> *</span>
                    </legend>

                    <input
                      type="text"
                      placeholder="XXXXXXXXXXXX"
                      name="nomineeName"
                      value={formValues?.nomineeName}
                      onChange={handleChange}
                      style={{
                        width: "95%",
                        border: "none",
                        paddingLeft: "15px",
                        paddingBottom: "10px",
                        marginBottom: "5px",
                        outline: "none",
                        marginLeft: "5px",
                        backgroundColor: "white",
                      }}
                    />
                  </fieldset>
                  {formError.IsnomineeName && (
                    <div
                      className="validationmobilefont"
                      style={{
                        color: "red",
                        padding: "5px",

                        marginTop: "3px",
                      }}
                    >
                      * indicates required field
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3">
            <div>
              <div className="mt-4">
                <div className="mb-3">
                  <fieldset
                    style={{
                      color: "rgb(82, 114, 161)",
                      fontSize: "20px",
                      fontFamily: "Calibri",
                      border: "1px solid rgb(114, 158, 216)",
                      borderRadius: "10px",
                      height: "5.3rem",
                    }}
                  >
                    <legend
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Relation with Nominee
                      <span style={{ color: "red" }}> *</span>
                    </legend>

                    <select
                      class="form-select"
                      value={formValues?.relationWithNominee}
                      onChange={handleSelect}
                      name="relationWithNominee"
                      aria-label="Default select example"
                      defaultChecked
                      style={{
                        outline: "none",
                        width: "95%",
                        float: "right",
                        border: "none",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        paddingBottom: "10px",
                        marginBottom: "5px",
                        backgroundColor: "white",
                      }}
                    >
                      {/* <option
                        Nominee
                        Relation
                        style={{ float: "left", border: "none" }}
                      ></option> */}
                      <option value="Wife">Wife</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Sister">Sister</option>
                      <option value="Brother">Brother</option>
                      <option value="Husband">Husband</option>
                    </select>
                  </fieldset>
                  {formError.IsrelationWithNominee && (
                    <div
                      className="validationmobilefont"
                      style={{
                        color: "red",
                        padding: "5px",

                        marginTop: "3px",
                      }}
                    >
                      * indicates required field
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3">
            <div>
              <div className="mt-4">
                <div className="mb-3">
                  <fieldset
                    style={{
                      color: "rgb(82, 114, 161)",
                      fontSize: "20px",
                      fontFamily: "Calibri",
                      border: "1px solid rgb(114, 158, 216)",
                      borderRadius: "10px",
                      height: "5.3rem",
                    }}
                  >
                    <legend
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Nominee Phone Number
                      <span style={{ color: "red" }}> *</span>
                    </legend>

                    <div className="row">
                      <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3">
                        <span>
                          <button
                            style={{
                              outline: "none",
                              marginLeft: "2px",
                              width: "115%",
                              border: "1px solid rgb(114, 158, 216)",
                              textAlign: "center",
                              height: "3rem",
                              marginTop: "-10px",
                              borderRadius: "10px",
                              fontSize: "18px",
                            }}
                          >
                            +91
                          </button>
                        </span>
                      </div>

                      <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-6">
                        <input
                          maxLength={10}
                          type="tel"
                          id="NomineePhoneNumber"
                          name="NomineePhoneNumber"
                          value={formValues?.NomineePhoneNumber}
                          onChange={handleChange}
                          placeholder="965XX50XX0"
                          style={{
                            width: "90%",
                            outline: "none",
                            border: "none",
                            paddingLeft: "15px",
                            paddingBottom: "10px",
                            marginBottom: "5px",
                          }}
                        />
                      </div>
                      <div
                        className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3"
                        style={{ marginLeft: "-10px" }}
                      >
                        <span>
                          <a
                            onClick={() =>
                              handlePhoneModal(formValues?.NomineePhoneNumber)
                            }
                            className="btn"
                            style={{
                              fontSize: "13px",
                              width: "115%",
                              borderRadius: "10px",
                              backgroundColor: "rgb(32, 119, 190)",
                              color: "white",
                              border: "1px solid rgb(114, 158, 216)",
                              lineHeight: "30px",
                              height: "3rem",
                              marginTop: "-10px",
                            }}
                          >
                            SEND OTP
                          </a>
                        </span>
                      </div>
                    </div>
                  </fieldset>
                  {formError.IsNomineePhoneNumber && (
                    <div
                      className="validationmobilefont"
                      style={{
                        color: "red",
                        padding: "5px",

                        marginTop: "3px",
                      }}
                    >
                      * Enter valid 10-digit mobile number
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3">
            <div>
              <div className="mt-4">
                <div className="mb-3">
                  <fieldset
                    style={{
                      color: "rgb(82, 114, 161)",
                      fontSize: "20px",
                      fontFamily: "Calibri",
                      border: "1px solid rgb(114, 158, 216)",
                      borderRadius: "10px",
                      height: "5.3rem",
                    }}
                  >
                    <legend
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Nominee Email ID
                      {/* <span style={{ color: "red" }}> *</span> */}
                    </legend>
                    <div className="row">
                      <div className="col-md-9 col-sm-9 col-lg-9 col-xl-9 col-9">
                        <input
                          type="email"
                          name="nomineeEmailId"
                          value={formValues?.nomineeEmailId}
                          onChange={handleChange}
                          placeholder="kauxxxxxxxxxxxnghxxx@gmail.com"
                          style={{
                            width: "90%",
                            outline: "none",
                            border: "none",
                            paddingLeft: "15px",
                            paddingBottom: "10px",
                            marginBottom: "5px",
                            marginLeft: "5px",
                          }}
                        />
                      </div>

                      <div
                        className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-3"
                        style={{ marginLeft: "-10px" }}
                      >
                        <span>
                          <a
                            onClick={() =>
                              handleEmailModal(formValues?.nomineeEmailId)
                            }
                            className="btn "
                            style={{
                              fontSize: "13px",
                              backgroundColor: "rgb(32, 119, 190)",
                              color: "white",
                              width: "115%",
                              borderRadius: "10px",
                              border: "1px solid rgb(114, 158, 216)",
                              lineHeight: "30px",
                              height: "3rem",
                              marginTop: "-10px",
                            }}
                          >
                            SEND OTP
                          </a>
                        </span>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="container mt-5 mb-2 cssforfooternomineedetails">
          <div style={{ float: "left" }}>
            <Link to={"/nomineedetails"}>
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
          <div style={{ float: "right", bottom: "0px" }}>
            <span className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(43, 77, 129)"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
                onClick={handleSubmit}
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {modalShow ? (
        <div className="myModal">
          <PhoneOtp
            setModalShow={setModalShow}
            myNumber={myNumber}
            newOtp={newOtp}
          />
        </div>
      ) : null}
      {modalShowmail ? (
        <div className="myModal">
          <EmailModal
            setModalShowmail={setModalShowmail}
            setModalShow={setModalShow}
            myEmail={myEmail}
          />
        </div>
      ) : null}
    </>
  );
};

export default Nomineedetailsedit;
