import React, { useEffect } from "react";
import Mynavbar from "./Mynavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ViewAsset() {
  const location = useLocation();
  const navigation = useNavigate();

  const handleBack = () => {
    navigation("/add-asset");
  };
  return (
    <div>
      <Mynavbar />

      <div className="ViewAsset">
        <div
          style={{
            marginTop: "-5px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid  rgb(114, 158, 216)",
            width: "100%",
          }}
        >
          {location.state.Asset_Type}
        </div>
        <div
          style={{
            marginTop: "-5px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid  rgb(114, 158, 216)",
            width: "100%",
          }}
        >
          2 Added
        </div>
        <div className="back">
          <Button className="danger" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
