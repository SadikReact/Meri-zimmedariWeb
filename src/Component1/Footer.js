import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
   
    <>
    <div className="copyright">
    <div className="container">
    <div className="row">
    <div className="col-lg-4 col-xl-4 col-md-5">
    <p style={{textAlign:'center',fontSize:'18px',fontWeight:'500'}}>
    <span>
      <Link
        class="forhoveratagcolor"
        to="/TermsAndConditions"
        style={{ textDecoration: "none" }}
      >
        Terms and Condition
      </Link>
    </span>
    <span>|</span>
    <span style={{ marginLeft: "5px" }}>
      <Link
        to="/PrivacyandPolicy"
        style={{ textDecoration: "none" }}
      >
        Privacy Policy
      </Link>
    </span>
  </p>
    </div>
    <div className="col-lg-8 col-xl-8 col-md-7">
    <p style={{textAlign:'center',fontSize:'18px',fontWeight:'500'}}>© 2024 All Rights Reserved Meri Zimmedari</p>
      
    </div>
    </div>
    </div>
    </div>
    
    </>
  );
}
