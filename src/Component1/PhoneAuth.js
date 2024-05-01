// import React, { useState } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// // import firebaseConfig from "../firebase.config"; // assuming you have a file named firebase.config.js exporting

// const PhoneAuth = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationId, setVerificationId] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");

//   // Initialize Firebase if not already initialized
//   // if (!firebase.apps.length) {
//   //   firebase.initializeApp(firebaseConfig);
//   // }

//   const handleSendOTP = async () => {
//     try {
//       const appVerifier = new firebase.auth.RecaptchaVerifier(
//         "recaptcha-container"
//       );
//       const confirmation = await firebase
//         .auth()
//         .signInWithPhoneNumber(phoneNumber, appVerifier);
//       setVerificationId(confirmation.verificationId);
//     } catch (error) {
//       console.error("Error sending verification code:", error);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     // try {
//     //   const credential = firebase.auth.PhoneAuthProvider.credential(
//     //     verificationId,
//     //     verificationCode
//     //   );
//     //   await firebase.auth().signInWithCredential(credential);
//     //   console.log("Successfully signed in");
//     // } catch (error) {
//     //   console.error("Error verifying OTP:", error);
//     // }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={phoneNumber}
//         onChange={e => setPhoneNumber(e.target.value)}
//       />
//       <button onClick={handleSendOTP}>Send OTP</button>
//       <div id="recaptcha-container"></div>
//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={verificationCode}
//         onChange={e => setVerificationCode(e.target.value)}
//       />
//       <button onClick={handleVerifyOTP}>Verify OTP</button>
//     </div>
//   );
// };

// export default PhoneAuth;

// firebase

// import React from "react";
// import firebase from "../firebase";

// class PhoneAuth extends React.Component {
//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };
//   configureCaptcha = () => {
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//       "sign-in-button",
//       {
//         size: "invisible",
//         callback: response => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           this.onSignInSubmit();
//           console.log("Recaptca varified");
//         },
//         defaultCountry: "IN",
//       }
//     );
//   };
//   onSignInSubmit = e => {
//     e.preventDefault();
//     this.configureCaptcha();
//     const phoneNumber = "+91" + this.state.mobile;
//     console.log(phoneNumber);
//     const appVerifier = window.recaptchaVerifier;
//     firebase
//       .auth()
//       .signInWithPhoneNumber(phoneNumber, appVerifier)
//       .then(confirmationResult => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         console.log("OTP has been sent");
//         // ...
//       })
//       .catch(error => {
//         // Error; SMS not sent
//         // ...
//         console.log("SMS not sent");
//       });
//   };
//   onSubmitOTP = e => {
//     e.preventDefault();
//     const code = this.state.otp;
//     console.log(code);
//     window.confirmationResult
//       .confirm(code)
//       .then(result => {
//         // User signed in successfully.
//         const user = result.user;
//         console.log(JSON.stringify(user));
//         alert("User is verified");
//         // ...
//       })
//       .catch(error => {
//         // User couldn't sign in (bad verification code?)
//         // ...
//       });
//   };
//   render() {
//     return (
//       <div>
//         <h2>Login Form</h2>
//         <form onSubmit={this.onSignInSubmit}>
//           <div id="sign-in-button"></div>
//           <input
//             type="number"
//             name="mobile"
//             placeholder="Mobile number"
//             required
//             onChange={this.handleChange}
//           />
//           <button type="submit">Submit</button>
//         </form>

//         <h2>Enter OTP</h2>
//         <form onSubmit={this.onSubmitOTP}>
//           <input
//             type="number"
//             name="otp"
//             placeholder="OTP Number"
//             required
//             onChange={this.handleChange}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }
// export default PhoneAuth;
