import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Mynavbar from "./Mynavbar";
import axiosConfig from "./../axiosConfig";
const Assetstep3 = () => {
  const [AssetData, setAssetData] = useState({});
  const [nomineeData, setNomineeData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let assetDetails = JSON.parse(localStorage.getItem("assetDetails"));
    let nomineeDetails = JSON.parse(localStorage.getItem("nomineeDetails"));
    console.log("assetDetails", assetDetails);

    console.log("nomineeDetails", nomineeDetails);
    if (assetDetails !== null) {
      // debugger;
      setAssetData(assetDetails);
    }
    if (nomineeDetails) {
      setNomineeData(nomineeDetails);
    }
  }, []);

  const handleAllFormEdit = items => {
    // navigate("/add-asset/policy", { state: items });
    navigate("/add-asset/policy");
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("userId", AssetData?.userId);
    formData.append("file", AssetData?.uploadedFile);
    formData.append("assetType", AssetData?.dynamicFields?.Asset_Type);
    formData.append("policyIssuersName", AssetData?.policyName);
    formData.append("policynumber", AssetData?.policyNumber);
    formData.append("Field_1", AssetData?.dynamicFields?.Field_1);
    formData.append("Field_2", AssetData?.dynamicFields?.Field_2);
    formData.append("Field_3", AssetData?.dynamicFields?.Field_3);
    formData.append("Field_4", AssetData?.dynamicFields?.Field_4);
    formData.append("ReEnterPolicyNumber", AssetData?.reEnterPolicyNumber);
    formData.append("nominee", JSON.stringify(nomineeData));
    axiosConfig
      .post("/asset/save-asset", formData)
      .then(response => {
        console.log(response.data.message);
        navigate("/add-asset/setp3/confirm");
        localStorage.removeItem("assetDetails");
        localStorage.removeItem("nomineeDetails");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      {/* {console.log(AssetData)}
      {console.log(AssetData?.dynamicFields?.Asset_Type)} */}
      <Mynavbar />
      <div>
        <div style={{ backgroundColor: "rgb(182, 205, 236)" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-xl-4 col-lg-4 col-sm-4 ">
                <div style={{ padding: "20px" }}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-4">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="rgb(197, 128, 123)"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-file-earmark-text"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                          <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-8">
                      <span>
                        <span style={{ color: "black" }}>Setp 1</span>
                        <span
                          style={{
                            backgroundColor: "rgb(152, 202, 152)",
                            color: " green",
                            fontSize: "14px",
                            marginLeft: "5px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          COMPLETE
                        </span>
                        <br></br>
                        <span style={{ color: "black" }}>
                          Enter Asset Details
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-4 col-lg-4 col-sm-4 ">
                <div style={{ padding: "20px" }}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-4">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="rgb(240, 117, 108)"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-person-check"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                          <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-8">
                      <span>
                        <span style={{ color: "black" }}>STEP 2</span>
                        <span
                          style={{
                            backgroundColor: "rgb(152, 202, 152)",
                            color: " green",
                            fontSize: "14px",
                            marginLeft: "5px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          COMPLETE
                        </span>

                        <br></br>
                        <span style={{ color: "black" }}>
                          Enter Nominee details
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xl-4 col-lg-4 col-sm-4 ">
                <div style={{ padding: "20px" }}>
                  <div className="row">
                    <div className="col-md-2 col-sm-2 col-lg-2 col-xl-2 col-4">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="#842f0b"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-floppy-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                          <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-10 col-sm-10 col-lg-10 col-xl-10 col-8">
                      <span>
                        <span style={{ color: "black" }}>STEP 3</span>
                        <span
                          style={{
                            backgroundColor: "rgb(248, 237, 237)",
                            color: " rgb(197, 128, 123)",
                            fontSize: "14px",
                            marginLeft: "5px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          IN PROCESS
                        </span>

                        <br></br>
                        <span style={{ color: "black" }}>
                          Confirm details & Save
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div style={{ overflowX: "auto" }}>
            <table
              class="table"
              style={{ border: "2px solid rgb(201, 198, 198)" }}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    colSpan="5"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      textTransform: "capitalize",
                      color: "rgb(47, 80, 119)",
                      fontSize: "18px",
                      fontFamily: "Times New Roman",
                      width: "15%",
                      lineHeight: "20px",
                      borderRight: " 1px solid rgb(201, 198, 198)",
                    }}
                    className="text-center"
                  >
                    Asset Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                    colSpan="2"
                  >
                    Asset Type
                  </th>
                  <td
                    colSpan="3"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                  >
                    {AssetData?.dynamicFields?.Asset_Type}
                  </td>
                </tr>

                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                    colSpan="2"
                  >
                    {AssetData.dynamicFields?.Field_2}
                  </th>
                  <td
                    colSpan="3"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                  >
                    {AssetData.policyName}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                    colSpan="2"
                  >
                    {AssetData.dynamicFields?.Field_3}
                  </th>
                  <td
                    colSpan="3"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                  >
                    {AssetData.policyNumber}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                    colSpan="2"
                  >
                    {AssetData.dynamicFields?.Field_1}
                  </th>
                  <th
                    scope="row"
                    className="text-center"
                    style={{ border: "2px solid rgb(201, 198, 198)" }}
                    colSpan="2"
                  >
                    {/* Policy212414242 */}
                    {/* <embed
                      src={AssetData.uploadedFile}
                      type="application/pdf"
                      width="50%"
                      height="100px"
                    /> */}
                  </th>
                </tr>
              </tbody>
              <thead>
                <tr style={{ border: "2px solid rgb(201, 198, 198)" }}>
                  <th
                    scope="col"
                    colSpan="5"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      textTransform: "capitalize",
                      color: "rgb(47, 80, 119)",
                      fontSize: "18px",
                      fontFamily: "Times New Roman",
                      width: "15%",
                      lineHeight: "20px",
                      borderRight: " 1px solid rgb(201, 198, 198)",
                    }}
                    className="text-center"
                  >
                    Nominee(s) Details
                  </th>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{
                      fontSize: "",
                      border: "2px solid rgb(201, 198, 198)",
                      width: "20%",
                    }}
                  >
                    Nominee Name
                  </th>
                  <th
                    scope="row"
                    className="text-center"
                    style={{
                      fontSize: "",
                      border: "2px solid rgb(201, 198, 198)",
                      width: "20%",
                    }}
                  >
                    Relation with Nominee
                  </th>
                  <th
                    scope="row"
                    className="text-center"
                    style={{
                      fontSize: "",
                      border: "2px solid rgb(201, 198, 198)",
                      width: "20%",
                    }}
                  >
                    Percentage of share
                  </th>
                  <th
                    scope="row"
                    className="text-center"
                    style={{
                      fontSize: "",
                      border: "2px solid rgb(201, 198, 198)",
                      width: "20%",
                    }}
                  >
                    Nominee Phone No.
                  </th>
                  <th
                    scope="row"
                    className="text-center"
                    style={{
                      fontSize: "",
                      border: "2px solid rgb(201, 198, 198)",
                      width: "20%",
                    }}
                  >
                    Nominee e-mail ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {nomineeData &&
                  nomineeData?.map((val, ind) => (
                    <tr key={ind}>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid rgb(201, 198, 198)",
                          width: "15%",
                        }}
                      >
                        {val?.nomineeName}
                      </td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid rgb(201, 198, 198)",
                          width: "15%",
                        }}
                      >
                        {val?.relationWithNominee}
                      </td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid rgb(201, 198, 198)",
                          width: "15%",
                        }}
                      >
                        {val?.percentageofShar}%
                      </td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid rgb(201, 198, 198)",
                          width: "25%",
                        }}
                      >
                        {val?.NomineePhoneNumber}
                        {/* 9643242124 (Not Verified)  */}
                      </td>
                      <td
                        className="text-center"
                        style={{
                          border: "2px solid rgb(201, 198, 198)",
                          width: "25%",
                        }}
                      >
                        {val?.nomineeEmailId}
                        {/* dscs@ymail.com (Verified)  */}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <th
                    scope="row"
                    className="text-center"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      width: "20%",
                    }}
                  ></th>
                  <td
                    className="text-center"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      width: "15%",
                    }}
                  ></td>
                  <td
                    className="text-center"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      width: "15%",
                    }}
                  ></td>
                  <td
                    className="text-center"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      width: "25%",
                    }}
                  ></td>
                  <td
                    className="text-center"
                    style={{
                      border: "2px solid rgb(201, 198, 198)",
                      width: "25%",
                    }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="container mt-5 mb-2" style={{ paddingBottom: "60px" }}>
          <div style={{ float: "left" }}>
            <Link to={"/add-asset/step2"} style={{ textDecoration: "none" }}>
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
          <div style={{ float: "right" }}>
            <span className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                color="rgb(43, 77, 129)"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-pencil-square hoverable-image"
                viewBox="0 0 16 16"
                onClick={() => handleAllFormEdit(AssetData)}
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
              <span className="icon-name" style={{ marginLeft: "1.5%" }}>
                Edit
              </span>
            </span>
            <span className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                color="rgb(43, 77, 129)"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-file-earmark-text hoverable-image"
                viewBox="0 0 16 16"
                onClick={handleSubmit}
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
              <span
                className="icon-name"
                style={{ marginLeft: "4.5%", marginTop: "2px" }}
              >
                Save
              </span>
            </span>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Assetstep3;
