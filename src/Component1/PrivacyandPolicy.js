import React, { useEffect, useState, useRef } from "react";
import Mynavbar from "./Mynavbar";
import axiosConfig from "../axiosConfig";
import { Row, Col } from "reactstrap";
import parse from "html-react-parser";
import NavBar from "./NavBar";
import Footer from "./Footer";

const PrivacyandPolicy = args => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axiosConfig
      .get("/term/view-privacy-policy")
      .then(res => {
        // console.log(res?.data?.Privacy);
        setData(res?.data?.Privacy);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container-fluid " style={{ display: "inline-block" }}>
        <div
          class="header"
          style={{ marginLeft: "-15px", boxShadow: "0 0 10px  #2374ee" }}
        >
          <NavBar />
        </div>
        <div className="container-fluid" style={{ paddingTop: "7rem" }}>
          <Row>
            <Col></Col>
            <Col lg="8" md="10" sm="10">
              <h1>Privacy and Policy</h1>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col lg="8" md="10" sm="10">
              {Data?.length > 0 && (
                <>
                  {Data?.map((ele, i) => (
                    <>
                      <div>{ele?.title}</div>
                      <div> {parse(ele?.description)}</div>
                    </>
                  ))}
                </>
              )}
            </Col>
            <Col></Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyandPolicy;
