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
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   console.log("newOTP", location.state);
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
  const sendSMS = async () => {
    let newOTP = Math.floor(100000 + Math.random() * 900000);
    let MobileNUM = JSON.parse(localStorage.getItem("MobileNUM"));
    console.log(newOTP, MobileNUM);
    try {
      const allUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=dlt&sender_id=MRZMDR&message=167804&variables_values=${newOTP}&flash=0&numbers=${MobileNUM}`;

      const response = await axiosConfig.get(allUrl);
      // setResponse(response.data);
      navigate("/Forgot/password/otp", { state: newOTP });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
      sendSMS();
    }
  };
  const handleForgetPass = () => {
    let MobileNUM = JSON.parse(localStorage.getItem("MobileNUM"));
    if (location.state && location.state == otp) {
      const payload = {
        mobileNo: MobileNUM,
        otp: Number(123400),
      };
      axiosConfig
        .post("/user/otp-verify", payload)
        .then(response => {
          console.log(response.data.message);
          navigate("/forgot/password");
        })
        .catch(error => {
          console.log(error.response);
          // setOtpMsg(error.response.data.error);
          // setIsValidOtp(true);
        });
    } else {
      setIsValidOtp(true);
    }
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
