import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import axiosConfig from "../axiosConfig";
import { Button, Modal } from "react-bootstrap";
const Manageconfidential = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [manageList, setManageList] = useState([]);
  const [assetId, setAssetId] = useState("");
  useEffect(() => {
    confidentialList();
  }, []);

  const confidentialList = () => {
    axiosConfig
      .get("/confidential/view-confidential")
      .then(response => {
        setManageList(response.data.Confidential);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleView = item => {
    navigate(`/viewConfidentialNote/${item._id}`, { state: item });
  };
  const handleEdit = item => {
    navigate(`/EditConfidentialNote/${item._id}`, { state: item });
  };

  const handleClose = () => setShow(false);

  const handlePermanentDelete = () => {
    axiosConfig
      .delete(`/confidential/delete-confidential/${assetId}`)
      .then(response => {
        confidentialList();
        setShow(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  const handleDelete = id => {
    setAssetId(id);
    setShow(true);
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
          }}>
          <span className="ml-3">My Account </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </span>
          <span>Manage Confidential Note</span>
        </p>
      </div>
      <div className="container">
        <div className="cssformobileviewtablehj">
          <table class="table ">
            <thead>
              <tr
                className="rowColorHead"
                style={{
                  color: "white",
                  textAlign: "center",
                }}>
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Item
                </th>
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Nominee Name
                </th>
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Relation with Nominee
                </th>
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {manageList &&
                manageList?.map((item) => (
                  <tr
                    className="rowColor"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "black",
                    }}>
                    <td
                      style={{
                        borderRight: "2px solid white",
                        color: "black",
                      }}>
                      {item?.description}
                    </td>
                    <td
                      style={{
                        borderRight: "2px solid white",
                        color: "black",
                      }}>
                      {item?.nomineeName}
                    </td>
                    <td
                      style={{
                        borderRight: "2px solid white",
                        color: "black",
                      }}>
                      {item?.relationWithNominee}
                    </td>
                    <td style={{ borderRight: "2px solid white" }}>
                      <div style={{ marginTop: "-10px" }}>
                        <span className=" btn icon-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            color="#3465a4"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-eye hoverable-image"
                            viewBox="0 0 16 16"
                            type="button"
                            onClick={() => handleView(item)}>
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                          <span
                            className="icon-name"
                            style={{
                              marginLeft: "1.2%",
                              marginTop: "-5px",
                              padding: "5px",
                            }}>
                            View
                          </span>
                        </span>
                        <span className="ml-1 btn icon-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ cursor: "pointer" }}
                            color="#3465a4"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-pencil-square hoverable-image"
                            viewBox="0 0 16 16"
                            onClick={() => handleEdit(item)}>
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                          <span
                            className="icon-name"
                            style={{
                              marginLeft: "1.2%",
                              marginTop: "-5px",
                              padding: "5px",
                            }}>
                            Edit
                          </span>
                        </span>
                        <span className="ml-1 btn icon-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            color="#3465a4"
                            width="30"
                            height="30"
                            fill="currentColor"
                            class="bi bi-trash3-fill hoverable-image"
                            viewBox="0 0 16 16"
                            onClick={() => handleDelete(item._id)}>
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                          </svg>
                          <span
                            className="icon-name"
                            style={{ marginLeft: "1.2%" }}>
                            Delete
                          </span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="container mt-2">
          <div className="cssborbackbuttondhf" style={{ float: "left", bottom: "0" }}>
            <Link
              to={"/confidentialnoteeditor"}
              style={{ textDecoration: "none" }}>
              <p
                style={{
                  color: "rgb(82, 114, 161)",
                  fontSize: "20px",
                  fontWeight: "500",
                }}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16">
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
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            <span>Delete Confidential Note </span>
          </Modal.Title>
          <span
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="red"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </span>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure to permanently delete Confidential Note ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handlePermanentDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Manageconfidential;
