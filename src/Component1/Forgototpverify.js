import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import Footer from "./Footer";
import NavBar from "./NavBar";
const Forgototpverify = () => {
  const [count, setCount] = useState(60);
  const [isCountingComplete, setIsCountingComplete] = useState(false);
  const [IsvalidOtp, setIsValidOtp] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state;

  // useEffect(() => {
  //   // let mobile = JSON.parse(localStorage.getItem("MobileNUM"));
  //   // console.log(mobile);
  // }, []);

  useEffect(() => {
    if (count > 0) {
      setIsCountingComplete(false);
      const timer = setTimeout(() => {
        if (count > 0) setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCountingComplete(true);
    }
  }, [count]);
  const handleChange = e => {
    let value = e.target.value;
    const newValue = value.replace(/\D/g, "").slice(0, 6);
    setOtp(Number(newValue));
  };
  const handleReset = () => {
    if (count > 0) {
      setIsCountingComplete(false);
      const timer = setTimeout(() => {
        if (count > 0) setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCountingComplete(true);
      setCount(60);
    }
  };
  const handleForgetPass = () => {
    const phone = JSON.parse(localStorage.getItem("MobileNUM"));
    const payload = {
      // userId:userId,
      mobileNo: phone,
      otp: Number(otp),
    };
    axiosConfig
      .post("/user/otp-verify", payload)
      .then(response => {
        // console.log(response.data.message);
        navigate("/forgot/password");
      })
      .catch(error => {
        console.log(error.response.data.error);
        setOtpMsg(error.response.data.error);
        setIsValidOtp(true);
      });
  };
  return (
    <>
      <div className="container-fluid " style={{ display: "inline-block" }}>
        <div
          class="header"
          style={{ marginLeft: "-15px", boxShadow: "0 0 10px  #2374ee" }}
        >
          <NavBar />
        </div>
        <div className="row " style={{ paddingTop: "5rem" }}>
          <div className="col-md-4 col-sm-2 col-lg-4 col-xl-4">
            <div></div>
          </div>
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 ">
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
                <div style={{ fontSize: "20px", fontWeight: "600" }}>
                  Verify OTP - Forgot Password
                </div>
              </div>

              <div style={{ margin: "2rem" }}>
                <div className=" mt-2">
                  <div>
                    <span className="p-1">
                      Please enter 6 digit OTP sent on mobile number
                    </span>
                    {JSON.parse(localStorage.getItem("MobileNUM"))}.
                  </div>
                  <Link to={"/"} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        color: "#4478c7",
                        fontWeight: "600",
                        marginTop: "5px",
                      }}
                    >
                      Change mobile number
                    </div>
                  </Link>
                </div>
                <div className="mt-3">
                  <form>
                    {IsvalidOtp ? (
                      <span
                      className="validationmobilefont"
                        style={{
                          color: "red",
                          padding: "2px",
                         
                        }}
                      >
                        {/* {otpMsg} */}
                        Enter Valid OTP
                      </span>
                    ) : null}

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
                          width: "5.5rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Enter OTP
                        <span style={{ marginLeft: "2px", color: "red" }}>
                          *
                        </span>
                      </legend>

                      <input
                        style={{
                          border: "none",
                          paddingTop: "4px",
                          outline: "none",
                          width: "100%",
                          paddingLeft: "15px",
                        }}
                        max={6}
                        type="tel"
                        id="otpNum"
                        name="otpNum"
                        value={otp}
                        onChange={handleChange}
                        // onChange={e => {
                        //   setOtp(e.target.value);
                        // }}
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
                        // required
                      />
                    </fieldset>

                    <div className="mt-2">
                      <span style={{ fontSize: "13px", color: "gray" }}>
                        Didn't receive the OTP?
                        <button
                          type="button"
                          style={{
                            cursor: "pointer",
                            border: "none",
                            padding: "0 4px",
                            textDecoration: "underline",
                          }}
                          disabled={isCountingComplete ? false : true}
                          onClick={handleReset}
                        >
                          Resend
                        </button>{" "}
                        after {count} Seconds
                      </span>
                      <span className="ml-1"></span>
                    </div>
                    <div className="mt-3">
                      {/* <Link to={"/forgot/password"}> */}
                      <button
                        type="button"
                        class="btn "
                        style={{
                          width: "100%",
                          backgroundColor: "#4478c7",
                          color: "white",
                          height: "2.8rem",
                        }}
                        onClick={handleForgetPass}
                      >
                        Submit
                      </button>
                      {/* </Link> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgototpverify;
