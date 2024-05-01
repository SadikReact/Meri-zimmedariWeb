// import React, { useState } from "react";

// const MyComponent = () => {
//   const [response, setResponse] = useState(null);

//   const sendSMS = async () => {
//     const url =
//       "https://www.fast2sms.com/dev/bulkV2?authorization=tPeRv5qsOyILgfbKuFVinQcA6ZM0kNa7Dw1rzGh2Y438ljCHpXgy0kifoKxGPLvcB6lhYbFpMwt4NXQd&route=otp&variables_values=&flash=0&numbers=8889407856";

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setResponse(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={sendSMS}>Send SMS</button>
//       {response && (
//         <div>
//           <h3>Response:</h3>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyComponent;

// import React, { useState } from "react";
// import axios from "axios";
// import { OTP_main } from "./Api";

// const YourComponent = () => {
//   const [response, setResponse] = useState(null);

//   const sendSMS = async () => {
//     try {
//       const apiKey = OTP_main;
//       const url = "https://www.fast2sms.com/dev/bulkV2";
//       const data = {
//         variables_values: "5599",
//         route: "otp",
//         numbers: "7000420819",
//       };

//       const headers = {
//         Authorization: apiKey,
//         "Content-Type": "application/x-www-form-urlencoded",
//       };

//       const response = await axios.post(url, data, { headers });
//       debugger;
//       setResponse(response.data);
//     } catch (error) {
//       console.error("Error sending SMS:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={sendSMS}>Send SMS</button>
//       {response && (
//         <div>
//           <h2>Response:</h2>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YourComponent;

import React, { useState } from "react";
import axios from "axios";
import { OTP_main } from "./Api";

const YourComponent = () => {
  const [response, setResponse] = useState(null);
  const [otp, setOtp] = useState("");

  const generateOTP = () => {
    // Generate a random 6-digit number
    const newOTP = Math.floor(100000 + Math.random() * 900000);
    setOtp(newOTP);
    console.log(newOTP);
    return newOTP.toString(); // Convert number to string
  };
  // const handleGenerateOTP = () => {
  //   const newOTP = generateOTP();
  //   console.log(newOTP);
  //   localStorage.setItem("generateOtp", newOTP);
  //   setOtp(newOTP);
  //   return newOTP;
  // };
  const sendSMS = async () => {
    // const newOTP = handleGenerateOTP();
    const newOTP = generateOTP();
    debugger;
    try {
      const apiKey = OTP_main;
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&variables_values=${newOTP}&route=otp&numbers=7000420819`;

      const response = await axios.get(url);
      setResponse(response.data);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div>
      <button onClick={sendSMS}>Send SMS</button>
      <button onClick={generateOTP}>Generate OTP</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
