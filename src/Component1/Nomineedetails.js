import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./loader.css";
import Mynavbar from "./Mynavbar";
import axiosConfig from "./../axiosConfig";
const Nomineedetails = () => {
  const [nomineeList, setNomineeList] = useState([]);
  const [model, setModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userData = JSON.parse(localStorage.getItem("UserZimmedari"));
      await axiosConfig
        .get(`/asset/nominee-list/${userData?._id}`)
        .then(response => {
          setModel(false);
          setNomineeList(response.data.Nominee);
        })
        .catch(err => {
          setModel(true);
          console.log("err", err);
        });
    })();
  }, []);

  const handleEdit = item => {
    navigate("/nomineedetailsedit", { state: item });
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
          <span className="ml-3">My Account </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </span>
          <span> Nominee Details</span>
        </p>
      </div>
      {model == null ? (
        <>
          <div className="d-flex justify-content-center mt-5 mb-5">
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <div className="container">
          <div style={{ overflowX: "auto" }}>
            <table class="table">
              <thead>
                <tr className="rowColorHead">
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      color: "white",
                      width: "22%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "20px",
                    }}
                  >
                    Nominee Name
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      color: "white",
                      width: "21%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "20px",
                    }}
                  >
                    Relation with Nominee
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      color: "white",
                      width: "30%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "20px",
                    }}
                  >
                    Nominee Phone No.
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      color: "white",
                      width: "30%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "20px",
                    }}
                  >
                    Nominee E-mail ID
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      color: "white",
                      width: "30%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "20px",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {nomineeList &&
                  nomineeList?.map((item, index) => (
                    <tr key={index} className="rowColor">
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "white",
                          width: "22%",
                          borderRight: "2px solid white",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        {item?.nomineeName}
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "white",
                          width: "18%",
                          borderRight: "2px solid white",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        {item?.relationWithNominee}
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "white",

                          width: "30%",
                          borderRight: "2px solid white",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        {item?.NomineePhoneNumber}
                        <br></br>
                        {item?.mobileVerifyStatus}
                      </th>
                      <th
                        scope="col"
                        style={{
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "white",

                          width: "30%",
                          borderRight: "2px solid white",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        {item?.nomineeEmailId
                          ? item?.nomineeEmailId
                          : "Email Not Found"}
                        <br></br>
                        {item?.mailVerifyStatus}
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          // color: "black",
                          width: "30%",
                          borderRight: "2px solid white",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        <span className="btn icon-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            // color="rgb(43, 77, 129)"
                            color="green"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-pencil-square hoverable-image"
                            viewBox="0 0 16 16"
                            onClick={() => handleEdit(item)}
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                          <span
                            className="icon-name"
                            style={{ marginLeft: "2%" }}
                          >
                            Edit
                          </span>
                        </span>
                      </th>
                    </tr>
                  ))}

                <tr className="rowColor">
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      height: "3rem",
                      fontWeight: "500",
                      fontSize: "17px",
                      color: "black",
                      width: "22%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "15px",
                    }}
                  ></th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      fontSize: "17px",
                      color: "black",
                      width: "18%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "15px",
                    }}
                  ></th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      fontSize: "17px",
                      color: "black",
                      width: "30%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "15px",
                    }}
                  ></th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      fontSize: "17px",
                      color: "black",
                      width: "30%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "15px",
                    }}
                  ></th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      fontSize: "17px",
                      color: "black",
                      width: "30%",
                      borderRight: "2px solid white",
                      textAlign: "center",
                      lineHeight: "15px",
                    }}
                  ></th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container mt-5">
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
          </div>
        </div>
      )}
    </>
  );
};

export default Nomineedetails;
