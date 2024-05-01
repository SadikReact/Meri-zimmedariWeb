import React, { useState, useEffect } from "react";
import Mynavbar from "./Mynavbar";
import axiosConfig from "../axiosConfig";

const Preview = () => {
  const [showIcon, setShowIcon] = useState([]); // State to manage icon visibility for each card
  const [NomineeList, setNomineeList] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserZimmedari"));
    axiosConfig
      .get(`/asset/nominee-list/${userData._id}`)
      .then((response) => {
        setNomineeList(response.data?.Nominee);
        // console.log(response.data?.Nominee);
      })
      .catch((err) => {
        setNomineeList([]);

        console.log("err", err);
      });
  }, []);

  const toggleIcon = (index) => {
    const updatedIcons = [false, false];
    updatedIcons[index] = true;
    console.log(updatedIcons);
    setShowIcon(updatedIcons);
  };
  return (
    <>
      <Mynavbar />
      <div>
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
            <span> Preview</span>
          </p>
        </div>
        <div className="container">
          <p style={{ fontSize: "20px" }}>
            Each nominee receives information of only those assets for which the
            user has designated them as a nominee.
          </p>
          <p style={{ fontSize: "20px" }}>
            This page provides a preview of the final document tailored for each
            nominee.
          </p>
          <p style={{ fontSize: "20px" }}>
            Select the nominee to preview his final document.
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-1 col-xl-1 col-lg-1"></div>
            {NomineeList?.length > 0 && (
              <>
                {NomineeList?.map((ele, index) => (
                  <div
                    key={index}
                    className="col-md-2 col-xl-2 col-lg-2 col-sm-4 col-6"
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleIcon(index)}
                    >
                      <div>
                        {showIcon[index] && (
                          <svg
                            style={{ position: "absolute", right: "30px" }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="cssforhandlesvgiconofpayment1"
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
                      <div
                        className="mt-5"
                        style={{ justifyContent: "center", display: "flex" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="130"
                          height="130"
                          fill="currentColor"
                          class="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
                      </div>
                      <p style={{ textAlign: "center", fontSize: "20px" }}>
                        {ele?.nomineeName && ele?.nomineeName} <br></br>(
                        {ele?.relationWithNominee && ele?.relationWithNominee})
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* <div className="col-md-2 col-xl-2 col-lg-2 col-sm-4 col-6">
              <div style={{ cursor: "pointer" }} onClick={() => toggleIcon(1)}>
                <div>
                  {showIcon[1] && (
                    <svg
                      style={{ position: "absolute", right: "30px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="cssforhandlesvgiconofpayment1"
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
                <div
                  className="mt-5"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    height="130"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  BCD <br></br>(Brother)
                </p>
              </div>
            </div>
            <div className="col-md-2 col-xl-2 col-lg-2 col-sm-4 col-6">
              <div style={{ cursor: "pointer" }} onClick={() => toggleIcon(2)}>
                <div>
                  {showIcon[2] && (
                    <svg
                      style={{ position: "absolute", right: "30px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="cssforhandlesvgiconofpayment1"
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
                <div
                  className="mt-5"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    height="130"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  DEF <br></br>(Sister)
                </p>
              </div>
            </div>
            <div className="col-md-2 col-xl-2 col-lg-2 col-sm-4 col-6">
              <div style={{ cursor: "pointer" }} onClick={() => toggleIcon(3)}>
                <div>
                  {showIcon[3] && (
                    <svg
                      style={{ position: "absolute", right: "30px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="cssforhandlesvgiconofpayment1"
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
                <div
                  className="mt-5"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    height="130"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  EFG <br></br>(Father)
                </p>
              </div>
            </div>
            <div className="col-md-2 col-xl-2 col-lg-2 col-sm-4 col-6">
              <div style={{ cursor: "pointer" }} onClick={() => toggleIcon(4)}>
                <div>
                  {showIcon[4] && (
                    <svg
                      style={{ position: "absolute", right: "30px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="cssforhandlesvgiconofpayment1"
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
                <div
                  className="mt-5"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    height="130"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  XYZ <br></br>(Mother)
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
