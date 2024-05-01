import React, { useState, useRef, useEffect } from "react";
import { Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "../css/style.css";
import Mynavbar from "./Mynavbar";
import EmailModal from "./nominee/EmailModal";
import PhoneOtp from "./nominee/phoneOtp";
import PhoneBox from "./nominee/PhoneBox";
import axiosConfig from "./../axiosConfig";
import { OTP_main } from "./Api";
import { AutoSaveModal } from "./assetDetail/AutoSaveModal";

const Assetstep2 = () => {
  const [newOtp, setNewOtp] = useState(null);
  const [newArray, setNewArray] = useState([]);
  const [formValues, setFormValues] = useState([
    {
      nomineeName: "",
      nomineeEmailId: "",
      percentageofShar: null,
      NomineePhoneNumber: null,
      relationWithNominee: "",
    },
  ]);
  const [formError, setFormError] = useState({
    IsnomineeName: false,
    IsnomineeEmailId: false,
    IspercentageofShar: false,
    IsNomineePhoneNumber: false,
    IsrelationWithNominee: false,
    IsPhoneAvail: false,
  });
  let allError = {};
  const [modalShow, setModalShow] = useState(false);
  const [myNumber, setMyNumber] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [shareError, setShareError] = useState("");
  const [modalShowmail, setModalShowmail] = useState(false);
  const [modalSendOtp, setModalSendOtp] = useState(false);
  const [phoneModalNotify, setPhoneModalNotify] = useState(false);
  const [phoneRemark, setPhoneRemark] = useState(false);
  const [modalShowauto, setModalShowauto] = useState(false);

  // const [myNominee, setMyNominee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let nomineeDetails = JSON.parse(localStorage.getItem("nomineeDetails"));

    if (nomineeDetails) {
      const newArray = [...nomineeDetails];
      setFormValues(newArray);
    }
  }, []);

  const handleChange = (i, e) => {
    const value = e.target.value;
    const fieldName = e.target.name;

    setFormValues(prevFormValues => {
      const newFormValues = [...prevFormValues];

      // Update the specific field based on the field name

      if (fieldName === "nomineeName") {
        if (/^[A-Za-z]*$/.test(value)) {
          newFormValues[i][fieldName] = value;
        }
      } else if (fieldName === "relationWithNominee") {
        newFormValues[i][fieldName] = value;
      } else if (fieldName === "percentageofShar") {
        const newValue = value.replace(/\D/g, "").slice(0, 3);
        newFormValues[i][fieldName] = Number(newValue);
      }

      const phoneNumberRegex = /^\d{10}$/;
      if (fieldName === "NomineePhoneNumber") {
        if (phoneNumberRegex.test(value)) {
          newFormValues[i][fieldName] = Number(value);
          localStorage.setItem("UpdatedNo", Number(value));
        } else {
          newFormValues[i][fieldName] = Number(value);
        }
      } else if (fieldName === "nomineeEmailId") {
        newFormValues[i][fieldName] = value;
      }
      return newFormValues;
    });
  };
  const handleInputClick = () => {
    allError.IspercentageofShar = true;
    // formValues?.map((value, i) =>
    //   value?.percentageofShar.length > 1
    // );
    let share = document.getElementById("percentageofShar").value;
    // let message = "";
    if (share == 100) {
      // message =
      //   "Reduce percentage of share for the nominee to add more nominee.";
      setShareError(
        "Reduce percentage of share for the nominee to add more nominee."
      );
    } else {
      // message = "Permissible value: 1 to 100 without decimal.";
      setShareError("Permissible value: 1 to 100 without decimal.");
    }
    setFormError({ IspercentageofShar: true });
    // formValues.filter(el => newArr.push(Number(el.percentageofShar)));
  };
  // Email validation function
  // const validateEmail = email => {
  //   // Regular expression pattern for email validation
  //   const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return pattern.test(email);
  // };

  let addFormFields = item => {
    const newArr = [];
    formValues.filter(el => newArr.push(Number(el.percentageofShar)));
    const sum = newArr.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    // let share = document.getElementById("percentageofShar").value;
    if (Number(sum) >= 100) {
      // debugger;
      setFormError({ IspercentageofShar: true });
      setShareError(
        "Reduce percentage of share for the nominee to add more nominee."
      );
    } else if (sum > 100) {
      setFormError({ IspercentageofShar: true });
      setShareError(
        "The cumulative percentage share of all nominees can not exceed 100%."
      );
    } else {
      if (item) {
        setFormValues([
          ...formValues,
          {
            nomineeName: item.name,
            nomineeEmailId: "",
            percentageofShar: null,
            NomineePhoneNumber: "",
            relationWithNominee: item.relation,
            nominee: 0,
          },
        ]);
      }
      setFormValues([
        ...formValues,
        {
          nomineeName: "",
          nomineeEmailId: "",
          percentageofShar: null,
          NomineePhoneNumber: "",
          relationWithNominee: "",
          nominee: 0,
        },
      ]);
      setNewArray([
        ...formValues,
        {
          nomineeName: "",
          nomineeEmailId: "",
          percentageofShar: null,
          NomineePhoneNumber: "",
          relationWithNominee: "",
          nominee: 0,
        },
      ]);
    }
  };
  const handleNext = () => {
    const newArr = [];
    formValues.filter(el => newArr.push(Number(el.percentageofShar)));

    const sum = newArr.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    console.log(sum, newArr);
    formValues?.forEach((value, key) => {
      if (!value.nomineeName) {
        allError.IsnomineeName = true;
      } else {
        allError.IsnomineeName = false;
      }

      if (!value.relationWithNominee) {
        allError.IsrelationWithNominee = true;
      } else {
        allError.IsrelationWithNominee = false;
      }

      let share = document.getElementById("percentageofShar").value;
      // let shareMessage = "";
      // console.log(share);
      if (!Number(share)) {
        allError.IspercentageofShar = true;
        // shareMessage="Permissible value: 1 to 100 without decimal.";
        setShareError("Permissible value: 1 to 100 without decimal.");
      } else if (sum < 100) {
        setShareError(
          " Total Percentage of share must be 100%, please edit percentage of share of existing nominee(s) or click on add more nominee."
        );
      }
      // else if (sum > 100) {
      //   allError.IspercentageofShar = true;
      //   setShareError(
      //     "Total Percentage of share must be 100%, please edit percentage of share of existing nominee(s) or click on add more nominee."
      //   );
      // }
      else {
        setShareError("");
        allError.IspercentageofShar = false;
      }

      let a = document.getElementById("NomineePhoneNumber").value;

      if (a?.length !== 10) {
        allError.IsNomineePhoneNumber = true;
      } else {
        allError.IsNomineePhoneNumber = false;
      }
    });
    // Check if all keys inside the object are false

    if (Object.keys(allError)?.length >= 0) {
      if (
        allError.IsnomineeName &&
        allError.IsNomineePhoneNumber &&
        allError.IspercentageofShar &&
        allError.IsrelationWithNominee
      ) {
        setPhoneModalNotify(false);
      } else if (
        !allError.IsnomineeName &&
        !allError.IsNomineePhoneNumber &&
        !allError.IspercentageofShar &&
        !allError.IsrelationWithNominee
      ) {
        setPhoneModalNotify(true);
        let nomineeDetails = JSON.parse(localStorage.getItem("nomineeDetails"));
        let newArray;
        if (nomineeDetails?.length > 0) {
          newArray = [...nomineeDetails];
          setFormValues(newArray);
        } else {
          newArray = [...formValues];
        }
        if (phoneRemark) {
          setPhoneModalNotify(false);
          localStorage.setItem("nomineeDetails", JSON.stringify(newArray));
          navigate("/add-asset/step3");
        }
      }
      setFormError(allError);
    }
  };
  let removeFormFields = i => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    localStorage.setItem("nomineeDetails", JSON.stringify(newFormValues));
    setFormValues(newFormValues);
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
          // console.log("response", response.data.message);
          sendSMS(number);
          setMyNumber(number);
          setModalShow(true);
          setModalShowmail(false);
          setFormError({ IsPhoneAvail: false });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setFormError({ IsPhoneAvail: true });
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
          // console.log("response", response.data.message);
          setModalShowmail(true);
          setModalShow(false);
          setMyEmail(currentEmail);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const handleAutoSave = () => {
    setModalShowauto(true);
  };
  const handleBack = () => {
    // let assetAllData = JSON.parse(localStorage.getItem("assetDetails"));
    // navigate("/add-asset/policy", { state: assetAllData });
    navigate("/add-asset/policy");
  };
  return (
    <>
      <Mynavbar />

      <AutoSaveModal
        show={modalShowauto}
        addFormFields={addFormFields}
        onHide={() => setModalShowauto(false)}
      />
      <div>
        <div style={{ backgroundColor: "rgb(182, 205, 236)" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-xl-4 col-lg-4 col-sm-4 ">
                <div style={{ padding: "20px" }}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-4">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="rgb(197, 128, 123)"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-file-earmark-text"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                          <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-8">
                      <span>
                        <span style={{ color: "black" }}>Setp 1</span>
                        <span
                          style={{
                            backgroundColor: "rgb(152, 202, 152)",
                            color: " green",
                            fontSize: "14px",
                            marginLeft: "5px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          COMPLETE
                        </span>
                        <br></br>
                        <span style={{ color: "black" }}>
                          Enter Asset Details
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-4 col-lg-4 col-sm-4 ">
                <div style={{ padding: "20px" }}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-4">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="rgb(240, 117, 108)"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-person-check"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                          <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-8">
                      <span>
                        <span style={{ color: "black" }}>STEP 2</span>
                        <span
                          style={{
                            backgroundColor: "rgb(248, 237, 237)",
                            color: " rgb(197, 128, 123)",
                            fontSize: "14px",
                            marginLeft: "5px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          IN PROCESS
                        </span>

                        <br></br>
                        <span style={{ color: "black" }}>
                          Enter Nominee details
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-4 col-lg-4 col-sm-4 ">
                <div style={{ padding: "20px" }}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-4">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="#842f0b"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-floppy-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                          <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-8">
                      <span>
                        <span style={{ color: "black" }}>STEP 3</span>

                        <br></br>
                        <span style={{ color: "black" }}>
                          Confirm details & Save
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-4"></div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-4">
              <div
                style={{
                  borderBottomLeftRadius: " 50px",
                  borderBottomRightRadius: " 50px",
                  backgroundColor: "rgb(92, 139, 201)",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={handleAutoSave}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontFamily: "Calibri",
                    cursor: "pointer",
                  }}
                >
                  Auto-fill from pre-saved nominees
                </span>
                <br></br>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="white"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </span>
              </div>
              <div style={{ justifyContent: "center", display: "flex" }}></div>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 col-sm-4"></div>
          </div>
        </div>

        <div className="container-fluid" id="modalbg">
          {formValues &&
            formValues?.map((ele, index) => (
              <div className="row" key={index}>
                <div className="container-fluid">
                  <div className="step2deletbutton" style={{}}>
                    {index ? (
                      <>
                        <fieldset
                          style={{
                            color: "rgb(82, 114, 161)",
                            fontSize: "20px",
                            fontFamily: "Calibri",
                            borderTop: "1px solid rgb(114, 158, 216)",
                          }}
                        >
                          <legend
                            style={{
                              color: "rgb(82, 114, 161)",
                              fontSize: "20px",
                              fontFamily: "Calibri",
                              width: "auto",
                            }}
                            for="exampleInputPassword1"
                            class="form-label cssforwidth74587"
                          >
                            <button
                              style={{
                                border: "1px solid rgb(82,114,161)",
                                borderRadius: "10px",
                                width: "13rem",
                                height: "2.5rem",
                              }}
                            >
                              <span className="text-center">
                                {`${index + 1} Nominee Details`}
                              </span>
                            </button>
                          </legend>
                        </fieldset>
                      </>
                    ) : null}
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
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
                                value={ele.nomineeName || ""}
                                // pattern="[A-Za-z]+"
                                onChange={e => handleChange(index, e)}
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
                              <p
                                className="validationmobilefont"
                                style={{
                                  color: "red",
                                  padding: "5px",

                                  marginTop: "13px",
                                }}
                              >
                                * indicates required field
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
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
                                value={ele.relationWithNominee || ""}
                                onChange={e => handleChange(index, e)}
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
                                <option
                                  Nominee
                                  Relation
                                  style={{ float: "left", border: "none" }}
                                ></option>

                                <option disabled value="">
                                  Select
                                </option>
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
                              <p
                                className="validationmobilefont"
                                style={{
                                  color: "red",
                                  padding: "5px",

                                  marginTop: "13px",
                                }}
                              >
                                * indicates required field
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
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
                                Percentage of Share
                                <span style={{ color: "red" }}> *</span>
                              </legend>

                              <Input
                                type="number"
                                placeholder="XXXXXXXXXXXX"
                                className="numberofpersentagecssedit"
                                id="percentageofShar"
                                name="percentageofShar"
                                value={ele.percentageofShar || null}
                                onChange={e => handleChange(index, e)}
                                onClick={handleInputClick}
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
                                onKeyDown={e => {
                                  // Allow only digits, backspace, and arrow keys
                                  if (
                                    !/^\d$/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "ArrowLeft" &&
                                    e.key !== "ArrowRight"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                step="1"
                              />
                            </fieldset>

                            {formError.IspercentageofShar && (
                              <p
                                className="validationmobilefont"
                                style={{
                                  color: "red",
                                  padding: "5px",

                                  marginTop: "13px",
                                }}
                              >
                                {shareError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2"></div>
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
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
                                <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-3">
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

                                <div className="col-md-8 col-sm-8 col-lg-8 col-xl-8 col-6">
                                  <input
                                    maxLength={10}
                                    type="tel"
                                    id="NomineePhoneNumber"
                                    name="NomineePhoneNumber"
                                    value={ele.NomineePhoneNumber || ""}
                                    onChange={e => handleChange(index, e)}
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
                                  className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-3"
                                  style={{ marginLeft: "-10px" }}
                                >
                                  <span>
                                    <a
                                      onClick={() =>
                                        handlePhoneModal(ele.NomineePhoneNumber)
                                      }
                                      className="btn"
                                      id="alert"
                                      style={{
                                        fontSize: "13px",
                                        width: "115%",
                                        borderRadius: "10px",
                                        backgroundColor: "rgb(32, 119, 190)",
                                        color: "white",
                                        border: "1px solid rgb(114, 158, 216)",
                                        lineHeight: "15px",
                                        height: "3rem",
                                        marginTop: "-10px",
                                      }}
                                    >
                                      SEND OTP
                                    </a>
                                  </span>
                                </div>
                                {formError.IsNomineePhoneNumber && (
                                  <p
                                    className="validationmobilefont"
                                    style={{
                                      color: "red",
                                      padding: "5px",

                                      marginTop: "13px",
                                      marginLeft: "13px",
                                    }}
                                  >
                                    Enter valid 10-digit mobile number
                                  </p>
                                )}
                                {formError.IsPhoneAvail && (
                                  <p
                                    className="validationmobilefont"
                                    style={{
                                      color: "red",
                                      padding: "5px",

                                      marginTop: "13px",
                                      marginLeft: "13px",
                                    }}
                                  >
                                    Enter valid 10-digit mobile number
                                  </p>
                                )}
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
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
                                <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-9">
                                  <input
                                    type="email"
                                    name="nomineeEmailId"
                                    value={ele.nomineeEmailId || ""}
                                    onChange={e => handleChange(index, e)}
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
                                  className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-3"
                                  style={{ marginLeft: "-10px" }}
                                >
                                  <span>
                                    <a
                                      onClick={() =>
                                        handleEmailModal(ele.nomineeEmailId)
                                      }
                                      className="btn "
                                      style={{
                                        fontSize: "13px",
                                        backgroundColor: "rgb(32, 119, 190)",
                                        color: "white",
                                        width: "115%",
                                        borderRadius: "10px",
                                        border: "1px solid rgb(114, 158, 216)",
                                        lineHeight: "15px",
                                        height: "3rem",
                                        marginTop: "-10px",
                                      }}
                                    >
                                      SEND OTP
                                    </a>
                                  </span>
                                </div>
                                {/* {formError.IsnomineeEmailId && (
                                  <p
                                    style={{
                                      color: "red",
                                      padding: "5px",
                                      fontSize: "16px",
                                      marginTop: "13px",
                                      marginLeft: "13px",
                                    }}
                                  >
                                    Enter valid e-mail ID
                                  </p>
                                )} */}
                                {/* {emailError && (
                                  <p
                                    style={{
                                      color: "red",
                                      padding: "5px",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {emailError}
                                  </p>
                                )} */}
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2">
                      <div
                        className="step2deletbutton"
                        style={{
                          justifyContent: "right",
                          display: "flex",
                          marginRight: "2rem",
                        }}
                      >
                        {index ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => removeFormFields(index)}
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div class="row">
                    <div class="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-9"></div>
                    <div class="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-3"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="container mt-5" style={{ paddingBottom: "60px" }}>
          <div style={{ float: "left" }}>
            <p
              style={{
                color: "rgb(82, 114, 161)",
                fontSize: "20px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={handleBack}
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
          </div>
          <div style={{ float: "right" }}>
            <button
              onClick={addFormFields}
              className="ml-2 btn"
              style={{
                border: "none",
                backgroundColor: "rgb(182, 205, 236)",
                width: "7rem",
                borderRadius: "5px",
                lineHeight: "15px",
              }}
            >
              Add More Nominee
            </button>

            <button
              className="ml-2"
              onClick={handleNext}
              style={{
                border: "none",
                backgroundColor: "rgb(182, 205, 236)",
                padding: "8px",
                width: "7rem",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {phoneModalNotify ? (
        <div className="myModal">
          <PhoneBox
            setModalSendOtp={setModalSendOtp}
            setPhoneModalNotify={setPhoneModalNotify}
            setPhoneRemark={setPhoneRemark}
            setModalShow={setModalShow}
          />
        </div>
      ) : null}

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

export default Assetstep2;
