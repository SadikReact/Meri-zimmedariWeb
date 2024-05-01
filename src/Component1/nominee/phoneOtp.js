import React, { useEffect, useState } from "react";
import axiosConfig from "../../axiosConfig";

const PhoneOtp = ({ setModalShow, myNumber, newOtp }) => {
  const [otp, setOtp] = useState(null);
  const [IsvalidOtp, setIsValidOtp] = useState(false);
  const [bool, setBool] = useState(null);
  const [count, setCount] = useState(60);
  const [isCountingComplete, setIsCountingComplete] = useState(false);

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

  const handleReset = () => {
    if (count > 0) {
      setIsCountingComplete(false);
      const timer = setTimeout(() => {
        if (count > 0) setCount(count - 1);
      }, 1000);
      // Clear the timer when the component unmounts or when resetting
      return () => clearTimeout(timer);
    } else {
      setIsCountingComplete(true);
      // Reset the count to 60 when the countdown is complete
      setCount(60);
    }
  };
  const handleCloseModal = () => {
    setModalShow(false);
  };
  const handleOtpVerify = () => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    let payload = {
      userId: user?._id,
      mobileNo: Number(myNumber),
      otp: 123400,
      // mobileVerifyStatus: "verify",
      // otp: Number(otp),
    };

    if (newOtp === otp) {
      axiosConfig
        .post("/asset/otp-verify-mobile", payload)
        .then(response => {
          setModalShow(false);
          // console.log("response", response.data);
        })
        .catch(error => {
          console.log("response", error);
          setIsValidOtp(true);
        });
    } else {
      setIsValidOtp(true);
    }
  };
  return (
    <>
      <div className="row " style={{ paddingTop: "5rem" }}>
        <div className="col-md-12 col-sm-2 col-lg-12 col-xl-12">
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
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginLeft: "1rem",
                }}
              >
                Verify OTP
              </span>
              <span
                onClick={handleCloseModal}
                style={{
                  float: "right",
                  marginRight: "1rem",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                X
              </span>
            </div>

            <div style={{ margin: "2rem" }}>
              <div className=" mt-2">
                <div className="mb-3">
                  Please enter 6 digit OTP sent on mobile number
                  <span className="px-2">{myNumber && myNumber}</span>.
                </div>
                <div
                  style={{
                    color: "#4478c7",
                    fontWeight: "600",
                    marginTop: "5px",
                  }}
                  onClick={handleCloseModal}
                >
                  Change mobile number
                </div>
              </div>
              <div className="mt-4">
                <form>
                  {IsvalidOtp ? (
                    <span
                      style={{
                        color: "red",
                        padding: "2px",
                        fontSize: "16px",
                      }}
                    >
                      Invalid OTP
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
                      <span style={{ marginLeft: "2px", color: "red" }}>*</span>
                    </legend>

                    <input
                      maxLength={6}
                      style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        paddingLeft: "15px",
                        paddingTop: "5px",
                      }}
                      max={6}
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={otp}
                      onChange={e => {
                        setOtp(e.target.value);
                        setBool(true);
                      }}
                      required
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
                      </button>
                      after {count} Seconds
                    </span>
                    <span className="ml-1"></span>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      class="btn "
                      disabled={bool ? false : true}
                      style={{
                        width: "100%",
                        backgroundColor: "#4478c7",
                        color: "white",
                        height: "2.8rem",
                      }}
                      onClick={handleOtpVerify}
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
    </>
  );
};

export default PhoneOtp;
