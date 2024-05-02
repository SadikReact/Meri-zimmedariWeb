import React, { useEffect, useState, useRef } from "react";
import Mynavbar from "./Mynavbar";
import { Row, Col } from "react-bootstrap";
import parse from "html-react-parser";
import Accordion from "react-bootstrap/Accordion";
import "../Component1/css/accordianfaq.css";
import axiosConfig from "./../axiosConfig";
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqList, setFaqList] = useState([]);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    (async () => {
      await axiosConfig
        .get("/term/view-faq")
        .then(response => {
          setFaqList(response.data.FAQ);
        })
        .catch(err => {
          console.log("err", err);
        });
    })();
  }, []);
  return (
    <>
      <Mynavbar />
      <div className="container">
        <div className="d-flex justify-content-center mt-2">
          <h2 className="text-center">Frequently Asked Questions</h2>
        </div>
        <Row>
          <Col lg="3" md="3"></Col>
          <Col>
            <div className="d-flex justiy-content-center p-4">
              <input
                type="search"
                placeholder="Search....."
                className="form-control"
                style={{
                  height: "3.2rem",
                  borderRadius: "20px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              />
            </div>
          </Col>
          <Col lg="3" md="3"></Col>
        </Row>

        <Row>
          <Col lg="2" md="2"></Col>
          <Col lg="8" md="8">
            <div className="accordion">
              {faqList &&
                faqList?.map((section, index) => (
                  <div className="accordion-item" key={index}>
                    <div
                      className="accordion-header"
                      onClick={() => toggleAccordion(index)}

                      // className={activeIndex === index ? 'accordion-header active' : 'accordion-header'}
                    >
                      Q.{index + 1} {section?.title}
                    </div>
                    <div
                      className="accordion-content"
                      style={{
                        display: activeIndex === index ? "block" : "none",
                      }}
                    >
                      <div>
                        {/* {/ <span>Ans</span> /} */}
                        <span>{parse(section?.description)}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Col>
          <Col lg="2" md="2"></Col>
        </Row>
      </div>
    </>
  );
};

export default Faq;
