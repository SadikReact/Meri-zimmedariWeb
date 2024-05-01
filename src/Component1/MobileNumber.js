import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import imagelogo from "../image/logo.png";
import axiosConfig from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

import "./Otpveri";

const MobileNumber = () => {
  let params = useParams();

  const [IsUserId, setIsUserId] = useState(false);
  const [IsRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [isError, setIsError] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    axiosConfig
      .get(`/user/user-by-id/${params.id}`)
      .then(response => {
        console.log(response.data.User.mailVerifyStatus);
        setIsUserId(response.data.User.mailVerifyStatus);
        //  navigate("/login/otp", { state: phone });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleMobile = () => {
    debugger;
    let payload = {
      mobileNo: Number(phone),
    };
    if (phone.length === 10) {
      axiosConfig
        .post("/user/mail-verify", payload)
        .then(response => {
          console.log(response);
          setIsRegister(false);
        })
        .catch(error => {
          // console.log("Mobile Number Not Registered");

          setIsRegister(true);
          console.log(error.message);
        });
      // navigate("/login/otp", { state: phone });
    } else {
      setIsError(true);
    }
  };
  const handleChange = e => {
    const value = e.target.value;
    setPhone(value);
  };
  return (
    <>
      <div className="container-fluid " style={{ display: "inline-block" }}>
        <div
          class="header"
          style={{ marginLeft: "-15px", boxShadow: "0 0 10px  #2374ee" }}
        >
          <div class="container-fluid">
            <div class="row d_flex">
              <a href="https://merizimmedari.com/" target="_blank">
                <div class=" col-md-2 col-sm-9 ">
                  <a href="https://merizimmedari.com/" target="_blank">
                    <img
                      src={imagelogo}
                      target="_blank"
                      href="https://merizimmedari.com/"
                      style={{ width: "96px" }}
                      alt="#"
                    />
                  </a>
                </div>
              </a>
              <div class="col-md-10 col-sm-12 chgdfagdjagdagfagsf">
                <nav class="navigation navbar navbar-expand-md navbar-dark ">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample04"
                    aria-controls="navbarsExample04"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarsExample04">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item ">
                        <a
                          class="nav-link"
                          href="https://merizimmedari.com/WhatWeDo.html"
                        >
                          What We Do ?
                        </a>
                      </li>
                      <li class="nav-item ">
                        <a
                          class="nav-link"
                          href="https://merizimmedari.com/HowWeDo.html"
                        >
                          How It Works ?
                        </a>
                      </li>
                      <li class="nav-item ">
                        <a
                          class="nav-link"
                          href="https://merizimmedari.com/FAQ.html"
                        >
                          FAQ
                        </a>
                      </li>

                      <li class="nav-item ">
                        <a
                          class="nav-link"
                          href="https://merizimmedari.com/contact.html"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="https://user.merizimmedari.com/#/"
                          target="_blank"
                        >
                          sign-in<span style={{ fontSize: "22px" }}>/</span>
                          Sign-up
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="row " style={{ paddingTop: "5rem" }}>
          <div className="col-md-4 col-sm-1 col-lg-4 col-xl-4">
            <div></div>
          </div>
          {IsUserId ? (
            <div className="col-md-4 col-sm-10 col-lg-4 col-xl-4 mt-5 text-center">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12 d-flex">
                  <h2 className="" style={{ color: "green" }}>
                    User Already Verified
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="col-md-4 col-sm-10 col-lg-4 col-xl-4 ">
                <div
                  className="gdfhagfjhagjhfgagfjhaf"
                  style={{
                    margin: "1rem",
                    marginTop: "4rem",
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
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Meri Zimmedari
                    </div>
                  </div>

                  <div style={{ margin: "2rem" }}>
                    <div className="mt-3">
                      <form>
                        <fieldset
                          style={{
                            color: "rgb(82, 114, 161)",
                            fontSize: "20px",
                            fontFamily: "Calibri",
                            border: "1px solid rgb(114, 158, 216)",
                            borderRadius: "10px",
                            height: "4rem",
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
                            for="exampleInputPassword1"
                            class="form-label"
                          >
                            Mobile Number
                          </legend>
                          <button
                            id="country"
                            name="country"
                            style={{ border: "none", backgroundColor: "white" }}
                          >
                            <option
                              value="+91"
                              style={{
                                background: "transparent",
                                fontSize: "16px",
                              }}
                            >
                              IND (+91)
                            </option>
                          </button>
                          <input
                            required
                            maxLength={10}
                            className=""
                            style={{
                              border: "none",
                              outline: "none",
                              width: "60%",
                              fontSize: "17px",
                              paddingTop: "8px",
                            }}
                            type="tel"
                            id="mobile"
                            name="mobile"
                            pattern="[0-9]{10}"
                            error={isError}
                            value={phone}
                            onChange={handleChange}
                          />

                          {isError && (
                            <p
                              style={{
                                color: "red",
                                padding: "5px",
                                fontSize: "16px",
                                marginTop: "13px",
                              }}
                            >
                              Enter valid 10-digit mobile number
                            </p>
                          )}
                          {IsRegister && (
                            <p
                              style={{
                                color: "red",
                                padding: "5px",
                                fontSize: "16px",
                                marginTop: "13px",
                              }}
                            >
                              Mobile No.Not Register
                            </p>
                          )}
                        </fieldset>

                        <div className="mt-5">
                          <button
                            type="button"
                            class="btn "
                            style={{
                              width: "100%",
                              backgroundColor: "#4478c7",
                              color: "white",
                              height: "2.8rem",
                            }}
                            onClick={handleMobile}
                          >
                            Submit
                          </button>
                        </div>
                        <div className="mt-2">
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
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNumber;
