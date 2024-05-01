import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import axiosConfig from "../axiosConfig";

import { Link } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import Payment from "../Payment/Payment";
import Axios from "axios";

const Subscriptioninvoices = (args) => {
  const [modal, setModal] = useState(false);
  const [selectedPlan, setselectedPlan] = useState({});
  const [PaymentStatus, setPaymentStatus] = useState({});
  const [USer, setUser] = useState({});
  const [plan, setplan] = useState([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    console.log(user);
    setUser(user);
    axiosConfig
      .get("/plan/view-plan")
      .then((res) => {
        setplan(res?.data?.Plan);
      })
      .catch((err) => {
        console.log(err.response);
      });
    axiosConfig
      .get("/payment/view-payment-by-userId/" + user?._id)
      .then((res) => {
        // console.log(res?.data?.Payment);
        let length = res?.data?.Payment?.length - 1;
        if (res?.data?.Payment) {
          setPaymentStatus(res?.data?.Payment[length]);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const handleSelectPlan = (data) => {
    setselectedPlan(data);
    toggle();
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
          <span> Subscription & Invoices</span>
        </p>
      </div>
      <div className="container">
        <div>
          <div
            className="row m-3 "
            style={{
              border: "1px solid rgb(114, 158, 216)",
              borderRadius: "20px",
            }}
          >
            <div className="col-md-4  col-lg-4 col-xl-4  mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <p style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}>
                  <span style={{ textAlign: "center" }}>
                    Current Payment Mode
                  </span>
                </p>
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <input
                  readOnly
                  type="text"
                  value="Online"
                  style={{
                    textAlign: "center",
                    width: "92%",
                    height: "3rem",
                    borderRadius: "10px",
                    border: "1px solid rgb(43, 77, 129)",
                  }}
                />
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <Link
                to={""}
                style={{
                  textDecoration: "none",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <button
                  style={{
                    width: "92%",
                    padding: "0.4rem",
                    borderRadius: "10px",
                    backgroundColor: "rgb(181, 193, 230)",
                    justifyContent: "center",
                    display: "flex",
                    border: "1px solid rgb(193, 194, 192)",
                  }}
                >
                  <span
                    style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                    // onClick={(value)=>handleRozarpay()}
                  >
                    Payment Mode
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div
            className="row m-3"
            style={{
              border: "1px solid rgb(114, 158, 216)",
              borderRadius: "20px",
            }}
          >
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <p
                  className="text-center"
                  style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                >
                  <span>Current Payment Plan</span>
                </p>
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <input
                  readOnly
                  value={
                    (selectedPlan?.price && selectedPlan?.price) ||
                    PaymentStatus?.price
                  }
                  type="text"
                  style={{
                    textAlign: "center",
                    width: "92%",
                    height: "3rem",
                    borderRadius: "10px",
                    border: "1px solid rgb(43, 77, 129)",
                  }}
                />
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <Link
                to={""}
                style={{
                  textDecoration: "none",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <button
                  // onClick={toggle}
                  style={{
                    width: "92%",
                    padding: "0.4rem",
                    borderRadius: "10px",
                    backgroundColor: "rgb(181, 193, 230)",
                    justifyContent: "center",
                    display: "flex",
                    border: "1px solid rgb(193, 194, 192)",
                  }}
                >
                  <span
                    style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                  >
                    Change Payment Plan
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div
            className="row m-3"
            style={{
              border: "1px solid rgb(114, 158, 216)",
              borderRadius: "20px",
            }}
          >
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3 ">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <p
                  className="text-center"
                  style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                >
                  <span>Next Payment Date</span>
                </p>
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <input
                  readOnly
                  type="text"
                  value={PaymentStatus?.nextPaymentDate}
                  style={{
                    textAlign: "center",
                    width: "92%",
                    height: "3rem",
                    borderRadius: "10px",
                    border: "1px solid rgb(43, 77, 129)",
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 mt-3 mb-3">
              <Link
                to={""}
                style={{
                  textDecoration: "none",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <button
                  style={{
                    width: "92%",
                    padding: "0.4rem",
                    borderRadius: "10px",
                    backgroundColor: "rgb(181, 193, 230)",
                    justifyContent: "center",
                    display: "flex",
                    border: "1px solid rgb(193, 194, 192)",
                  }}
                >
                  <span
                    style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                  >
                    Payment Date
                  </span>
                  {/* <span
                    style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                  >
                    Stop Auto Payment
                  </span> */}
                </button>
              </Link>
            </div>
          </div>
          <div
            className="row m-3"
            style={{
              border: "1px solid rgb(114, 158, 216)",
              borderRadius: "20px",
            }}
          >
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <p
                  className="text-center"
                  style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
                >
                  <span>Last Payment Date</span>
                </p>
              </div>
              <div style={{ justifyContent: "center", display: "flex" }}>
                {PaymentStatus?.transactionId && (
                  <span
                    className="mt-0"
                    style={{ color: "green", fontSize: "13px" }}
                  >
                    transaction Id : {PaymentStatus?.transactionId}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <div style={{ justifyContent: "center", display: "flex" }}>
                <input
                  readOnly
                  type="text"
                  value={PaymentStatus?.lastPaymentDate}
                  style={{
                    textAlign: "center",
                    width: "92%",
                    height: "3rem",
                    borderRadius: "10px",
                    border: "1px solid rgb(43, 77, 129)",
                  }}
                />
              </div>
            </div>
            <div className="col-md-4  col-lg-4 col-xl-4 mt-3 mb-3">
              <Link
                to={"/Subscriptioninvoices/history"}
                style={{
                  textDecoration: "none",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <button
                  style={{
                    width: "92%",
                    padding: "0.4rem",
                    textAlign: "center",
                    borderRadius: "10px",
                    backgroundColor: "rgb(181, 193, 230)",
                    color: "rgb(82, 114, 161)",
                    fontSize: "20px",
                    justifyContent: "center",
                    display: "flex",
                    border: "1px solid rgb(193, 194, 192)",
                  }}
                >
                  Transaction History
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-2">
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
          {/* {selectedPlan?.price > 0 && (
            <div style={{ float: "right" }}>
              <Payment selectedPlan={selectedPlan} USer={USer} />
            </div>
          )} */}
        </div>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Change Payment Plan</ModalHeader>
          <ModalBody>
            <div className="mx-2 my-2">
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Plan Name</th>
                    <th>Plan Type</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plan?.length > 0 ? (
                    <>
                      {plan?.map((ele, i) => (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{ele?.subcriptionPlan}</td>
                          <td>{ele?.planType}</td>
                          <td>{ele?.price}</td>
                          <td>
                            <Button
                              color="primary"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSelectPlan(ele);
                              }}
                            >
                              Add
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Subscriptioninvoices;
