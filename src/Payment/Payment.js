import React, { useCallback, useEffect, useState } from "react";
import { Button } from "reactstrap";
// import { Razorpay } from "react-razorpay";
import image from "../image/logo.png";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "../Component1/ManageAccount/ErrorModal";

export default function Payment({ selectedPlan, USer, check }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errModal, setErrModal] = useState(false);
  const loadScript = src => {
    return new Promise(resolve => {
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
    const options = {
      key: "rzp_live_pDyucgvF2KySkB",
      currency: "INR",
      amount: selectedPlan?.price * 100,
      name: "Meri Zimmedari",
      description: "Transaction",
      image: image,

      handler: async response => {
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
            .then(res => {
              console.log(res);
              setMessage("Successfully Paid");
              setErrModal(true);
              navigate("/dashboard");
            })
            .catch(err => {
              setMessage("Something Went Wrong");
              setErrModal(true);
              localStorage.setItem("Payment", JSON.stringify(payload));
              console.log(err);
            });
        })();
      },
      prefill: {
        name: USer?.firstName,
        email: USer?.email,
        contact: USer?.mobileNo,
      },
    };

    const callingFilaedapi = async () => {
      debugger;
      const obj = {
        email: USer?.email,
      };

      await axiosConfig
        .post("/payment/payment-failed", obj)
        .then(res => {
          console.log(res?.data?.message);
          setErrModal(true);
        })
        .catch(err => {
          setMessage("Payment Failed Sadik");
          console.log(err);
        });
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      console.log(response);
      callingFilaedapi();
      setMessage(response?.error?.reason);
      setErrModal(true);
    });

    paymentObject.open();
  };
  return (
    <>
      <Button
        color="primary"
        disabled={check ? false : true}
        className="px-5"
        onClick={displayRazorpay}
      >
        Proceed To Checkout
      </Button>
      {/* {selectedPlan?.price == undefined ? (
        <Button color="info" className="px-5">
          Select Plan to Checkout
        </Button>
      ) : (
        <Button color="primary" className="px-5" onClick={displayRazorpay}>
          Proceed To Checkout
        </Button>
      )} */}
      <ErrorModal
        show={errModal}
        message={message}
        onHide={() => setErrModal(false)}
      />
    </>
  );
}
