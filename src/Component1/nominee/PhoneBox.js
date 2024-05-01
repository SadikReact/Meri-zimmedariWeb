import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
const PhoneBox = ({
  setModalSendOtp,
  setPhoneModalNotify,
  setPhoneRemark,
  setModalShow,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state;
  const [otp, setOtp] = useState(null);
  const [IsvalidOtp, setIsValidOtp] = useState(false);
  const [bool, setBool] = useState(null);
  const [count, setCount] = useState(60);
  const [isCountingComplete, setIsCountingComplete] = useState(false);

  //   useEffect(() => {
  //     if (count > 0) {
  //       setIsCountingComplete(false);
  //       const timer = setTimeout(() => {
  //         if (count > 0) setCount(count - 1);
  //       }, 1000);
  //       return () => clearTimeout(timer);
  //     } else {
  //       setIsCountingComplete(true);
  //     }
  //   }, [count]);

  //   const handleReset = () => {
  //     if (count > 0) {
  //       setIsCountingComplete(false);
  //       const timer = setTimeout(() => {
  //         if (count > 0) setCount(count - 1);
  //       }, 1000);
  //       // Clear the timer when the component unmounts or when resetting
  //       return () => clearTimeout(timer);
  //     } else {
  //       setIsCountingComplete(true);
  //       // Reset the count to 60 when the countdown is complete
  //       setCount(60);
  //     }
  //   };
  const handleCloseModal = () => {
    setModalSendOtp(false);
    setPhoneModalNotify(false);
    setPhoneRemark(true);
  };
  const handleOtpVerifyLater = () => {
    setPhoneRemark(true);
    setModalSendOtp(false);
    setPhoneModalNotify(false);
  };
  const handleOtpVerifyNow = () => {
    setModalShow(true);
    setPhoneRemark(true);
    setModalSendOtp(false);
    setPhoneModalNotify(false);
  };
  const handleOtpVerify = () => {
    let payload = {
      otp: Number(otp),
      mobileNo: Number(phoneNumber),
    };
    // axiosConfig
    //   .post("/otp-verify", payload)
    //   .then(response => {
    //     if (response.data.success == "ok") {
    //       console.log(response.data.User);
    //       setIsValidOtp(false);
    //       localStorage.setItem(
    //         "user_token",
    //         JSON.stringify(response.data.User.token)
    //       );
    //       localStorage.setItem(
    //         "UserZimmedari",
    //         JSON.stringify(response.data.User)
    //       );
    //       navigate("/dashboard", { replace: true });
    //     } else {
    //       navigate("/registration", { replace: true });
    //     }
    //   })
    //   .catch(error => {
    //     setIsValidOtp(true);
    //   });
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
              width: "400px",
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
                  We suggest you to please verify the Nominee Phone Number so
                  that necessary communication can be done if required
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

                  <div className="mt-3">
                    <button
                      type="button"
                      class="btn "
                      //   disabled={bool ? false : true}
                      style={{
                        backgroundColor: "#4478c7",
                        color: "white",
                        height: "2.8rem",
                        width: "45%",
                        margin: "5px",
                      }}
                      onClick={handleOtpVerifyLater}
                    >
                      Verify Later
                    </button>
                    <button
                      type="button"
                      class="btn "
                      //   disabled={bool ? false : true}
                      style={{
                        backgroundColor: "#4478c7",
                        color: "white",
                        height: "2.8rem",
                        width: "45%",
                        margin: "5px",
                      }}
                      onClick={handleOtpVerifyNow}
                    >
                      Verify Now
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

export default PhoneBox;
