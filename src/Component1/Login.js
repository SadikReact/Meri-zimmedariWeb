import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import axiosConfig from "../axiosConfig";
import { useNavigate, Redirect } from "react-router-dom";
import "./loader.css";
import "./Otpveri";
import NavBar from "./NavBar";
import BlinkEye from "../image/eyedrop.gif";
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

  // useEffect(() => {
  //   let accessToken = JSON.parse(
  //     sessionStorage.getItem("UserZimmedari")
  //   )?.token;
  //   console.log(accessToken);
  //   //  const isLoggedIn = false;
  //   if (accessToken === null || accessToken === undefined) {
  //     // alert("Testing");
  //     window.location.replace("/");
  //     // window.location.href = "/registration";
  //     // navigate("/");
  //     // window.location.reload();
  //   }
  // }, []);
  // useEffect(() => {
  //   let accessToken = JSON.parse(
  //     sessionStorage.getItem("UserZimmedari")
  //   )?.token;
  //   if (accessToken === null || accessToken === undefined) {
  //     let value = window.location.pathname !== "/#/";
  //     if (value) {
  //       window.location.replace("/#/"); // Redirect to login page if token is not found
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // Prevent the user from going back in history
    preventBackButton();

    // Get location and update state asynchronously
    // let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    // console.log(user);

    return () => {
      allowBackButton();
    };
  }, []);
  const preventBackButton = () => {
    window.history.pushState(null, null, window.location.href);
    const popstateHandler = () => {
      window.history.go(1);
    };
    window.addEventListener("popstate", popstateHandler);
    // Return the handler to cleanup when component unmounts
    return popstateHandler;
  };

  const allowBackButton = popstateHandler => {
    window.removeEventListener("popstate", popstateHandler);
  };

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

  useEffect(() => {
    if (webcamRef.current) {
      capture(); // Trigger capture function when webcamRef is loaded
    }
  }, [webcamRef]);

  const loadModel = async () => {
    try {
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
      );

      setIsWaiting(true);
      setModel(model);
      setText("Ready for capture");
    } catch (err) {
      console.error("Error loading model:", err);
    }
  };

  const handleClick = () => {
    const newIsOpen = !isOpen;
    const newCount = isOpen ? count : 0;
    setIsOpen(newIsOpen);
    setCount(newCount);
  };
  // const capture = () => {
  //   setShowWebcam(true);
  //   handleClick();
  // };
  const capture = () => {
    setShowWebcam(true);
    handleClick();

    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        console.log("Screenshot captured:", imageSrc);
        handleCapture();
      } else {
        console.error("Error: Screenshot not captured.");
      }
    }, 2000);
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
        setLoading("Sign-in with Face recognition");
        if (res?.data?.User) {
          setMessage(`Face recognition  Succussfully`);
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
        setMessage("Face not Matched");
        setErrModal(true);
        setLoading("Sign-in with face recognition");
        console.log(err.message);
      });
    setTimeout(() => {
      setErrModal(false);
    }, 1000);
  };

  const detectPoints = async () => {
    if (!isOpen) return;

    try {
      if (!webcamRef.current || !webcamRef.current.video) {
        // If webcamRef or its video property is null, wait and retry
        setTimeout(detectPoints, 100);
        return;
      }

      const video = await webcamRef.current.video;
      const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: true,
        predictIrises: true,
      });

      if (predictions.length > 0) {
        const keypoints = predictions[0].scaledMesh;
        if (detectarBlink(keypoints)) {
          // Found blink, do something
          const countN = count + 1;
          setCount(countN);
          setIsOpen(false);
          handleCapture();
          handleClick();
          if (!isOpen) {
            // Stop detection
            setText("");
            return;
          }
        }
      } else {
        setMaxLeft(0);
        setMaxRight(0);
      }
    } catch (error) {
      console.error("Error in detectPoints:", error);
    }

    if (!isOpen) {
      // Stop detection
      setText("");
      return;
    }

    // Call detectPoints recursively after a delay
    setTimeout(detectPoints, 100);
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

  const generateOTP = () => {
    const myOtp = Math.floor(100000 + Math.random() * 900000);
    return myOtp.toString(); // Convert number to string
  };

  const sendSMS = async () => {
    const newOTP = generateOTP();
    try {
      const allUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=dlt&sender_id=MRZMDR&message=167804&variables_values=${newOTP}&flash=0&numbers=${phone}`;

      const response = await axiosConfig.get(allUrl);
      setResponse(response.data);
      // console.log(response.data);
      document.getElementById("alert").innerHTML = "";
      navigate("/login/otp", {
        state: { phone, newOTP },
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        document.getElementById("alert").innerHTML =
          "Sending multiple sms to same number is not allowed";
      }
    }
  };
  const sendVerifySms = async () => {
    try {
      const MobileVerifyUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=dlt&sender_id=MRZMDR&message=167805&variables_values=%7C%7C&flash=0&numbers=${phone}`;

      // const response = await axiosConfig.get(MobileVerifyUrl);

      navigate("/login/otp", {
        state: { phone },
      });
    } catch (error) {}
  };
  const handleMobile = () => {
    let payload = {
      mobileNo: Number(phone),
    };
    if (phone?.length == 10) {
      setIsError(false);

      axiosConfig
        .post("/save-mobile", payload)
        .then(response => {
          if (response.status == 200) {
            localStorage.setItem("MobileNUM", JSON.stringify(Number(phone)));
            sendSMS();
          }
        })
        .catch(error => {
          setMessage("Something Went Wrong");
          setErrModal(true);
          console.log(error.message);
        });
    } else {
      setIsError(true);
    }
  };
  const handleWithPassword = () => {
    localStorage.setItem("MobileNUM", JSON.stringify(Number(phone)));
    if (phone?.length == 10) {
      setIsError(false);

      navigate("/login/password", { state: phone });
    } else {
      setIsError(true);
    }
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

                    <div className="mt-5">
                      <button
                        type="button"
                        disabled={isNumber ? false : true}
                        class="btn "
                        style={{
                          width: "100%",
                          backgroundColor: "#4478c7",
                          color: "white",
                          height: "2.8rem",
                        }}
                        onClick={handleMobile}
                      >
                        Sign-in/Sign-up with OTP
                      </button>

                      <span
                        id="alert"
                        className="validationmobilefont"
                        style={{
                          color: "red",
                          padding: "5px",
                          marginTop: "13px",
                        }}
                      ></span>

                      <button
                        type="button"
                        class="btn mt-3 mb-3"
                        style={{
                          width: "100%",
                          color: "#4478c7",
                          height: "2.8rem",
                        }}
                        onClick={handleWithPassword}
                      >
                        Sign-in with Password
                      </button>
                    </div>
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
                        {/* Sign-in with face recognition */}
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

// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import * as tf from "@tensorflow/tfjs";
// import axiosConfig from "../axiosConfig";
// import { useNavigate, Redirect } from "react-router-dom";
// import "./loader.css";
// import "./Otpveri";
// import NavBar from "./NavBar";
// // import BlinkEye from "../image/eyedrop.gif";
// import Footer from "./Footer";
// import { ErrorModal } from "./ManageAccount/ErrorModal";
// const faceLandmarksDetection = require("@tensorflow-models/face-landmarks-detection");

// const Login = () => {
//   const webcamRef = useRef(null);
//   const [phone, setPhone] = useState(null);
//   const [IsWaiting, setIsWaiting] = useState(null);
//   const [Loader, setLoading] = useState("Sign-in with face recognition");
//   const [isSubmit, setIsSubmit] = useState(false);

//   const [response, setResponse] = useState(null);
//   const [isNumber, setIsNumber] = useState(false);
//   const [errModal, setErrModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [count, setCount] = useState(0);
//   const [maxLeft, setMaxLeft] = useState(0);
//   const [maxRight, setMaxRight] = useState(0);
//   const [model, setModel] = useState(null);
//   const [text, setText] = useState("modal loading...");
//   const [Registration, setRegistration] = useState(false);

//   const [isError, setIsError] = useState(false);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   let accessToken = JSON.parse(
//   //     sessionStorage.getItem("UserZimmedari")
//   //   )?.token;
//   //   console.log(accessToken);
//   //   //  const isLoggedIn = false;
//   //   if (accessToken === null || accessToken === undefined) {
//   //     // alert("Testing");
//   //     window.location.replace("/");
//   //     // window.location.href = "/registration";
//   //     // navigate("/");
//   //     // window.location.reload();
//   //   }
//   // }, []);
//   // useEffect(() => {
//   //   let accessToken = JSON.parse(
//   //     sessionStorage.getItem("UserZimmedari")
//   //   )?.token;
//   //   if (accessToken === null || accessToken === undefined) {
//   //     let value = window.location.pathname !== "/#/";
//   //     if (value) {
//   //       window.location.replace("/#/"); // Redirect to login page if token is not found
//   //     }
//   //   }
//   // }, []);

//   useEffect(() => {
//     // Prevent the user from going back in history
//     preventBackButton();

//     // Get location and update state asynchronously
//     // let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
//     // console.log(user);

//     return () => {
//       allowBackButton();
//     };
//   }, []);
//   const preventBackButton = () => {
//     window.history.pushState(null, null, window.location.href);
//     const popstateHandler = () => {
//       window.history.go(1);
//     };
//     window.addEventListener("popstate", popstateHandler);
//     // Return the handler to cleanup when component unmounts
//     return popstateHandler;
//   };

//   const allowBackButton = popstateHandler => {
//     window.removeEventListener("popstate", popstateHandler);
//   };

//   useEffect(() => {
//     tf.setBackend("webgl");
//     loadModel();
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => {
//         setText("detecting...");
//         detectPoints();
//       }, 1500);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (webcamRef.current) {
//       capture(); // Trigger capture function when webcamRef is loaded
//     }
//   }, [webcamRef]);

//   const loadModel = async () => {
//     try {
//       const model = await faceLandmarksDetection.load(
//         faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
//         { maxFaces: 1 }
//       );

//       setIsWaiting(true);
//       setModel(model);
//       setText("Ready for capture");
//     } catch (err) {
//       console.error("Error loading model:", err);
//     }
//   };

//   const handleClick = () => {
//     const newIsOpen = !isOpen;
//     const newCount = isOpen ? count : 0;
//     setIsOpen(newIsOpen);
//     setCount(newCount);
//   };
//   // const capture = () => {
//   //   setShowWebcam(true);
//   //   handleClick();
//   // };
//   const capture = () => {
//     setShowWebcam(true);
//     handleClick();

//     setTimeout(() => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         console.log("Screenshot captured:", imageSrc);
//         handleCapture();
//       } else {
//         console.error("Error: Screenshot not captured.");
//       }
//     }, 2000);
//   };

//   function dataURItoBlob(dataURI) {
//     const byteString = atob(dataURI.split(",")[1]);
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   }

//   const handleFaceRecognition = () => {
//     setIsWaiting(false);
//     setIsSubmit(true);
//     if (phone?.length == 10) {
//       capture();
//       setRegistration(true);
//       setIsError(false);
//     } else {
//       setIsError(true);
//     }
//   };
//   const handleCapture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setMessage("Image Captured Suceessfully");
//     setErrModal(true);
//     setShowWebcam(false);

//     setLoading("Loading...");
//     setIsSubmit(true);
//     const formdDetails = new FormData();
//     formdDetails.append("image", dataURItoBlob(imageSrc));
//     formdDetails.append("mobileNo", phone);

//     axiosConfig
//       .post("/signin", formdDetails)
//       .then(res => {
//         // console.log(res?.data?.message);
//         // console.log(res?.data?.User);
//         setLoading("Sign-in with face recognition");
//         if (res?.data?.User) {
//           setMessage(`${res?.data?.message}`);
//           setErrModal(true);
//           setIsSubmit(false);
//           sessionStorage.setItem(
//             "UserZimmedari",
//             JSON.stringify(res.data.User)
//           );
//           setTimeout(() => {
//             navigate("/dashboard");
//           }, 1000);
//         }
//       })
//       .catch(err => {
//         setLoading(false);
//         setLoading("Sign-in with face recognition");
//         console.log(err.message);
//       });
//     setTimeout(() => {
//       setErrModal(false);
//     }, 1000);
//   };

//   const detectPoints = async () => {
//     if (!isOpen) return;

//     try {
//       if (!webcamRef.current || !webcamRef.current.video) {
//         // If webcamRef or its video property is null, wait and retry
//         setTimeout(detectPoints, 100);
//         return;
//       }

//       const video = await webcamRef.current.video;
//       const predictions = await model.estimateFaces({
//         input: video,
//         returnTensors: false,
//         flipHorizontal: true,
//         predictIrises: true,
//       });

//       if (predictions.length > 0) {
//         const keypoints = predictions[0].scaledMesh;
//         if (detectarBlink(keypoints)) {
//           // Found blink, do something
//           const countN = count + 1;
//           setCount(countN);
//           setIsOpen(false);
//           handleCapture();
//           handleClick();
//           if (!isOpen) {
//             // Stop detection
//             setText("");
//             return;
//           }
//         }
//       } else {
//         setMaxLeft(0);
//         setMaxRight(0);
//       }
//     } catch (error) {
//       console.error("Error in detectPoints:", error);
//     }

//     if (!isOpen) {
//       // Stop detection
//       setText("");
//       return;
//     }

//     // Call detectPoints recursively after a delay
//     setTimeout(detectPoints, 100);
//   };

//   const calculateDistance = (x1, y1, x2, y2) => {
//     return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
//   };
//   const detectarBlink = keypoints => {
//     const leftEye_left = 263;
//     const leftEye_right = 362;
//     const leftEye_top = 386;
//     const leftEye_buttom = 374;
//     const rightEye_left = 133;
//     const rightEye_right = 33;
//     const rightEye_top = 159;
//     const rightEye_buttom = 145;

//     const leftVertical = calculateDistance(
//       keypoints[leftEye_top][0],
//       keypoints[leftEye_top][1],
//       keypoints[leftEye_buttom][0],
//       keypoints[leftEye_buttom][1]
//     );
//     const leftHorizontal = calculateDistance(
//       keypoints[leftEye_left][0],
//       keypoints[leftEye_left][1],
//       keypoints[leftEye_right][0],
//       keypoints[leftEye_right][1]
//     );
//     const eyeLeft = leftVertical / (2 * leftHorizontal);

//     const rightVertical = calculateDistance(
//       keypoints[rightEye_top][0],
//       keypoints[rightEye_top][1],
//       keypoints[rightEye_buttom][0],
//       keypoints[rightEye_buttom][1]
//     );
//     const rightHorizontal = calculateDistance(
//       keypoints[rightEye_left][0],
//       keypoints[rightEye_left][1],
//       keypoints[rightEye_right][0],
//       keypoints[rightEye_right][1]
//     );
//     const eyeRight = rightVertical / (2 * rightHorizontal);

//     const baseCloseEye = 0.1;
//     const limitOpenEye = 0.14;
//     if (maxLeft < eyeLeft) {
//       setMaxLeft(eyeLeft);
//     }
//     if (maxRight < eyeRight) {
//       setMaxRight(eyeRight);
//     }
//     let result = false;
//     //    if ((maxLeft > limitOpenEye) && (maxRight > limitOpenEye)) {
//     if (eyeLeft < baseCloseEye && eyeRight < baseCloseEye) {
//       result = true;
//       setIsOpen(false);
//     }

//     return result;
//   };

//   const generateOTP = () => {
//     const myOtp = Math.floor(100000 + Math.random() * 900000);
//     console.log(myOtp);
//     return myOtp.toString(); // Convert number to string
//   };

//   const sendSMS = async () => {
//     const newOTP = generateOTP();
//     try {
//       const allUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=dlt&sender_id=MRZMDR&message=167804&variables_values=${newOTP}&flash=0&numbers=${phone}`;

//       const response = await axiosConfig.get(allUrl);
//       setResponse(response.data);
//       // console.log(response.data);
//       document.getElementById("alert").innerHTML = "";
//       navigate("/login/otp", {
//         state: { phone, newOTP },
//       });
//     } catch (error) {
//       if (error?.response?.data?.message) {
//         document.getElementById("alert").innerHTML =
//           "Sending multiple sms to same number is not allowed";
//       }
//     }
//   };
//   const sendVerifySms = async () => {
//     try {
//       const MobileVerifyUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=dlt&sender_id=MRZMDR&message=167805&variables_values=%7C%7C&flash=0&numbers=${phone}`;

//       // const response = await axiosConfig.get(MobileVerifyUrl);

//       navigate("/login/otp", {
//         state: { phone },
//       });
//     } catch (error) {}
//   };
//   const handleMobile = () => {
//     let payload = {
//       mobileNo: Number(phone),
//     };
//     if (phone?.length == 10) {
//       setIsError(false);

//       axiosConfig
//         .post("/save-mobile", payload)
//         .then(response => {
//           if (response.status == 200) {
//             localStorage.setItem("MobileNUM", JSON.stringify(Number(phone)));
//             sendSMS();
//           }
//         })
//         .catch(error => {
//           setMessage("Something Went Wrong");
//           setErrModal(true);
//           console.log(error.message);
//         });
//     } else {
//       setIsError(true);
//     }
//   };
//   const handleWithPassword = () => {
//     localStorage.setItem("MobileNUM", JSON.stringify(Number(phone)));
//     if (phone?.length == 10) {
//       setIsError(false);

//       navigate("/login/password", { state: phone });
//     } else {
//       setIsError(true);
//     }
//   };
//   const handleChange = e => {
//     const value = e.target.value;
//     if (value) {
//       setIsNumber(true);
//     } else {
//       setIsNumber(false);
//     }
//     setPhone(value);
//   };
//   return (
//     <>
//       <div className="container-fluid " style={{ display: "inline-block" }}>
//         <div
//           class="header"
//           style={{ marginLeft: "-15px", boxShadow: "0 0 10px  #2374ee" }}
//         >
//           <NavBar />
//         </div>

//         <div className="row " style={{ paddingTop: "5rem" }}>
//           <div className="col-md-4 col-sm-1 col-lg-4 col-xl-4">
//             <div></div>
//           </div>
//           <div className="col-md-4 col-sm-10 col-lg-4 col-xl-4 ">
//             <div
//               className="gdfhagfjhagjhfgagfjhaf"
//               style={{
//                 margin: "1rem",
//                 marginTop: "4rem",
//                 borderRadius: "20px",
//                 backgroundColor: "white",
//                 paddingBottom: "1rem",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "rgb(194, 215, 233)",
//                   width: "100%",
//                   borderTopLeftRadius: "20px",
//                   borderTopRightRadius: "20px",
//                   paddingLeft: "2rem",
//                 }}
//               >
//                 <div
//                   className="cssforfontsizeinheading"
//                   style={{ fontWeight: "600" }}
//                 >
//                   Sign-in
//                   <span className="cssforfontsizeinheading" style={{}}>
//                     /
//                   </span>
//                   Sign-up to Meri Zimmedari
//                 </div>
//               </div>
//               {showWebcam && (
//                 <div className="mb-2" style={{ borderRadius: "12px" }}>
//                   <Webcam
//                     height="auto"
//                     width="100%"
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     className="mb-1"
//                   />
//                 </div>
//               )}
//               {/* {IsWaiting == false ? (
//                 <>
//                   <div className="d-flex justify-content-center mt-5 mb-5">
//                     <div className="loader"></div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     {showWebcam && (
//                       <div className="mb-2" style={{ borderRadius: "12px" }}>
//                         <div
//                           className="mainDiv text-center"
//                           style={{ fontSize: "20px", fontWeight: "600" }}
//                         >
//                           <span className="mx-2"> Blink Eyes</span>
//                           <img
//                             className="blinkEye"
//                             src={BlinkEye}
//                             alt="aa"
//                             style={{ height: "50px" }}
//                           />
//                           <span className="mx-2"> to capture selfie</span>
//                         </div>
//                         <Webcam
//                           height="auto"
//                           width="100%"
//                           audio={false}
//                           ref={webcamRef}
//                           screenshotFormat="image/jpeg"
//                           className="mb-1"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )} */}

//               <div style={{ margin: "2rem" }}>
//                 <div className="mt-3">
//                   <form>
//                     <fieldset
//                       style={{
//                         color: "rgb(82, 114, 161)",
//                         fontSize: "20px",
//                         fontFamily: "Calibri",
//                         border: "1px solid rgb(114, 158, 216)",
//                         borderRadius: "10px",
//                         height: "4rem",
//                         width: "100%",
//                       }}
//                     >
//                       <legend
//                         style={{
//                           color: "rgb(82, 114, 161)",
//                           marginBottom: "-5px",
//                           fontSize: "16px",
//                           paddingLeft: "5px",
//                           fontFamily: "Calibri",
//                           marginLeft: "15px",
//                           width: "8rem",
//                         }}
//                         for="exampleInputPassword1"
//                         class="form-label"
//                       >
//                         Mobile Number
//                         <span style={{ marginLeft: "2px", color: "red" }}>
//                           *
//                         </span>
//                       </legend>
//                       <button
//                         id="country"
//                         name="country"
//                         style={{ border: "none", backgroundColor: "white" }}
//                       >
//                         <option
//                           value="+91"
//                           style={{
//                             background: "transparent",
//                             fontSize: "16px",
//                           }}
//                         >
//                           IND (+91)
//                         </option>
//                       </button>
//                       <input
//                         required
//                         maxLength={10}
//                         className=""
//                         style={{
//                           border: "none",
//                           outline: "none",
//                           width: "60%",
//                           fontSize: "17px",
//                           paddingTop: "8px",
//                         }}
//                         type="tel"
//                         id="mobile"
//                         name="mobile"
//                         pattern="[0-9]{10}"
//                         error={isError}
//                         value={phone}
//                         onChange={handleChange}
//                       />

//                       {isError && (
//                         <p
//                           className="validationmobilefont"
//                           style={{
//                             color: "red",
//                             padding: "5px",

//                             marginTop: "13px",
//                           }}
//                         >
//                           Enter valid 10-digit mobile Number
//                         </p>
//                       )}
//                     </fieldset>

//                     <div className="mt-5">
//                       <button
//                         type="button"
//                         disabled={isNumber ? false : true}
//                         class="btn "
//                         style={{
//                           width: "100%",
//                           backgroundColor: "#4478c7",
//                           color: "white",
//                           height: "2.8rem",
//                         }}
//                         onClick={handleMobile}
//                       >
//                         Sign-in/Sign-up with OTP
//                       </button>

//                       <span
//                         id="alert"
//                         className="validationmobilefont"
//                         style={{
//                           color: "red",
//                           padding: "5px",
//                           marginTop: "13px",
//                         }}
//                       ></span>

//                       <button
//                         type="button"
//                         class="btn mt-3 mb-3"
//                         style={{
//                           width: "100%",
//                           color: "#4478c7",
//                           height: "2.8rem",
//                         }}
//                         onClick={handleWithPassword}
//                       >
//                         Sign-in with Password
//                       </button>
//                     </div>
//                     <div>
//                       <fieldset
//                         style={{
//                           color: "rgb(82, 114, 161)",
//                           fontSize: "20px",
//                           fontFamily: "Calibri",
//                           borderTop: "1px solid rgb(114, 158, 216)",
//                           borderRadius: "10px",
//                           width: "100%",
//                         }}
//                       >
//                         <legend
//                           style={{
//                             color: "rgb(82, 114, 161)",
//                             marginBottom: "-5px",
//                             fontSize: "20px",
//                             fontFamily: "Calibri",
//                             textAlign: "center",
//                             width: "4rem",
//                           }}
//                           for="exampleInputPassword1"
//                           class="form-label"
//                         >
//                           or
//                         </legend>
//                       </fieldset>
//                     </div>
//                     <div>
//                       <button
//                         disabled={isSubmit ? true : false}
//                         type="button"
//                         class="btn mt-4"
//                         onClick={handleFaceRecognition}
//                         style={{
//                           width: "100%",
//                           border: "1px solid rgb(114, 158, 216)",
//                           color: "rgb(82, 114, 161)",
//                           height: "2.8rem",
//                         }}
//                       >
//                         {Loader && Loader}
//                         {/* Sign-in with face recognition */}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div></div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ErrorModal
//         show={errModal}
//         message={message}
//         onHide={() => setErrModal(false)}
//       />
//     </>
//   );
// };

// export default Login;
