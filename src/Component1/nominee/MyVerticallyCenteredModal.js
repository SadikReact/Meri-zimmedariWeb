// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "react-bootstrap/Modal";
// import OTPInput, { ResendOTP } from "otp-input-react";
// import { useNavigate } from "react-router-dom";
// import EmailModal from ".././nominee/EmailModal";
// import "../../css/style.css";
// import axiosConfig from ".././../axiosConfig";
// import PhoneOtp from "./phoneOtp";

// function MyVerticallyCenteredModal(props) {
//   const [OTP, setOTP] = useState("");
//   const [count, setCount] = useState(0);
//   const [isCountingComplete, setIsCountingComplete] = useState(false);

//   useEffect(() => {
//     if (count < 59) {
//       const timer = setTimeout(() => {
//         setCount(count + 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setIsCountingComplete(true);
//     }
//   }, [count]);

//   const handleReset = () => {
//     setCount(0);
//     setIsCountingComplete(false);
//   };

//   return (
//     <>
//       {/* <div style={{ justifyContent: "center", display: "flex" }}> */}
//       {/* <Modal
//           {...props}
//           size="lg"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//         > */}
//       <PhoneOtp />
//       {/* <div
//             className="cssfornomineeformobileview"
//             style={{ overflow: "auto" }}
//           >
//             <div style={{ paddingTop: "20px" }}>
//               <p
//                 style={{
//                   color: "rgb(82, 114, 161)",
//                   textAlign: "center",
//                   fontSize: "18px",
//                 }}
//               >
//                 Please enter the One Time Password sent on
//               </p>
//               <p
//                 style={{
//                   color: "rgb(82, 114, 161)",
//                   textAlign: "center",
//                   fontSize: "22px",
//                 }}
//               >
//                 <span>Phone number 96XX450XX0 </span>
//                 <span>
//                   <Link
//                     onClick={props.onHide}
//                     to={""}
//                     style={{
//                       textDecoration: "none",
//                       color: "rgb(82, 114, 161)",
//                     }}
//                   >
//                     <span
//                       style={{ borderBottom: "1px solid rgb(82, 114, 161)" }}
//                     >
//                       Change
//                     </span>
//                   </Link>{" "}
//                 </span>
//               </p>
//               <div
//                 className="cssforboxdesigninotpcenter"
//                 style={{ marginTop: "40px", marginBottom: "30px" }}
//               >
//                 <OTPInput
//                   value={OTP}
//                   onChange={otp => {
//                     console.log(otp);
//                     setOTP(otp);
//                   }}
//                   autoFocus
//                   OTPLength={6}
//                   className="cssforboxdesigninotp"
//                   otpType="number"
//                   disabled={false}
//                 />
//               </div>
//               <div
//                 style={{
//                   justifyContent: "center",
//                   display: "flex",
//                   marginTop: "15px",
//                   paddingBottom: "40px",
//                 }}
//               >
//                 <span>
//                   <button
//                     className="cssforhandleotpcounttext"
//                     onClick={handleReset}
//                     style={{
//                       border: "none",
//                       borderBottom: "none",
//                       marginRight: "5px",
//                     }}
//                     disabled={!isCountingComplete}
//                   >
//                     <span
//                       style={{ borderBottom: "1px solid rgb(82, 114, 161)" }}
//                     >
//                       Reset
//                     </span>
//                   </button>
//                 </span>
//                 <span className="cssforhandleotpcounttext">
//                   {" "}
//                   One Time Password in {count} Seconds
//                 </span>
//               </div>
//             </div>
//           </div> */}
//       {/* </Modal> */}
//       {/* </div> */}
//     </>
//   );
// }
// export default MyVerticallyCenteredModal;
