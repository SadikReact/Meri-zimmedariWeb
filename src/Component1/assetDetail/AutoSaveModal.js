import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axiosConfig from "../../axiosConfig";
import "../loader.css";

export const AutoSaveModal = props => {
  const [nomineeList, setNomineeList] = useState([]);
  useEffect(() => {
    (async () => {
      const userData = JSON.parse(sessionStorage.getItem("UserZimmedari"));
      await axiosConfig
        .get(`/asset/nominee-list/${userData?._id}`)
        .then(response => {
          console.log(response.data.Nominee);
          setNomineeList(response.data.Nominee);
        })
        .catch(err => {
          console.log("err", err);
        });
    })();
  }, []);
  const handleSelect = item => {
    console.log(props);
    props.setFormValues([item]);
    console.log(item);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          justifyContent: "right",
          display: "flex",
          padding: "0.1rem 0.1rem",
          border: "none",
        }}
      >
        <div>
          <svg
            style={{ cursor: "pointer" }}
            onClick={props.onHide}
            viewBox="0 0 512 512"
            width="30"
            height="30"
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

      {nomineeList.length > 0 ? (
        <Modal.Body>
          <div className="m-3">
            <div>
              <table class="table">
                {/* <thead></thead> */}
                <tbody>
                  {nomineeList &&
                    nomineeList?.map((item, index) => (
                      <tr className="rowColor" key={index}>
                        <th scope="row" className="csforcolortablestep2">
                          <input
                            type="radio"
                            id="option1"
                            className="cssforcheckoutstep2 "
                            name="options"
                            value="option1"
                            onChange={() => handleSelect(item)}
                          />
                        </th>
                        <td className="csforcolortablestep2">
                          {item?.nomineeName}
                        </td>
                        <td className="csforcolortablestep2">
                          {item?.relationWithNominee}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      ) : (
        <div className="noDataavail">
          No nominee details found in data base.
        </div>
      )}
    </Modal>
  );
};
