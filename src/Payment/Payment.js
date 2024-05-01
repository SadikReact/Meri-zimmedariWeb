// import dotenv from "dotenv";
import React, { useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import { Razorpay } from "react-razorpay"; // Import Razorpay correctly
import image from "../image/logo.png";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

// dotenv.config();
export default function Payment({ selectedPlan, USer }) {
  const navigate = useNavigate();

  //   console.log(USer);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  const displayRazorpay = async () => {
    // let response = await axios.post("http://localhost:3000/api/razorpay", {
    //   totalBill,
    // });

    // let data = response.data;
    // let totalamount = total?.split(".")[0];
    const options = {
      // key: "rzp_test_Vhg1kq9b86udsY",
      key: "rzp_live_pDyucgvF2KySkB",
      currency: "INR",
      amount: selectedPlan?.price * 100,
      name: "Meri Zimmedari",
      description: "Transaction",
      image: image,
      //   order_id: "9A33XWu170gUtm",

      handler: async (response) => {
        // console.log(response.razorpay_payment_id);
        // console.log(response.razorpay_order_id);
        // console.log(response.razorpay_signature);
        // toast.success("Order Success");
        let payload = {
          userId: USer?._id,
          planId: selectedPlan?._id,
          planType: selectedPlan?.planType,
          price: Number(selectedPlan?.price),
          transactionId: response.razorpay_payment_id,
        };
        (async () => {
          await axiosConfig
            .post("/payment/save-payment", payload)
            .then((res) => {
              console.log(res);
              swal("success", "Successfully Paid", "success");
              // /dashboard
              navigate("/dashboard");
            })
            .catch((err) => {
              swal("error", "Something Went Wrong", "error");
              localStorage.setItem("Payment", JSON.stringify(payload));
              console.log(err);
            });
        })();
        // dispatch(setDeliveryDetail(checkout));
        // const res = await axios.post("http://localhost:3000/order/buynow", {
        //   customerid: currentCustomer._id,
        //   deliveryAddress: checkout.deliveryAddress,
        //   contactNumber: checkout.contactNumber,
        //   contactPerson: checkout.contactPerson,
        //   orderItems: products,
        // });
        // console.log(res);
        // toast.success("Order Placed Successfully");
        // navigate("/ordersuccess");
      },
      prefill: {
        name: USer?.firstName,
        email: USer?.email,
        contact: USer?.mobileNo,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      debugger;
      console.log(response);
      swal("error", `${response?.error?.reason}`, "error");

      //   alert(response.error.code);
      //   alert(response.error.description);
      //   alert(response.error.source);
      //   alert(response.error.step);
      //   alert(response.error.reason);
      //   alert(response.error.metadata.order_id);
      //   alert(response.error.metadata.payment_id);
    });

    //   rzp1.open();
    paymentObject.open();
  };
  return (
    <>
      {selectedPlan?.price == undefined ? (
        <Button color="info" className="px-5">
          Select Plan to Checkout
        </Button>
      ) : (
        <Button color="primary" className="px-5" onClick={displayRazorpay}>
          Proceed To Checkout
        </Button>
      )}
    </>
  );
}

// import React from "react";
// import useRazorpay from "react-razorpay";
// import { Button } from "reactstrap";

// function Payment() {
//   const [Razorpay] = useRazorpay();
//   const handlePayment = async (params) => {
//     // const order = await createOrder(params); //  Create order on your backend

//     const options = {
//       key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
//       amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       name: "Acme Corp",
//       description: "Test Transaction",
//       image: "https://example.com/your_logo",
//       //   order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature);
//       },
//       prefill: {
//         name: "Piyush Garg",
//         email: "youremail@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp1 = new Razorpay(options);

//     rzp1.on("payment.failed", function (response) {
//       alert(response.error.code);
//       alert(response.error.description);
//       alert(response.error.source);
//       alert(response.error.step);
//       alert(response.error.reason);
//       alert(response.error.metadata.order_id);
//       alert(response.error.metadata.payment_id);
//     });

//     rzp1.open();
//   };
//   return (
//     <div>
//       {" "}
//       <h2>Payment</h2>
//       <Button color="primary" onClick={handlePayment}>
//         Payment
//       </Button>
//     </div>
//   );
// }

// export default Payment;

// import { useCallback, useEffect } from "react";
// import useRazorpay from "react-razorpay";

// export default function App() {
//   const [Razorpay, isLoaded] = useRazorpay();

//   const handlePayment = useCallback(() => {
//     // const order = await createOrder(params);

//     const options = {
//       key: "rzp_test_Vhg1kq9b86udsY",
//       amount: "3000",
//       currency: "INR",
//       name: "Acme Corp",
//       description: "Test Transaction",
//       //   image: "https://example.com/your_logo",
//       //   order_id: 255,
//       //   order_id: order.id,
//       handler: (res) => {
//         console.log(res);
//       },
//       prefill: {
//         name: "Piyush Garg",
//         email: "youremail@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzpay = new Razorpay(options);
//     rzpay.open();
//   }, [Razorpay]);

//   useEffect(() => {
//     if (isLoaded) {
//       handlePayment();
//     }
//   }, [isLoaded, handlePayment]);

//   return (
//     <div className="App">
//       <button onClick={handlePayment}>Click</button>
//     </div>
//   );
// }
