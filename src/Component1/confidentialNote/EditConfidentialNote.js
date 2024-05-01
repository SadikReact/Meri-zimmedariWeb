import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Mynavbar from "../Mynavbar";

export default function EditConfidentialNote() {
  const location = useLocation();
  const [formValues, setFormValues] = useState([
    {
      item: "",
      nomineeName: "",
      nomineeEmailId: "",
      NomineePhoneNumber: null,
      relationWithNominee: "",
    },
  ]);
  const [formError, setFormError] = useState({
    IsnomineeName: false,
    IsnomineeEmailId: false,
    IsNomineePhoneNumber: false,
    IsrelationWithNominee: false,
  });
  useEffect(() => {
    console.log(location?.state);
    if (location.state) {
      setFormValues(location?.state);
    }
  }, []);
  const handleSubmit = () => {
    alert("sumited");
  };
  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSelect = e => {
    setFormValues({ ...formValues, relationWithNominee: e.target.value });
  };
  return (
    <div>
      <Mynavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
            <div>
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
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Item
                      <span style={{ color: "red" }}> *</span>
                    </legend>

                    <input
                      type="text"
                      placeholder="XXXXXXXXXXXX"
                      name="nomineeName"
                      value={formValues?.item}
                      onChange={handleChange}
                      style={{
                        width: "95%",
                        border: "none",
                        paddingLeft: "15px",
                        paddingBottom: "10px",
                        marginBottom: "5px",
                        outline: "none",
                        marginLeft: "5px",
                        backgroundColor: "white",
                      }}
                    />
                  </fieldset>
                  {formError.IsnomineeName && (
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
          </div>
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
            <div>
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
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Nominee Name
                      <span style={{ color: "red" }}> *</span>
                    </legend>

                    <input
                      type="text"
                      placeholder="XXXXXXXXXXXX"
                      name="nomineeName"
                      value={formValues?.nomineeName}
                      onChange={handleChange}
                      style={{
                        width: "95%",
                        border: "none",
                        paddingLeft: "15px",
                        paddingBottom: "10px",
                        marginBottom: "5px",
                        outline: "none",
                        marginLeft: "5px",
                        backgroundColor: "white",
                      }}
                    />
                  </fieldset>
                  {formError.IsnomineeName && (
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
          </div>
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4">
            <div>
              <div className="mt-4">
                <div className="mb-3">
                  <fieldset
                    style={{
                      color: "rgb(82, 114, 161)",
                      fontSize: "20px",
                      fontFamily: "Calibri",
                      border: "1px solid rgb(114, 158, 216)",
                      borderRadius: "10px",
                      height: "5.3rem",
                    }}
                  >
                    <legend
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        marginLeft: "15px",
                        width: "auto",
                      }}
                      for="exampleInputPassword1"
                      class="form-label"
                    >
                      Relation with Nominee
                      <span style={{ color: "red" }}> *</span>
                    </legend>

                    <select
                      class="form-select"
                      value={formValues?.relationWithNominee}
                      onChange={handleSelect}
                      name="relationWithNominee"
                      aria-label="Default select example"
                      defaultChecked
                      style={{
                        outline: "none",
                        width: "95%",
                        float: "right",
                        border: "none",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        paddingBottom: "10px",
                        marginBottom: "5px",
                        backgroundColor: "white",
                      }}
                    >
                      <option
                        Nominee
                        Relation
                        style={{ float: "left", border: "none" }}
                      ></option>

                      <option disabled value="">
                        Select
                      </option>
                      <option value="Wife">Wife</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Sister">Sister</option>
                      <option value="Brother">Brother</option>
                      <option value="Husband">Husband</option>
                    </select>
                  </fieldset>
                  {formError.IsrelationWithNominee && (
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
          </div>
        </div>
      </div>
      <div className="container">
        <div className="container mt-5 mb-2 cssforfooternomineedetails">
          <div style={{ float: "left" }}>
            <Link to={"/nomineedetails"}>
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
          <div style={{ float: "right", bottom: "0px" }}>
            <span className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="rgb(43, 77, 129)"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
                onClick={handleSubmit}
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
