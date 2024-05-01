import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import moment from "moment";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as tf from "@tensorflow/tfjs";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
// import axiosConfig from "./../axiosConfig";
// import axiosConfigOne from "./../axiosCofigOne";
// import { Login, SaveData } from "../EndPoint/EndPoint";
// import logo from ".././assets/images/logo.png";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import { RiArrowGoBackFill, RiLogoutCircleRLine } from "react-icons/ri";

const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");

const Loginform = args => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const currentDate = moment();

  const toggle = () => setModal(!modal);
  const [formData, setFormData] = useState({
    mobile: "",
    image: null,
  });
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [MarkAttendenceData, setMarkAttendenceData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("modal loading...");
  const [count, setCount] = useState(0);
  const [model, setModel] = useState(null);
  const [maxLeft, setMaxLeft] = useState(0);
  const [maxRight, setMaxRight] = useState(0);
  const [backloading, setBackloading] = useState(false);
  const [Registration, setRegistration] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [LoginData, setLogin] = useState({});
  const [LoginScreen, setLoginScreen] = useState(true);
  const [LoginButton, setLoginButton] = useState("Submit");

  useEffect(() => {
    tf.setBackend("webgl");
    loadModel();
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!!userData) {
      // navigate("/home");
      setLoginScreen(false);
    }
  }, []);

  const loadModel = async () => {
    console.log("loading modal...");
    // Load the MediaPipe Facemesh package.
    faceLandmarksDetection
      .load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh, {
        maxFaces: 1,
      })
      .then(model => {
        console.log(model);
        setModel(model);
        setText("ready for capture");
        capture();
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
  };
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setText("detecting...");
        detectPoints();
      }, 2000);
    }
  }, [isOpen]);

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
          //console.log("cant", countN);
          console.log("isopen", isOpen);
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
    } catch (error) {
      // console.log(error);
    }
    if (!isOpen) {
      // stop detection
      setText("");
      return null;
    }
    setTimeout(async () => {
      await detectPoints();
    }, 100);
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
    console.log("isopen:::::", isOpen);
    let result = false;
    //    if ((maxLeft > limitOpenEye) && (maxRight > limitOpenEye)) {
    if (eyeLeft < baseCloseEye && eyeRight < baseCloseEye) {
      result = true;
      setIsOpen(false);
      console.log("isopen", isOpen);
    }
    console.log("isopen", isOpen);
    //    }

    console.log(result);

    return result;
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChange = e => {
    setLogin({
      ...LoginData,
      [e.target.name]: e.target.value,
    });
  };
  const capture = () => {
    setShowWebcam(true);
    handleClick();
  };

  const handleCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({
      ...formData,
      image: imageSrc,
      images: imageSrc,
    });
    setShowWebcam(false);
    // debugger;
    if (Registration) {
      toggle();
    } else {
      await handleSubmit(imageSrc);
    }
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

  const handleSubmit = async imageSrc => {
    toast("Submitted For Attandence Mark");
    setShowWebcam(false);
    const formattedDate = currentDate.format();
    const formattedTime = currentDate.format("h:mm:ss a");

    setTimeout(() => {
      setShowWebcam(true);
    }, 2000);

    const formDataToSend = new FormData();
    //   formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("time", formattedTime);
    formDataToSend.append("date", formattedDate.split("T")[0]);
    formDataToSend.append("image", dataURItoBlob(imageSrc));
    setBackloading(true);
    // const response = await axiosConfigOne
    //   .post("/login", formDataToSend)
    //   .then(res => {
    //     setMarkAttendenceData(res?.data.registeredUser);
    //     // console.log(res?.data.registeredUser?.name);
    //     setShowWebcam(true);
    //     toast(`Attendance Mark for ${res?.data.registeredUser?.name}`);
    //   })
    //   .catch(err => {
    //     if (!!err?.response?.data) {
    //       toast(`Error ${err?.response?.data}`);
    //     }

    //     console.log(err.response);
    //   });

    // try {
    //   console.log("Response", response);
    //   setRegistered(true);
    //   navigate("/Home");

    //   // Reset form after successful submission
    //   setFormData({
    //     mobile: "",
    //     image: null,
    //   });
    // } catch (error) {
    //   console.error("Error registering:", error);
    // }
  };
  const HandleSubmitData = async e => {
    e.preventDefault();

    setLoginButton("Submitting...");

    // console.log(LoginData);
    // console.log(formData);
    let formdata = new FormData();
    formdata.append("image", dataURItoBlob(formData.image));
    formdata.append("panNo", LoginData?.panNo);
    formdata.append("name", LoginData?.name);
    // let url = https://face-auth.merizimmedari.com/register

    // await axiosConfigOne
    //   .post("/register", formdata)
    //   .then(res => {
    //     swal("Sucess", "Data Saved Sucessfully");
    //     // console.log(res);
    //     setLoginButton("Submit");
    //     toggle();
    //     // navigate("/home");
    //   })
    //   .catch(err => {
    //     setLoginButton("Submit");
    //     console.log(err.response);
    //     if (!!err.response?.data?.message) {
    //       swal("Error", err.response?.data?.message);
    //     }
    //   });
  };

  const handleCheck = () => {
    if (isOpen) {
      setTimeout(() => {
        setText("detecting...");
        console.log("detecting...");
        detectPoints();
      }, 1500);
    }
  };
  const handleLoginSubmit = async e => {
    e.preventDefault();
    setLoginButton("Loading...");

    // await axiosConfig
    //   .post(Login, LoginData)
    //   .then(res => {
    //     setLoginButton("Submit");
    //     // handleCapture();

    //     if (res?.data?.status) {
    //       capture();
    //       localStorage.setItem("userData", JSON.stringify(res?.data.user));
    //       setLoginScreen(false);
    //       // handleCheck();
    //     }

    //     console.log(res);
    //   })
    //   .catch(err => {
    //     setLoginButton("Submit");

    //     console.log(err.response);
    //     setLoginScreen(true);

    //     swal("Error", err?.response?.data?.message, "error");
    //   });
  };

  return (
    <>
      <>
        <ToastContainer />
        {/* {model == null ? (
          <>
            <h5>Wait while model loading...</h5>
          </>
        ) : (
          <>
            <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="mobileNumber">
                    Mobile Number:
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="border rounded-md px-2 py-1 w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <button
                    type="button"
                    onClick={capture}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Capture Image
                  </button>
                  <p>{text}</p>
                </div>
                {showWebcam && (
                  <div className="mb-4">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="mb-2"
                    />
                    <button
                      type="button"
                      onClick={handleCapture}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Take Picture
                    </button>
                  </div>
                )}
                {formData.image && (
                  <div className="mb-4">
                    <img src={formData.image} alt="Captured" className="mb-2" />
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  login
                </button>
                {backloading && <p>Wait for a minute.</p>}
                {registered && <p>Registered.</p>}
              </form>
              <div>
                <p>
                  Not a user?{" "}
                  <span onClick={() => navigate("/signup")}>Register</span>
                </p>
              </div>
            </div>
          </>
        )} */}
      </>

      <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-lg">
        <div className="">
          {!LoginScreen && !LoginScreen && (
            <>
              <Row>
                <Col>
                  <>
                    <div className="d-flex justify-content-start">
                      <span
                        title="Go Back"
                        onClick={() => navigate("/")}
                        style={{
                          borderRadius: "50%",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      >
                        <RiArrowGoBackFill />
                      </span>
                    </div>
                  </>
                </Col>
                <Col>
                  <div className="d-flex justify-content-end">
                    <span
                      title=" Click to LogOut"
                      onClick={() => {
                        localStorage.removeItem("userData");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <RiLogoutCircleRLine color="red" size={25} />
                    </span>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <img height={250} width={250} src={"logo"} alt="image" />
        </div>
        <div className="d-flex justify-content-center">
          <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
        </div>
        {model == null ? (
          <>
            <div className="d-flex justify-content-center">
              <span style={{ color: "red" }}>Wait while Loading...</span>
            </div>
          </>
        ) : null}
        {LoginScreen && LoginScreen ? (
          <>
            <Form onSubmit={handleLoginSubmit}>
              <Row>
                <Col lg="12" sm="12" md="12">
                  <Label>Email id</Label>
                  <Input
                    required
                    name="email"
                    onChange={handleInputChange}
                    value={LoginData?.email}
                    type="email"
                    placeholder="Enter Email to Login"
                  />
                </Col>
                <Col lg="12" sm="12" md="12">
                  <Label className="mt-1">Password</Label>
                  <Input
                    required
                    name="password"
                    onChange={handleInputChange}
                    value={LoginData?.password}
                    type="password"
                    placeholder="Enter Password to Login"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="12" sm="12" md="12">
                  <div className="d-flex justify-content-center pt-2 mt-2">
                    <Button type="submit" color="primary">
                      {LoginButton && LoginButton}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </>
        ) : (
          <>
            <Row>
              <Col lg="12" sm="12" md="12">
                {model == null ? null : (
                  <>
                    <div className="max-w-md mx-auto  p-4 border rounded-md shadow-lg">
                      {formData.image && (
                        <div className="mb-2">
                          <img
                            style={{
                              borderRadius: "10px",
                              position: "absolute",
                            }}
                            height={100}
                            width={90}
                            src={formData.image}
                            alt="Captured"
                            className="mb-1"
                          />
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        {/* <div className="mb-4">
                            <button
                              type="button"
                              onClick={capture}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              Capture Image
                            </button>
                            <p>{text}</p>
                          </div> */}
                        {showWebcam && (
                          <div className="mb-4">
                            <Webcam
                              audio={false}
                              ref={webcamRef}
                              screenshotFormat="image/jpeg"
                              className="mb-2"
                            />
                            <button
                              type="button"
                              onClick={handleCapture}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              Take
                            </button>
                          </div>
                        )}
                        {formData.image && (
                          <div className="mb-2">
                            <img
                              src={formData.image}
                              alt="Captured"
                              className="mb-1"
                            />
                          </div>
                        )}
                        {/* <button
                         type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Register new User
                        </button> */}
                        {/* {backloading && <p>Wait for a minute.</p>} */}
                        {registered && <p>Registered.</p>}
                      </form>
                      <Row>
                        <Col>
                          {Registration && Registration ? null : (
                            <>
                              <div>
                                <p style={{ fontSize: "12px" }}>
                                  Not a user?{" "}
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      // setRegistration(true);
                                      // capture();
                                      navigate("/");
                                    }}
                                  >
                                    <span style={{ color: "blue" }}>
                                      Register here
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </Col>
            </Row>
            {/* <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="mobileNumber">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={capture}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Capture Image
                </button>
                <p>{text}</p>
              </div>
              {showWebcam && (
                <div className="mb-4">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Take Picture
                  </button>
                </div>
              )}
              {formData.image && (
                <div className="mb-4">
                  <img src={formData.image} alt="Captured" className="mb-2" />
                </div>
              )}
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                login
              </button>
              {backloading && <p>Wait for a minute.</p>}
              {registered && <p>Registered.</p>}
            </form>
            <div>
              <p>
                Not a user?{" "}
                <span onClick={() => navigate("/signup")}>Register</span>
              </p>
            </div> */}
          </>
        )}
      </div>
      {/* {model == null ? (
        <>
          <h4>Wait while model loading...</h4>
        </>
      ) : (
        <>
          <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {LoginScreen && LoginScreen ? (
              <>
                <Form onSubmit={handleLoginSubmit}>
                  <Row>
                    <Col lg="12" sm="12" md="12">
                      <Label>Email id</Label>
                      <Input
                        required
                        name="email"
                        onChange={handleInputChange}
                        value={LoginData?.email}
                        type="email"
                        placeholder="Enter Email to Login"
                      />
                    </Col>
                    <Col lg="12" sm="12" md="12">
                      <Label className="mt-1">Password</Label>
                      <Input
                        required
                        name="password"
                        onChange={handleInputChange}
                        value={LoginData?.password}
                        type="password"
                        placeholder="Enter Password to Login"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" sm="12" md="12">
                      <div className="d-flex justify-content-center pt-2 mt-2">
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="mobileNumber">
                      Mobile Number:
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="border rounded-md px-2 py-1 w-full"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={capture}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Capture Image
                    </button>
                    <p>{text}</p>
                  </div>
                  {showWebcam && (
                    <div className="mb-4">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="mb-2"
                      />
                      <button
                        type="button"
                        onClick={handleCapture}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Take Picture
                      </button>
                    </div>
                  )}
                  {formData.image && (
                    <div className="mb-4">
                      <img
                        src={formData.image}
                        alt="Captured"
                        className="mb-2"
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    login
                  </button>
                  {backloading && <p>Wait for a minute.</p>}
                  {registered && <p>Registered.</p>}
                </form>
                <div>
                  <p>
                    Not a user?{" "}
                    <span onClick={() => navigate("/signup")}>Register</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )} */}
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Submit Details here</ModalHeader>
        <div className="p-3">
          <Form onSubmit={HandleSubmitData}>
            <Row>
              <Col className="p-2" lg="12" sm="12" md="12">
                <Label>Pan Number *</Label>
                <Input
                  required
                  name="panNo"
                  onChange={handleInputChange}
                  value={LoginData?.panNo}
                  type="text"
                  placeholder="Enter Pan Number..."
                />
              </Col>
              <Col className="p-2" lg="12" sm="12" md="12">
                <Label className="mt-1">Name *</Label>
                <Input
                  required
                  name="name"
                  onChange={handleInputChange}
                  value={LoginData?.name}
                  type="text"
                  placeholder="Enter Name"
                />
              </Col>
              <Col lg="12" sm="12" md="12">
                {model == null ? (
                  <>
                    <h1>Wait while model loading...</h1>
                  </>
                ) : (
                  <>
                    <div className="max-w-md mx-auto  p-4 border rounded-md shadow-lg">
                      <form onSubmit={handleSubmit}>
                        {/* <div className="mb-4">
                            <button
                              type="button"
                              onClick={capture}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              Capture Image
                            </button>
                            <p>{text}</p>
                          </div> */}
                        {showWebcam && (
                          <div className="mb-4">
                            <Webcam
                              audio={false}
                              ref={webcamRef}
                              screenshotFormat="image/jpeg"
                              className="mb-2"
                            />
                            {/* <button
                                type="button"
                                onClick={handleCapture}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                              >
                                Take Picture
                              </button> */}
                          </div>
                        )}
                        {formData.image && (
                          <div className="mb-2 d-flex justify-content-center">
                            <img
                              style={{ borderRadius: "12px" }}
                              src={formData.image}
                              alt="Captured"
                              className="mb-1"
                            />
                          </div>
                        )}
                        {/* <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            login
                          </button>
                          {backloading && <p>Wait for a minute.</p>}
                          {registered && <p>Registered.</p>} */}
                      </form>
                      {/* <div>
                          <p>
                            Not a user?{" "}
                            <span onClick={() => navigate("/signup")}>
                              Register
                            </span>
                          </p>
                        </div> */}
                    </div>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg="12" sm="12" md="12">
                <div className="d-flex justify-content-center pt-2 mt-2">
                  <Button type="submit" color="primary">
                    {LoginButton && LoginButton}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Loginform;
