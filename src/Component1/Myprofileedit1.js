import React, { useState, useEffect, useRef } from "react";
import profile from "../image/myprofilepic.png";
import { Link, useNavigate } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import PhoneOtp from "./nominee/phoneOtp";
import axiosConfig from "../axiosConfig";
import EmailModal from "./nominee/EmailModal";
import Spinner from "react-bootstrap/Spinner";
import { ErrorModal } from "./ManageAccount/ErrorModal";
const Myprofileedit1 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [errModal, setErrModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [uploadFileName, setUploadFileName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowmail, setModalShowmail] = useState(false);
  const [phoneNo, setPhoneNo] = useState(false);
  const [myEmail, setMyEmail] = useState("");
  const [newOtp, setNewOtp] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    mobileNo: "",
    email: "",
    dob: "",
    gender: "",
    mailVerifyStatus: "",
    profilePic: null,
  });
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    setFormValues(user || {});
  }, []);

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleUpload = e => {
    const files = e.target.files[0];
    setUploadFileName(files.name);
    setProfilePic(files);
  };
  const generateOTP = () => {
    // Generate a random 6-digit number
    const myOtp = Math.floor(100000 + Math.random() * 900000);
    return myOtp.toString(); // Convert number to string
  };

  const sendSMS = async number => {
    const newOTP = generateOTP();
    setNewOtp(newOTP);
    try {
      const allUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=dlt&sender_id=MRZMDR&message=167804&variables_values=${newOTP}&flash=0&numbers=${number}`;

      const response = await axiosConfig.get(allUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePhoneModal = (e, number) => {
    e.preventDefault();
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    if (number) {
      let payload = {
        userId: user?._id,
        mobileNo: Number(number),
      };
      axiosConfig
        .post("/asset/otp-mobile", payload)
        .then(response => {
          console.log("response", response.data.message);
          setPhoneNo(number);
          setModalShow(true);
          sendSMS(number);
          setModalShowmail(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleEmailOtp = (e, currentEmail) => {
    debugger;
    e.preventDefault();

    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    if (currentEmail) {
      let payload = {
        userId: user?._id,
        email: currentEmail,
      };
      axiosConfig
        .post("/asset/otp-email", payload)
        .then(response => {
          setModalShowmail(true);
          setModalShow(false);
          setMyEmail(currentEmail);
          setModalShowmail(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const maxDate = `${yyyy}-${mm}-${dd}`;

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("firstName", formValues?.firstName);
    formdata.append("mobileNo", formValues?.mobileNo);
    formdata.append("email", formValues?.email);
    formdata.append("dob", formValues?.dob);
    formdata.append("gender", formValues?.gender);
    formdata.append("profileImage", formValues?.profilePic);

    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    axiosConfig
      .put(`/user/edit-profile/${user?._id}`, formValues)
      .then(response => {
        if (response.data.updatedUser) {
          sessionStorage.setItem(
            "UserZimmedari",
            JSON.stringify(response.data.updatedUser)
          );
          setFormValues(response.data.updatedUser);
          setMessage("User Data Update Successfully");
          setErrModal(true);
          setTimeout(() => {
            setErrModal(false);
            navigate("/myprofile");
          }, 2000);
        }
      })
      .catch(error => {
        setMessage("Something went Wrong");
        setErrModal(true);
        console.log(error);
      });
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
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
          <span className="ml-3">My Profile</span>
          <span></span>
        </p>
      </div>
      <div className="container">
        <div className="row mb-5 m-2">
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
            {formValues?.image ? (
              <div className="profileParent">
                <img
                  src={formValues?.image}
                  alt="profile"
                  className="profilePicture"
                />
              </div>
            ) : (
              <div style={{ justifyContent: "center", display: "flex" }}>
                <img src={profile} alt="profile" />
              </div>
            )}
            <div className="iconStyle">
              <span className="ml-1">
                {/* <svg
                  type="button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-upload"
                  viewBox="0 0 16 16"
                  onClick={handleIconClick}
                  color="grey"
                  width="40"
                  height="30"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg> */}

                <input
                  type="file"
                  name="profilePic"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  value={formValues?.profilePic}
                  onChange={handleUpload}
                  accept="image/png, image/jpeg,image/jpg,image/jpe"
                />
              </span>
              <span className="uploadFileName">
                {uploadFileName && uploadFileName}
              </span>
            </div>
          </div>
          <div className="col-md-8 col-sm-8 col-lg-8 col-xl-8 mt-4">
            <div>
              <form>
                <div className="form-row classformargininmyprofilepage">
                  <div className="form-group col-md-6">
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
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "auto",
                          paddingRight: "5px",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Name
                      </legend>
                      <input
                        type="text"
                        style={{
                          border: "none",
                          width: "95%",
                          outline: "none",
                          paddingLeft: "15px",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                        id="firstName"
                        value={formValues?.firstName}
                        onChange={handleChange}
                        name="firstName"
                      />
                    </fieldset>
                  </div>

                  <div className="form-group col-md-5 col-sm-5 col-xl-5 col-lg-5 col-10 ">
                    <div>
                      <span>
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
                              paddingLeft: "5px",
                              fontFamily: "Calibri",
                              marginLeft: "15px",
                              width: "7.3rem",
                            }}
                            for="exampleInputPassword1"
                            class="form-label"
                          >
                            Phone Number
                          </legend>
                          <input
                            type="tel"
                            style={{
                              border: "none",
                              width: "95%",
                              outline: "none",
                              paddingLeft: "15px",
                              marginTop: "-15px",
                              paddingBottom: "10px",
                              marginBottom: "5px",
                            }}
                            onChange={handleChange}
                            value={formValues?.mobileNo}
                            name="mobileNo"
                          />
                        </fieldset>
                      </span>
                    </div>
                  </div>
                  <div className="form-group col-md-1 col-sm-1 col-xl-1 col-lg-1 col-2 ">
                    <span>
                      <button
                        onClick={e => handlePhoneModal(e, formValues?.mobileNo)}
                        style={{
                          border: "1px solid  rgb(201, 198, 198)",
                          marginTop: "10px",
                          fontSize: "14px",
                          color: "white",
                          height: "3.5rem",
                          borderRadius: "10px",
                          backgroundColor: "rgb(20, 130, 233)",
                          outline: "none",
                        }}
                      >
                        SEND OTP
                      </button>
                    </span>
                  </div>

                  <div className="form-group col-md-5 col-sm-5 col-xl-5 col-lg-5 col-10 classformargininmyprofilepage">
                    <div>
                      <span>
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
                              width: "7rem",
                              paddingLeft: "5px",
                            }}
                            for="exampleInputPassword1"
                            class="form-label"
                          >
                            Email Address
                          </legend>
                          <input
                            type="tel"
                            style={{
                              border: "none",
                              width: "95%",
                              outline: "none",
                              paddingLeft: "15px",
                              marginTop: "-15px",
                              paddingBottom: "10px",
                              marginBottom: "5px",
                            }}
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={formValues?.email}
                          />
                        </fieldset>
                      </span>
                    </div>
                  </div>
                  <div className="form-group col-md-1 col-sm-1 col-xl-1 col-lg-1 col-2 classformargininmyprofilepage">
                    <button
                      onClick={e => handleEmailOtp(e, formValues?.email)}
                      style={{
                        border: "1px solid  rgb(201, 198, 198)",
                        marginTop: "10px",
                        fontSize: "14px",
                        color: "white",
                        height: "3.5rem",
                        borderRadius: "10px",
                        backgroundColor: "rgb(20, 130, 233)",
                        outline: "none",
                      }}
                    >
                      SEND OTP
                    </button>
                  </div>
                  <div className="form-group col-md-6 classformargininmyprofilepage">
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
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "6.5rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Date of Birth
                      </legend>
                      <input
                        type="date"
                        style={{
                          border: "none",
                          width: "95%",
                          backgroundColor: "white",
                          outline: "none",
                          paddingLeft: "15px",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                        id="dob"
                        name="dob"
                        max={maxDate}
                        onChange={handleChange}
                        value={formValues?.dob}
                      />
                    </fieldset>
                  </div>
                  <div className="form-group col-md-6 classformargininmyprofilepage">
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
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "4.5rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Gender
                      </legend>

                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="gender"
                        value={formValues.gender}
                        style={{
                          border: "none",
                          color: "#C4A484",
                          backgroundColor: "white",
                          outline: "none",
                          paddingLeft: "15px",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                          width: "100%",
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container mt-5" style={{ paddingBottom: "60px" }}>
          <div style={{ float: "left" }}>
            <Link to={"/myprofile"} style={{ textDecoration: "none" }}>
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
          <div style={{ float: "right" }}>
            <Link to={"/myprofile/edit"}>
              <span className="icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="rgb(43, 77, 129)"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-floppy2-fill hoverable-image"
                  viewBox="0 0 16 16"
                  onClick={handleSubmit}
                >
                  <path d="M12 2h-2v3h2z" />
                  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
                </svg>
                <span
                  className="icon-name"
                  style={{ marginLeft: "1.5%", marginTop: "2px" }}
                >
                  Save
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
      {modalShow ? (
        <div className="myModal">
          <PhoneOtp
            setModalShow={setModalShow}
            myNumber={phoneNo}
            setFormValues={setFormValues}
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
            setFormValues={setFormValues}
          />
        </div>
      ) : null}
      <ErrorModal
        show={errModal}
        message={message}
        onHide={() => setErrModal(false)}
      />
      ;
    </>
  );
};

export default Myprofileedit1;
