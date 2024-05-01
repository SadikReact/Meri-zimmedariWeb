import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import swal from "sweetalert";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Loginwithpassword = () => {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state;

  const handleFormSubmit = e => {
    e.preventDefault();
    let payload = {
      mobileNo: Number(phoneNumber),
      password: password,
    };
    if (phoneNumber?.length == 10) {
      setIsError(false);
      axiosConfig
        .post("/user/singin-password", payload)
        .then(response => {
          // console.log(response);
          if (response.status == 200) {
            localStorage.setItem(
              "UserZimmedari",
              JSON.stringify(response.data.User)
            );
            localStorage.setItem(
              "user_token",
              JSON.stringify(response.data.User.token)
            );
            swal("Login Successfully");
            navigate("/dashboard");
          } else {
            setIsInvalid("Invalid Credentials");
          }
        })
        .catch(error => {
          setIsInvalid(true);
          setIsInvalid(error?.response?.data?.message);
          console.log(error.response.data.message);
        });
    } else {
      // setIsError(true);
    }
  };
  const handleForgetPassword = () => {
    axiosConfig
      .post("/user/forget-password", { mobileNo: Number(phoneNumber) })
      .then(response => {
        console.log(response.data);
        // navigate("/forgot/password");
        navigate("/Forgot/password/otp");
      })
      .catch(error => {
        //  setIsValidOtp(true);
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
          <div className="col-md-4 col-sm-1 col-lg-4 col-xl-4">
            <div></div>
          </div>
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
                <div style={{ fontSize: "20px", fontWeight: "600" }}>
                  Verify Password
                </div>
              </div>

              <div style={{ margin: "2rem" }}>
                <div className=" mt-2">
                  <div className="mb-3">
                    Please enter the password linked with mobile number
                    <span className="px-1"> {phoneNumber}</span>.
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
                  <form onSubmit={handleFormSubmit}>
                    {isInvalid && (
                      <span
                        className="validationmobilefont"
                        style={{
                          color: "red",
                          padding: "2px",
                        }}
                      >
                        {isInvalid}
                      </span>
                    )}
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
                          width: "7.5rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Enter Password{" "}
                        <span style={{ marginLeft: "2px", color: "red" }}>
                          *
                        </span>
                      </legend>

                      <input
                        style={{
                          border: "none",
                          outline: "none",
                          width: "100%",
                          paddingLeft: "15px",
                          paddingTop: "3px",
                        }}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                    </fieldset>

                    <div className="mt-2">
                      <span className="ml-1">
                        <span
                          onClick={handleForgetPassword} // corrected function name
                          style={{
                            textDecoration: "none",
                            color: "#007bff",
                            cursor: "pointer",
                          }}
                        >
                          Forgot Password
                        </span>

                        {/* <Link
                          onClick={handleForgetpassword}
                          // to={"/Forgot/password/otp"}
                          style={{ textDecoration: "none" }}
                        >
                          Forgot Password
                        </Link> */}
                      </span>
                    </div>
                    <div className="mt-3">
                      <button
                        type="submit"
                        class="btn "
                        style={{
                          width: "100%",
                          backgroundColor: "#4478c7",
                          color: "white",
                          height: "2.8rem",
                        }}
                      >
                        Sign In
                      </button>
                    </div>
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

export default Loginwithpassword;
