import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import BlinkEye from "../image/eyedrop.gif";
import * as tf from "@tensorflow/tfjs";
import "./loader.css";
import {
  Modal,
  ModalHeader,
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import Webcam from "react-webcam";
import axiosConfig from "../axiosConfig";
import { ErrorModal } from "./ManageAccount/ErrorModal";
const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");

const LifeDeclaration = args => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [count, setCount] = useState(0);
  const [maxLeft, setMaxLeft] = useState(0);
  const [maxRight, setMaxRight] = useState(0);
  const [model, setModel] = useState(null);
  const [text, setText] = useState("modal loading...");
  const [errModal, setErrModal] = useState(false);
  const [message, setMessage] = useState("");

  const webcamRef = useRef(null);
  const [Data, setData] = useState({});
  const [DeclarationDate, setDeclarationDate] = useState({});
  const [modal, setModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const toggle = () => {
    setModal(!modal);
    capture();
  };

  useEffect(() => {
    tf.setBackend("webgl");
    loadModel();
  }, []);
  const handleChange = e => {
    debugger;
    const { name, value } = e.target;
    setDeclarationDate({ ...DeclarationDate, [name]: value });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setText("detecting...");
        detectPoints();
      }, 1500);
    }
  }, [isOpen]);

  const loadModel = async () => {
    faceLandmarksDetection
      .load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh, {
        maxFaces: 1,
      })
      .then(model => {
        setModel(model);
        setText("ready for capture");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClick = () => {
    const newIsOpen = !isOpen;
    const newCount = isOpen ? count : 0;
    setIsOpen(newIsOpen);
    setCount(newCount);
    setLoading(!Loading);
  };
  const capture = () => {
    setShowWebcam(true);
    handleClick();
  };

  const detectPoints = async () => {
    if (isOpen == false) return;
    try {
      const video = await webcamRef.current.video;
      const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: true,
        predictIrises: true,
      });

      if (predictions.length > 0) {
        // Somente 1 face
        const keypoints = predictions[0].scaledMesh;
        if (detectarBlink(keypoints)) {
          // TODO :: Found blink, do someting
          const countN = count + 1;
          setCount(countN);
          setIsOpen(false);
          handleCapture();
          handleClick();
          if (!isOpen) {
            // stop detection
            setText("");
            return null;
          }
        }
      } else {
        setMaxLeft(0);
        setMaxRight(0);
      }
    } catch (error) {}
    if (!isOpen) {
      // stop detection
      setText("");
      return null;
    }
    setTimeout(async () => {
      await detectPoints();
    }, 100);
  };
  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  const detectarBlink = keypoints => {
    const leftEye_left = 263;
    const leftEye_right = 362;
    const leftEye_top = 386;
    const leftEye_buttom = 374;
    const rightEye_left = 133;
    const rightEye_right = 33;
    const rightEye_top = 159;
    const rightEye_buttom = 145;

    const leftVertical = calculateDistance(
      keypoints[leftEye_top][0],
      keypoints[leftEye_top][1],
      keypoints[leftEye_buttom][0],
      keypoints[leftEye_buttom][1]
    );
    const leftHorizontal = calculateDistance(
      keypoints[leftEye_left][0],
      keypoints[leftEye_left][1],
      keypoints[leftEye_right][0],
      keypoints[leftEye_right][1]
    );
    const eyeLeft = leftVertical / (2 * leftHorizontal);

    const rightVertical = calculateDistance(
      keypoints[rightEye_top][0],
      keypoints[rightEye_top][1],
      keypoints[rightEye_buttom][0],
      keypoints[rightEye_buttom][1]
    );
    const rightHorizontal = calculateDistance(
      keypoints[rightEye_left][0],
      keypoints[rightEye_left][1],
      keypoints[rightEye_right][0],
      keypoints[rightEye_right][1]
    );
    const eyeRight = rightVertical / (2 * rightHorizontal);

    const baseCloseEye = 0.1;
    const limitOpenEye = 0.14;
    if (maxLeft < eyeLeft) {
      setMaxLeft(eyeLeft);
    }
    if (maxRight < eyeRight) {
      setMaxRight(eyeRight);
    }
    let result = false;
    //    if ((maxLeft > limitOpenEye) && (maxRight > limitOpenEye)) {
    if (eyeLeft < baseCloseEye && eyeRight < baseCloseEye) {
      result = true;
      setIsOpen(false);
    }

    return result;
  };

  useEffect(() => {
    LifeDecalarationFun();
  }, []);

  let LifeDecalarationFun = () => {
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    (async () => {
      await axiosConfig
        .get(`/life-declaration/view-life-declaration/${user?._id}`)
        .then(res => {
          if (res?.data?.Life) {
            setDeclarationDate(res?.data?.Life);
          }
        })
        .catch(err => {
          setDeclarationDate("");
        });
    })();
  };

  const handleCapture = () => {
    setMessage("Image Captured Suceessfully");
    setErrModal(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setData({
      ...Data,
      image: imageSrc,
    });
    setShowWebcam(false);
    setTimeout(() => {
      setErrModal(false);
    }, 1000);
  };
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  const handleSubmit = async () => {
    setLoading(true);
    // let user = JSON.parse(localStorage.getItem("UserZimmedari"));
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    let formdata = new FormData();
    formdata.append("userId", user?._id);
    formdata.append("image", dataURItoBlob(Data?.image));
    // formdata.append("day", Data?.Date);
    await axiosConfig
      .post("/life-declaration", formdata)
      .then(res => {
        setLoading(false);
        toggle();
        setMessage(res?.data?.message);
        setErrModal(true);
        LifeDecalarationFun();
        setTimeout(() => {
          setErrModal(false);
        }, 1000);
      })
      .catch(err => {
        setLoading(false);
        toggle();
        console.log(err);
        setMessage("Life Declaration not Completed");
        setErrModal(true);
      });
  };

  const handleManage = e => {
    // e.preventDefault();
    // if (isDate) {
    detectPoints();
    toggle();
    setShowWebcam(true);
    // }
  };
  const handleSubmitDate = async () => {
    let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    const payload = {
      day: DeclarationDate.day,
      userId: user._id,
    };
    debugger;
    setLoading(true);
    await axiosConfig
      .post("/life-declaration/save-life-declaration", payload)
      .then(res => {
        console.log(res.data.message);
        // toggle();
        setMessage(res?.data?.message);
        setErrModal(true);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
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
          }}
        >
          <span className="ml-3">Life Declaration</span>
          <span></span>
        </p>
      </div>
      <div className="container ">
        <div
          className="row mt-5 m-2"
          style={{
            border: "1px solid  rgb(114, 158, 216)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <span>
              <p
                className="text-center"
                style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
              >
                <span>Select Monthly Life Declaration Day</span>
                <span className="ml-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-question-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                  </svg>
                </span>
              </p>
            </span>
          </div>
          <div className="col-md-4 col-sm-4 col-xl-4 col-lg-4">
            <div style={{ justifyContent: "center", display: "flex" }}>
              <select
                name="day"
                onChange={handleChange}
                value={DeclarationDate?.day}
                required
                class="form-select"
                aria-label="Default select example"
                style={{
                  textAlign: "center",
                  width: "60%",
                  height: "3.5rem",
                  borderRadius: "15px",
                  border: "1px solid rgb(114, 158, 216)",
                }}
              >
                <option value="">Select Date</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
              </select>
            </div>
          </div>
          <div className="col-md-2 col-sm-2 col-xl-2 col-lg-2">
            <Button color="primary" onClick={handleSubmitDate}>
              Submit
            </Button>
          </div>
        </div>
        <div
          className="row mt-3 m-2"
          style={{
            border: "1px solid  rgb(114, 158, 216)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <div>
              <p
                className="text-center"
                style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
              >
                <span>Last Life Declaration Submitted on</span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6">
            <div style={{ justifyContent: "center", display: "flex" }}>
              <input
                type="text"
                id="dateInput"
                class="form-control"
                disabled
                value={DeclarationDate?.lastDeclarationDate}
                style={{
                  border: "1px solid rgb(114, 158, 216)",
                  width: "60%",
                  height: "3.5rem",
                  borderRadius: "15px",
                }}
              ></input>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6 mt-3">
            <div>
              <p
                className="text-center"
                style={{ color: "rgb(82, 114, 161)", fontSize: "20px" }}
              >
                <span>Next Life Declaration Submission Date</span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xl-6 col-lg-6 mt-3">
            <div style={{ justifyContent: "center", display: "flex" }}>
              <input
                type="text"
                disabled
                value={DeclarationDate?.nextDeclarationDate}
                id="dateInput"
                class="form-control"
                style={{
                  border: "1px solid rgb(114, 158, 216)",
                  width: "60%",
                  height: "3.5rem",
                  borderRadius: "15px",
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5" style={{ paddingBottom: "60px" }}>
        <div style={{ float: "left" }}>
          <Link to={"/add-asset"}>
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
        <div style={{ float: "right" }}>
          <button
            onClick={handleManage}
            // disabled={isDate ? false : true}
            style={{
              border: "none",
              fontSize: "14px",
              backgroundColor: "rgb(182, 205, 236)",
              padding: "8px",
              paddingRight: "15px",
              paddingLeft: "15px",
              borderRadius: "5px",
            }}
          >
            SUBMIT LIFE DECLERATION NOW
          </button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>
          <div
            className="mainDiv text-center"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            <span className="mx-2"> Blink Eyes</span>
            <img
              className="blinkEye"
              src={BlinkEye}
              alt="aa"
              style={{ height: "50px" }}
            />
            <span className="mx-2"> to capture selfie</span>
          </div>
        </ModalHeader>
        <div className="p-3">
          <Row>
            <Col lg="12" sm="12" md="12">
              {model == null ? (
                <>
                  <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="loader"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    {showWebcam && (
                      <div className="mb-2 mt-2">
                        <Webcam
                          width="100%"
                          height="auto"
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          style={{ borderRadius: "8px" }}
                        />
                      </div>
                    )}
                    {Data.image && (
                      <>
                        <div className="mb-2 d-flex justify-content-center">
                          <img
                            width="100%"
                            style={{ borderRadius: "12px" }}
                            src={Data.image}
                            alt="Captured"
                            className="mb-1"
                          />
                        </div>
                        {Loading ? (
                          <>
                            <div className="mb-2 d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-secondary"
                              >
                                Submitting...
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mb-2 d-flex justify-content-center">
                              <button
                                type="button"
                                onClick={handleSubmit}
                                // disabled={isDate ? true : false}
                                className="btn btn-primary"
                              >
                                Submit
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>
      </Modal>
      <ErrorModal
        show={errModal}
        message={message}
        onHide={() => setErrModal(false)}
      />
    </>
  );
};

export default LifeDeclaration;
