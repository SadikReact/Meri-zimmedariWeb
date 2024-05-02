import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import axiosConfig from "../axiosConfig";
import Mynavbar from "./Mynavbar";

import "./dashboard.css";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 40,
  fontWeight: 600,
}));

const Index = () => {
  let arr = [];
  const [PaymentStatus, setPaymentStatus] = useState({});
  const [user, setUser] = useState("");
  const [userPercentage, setUserPercentage] = useState("");
  const [assetList, setAssetList] = useState("");
  const [actionLength, setActionLength] = useState("");
  const [nomineeList, setNomineeList] = useState([]);
  const [futureDate, setFutureDate] = useState("");
  const pieParams = {
    width: 160,
    height: 160,
    margin: { right: 3 },
  };
  // const pieParams = { margin: { right: 60 } };

  useEffect(() => {
    // let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    axiosConfig
      .get(`/asset/nominee-list/${user?._id}`)
      .then(response => {
        // console.log(response.data.Nominee);
        let lengthSize = response.data.Nominee.filter(item =>
          item.mailVerifyStatus.includes("Not Verified")
            ? item.mailVerifyStatus.length
            : null
        );
        let lengthSize1 = response.data.Nominee.filter(item =>
          item.mobileVerifyStatus.includes("Not Verified")
            ? item.mobileVerifyStatus.length
            : null
        );
        // console.log(lengthSize.length);
        setActionLength(lengthSize.length + lengthSize1.length);
        // console.log(lengthSize.length + lengthSize1.length);
        setNomineeList(response.data.Nominee);
      })
      .catch(err => {
        console.log("err", err);
      });
    axiosConfig
      .get("/payment/view-payment-by-userId/" + user?._id)
      .then(res => {
        // console.log(res?.data);
        let length = res?.data?.Payment?.length - 1;
        localStorage.setItem("PaymentList", JSON.stringify(res?.data?.Payment));
        if (res?.data?.Payment) {
          setPaymentStatus(res?.data?.Payment[length]);
        }
      })
      .catch(err => {
        // console.log("PaymentError", err?.response?.data?.message);
      });

    axiosConfig
      .get(`/asset/view-assets-userId/${user?._id}`)
      .then(response => {
        setAssetList(response.data.Asset);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });

    axiosConfig
      .get(`/life-declaration/view-life-declaration/${user?._id}`)
      .then(res => {
        calculateFutureDate(res?.data?.Life.lastDeclarationDate);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));

    let totalPercenatage = 100;
    if (user) {
      // console.log(user)
      if (user?.firstName.length > 1) {
        arr.push(totalPercenatage / 6);
      }
      if (user?.email.length > 1) {
        arr.push(totalPercenatage / 6);
      }

      if (user?.mobileNo || user?.mobileNo !== null) {
        arr.push(totalPercenatage / 6);
      }
      if (user?.gender.length > 1) {
        arr.push(totalPercenatage / 6);
      }
      if (user?.dob.length > 1) {
        arr.push(totalPercenatage / 6);
      }
      if (user?.image) {
        arr.push(totalPercenatage / 6);
      }
      let total = arr.reduce((current, total) => current + total, 0);
      setUserPercentage(total);
      setUser(user);
    }
  }, []);
  const calculateFutureDate = currectDates => {
    const currentDateNew = new Date(currectDates);
    currentDateNew.setDate(currentDateNew.getDate() + 15);
    const futureDates = currentDateNew.toISOString().split("T")[0];
    const date = new Date(futureDates);

    // Get the month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()]; // Get month name from the array

    // Get the day
    const day = date.getDate(); // Get the day of the month

    // Get the year
    const year = date.getFullYear(); // Get the year
    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day < 10 ? "0" : ""}${day}`;

    setFutureDate(formattedDate);
  };

  const PieCenterLabel = ({ children }) => {
    const { width, height, left, top } = useDrawingArea();

    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {userPercentage && userPercentage ? userPercentage.toFixed() : 0}%
      </StyledText>
    );
  };
  return (
    <>
      <Mynavbar />
      <div className="">
        <p
          style={{
            fontSize: "22px",
            color: "rgb(43, 77, 129)",
            fontWeight: "400",
            backgroundImage:
              "linear-gradient(to right, rgb(174, 191, 207) , rgb(229, 234, 238))",
          }}
        >
          <span className="ml-3">Dashboard </span>
          <span></span>
        </p>
        <div className="mt-5 container-fluid">
          <div className="row">
            <div className="col-md-4 col-xl-4 col-lg-4">
              <Link style={{ textDecoration: "none" }} to={"/add-asset"}>
                <div
                  className="m-2"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <div
                    className="cssforboxwidthsetinmobileanddesktopveiw"
                    style={{
                      border: "1px solid rgb(43, 77, 129)",
                      height: "8rem",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "rgb(43, 77, 129)",
                        padding: "10px",
                        backgroundImage:
                          "linear-gradient(to right, rgb(174, 191, 207) , rgb(243, 227, 175))",
                      }}
                    >
                      ASSET ADDED
                    </div>
                    <p style={{ textAlign: "center" }}>
                      <span
                        style={{ fontSize: "44px", color: "rgb(43, 77, 129)" }}
                      >
                        {assetList.length}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          color: "rgb(43, 77, 129)",
                          marginLeft: "5px",
                        }}
                      >
                        ASSET
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-xl-4 col-lg-4">
              <Link style={{ textDecoration: "none" }} to={"/lifedeclaration"}>
                <div
                  className="m-2"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <div
                    style={{
                      border: "1px solid rgb(43, 77, 129)",
                      width: "100%",
                      height: "8rem",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "rgb(43, 77, 129)",
                        padding: "10px",
                        backgroundImage:
                          "linear-gradient(to right, rgb(174, 191, 207) , rgb(243, 227, 175))",
                      }}
                    >
                      HEALTH DECLERATION STATUS
                    </div>
                    <p className="m-3">
                      <span
                        style={{
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                          float: "left",
                        }}
                      >
                        NEXT DUE DATE
                      </span>
                      <span
                        style={{
                          justifyContent: "right",
                          display: "flex",
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                        }}
                      >
                        {/* {PaymentStatus?.nextPaymentDate ? (
                          <>{PaymentStatus?.nextPaymentDate}</>
                        ) : (
                          "NA"
                        )} */}
                        {futureDate ? <>{futureDate}</> : "NA"}
                      </span>

                      <span
                        style={{
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                          float: "left",
                        }}
                      >
                        LAST SUBMITTED ON
                      </span>
                      <span
                        style={{
                          justifyContent: "right",
                          display: "flex",
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                        }}
                      >
                        {PaymentStatus?.lastPaymentDate ? (
                          <>{PaymentStatus?.lastPaymentDate}</>
                        ) : (
                          "NA"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-xl-4 col-lg-4">
              <Link style={{ textDecoration: "none" }} to={"/payment"}>
                <div
                  className="m-2"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <div
                    className="cssforboxwidthsetinmobileanddesktopveiw"
                    style={{
                      border: "1px solid rgb(43, 77, 129)",
                      height: "8rem",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "rgb(43, 77, 129)",
                        padding: "10px",
                        backgroundImage:
                          "linear-gradient(to right, rgb(174, 191, 207) , rgb(243, 227, 175))",
                      }}
                    >
                      SUBSCRIPTION STATUS
                    </div>
                    <p className="m-3">
                      <span
                        style={{
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                          fontWeight: "700",
                        }}
                      >
                        {PaymentStatus?.status
                          ? PaymentStatus?.status
                          : "Inactive"}
                      </span>
                      <br></br>
                      <span
                        style={{
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                          float: "left",
                        }}
                      >
                        NEXT DUE DATE
                      </span>
                      <span
                        style={{
                          justifyContent: "right",
                          display: "flex",
                          fontSize: "17px",
                          color: "rgb(43, 77, 129)",
                        }}
                      >
                        {PaymentStatus?.nextPaymentDate ? (
                          <> {PaymentStatus?.nextPaymentDate}</>
                        ) : (
                          "NA"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-5 container-fluid">
          <div class="horizontal-line">
            <div class="endpoint-dot left-dot"></div>
            <div class="endpoint-dot right-dot"></div>
          </div>
        </div>
        <div className="mt-5 container-fluid">
          <div className="row">
            <div className="col-md-7 col-xl-7 col-lg-7 ">
              <div
                className="m-2"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <div
                className="cssforindexaction"
                  style={{
                    border: "1px solid rgb(43, 77, 129)",
                    width: "100%",
                   
                    borderTopLeftRadius: "20px",
                  }}
                >
                  <div className="row">
                    <div className="col-md-4 col-xl-4 col-lg-4 col-12 col-sm-4 ">
                      <div className="m-3">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-6">
                            <span
                              style={{
                                fontSize: "80px",
                                color: "rgb(43, 77, 129)",
                              }}
                            >
                              {actionLength ? actionLength + 1 : 0}
                            </span>
                          </div>
                          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-6">
                            <p
                              style={{
                                fontSize: "25px",
                                fontWeight: "600",
                                color: "rgb(43, 77, 129)",
                              }}
                            >
                              ACTION<br></br> ITEM <br></br>PENDING
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 col-xl-8 col-lg-8 col-12 col-sm-8">
                      <div style={{ overflow: "auto", height: "10.1rem" }}>
                        {nomineeList.map((item, ind) => (
                          <>
                            {item?._id.includes("663104e7aec036a0bb79c0a3") && (
                              <div
                                className="actionItem"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to right, rgb(174, 191, 207) , rgb(229, 234, 238))",
                                }}
                              >
                                Renew Subscription, expiring in 15 days
                              </div>
                            )}

                            {item.mailVerifyStatus.includes("Not Verified") && (
                              <div
                                className=" actionItem"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to right, rgb(174, 191, 207) , rgb(229, 234, 238))",
                                }}
                              >
                                Validate Nominee e-mail ID
                              </div>
                            )}
                            {item.mobileVerifyStatus.includes(
                              "Not Verified"
                            ) && (
                              <div
                                className="actionItem"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to right, rgb(243, 206, 175) , rgb(250, 252, 253))",
                                }}
                              >
                                Validate Nominee Phone Number
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-xl-5 col-lg-5">
              <div className="m-2 cssformobileindexveiw" >
                <div
                  className="row "
                  style={{
                    border: "1px solid rgb(43, 77, 129)",
                    backgroundImage:
                      "linear-gradient(to right, rgb(194, 215, 233) , rgb(254, 254, 255))",
                    borderBottomRightRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                >
                  <div
                    className="col-md-7 col-xl-7 col-lg-7"
                    style={{ height: "10rem" }}
                  >
                    <p
                      className="mt-5"
                      style={{
                        fontSize: "20px",
                        color: "rgb(43, 77, 129)",
                        fontWeight: "700",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      USER PROFILE <br></br>COMPLETION STATUS
                    </p>
                  </div>
                  <div
                    className="col-md-5 col-xl-5 col-lg-5 pieChart"
                    style={{
                      height: "10.1rem",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <PieChart
                      style={{
                        display: "inline",
                      }}
                      className="pieArea"
                      series={[
                        {
                          // data: [
                          //   { value: 80, color: "rgb(52, 145, 233)" },
                          //   { value: 20, color: "rgb(235, 139, 94)" },
                          // ],
                          data: [
                            {
                              value: `${userPercentage}`,
                              color: "rgb(52, 145, 233)",
                            },
                            {
                              value: `${100 - userPercentage}`,
                              color: "rgb(235, 139, 94)",
                            },
                          ],
                          innerRadius: 70,
                        },
                      ]}
                      {...pieParams}
                    >
                      <PieCenterLabel className="pieName">
                        Center label
                      </PieCenterLabel>
                    </PieChart>
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

export default Index;
