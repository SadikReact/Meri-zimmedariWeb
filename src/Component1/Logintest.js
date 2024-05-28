import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import axiosConfig from "../axiosConfig";
import { useNavigate, Redirect } from "react-router-dom";
import "./loader.css";
import "./Otpveri";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ErrorModal } from "./ManageAccount/ErrorModal";
const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");

const Login = () => {
  const webcamRef = useRef(null);
  const [phone, setPhone] = useState(null);
  const [IsWaiting, setIsWaiting] = useState(null);
  const [Loader, setLoading] = useState("Sign-in with face recognition");
  const [isSubmit, setIsSubmit] = useState(false);

  const [response, setResponse] = useState(null);
  const [isNumber, setIsNumber] = useState(false);
  const [errModal, setErrModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [maxLeft, setMaxLeft] = useState(0);
  const [maxRight, setMaxRight] = useState(0);
  const [model, setModel] = useState(null);
  const [text, setText] = useState("modal loading...");
  const [Registration, setRegistration] = useState(false);

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tf.setBackend("webgl");
    loadModel();
  }, []);

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
        setIsWaiting(true);
        setModel(model);

        setText("ready for capture");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClick = () => {
    // debugger;
    const newIsOpen = !isOpen;
    console.log(newIsOpen);
    const newCount = isOpen ? count : 0;
    setIsOpen(newIsOpen);
    setCount(newCount);
  };
  const capture = () => {
    //  detectPoints();

    setShowWebcam(true);
    handleClick();
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

  const handleFaceRecognition = () => {
    setIsWaiting(false);
    setIsSubmit(true);
    if (phone?.length == 10) {
      capture();
      setRegistration(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };
  const handleCapture = () => {
    // debugger;
    const imageSrc = webcamRef.current.getScreenshot();
    setMessage("Image Captured Suceessfully");
    setErrModal(true);

    setShowWebcam(false);

    setLoading("Loading...");
    setIsSubmit(true);
    const formdDetails = new FormData();
    formdDetails.append("image", dataURItoBlob(imageSrc));
    formdDetails.append("mobileNo", phone);

    axiosConfig
      .post("/signin", formdDetails)
      .then(res => {
        console.log(res?.data?.message);
        console.log(res?.data?.User);
        setLoading("Sign-in with face recognition");
        if (res?.data?.User) {
          setMessage(`${res?.data?.message}`);
          setErrModal(true);
          setIsSubmit(false);
          sessionStorage.setItem(
            "UserZimmedari",
            JSON.stringify(res.data.User)
          );
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
    setTimeout(() => {
      setErrModal(false);
    }, 1000);
  };
  const detectPoints = async () => {
    if (isOpen == false) return;
    try {
      debugger;
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
          debugger;
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

  const handleChange = e => {
    const value = e.target.value;
    if (value) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
    setPhone(value);
  };
  return (
    <>
      <div className="container-fluid " style={{ display: "inline-block" }}>
        <div
          class="header"
          style={{ marginLeft: "-15px", boxShadow: "0 0 10px  #2374ee" }}
        >
          <NavBar />
        </div>

        <div className="row " style={{ paddingTop: "5rem" }}>
          <div className="col-md-4 col-sm-1 col-lg-4 col-xl-4">
            <div></div>
          </div>
          <div className="col-md-4 col-sm-10 col-lg-4 col-xl-4 ">
            <div
              className="gdfhagfjhagjhfgagfjhaf"
              style={{
                margin: "1rem",
                marginTop: "4rem",
                borderRadius: "20px",
                backgroundColor: "white",
                paddingBottom: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgb(194, 215, 233)",
                  width: "100%",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  paddingLeft: "2rem",
                }}
              >
                <div
                  className="cssforfontsizeinheading"
                  style={{ fontWeight: "600" }}
                >
                  Sign-in
                  <span className="cssforfontsizeinheading" style={{}}>
                    /
                  </span>
                  Sign-up to Meri Zimmedari
                </div>
              </div>
              {showWebcam && (
                <div className="mb-2" style={{ borderRadius: "12px" }}>
                  <Webcam
                    height="auto"
                    width="100%"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="mb-1"
                  />
                </div>
              )}

              <div style={{ margin: "2rem" }}>
                <div className="mt-3">
                  <form>
                    <fieldset
                      style={{
                        color: "rgb(82, 114, 161)",
                        fontSize: "20px",
                        fontFamily: "Calibri",
                        border: "1px solid rgb(114, 158, 216)",
                        borderRadius: "10px",
                        height: "4rem",
                        width: "100%",
                      }}
                    >
                      <legend
                        style={{
                          color: "rgb(82, 114, 161)",
                          marginBottom: "-5px",
                          fontSize: "16px",
                          paddingLeft: "5px",
                          fontFamily: "Calibri",
                          marginLeft: "15px",
                          width: "8rem",
                        }}
                        for="exampleInputPassword1"
                        class="form-label"
                      >
                        Mobile Number
                        <span style={{ marginLeft: "2px", color: "red" }}>
                          *
                        </span>
                      </legend>
                      <button
                        id="country"
                        name="country"
                        style={{ border: "none", backgroundColor: "white" }}
                      >
                        <option
                          value="+91"
                          style={{
                            background: "transparent",
                            fontSize: "16px",
                          }}
                        >
                          IND (+91)
                        </option>
                      </button>
                      <input
                        required
                        maxLength={10}
                        className=""
                        style={{
                          border: "none",
                          outline: "none",
                          width: "60%",
                          fontSize: "17px",
                          paddingTop: "8px",
                        }}
                        type="tel"
                        id="mobile"
                        name="mobile"
                        pattern="[0-9]{10}"
                        error={isError}
                        value={phone}
                        onChange={handleChange}
                      />

                      {isError && (
                        <p
                          className="validationmobilefont"
                          style={{
                            color: "red",
                            padding: "5px",

                            marginTop: "13px",
                          }}
                        >
                          Enter valid 10-digit mobile Number
                        </p>
                      )}
                    </fieldset>

                    <div>
                      <fieldset
                        style={{
                          color: "rgb(82, 114, 161)",
                          fontSize: "20px",
                          fontFamily: "Calibri",
                          borderTop: "1px solid rgb(114, 158, 216)",
                          borderRadius: "10px",
                          width: "100%",
                        }}
                      >
                        <legend
                          style={{
                            color: "rgb(82, 114, 161)",
                            marginBottom: "-5px",
                            fontSize: "20px",
                            fontFamily: "Calibri",
                            textAlign: "center",
                            width: "4rem",
                          }}
                          for="exampleInputPassword1"
                          class="form-label"
                        >
                          or
                        </legend>
                      </fieldset>
                    </div>
                    <div>
                      <button
                        disabled={isSubmit ? true : false}
                        type="button"
                        class="btn mt-4"
                        onClick={handleFaceRecognition}
                        style={{
                          width: "100%",
                          border: "1px solid rgb(114, 158, 216)",
                          color: "rgb(82, 114, 161)",
                          height: "2.8rem",
                        }}
                      >
                        {Loader && Loader}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <Footer />
      <ErrorModal
        show={errModal}
        message={message}
        onHide={() => setErrModal(false)}
      />
    </>
  );
};

export default Login;
