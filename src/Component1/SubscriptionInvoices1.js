import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import axiosConfig from "../axiosConfig";

const SubscriptionInvoices1 = () => {
  const [selectedPlan, setselectedPlan] = useState([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("UserZimmedari"));

    axiosConfig
      .get("/payment/view-payment-by-userId/" + user?._id)
      .then(res => {
        console.log(res?.data?.Payment);
        if (res?.data?.Payment) {
          setselectedPlan(res?.data?.Payment);
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

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
          <span> Transaction History</span>
        </p>
      </div>
      <div className="container">
        <div style={{ overflowX: "auto" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Description
                </th>
                <th scope="col" className="text-center">
                  Service period
                </th>
                <th scope="col" className="text-center">
                  Transaction Id
                </th>
                <th scope="col" className="text-center">
                  Total
                </th>

                <th scope="col" className="text-center">
                  Download Invoice{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedPlan?.length > 0 ? (
                <>
                  {selectedPlan?.map((ele, i) => (
                    <tr key={i}>
                      <th scope="row">{ele?.createdAt?.split("T")[0]}</th>
                      <td>{ele?.planType}</td>
                      <td className="">
                        <div>{ele?.lastPaymentDate}</div>
                        <div>{ele?.nextPaymentDate}</div>
                      </td>
                      <td>{ele?.transactionId}</td>
                      <td>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-currency-rupee"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                          </svg>
                        </span>
                        <span>
                          {ele?.price}
                          {/* (+ */}
                          {/* <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-currency-rupee"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                            </svg>
                          </span> */}
                          {/* <span>30.36 IGST</span>) */}
                        </span>
                      </td>

                      <td style={{ justifyContent: "center", display: "flex" }}>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            color="red"
                            height="30"
                            fill="currentColor"
                            class="bi bi-file-earmark-pdf"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                            <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="container mt-2">
          <div style={{ float: "left" }}>
            <Link
              to={"/Subscriptioninvoices"}
              style={{ textDecoration: "none" }}
            >
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
    </>
  );
};

export default SubscriptionInvoices1;
