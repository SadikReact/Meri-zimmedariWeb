import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  useNavigate,
  Routes,
} from "react-router-dom";
import Mynavbar from "../Component1/Mynavbar";
import Manageaccount from "../Component1/Manageaccount";
import Subscriptioninvoices from "../Component1/Subscriptioninvoices";
import Confidentialnote from "../Component1/Confidentialnote";
import Nomineedetailsedit from "../Component1/Nomineedetailsedit";
import Nomineedetails from "../Component1/Nomineedetails";
import AssetDetails from "../Component1/AssetDetails";
import Myprofileedit1 from "../Component1/Myprofileedit1";
import Register from "../Component1/Register";
import MobileNumber from "../Component1/MobileNumber";
import Loginwithpassword from "../Component1/Loginwithpassword";
import Otpveri from "../Component1/Otpveri";
// import PhoneAuth from "../Component1/PhoneAuth";
import Login from "../Component1/Login";
import MyProfile from "../Component1/MyProfile";
import LifeDeclaration from "../Component1/LifeDeclaration";
import Assetstep3confirm from "../Component1/Assetstep3confirm";
import Assetstep3 from "../Component1/Assetstep3";
import Assetstep2 from "../Component1/Assetstep2";
import Assetpolicy from "../Component1/Assetpolicy";
import StepperForm from "../Component1/StepperForm";
import ViewAsset from "../Component1/ViewAsset";
import Icons from "../Component1/Icons";
import Index from "../Component1/Index";
import SubscriptionInvoices1 from "../Component1/SubscriptionInvoices1";

import Help from "../Component1/Help";
import TermsConditions from "../Component1/termsConditions";
import Confidentialeditor from "../Component1/Confidentialeditor";
import SignUpForm from "../components/SignUpForm";
import Loginform from "../components/Loginform";
import Home from "../components/Home";
import Capture1 from "../components/Capture1";
import Capture2 from "../components/Capture2";
import Splashscreen from "../components/Splashscreen";
import Forgotpassword from "../Component1/Forgotpassword";
import Forgototpverify from "../Component1/Forgototpverify";
import Payment from "../Component1/Payment";
import Preview from "../Component1/Preview";
import NotFind from "../Component1/NotFind";
import Manageconfidential from "../Component1/Manageconfidential";
import ViewConfidentialNote from "../Component1/confidentialNote/ViewConfidentialNote";
import EditConfidentialNote from "../Component1/confidentialNote/EditConfidentialNote";
import Termsandcondition from "../Component1/Termsandcondition";
import Privacypolicy from "../Component1/Privacypolicy";
import Faqpageweb from "../Component1/Faqpageweb";
import FAQs from "../Component1/FAQs";
import TermsAndConditions from "../Component1/TermsAndConditions";
import PrivacyandPolicy from "../Component1/PrivacyandPolicy";

const Routerfile = () => {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState("");
  // const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    // let token = localStorage.getItem("user_token");
    // let pageparmission = JSON.parse(sessionStorage.getItem("UserZimmedari"));
    // let accessToken = JSON.parse(sessionStorage.getItem("UserZimmedari")).token;
    // setLoader(pageparmission);

    //  if (accessToken === null || accessToken === undefined) {
    //       // window.location.href = "/";
    //       navigate("/");
    //     }
    // console.log(token);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // sessionStorage.clear();
    // if (token === undefined || token === null) {
    //   window.location.replace("/404");
    // }
  }, []);
  return (
    <>
      <Router>
        <Routes>
          {loading ? (
            <Route path="/face" element={<Splashscreen />} />
          ) : (
            <>
              <Route path="/privacypolicy" element={<Privacypolicy />} />
              <Route
                path="/termsandcondition"
                element={<Termsandcondition />}
              />
              <Route path="/FAQ" element={<Faqpageweb />} />
              <Route path="/Preview" element={<Preview />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/face" element={<Loginform />} />
              <Route path="/loginform" element={<Loginform />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/404" element={<NotFind />} />
              <Route
                path="/capture1"
                element={
                  <React.StrictMode>
                    <Capture1 />
                  </React.StrictMode>
                }
              />
              <Route path="/capture2" element={<Capture2 />} />
            </>
          )}

          <Route
            path="/confidentialnoteeditor"
            element={<Confidentialeditor />}
          />
          <Route
            path="/manageconfidentialnote"
            element={<Manageconfidential />}
          />
          <Route
            path="/viewConfidentialNote/:id"
            element={<ViewConfidentialNote />}
          />
          <Route
            path="/EditConfidentialNote/:id"
            element={<EditConfidentialNote />}
          />
          <Route path="/Help" element={<Help />} />
          <Route path="/termsConditions" element={<TermsConditions />} />

          <Route
            path="/Subscriptioninvoices/history"
            element={<SubscriptionInvoices1 />}
          />
          <Route path="/manageaccount" element={<Manageaccount />} />
          <Route
            path="/Subscriptioninvoices"
            element={<Subscriptioninvoices />}
          />
          <Route path="/registration" element={<Register />} />
          <Route path="/confidentialnote" element={<Confidentialnote />} />
          <Route path="/nomineedetails" element={<Nomineedetails />} />
          <Route path="/nomineedetailsedit" element={<Nomineedetailsedit />} />
          <Route path="/assetdetails" element={<AssetDetails />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myprofile/edit" element={<Myprofileedit1 />} />
          <Route path="/mobileNumber/:id" element={<MobileNumber />} />
          <Route path="/login/password" element={<Loginwithpassword />} />
          <Route path="/forgot/password" element={<Forgotpassword />} />
          <Route path="/login/otp" element={<Otpveri />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/PrivacyandPolicy" element={<PrivacyandPolicy />} />
          <Route path="/Forgot/password/otp" element={<Forgototpverify />} />
          <Route path="/lifedeclaration" element={<LifeDeclaration />} />

          <Route path="/add-asset" element={<Icons />} />
          <Route path="/assetType/view-asset" element={<ViewAsset />} />
          <Route path="/add-asset/policy" element={<Assetpolicy />} />
          <Route path="/add-aseets/nominee" element={<StepperForm />} />
          <Route path="/add-asset/step2" element={<Assetstep2 />} />
          <Route path="/add-asset/step3" element={<Assetstep3 />} />
          <Route
            path="/add-asset/setp3/confirm"
            element={<Assetstep3confirm />}
          />

          <Route path="/dashboard" element={<Index />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routerfile;
