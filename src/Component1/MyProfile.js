import React, { useState, useRef, useEffect } from "react";
import "../css/style.css";
import profile from "../image/myprofilepic.png";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import Mynavbar from "./Mynavbar";

const MyProfile = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    if(user){
   setUser(user);
    }
  }, []);

  const hanldeEdit = () => {
    navigate("/myprofile/edit", { state: user });
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
            <div style={{ justifyContent: "center", display: "flex" }}>
              <img src={profile} alt="profile" />
            </div>
          </div>
          <div className="col-md-8 col-sm-8 col-lg-8 col-xl-8 mt-4">
            <div>
              <form>
                <div className="form-row">
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
                          outline: "none",
                          paddingLeft: "15px",
                          width: "95%",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                        value={user.firstName}
                        id="firstName"
                        name="firstName"
                        disabled
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
                          outline: "none",
                          width: "95%",
                          paddingLeft: "15px",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                        id="mobileNo"
                        value={user.mobileNo}
                        name="mobileNo"
                        disabled
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
                        type="email"
                        style={{
                          border: "none",
                          outline: "none",
                          width: "95%",
                          paddingLeft: "15px",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                        id="email"
                        value={user.email}
                        name="email"
                        disabled
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
                          width: "6.5rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Date of Birth
                      </legend>
                      <input
                        type="text"
                        style={{
                          border: "none",
                          outline: "none",
                          paddingRight: "5px",
                          paddingLeft: "15px",
                          background: "transparent",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                        value={user.dob}
                        id="dob"
                        name="dob"
                        disabled
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

                      <input
                        type="text"
                        name="gender"
                        readOnly
                        value={user.gender}
                        // class="form-select"
                        // aria-label="Default select example"
                        style={{
                          border: "none",
                          color: "#C4A484",
                          background: "transparent",
                          outline: "none",
                          paddingLeft: "15px",
                          marginTop: "-15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                        }}
                      >
                        {/* <option value="1">Male</option> */}
                      </input>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container mt-5" style={{ paddingBottom: "60px" }}>
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
          <div style={{ float: "right" }} className="icon-container">
            {/* <Link to={"/myprofile/edit"}> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
              color="rgb(43, 77, 129)"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-pencil-square hoverable-image"
              viewBox="0 0 16 16"
              onClick={hanldeEdit}
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
            <span className="icon-name" style={{ marginLeft: "1.5%" }}>
              Edit
            </span>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
