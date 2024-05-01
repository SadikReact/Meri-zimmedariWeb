import React, { useEffect, useState, useRef } from "react";
import Mynavbar from "./Mynavbar";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const LifeDeclaration = (args) => {
  return (
    <>
      <Mynavbar />
      <div className="d-flex justify-content-center mt-2">
        <h2>Frequently Asked Questions</h2>
      </div>
      <Row>
        <Col lg="4" md="4"></Col>
        <Col>
          <div className="d-flex justiy-content-center p-4">
            <input type="search" className="form-control" />
          </div>
        </Col>
        <Col lg="4" md="4"></Col>
      </Row>
      <Row>
        <Col lg="4" md="4"></Col>
        <Col>
          <div className="d-flex justiy-content-center p-4">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Col>
        <Col lg="4" md="4"></Col>
      </Row>
    </>
  );
};

export default LifeDeclaration;
