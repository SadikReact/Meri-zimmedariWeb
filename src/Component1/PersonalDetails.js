import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MyContext from "../context/Context.js";
import "./loader.css";
import "./StepperStyle.css";
import axiosConfig from "../axiosConfig.js";
const PersonalDetails = ({
  policyName,
  policyNumber,
  reEnterPolicyNumber,
  setPolicyName,
  setPolicyNumber,
  setReEnterPolicyNumber,
  setShowAsset,
  showAsset,
  handleChange,
  handleFileChange,
  error,
  isUpload,
  uploadedFileName,
  uploadedFile,
  nextStep,
}) => {
  // const sharedValue = useContext(MyContext);
  // const [data, setData] = useToggleContext();
  const fileInputRef = useRef(null);
  const [model, setModel] = useState(null);
  const [dynamicFields, setdynamicFields] = useState(""); // for fields
  const [formError, setFormError] = useState({
    IspolicyName: false,
    IspolicyNumber: false,
    IsreEnterPolicyNumber: false,
    IsBothMatch: false,
  });
  useEffect(() => {
    let viewData = JSON.parse(localStorage.getItem("ViewOne"));

    let AssetEditid = JSON.parse(localStorage.getItem("AssetEditData"));

    if (
      viewData?.dynamicFields != undefined ||
      viewData?.dynamicFields != null
    ) {
      setdynamicFields(viewData?.dynamicFields);
      setModel(false);
    } else if (viewData != null || viewData != undefined) {
      setdynamicFields(viewData);
      setModel(false);
    } else if (AssetEditid != null || AssetEditid != undefined) {
      axiosConfig
        .get(`/asset/view-asset-by-id/${AssetEditid._id}`)
        .then(res => {
          // console.log("personal", res.data.Asset);
          setdynamicFields(res.data.Asset);
          setPolicyName(res?.data?.Asset?.policyIssuersName);
          setPolicyNumber(res?.data?.Asset?.policynumber);
          setReEnterPolicyNumber(res?.data?.Asset?.ReEnterPolicyNumber);
          setModel(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);
  const continueStep = e => {
    e.preventDefault();
    let errors = {};
    if (!policyName) errors.IspolicyName = true;
    if (!policyNumber) errors.IspolicyNumber = true;
    if (!reEnterPolicyNumber) errors.IsreEnterPolicyNumber = true;
    if (policyNumber && reEnterPolicyNumber) {
      if (policyNumber !== reEnterPolicyNumber) {
        errors.IsBothMatch = true;
      }
    }

    const assetType = {
      dynamicFields,
      uploadedFile,
      policyNumber,
      policyName,
      reEnterPolicyNumber,
    };
    if (Object.keys(errors)?.length === 0) {
      // localStorage.removeItem("AssetEditData");
      localStorage.setItem("ViewOne", JSON.stringify(assetType));
      if (isUpload) {
        nextStep();
      }
    } else {
      // Set form errors
      setFormError(errors);
    }
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="form">
      <form>
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

        {model == null ? (
          <>
            <div className="d-flex justify-content-center mt-5 mb-5">
              <div className="loader"></div>
            </div>
          </>
        ) : (
          <>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 mt-4">
                  <div>
                    <span
                      className="mt-5"
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                      }}
                    >
                      {dynamicFields?.Field_1}
                    </span>
                    <span className="ml-1">
                      <svg
                        type="button"
                        xmlns="http://www.w3.org/2000/svg"
                        color="grey"
                        width="50"
                        height="50"
                        fill="currentColor"
                        class="bi bi-cloud-plus"
                        viewBox="0 0 16 16"
                        onClick={handleIconClick}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"
                        />
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                      </svg>
                      <input
                        type="file"
                        id="poster"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        name="uploadedFileName"
                        required
                        accept="application/pdf, image/png, image/jpeg,image/jpg,image/jpe"
                        onChange={handleFileChange("uploadedFileName")}
                      />
                      <p>Acceptable file - .jpg/.jpeg/.png/pdf</p>
                      {uploadedFileName && (
                        <p>Uploaded file: {uploadedFileName}</p>
                      )}
                    </span>
                  </div>

                  {error && (
                    <p
                      style={{
                        color: "red",
                        padding: "5px",
                        fontSize: "16px",
                        marginTop: "3px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  {/* {uploadedFile && <p>File selected: {uploadedFileName}</p>} */}
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
                  <div className="mt-4">
                    <div className="mb-3">
                      <fieldset
                        style={{
                          color: "rgb(82, 114, 161)",
                          fontSize: "20px",
                          fontFamily: "Calibri",
                          border: "1px solid rgb(114, 158, 216)",
                          borderRadius: "10px",
                        }}
                      >
                        <legend
                          style={{
                            color: "rgb(82, 114, 161)",
                            fontSize: "16px",
                            paddingLeft: "5px",
                            fontFamily: "Calibri",
                            marginLeft: "15px",
                            width: "auto",
                          }}
                          for="exampleInputPassword1"
                          class="form-label"
                        >
                          {dynamicFields?.Field_2}

                          <span style={{ color: "red" }}>*</span>
                        </legend>
                        <input
                          required
                          type="text"
                          value={policyName}
                          style={{
                            border: "none",
                            width: "100%",
                            paddingLeft: "15px",
                            paddingBottom: "10px",
                            marginBottom: "5px",
                            outline: "none",
                          }}
                          id="policyName"
                          onChange={handleChange("policyName")}
                          name="policyName"
                        />
                      </fieldset>
                      {formError.IspolicyName && (
                        <div
                          className="validationmobilefont"
                          style={{
                            color: "red",
                            padding: "5px",

                            marginTop: "3px",
                          }}
                        >
                          * indicates required field
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
                  <div className="mb-3 mt-5">
                    <fieldset
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        border: "1px solid rgb(114, 158, 216)",
                        borderRadius: "10px",
                      }}
                    >
                      <legend
                        style={{
                          color: "rgb(82, 114, 161)",
                          fontSize: "16px",
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "auto",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        {dynamicFields?.Field_3}
                        <span style={{ color: "red" }}>*</span>
                      </legend>
                      <input
                        type="password"
                        required
                        placeholder="XXXXXX"
                        value={policyNumber}
                        style={{
                          border: "none",
                          paddingLeft: "15px",
                          paddingBottom: "10px",
                          marginBottom: "5px",
                          width: "100%",
                          outline: "none",
                        }}
                        id="policyNumber"
                        name="policyNumber"
                        // onChange={e => setPolicyNumber(e.target.value)}
                        onChange={handleChange("policyNumber")}
                      />
                    </fieldset>
                    {formError.IspolicyNumber && (
                      <p
                        className="validationmobilefont"
                        style={{
                          color: "red",
                          padding: "5px",

                          marginTop: "3px",
                        }}
                      >
                        * indicates required field
                      </p>
                    )}
                    {formError.IsBothMatch && (
                      <p
                        style={{
                          color: "red",
                          padding: "5px",
                          fontSize: "16px",
                          marginTop: "3px",
                        }}
                      >
                        Value Mismatch
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
                  <div className="mt-5">
                    <div class="mb-3">
                      <fieldset
                        style={{
                          color: "rgb(82, 114, 161)",
                          fontSize: "20px",
                          fontFamily: "Calibri",
                          border: "1px solid rgb(114, 158, 216)",
                          borderRadius: "10px",
                        }}
                      >
                        <legend
                          style={{
                            color: "rgb(82, 114, 161)",
                            fontSize: "16px",
                            paddingLeft: "5px",
                            fontFamily: "Calibri",
                            marginLeft: "15px",
                            width: "auto",
                          }}
                          for="exampleInputPassword1"
                          class="form-label"
                        >
                          {dynamicFields?.Field_4}
                          <span style={{ color: "red" }}>*</span>
                        </legend>
                        <input
                          type="text"
                          required
                          style={{
                            border: "none",
                            paddingLeft: "15px",
                            paddingBottom: "10px",
                            marginBottom: "5px",
                            width: "100%",
                            outline: "none",
                          }}
                          placeholder="1234567890101023"
                          value={reEnterPolicyNumber}
                          id="reEnterPolicyNumber"
                          // onChange={e => setReEnterPolicyNumber(e.target.value)}
                          onChange={handleChange("reEnterPolicyNumber")}
                          name="reEnterPolicyNumber"
                        />
                      </fieldset>
                      {formError.IsreEnterPolicyNumber && (
                        <p
                          className="validationmobilefont"
                          style={{
                            color: "red",
                            padding: "5px",

                            marginTop: "13px",
                          }}
                        >
                          * indicates required field
                        </p>
                      )}
                      {formError.IsBothMatch && (
                        <p
                          style={{
                            color: "red",
                            padding: "5px",
                            fontSize: "16px",
                            marginTop: "3px",
                          }}
                        >
                          Value Mismatch
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  className="buttons__button buttons__button--next"
                  onClick={continueStep}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default PersonalDetails;
