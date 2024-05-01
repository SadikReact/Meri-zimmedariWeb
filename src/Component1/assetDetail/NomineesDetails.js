import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
export const NomineesDetails = props => {
  // const [formValue, setFormValue] = useState(null);
  // useEffect(() => {
  //   // console.log(props.nominees);
  //   setFormValue(props.nominees);
  // }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="cssfornomineedetailsmodal cssformodalassetdetails">
        <Modal.Header
          style={{
            justifyContent: "right",
            display: "flex",
            padding: "0.1rem 0.1rem",
          }}
        >
          <div>
            <svg
              style={{ cursor: "pointer" }}
              onClick={props.onHide}
              viewBox="0 0 512 512"
              width="40"
              height="40"
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 512 512"
            >
              <path
                d="M256 33C132.3 33 32 133.3 32 257s100.3 224 224 224 224-100.3 224-224S379.7 33 256 33zm108.3 299.5c1.5 1.5 2.3 3.5 2.3 5.6 0 2.1-.8 4.2-2.3 5.6l-21.6 21.7c-1.6 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3L256 289.8l-75.4 75.7c-1.5 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6 0-2.1.8-4.2 2.3-5.6l75.7-76-75.9-75c-3.1-3.1-3.1-8.2 0-11.3l21.6-21.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l75.7 74.7 75.7-74.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l21.6 21.7c3.1 3.1 3.1 8.2 0 11.3l-75.9 75 75.6 75.9z"
                fill="#eb1515"
                class="fill-000000"
              ></path>
            </svg>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className="cssfornomineeformobileview"
            style={{ overflow: "auto" }}
          >
            <table className="table">
              <thead></thead>
              <tbody style={{ border: "none" }}>
                <tr style={{ backgroundColor: "rgb(176, 193, 219)" }}>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      width: "20%",
                      fontWeight: "700",
                      fontSize: "18px",
                      color: "rgb(43, 77, 129)",
                      borderRight: "2px solid white",
                      fontFamily: "Calibri",
                    }}
                  >
                    <div style={{ textAlign: "center", lineHeight: "20px" }}>
                      <span>Nominee</span>
                      <br></br>
                      <span>
                        Name<span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      width: "20%",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      textAlign: "center",
                      color: "rgb(43, 77, 129)",
                      borderRight: "2px solid white",
                    }}
                  >
                    <div style={{ textAlign: "center", lineHeight: "20px" }}>
                      <span>Relation with </span>
                      <br></br>
                      <span>
                        Nominee <span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      width: "20%",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      textAlign: "center",
                      color: "rgb(43, 77, 129)",
                      borderRight: "2px solid white",
                    }}
                  >
                    <div style={{ textAlign: "center", lineHeight: "20px" }}>
                      <span>Percentage of </span>
                      <br></br>
                      <span>
                        share <span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      width: "20%",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      textAlign: "center",
                      color: "rgb(43, 77, 129)",
                      borderRight: "2px solid white",
                      lineHeight: "20px",
                    }}
                  >
                    <div style={{ textAlign: "center", lineHeight: "20px" }}>
                      <span>Nominee</span>
                      <br></br>
                      <span>
                        Phone No.<span style={{ color: "red" }}>*</span>
                      </span>{" "}
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{
                      textTransform: "capitalize",
                      width: "20%",
                      fontWeight: "700",
                      fontSize: "18px",
                      fontFamily: "Calibri",
                      textAlign: "center",
                      color: "rgb(43, 77, 129)",
                      lineHeight: "20px",
                    }}
                  >
                    <div style={{ textAlign: "center", lineHeight: "20px" }}>
                      <span>Nominee</span>
                      <br></br>
                      <span>Mail ID</span>
                    </div>
                  </th>
                </tr>
                {props.nominees &&
                  props.nominees?.map((item, index) => (
                    <tr style={{ borderTop: "white" }} key={index}>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          width: "20%",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "black",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid rgb(176, 193, 219)",
                            height: "2.5rem",
                            paddingTop: "7px",
                            borderRadius: "10px",
                          }}
                        >
                          <input
                            type="text"
                            name="nomineeName"
                            value={item?.nomineeName}
                            style={{
                              border: "none",
                              width: "100%",
                              outline: "none",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              background: "transparent",
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          width: "20%",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "black",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid rgb(176, 193, 219)",
                            height: "2.5rem",
                            paddingTop: "7px",
                            borderRadius: "10px",
                          }}
                        >
                          <input
                            type="text"
                            name="relationWithNominee"
                            value={item?.relationWithNominee}
                            style={{
                              border: "none",
                              width: "100%",
                              outline: "none",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              background: "transparent",
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          width: "20%",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "black",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid rgb(176, 193, 219)",
                            height: "2.5rem",
                            paddingTop: "7px",
                            borderRadius: "10px",
                          }}
                        >
                          <input
                            type="tel"
                            placeholder="XX"
                            name="percentageofShar"
                            value={item?.percentageofShar}
                            style={{
                              border: "none",
                              width: "27%",
                              outline: "none",
                              // paddingLeft: "5px",
                              // paddingRight: "5px",
                              background: "transparent",
                            }}
                          />
                          %
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          width: "20%",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "black",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid rgb(176, 193, 219)",
                            height: "2.5rem",
                            paddingTop: "7px",
                            borderRadius: "10px",
                          }}
                        >
                          <input
                            type="tel"
                            name="NomineePhoneNumber"
                            value={item?.NomineePhoneNumber}
                            style={{
                              border: "none",
                              width: "100%",
                              outline: "none",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              background: "transparent",
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{
                          textTransform: "capitalize",
                          width: "30%",
                          fontWeight: "normal",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          color: "black",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid rgb(176, 193, 219)",
                            height: "2.5rem",
                            paddingTop: "7px",
                            borderRadius: "10px",
                          }}
                        >
                          <input
                            type="email"
                            name="nomineeEmailId"
                            value={item?.nomineeEmailId}
                            style={{
                              border: "none",
                              width: "100%",
                              outline: "none",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              background: "transparent",
                            }}
                          />
                        </div>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div style={{ textAlign: "center", fontSize: "18px" }}>
              To edit nominee detail, close this screen and click on edit
              button.
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};
