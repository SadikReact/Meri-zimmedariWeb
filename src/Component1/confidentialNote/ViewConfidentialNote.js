import React from "react";
import { Link } from "react-router-dom";
import Mynavbar from "../Mynavbar";

export default function ViewConfidentialNote() {
  return (
    <div>
      <Mynavbar />
      <div className="container   ">
        <div>
          <table class="table">
            <thead>
              <tr
                className="rowColorHead"
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Item
                </th>
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Nominee Name
                </th>
                <th scope="col" style={{ borderRight: "2px solid white" }}>
                  Relation with Nominee
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                className="rowColor"
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "black",
                }}
              >
                <td style={{ borderRight: "2px solid white", color: "black" }}>
                  <input type="text" disabled value=" Confidential Note" />
                </td>
                <td style={{ borderRight: "2px solid white" }}>
                  <input type="text" disabled value="abc" />
                </td>
                <td style={{ borderRight: "2px solid white" }}>
                  <input type="text" disabled value="wife" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container mt-2">
          <div style={{ float: "left", bottom: "0", position: "absolute" }}>
            <Link
              to={"/confidentialnoteeditor"}
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
    </div>
  );
}
