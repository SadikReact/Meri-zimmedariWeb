import React, { useEffect, useState } from "react";
import Mynavbar from "./Mynavbar";
import axiosConfig from "../axiosConfig";
import GateWay from "../Payment/Payment";

const Payment = () => {
  const [showIcon, setShowIcon] = useState([false, false]); // State to manage icon visibility for each card
  const [USer, setUser] = useState({});
  const [selectedPlan, setselectedPlan] = useState({});
  const [plan, setplan] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const toggleIcon = index => {
    const updatedIcons = [false, false];
    updatedIcons[index] = true;
    setShowIcon(updatedIcons);
  };
  const handleCheckboxChange = () => {
    // Toggle the isChecked state when the checkbox is clicked
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    setUser(user);
    axiosConfig
      .get("/plan/view-plan")
      .then(res => {
        setplan(res?.data?.Plan);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);
  const handleSelectPlan = data => {
    setselectedPlan(data);
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
          <span className="ml-3">Choose the plan that’s right for you</span>
          <span></span>
        </p>
      </div>
      <div>
        <div className="container-fluid mt-5">
          <div className="row ">
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="container">
                <div className="row">
                  {plan?.length > 0 ? (
                    <>
                      {plan?.map((ele, i) => (
                        <div
                          key={i}
                          className="col-md-6 col-sm-6 col-lg-6 col-xl-6 mt-4"
                        >
                          <div
                            className="card"
                            style={{
                              borderRadius: "10px",
                              border: "1px solid rgb(6, 43, 165)",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              toggleIcon(i);
                              handleSelectPlan(ele);
                            }}
                          >
                            <div>
                              {showIcon[i] && (
                                <svg
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="cssforhandlesvgiconofpayment"
                                  width="50"
                                  height="50"
                                  viewBox="0,0,256,256"
                                >
                                  <g
                                    fill="none"
                                    fill-rule="nonzero"
                                    stroke="none"
                                    stroke-width="1"
                                    stroke-linecap="butt"
                                    stroke-linejoin="miter"
                                    stroke-miterlimit="10"
                                    stroke-dasharray=""
                                    stroke-dashoffset="0"
                                    font-family="none"
                                    font-weight="none"
                                    font-size="none"
                                    text-anchor="none"
                                  >
                                    <g transform="scale(0.5,0.5)">
                                      <path
                                        d="M504.1,256c0,-137 -111.1,-248.1 -248.1,-248.1c-137,0 -248.1,111.1 -248.1,248.1c0,137 111.1,248.1 248.1,248.1c137,0 248.1,-111.1 248.1,-248.1z"
                                        fill="#10a614"
                                      ></path>
                                      <path
                                        d="M392.6,172.9c-5.8,-15.1 -17.7,-12.7 -30.6,-10.1c-7.7,1.6 -42,11.6 -96.1,68.8c-22.5,23.7 -37.3,42.6 -47.1,57c-6,-7.3 -12.8,-15.2 -20,-22.3c-22.1,-22.1 -46.8,-37.3 -47.8,-37.9c-10.3,-6.3 -23.8,-3.1 -30.2,7.3c-6.3,10.3 -3.1,23.8 7.2,30.2c0.2,0.1 21.4,13.2 39.6,31.5c18.6,18.6 35.5,43.8 35.7,44.1c4.1,6.2 11,9.8 18.3,9.8c1.2,0 2.5,-0.1 3.8,-0.3c8.6,-1.5 15.4,-7.9 17.5,-16.3c0.1,-0.2 8.8,-24.3 54.7,-72.7c37,-39.1 61.7,-51.5 70.3,-54.9c0.1,0 0.1,0 0.3,0c0,0 0.3,-0.1 0.8,-0.4c1.5,-0.6 2.3,-0.8 2.3,-0.8c-0.4,0.1 -0.6,0.1 -0.6,0.1v-0.1c4,-1.7 11.4,-4.9 11.5,-5c11.1,-4.8 14.8,-16.8 10.4,-28z"
                                        fill="#ffffff"
                                      ></path>
                                    </g>
                                  </g>
                                </svg>
                              )}
                            </div>
                            <div className="card-body">
                              <div
                                style={{
                                  justifyContent: "center",
                                  display: "flex",
                                }}
                              >
                                <button
                                  style={{
                                    width: "90%",
                                    height: "3rem",
                                    backgroundColor: "rgb(6, 43, 165)",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "10px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {ele?.planType}
                                </button>
                              </div>
                              <div>
                                <p
                                  style={{
                                    marginTop: "1.5rem",
                                    color: "rgb(6, 43, 165)",
                                    fontSize: "18px",
                                  }}
                                >
                                  Price: ₹ {ele?.price}
                                </p>
                              </div>
                              <div>
                                <p
                                  style={{
                                    borderTop: "1px dashed  #000",
                                    borderSpacing: "1px",
                                  }}
                                ></p>
                              </div>
                              <div>
                                <span
                                  style={{
                                    color: "rgb(6, 43, 165)",
                                    fontSize: "18px",
                                  }}
                                >
                                  Asset allowed to{" "}
                                </span>
                                <p
                                  style={{
                                    color: "rgb(6, 43, 165)",
                                    fontSize: "18px",
                                  }}
                                >
                                  upload : Unlimited
                                </p>
                              </div>
                              <div>
                                <p
                                  style={{
                                    borderTop: "1px dashed  #000",
                                    borderSpacing: "1px",
                                  }}
                                ></p>
                              </div>
                              <div>
                                <span
                                  style={{
                                    color: "rgb(6, 43, 165)",
                                    fontSize: "18px",
                                  }}
                                >
                                  Nominee details{" "}
                                </span>
                                <br></br>
                                <span
                                  style={{
                                    color: "rgb(6, 43, 165)",
                                    fontSize: "18px",
                                  }}
                                >
                                  allowed to upload{" "}
                                </span>
                                <br></br>
                                <span
                                  style={{
                                    color: "rgb(6, 43, 165)",
                                    fontSize: "18px",
                                  }}
                                >
                                  Unlimited{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-1 col-lg-1 col-xl-1 cssforborderadjustforalldevice1">
              <div className="cssforborderadjustforalldevice"></div>
              <div class="vertical-line001">
                <div class="dot001 top-dot001"></div>
                <div class="line001"></div>
                <div class="dot001 bottom-dot001"></div>
              </div>
              <div class="horizontal-line001">
                <div class="endpoint-dot001 left-dot001"></div>
                <div class="endpoint-dot001 right-dot001"></div>
              </div>
            </div>
            <div className="col-md-5 col-lg-5 col-xl-5">
              <div className="container">
                <div
                  className="card"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid rgb(6, 43, 165)",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body">
                    <div className="mb-1">
                      <p style={{ color: "rgb(6, 43, 165)", fontSize: "18px" }}>
                        <span style={{ float: "left" }}>Membership Plan</span>
                        <span style={{ float: "right" }}>
                          {selectedPlan?.planType ? (
                            <>{selectedPlan?.planType}</>
                          ) : (
                            "NA"
                          )}
                        </span>
                        <br></br>
                      </p>
                    </div>
                    <div>
                      <p style={{ borderTop: "1px dashed  #000" }}></p>
                    </div>
                    <div className="mb-1">
                      <p style={{ color: "rgb(6, 43, 165)", fontSize: "18px" }}>
                        <span style={{ float: "left" }}>Subscription fee</span>
                        <span style={{ float: "right" }}>
                          ₹{" "}
                          {selectedPlan?.price ? (
                            <>{selectedPlan?.price}</>
                          ) : (
                            "NA"
                          )}
                        </span>
                        <br></br>
                        <span>(Inclusive of all taxes)</span>
                      </p>
                    </div>
                    <div>
                      <p style={{ borderTop: "1px dashed  #000" }}></p>
                    </div>
                    <div>
                      <p style={{ color: "rgb(6, 43, 165)", fontSize: "18px" }}>
                        By checking the checkbox below, you agree to our terms &
                        conditions and privacy policy Meri Zimmedari will
                        automatically continue your membership and charge the
                        membership fee to your payment method until you cancel.
                        you may cancel at any time to avoid future charges.
                      </p>
                      <div class="form-check">
                        <input
                          required
                          class="form-check-input cssforcheckboxstylepayment"
                          type="checkbox"
                          value=""
                          onChange={handleCheckboxChange}
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault"
                          style={{
                            color: "rgb(6, 43, 165)",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          I Agree
                        </label>
                      </div>
                      <div
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          marginTop: "15px",
                        }}
                      >
                        <button
                          disabled={!isChecked}
                          style={{
                            backgroundColor: "none",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <GateWay selectedPlan={selectedPlan} USer={USer} />
                        </button>

                        {/* <button
                          style={{
                            width: "90%",
                            height: "3rem",
                            backgroundColor: "rgb(6, 43, 165)",
                            border: "none",
                            color: "white",
                            borderRadius: "10px",
                          }}
                        >
                          Proceed to checkout
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
