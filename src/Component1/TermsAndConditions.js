import React, { useEffect, useState, useRef } from "react";
import Mynavbar from "./Mynavbar";
import axiosConfig from "../axiosConfig";
import { Row, Col } from "reactstrap";
import parse from "html-react-parser";

const TermsAndConditions = (args) => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axiosConfig
      .get("/term/view-term-detail")
      .then((res) => {
        console.log(res?.data?.TermConditoin);
        setData(res?.data?.TermConditoin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Mynavbar />

      <Row>
        <Col></Col>
        <Col lg="8" md="10" sm="10">
          <h1>Terms and Condition</h1>
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
    </>
  );
};

export default TermsAndConditions;
