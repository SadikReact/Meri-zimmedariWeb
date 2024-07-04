// import {
//   HashRouter as Router,
//   Route,
//   Switch,
//   BrowserRouter,
//   useNavigate,
//   Navigate,
//   Routes,
// } from "react-router-dom";
// import React, { lazy, Suspense, useEffect, useState } from "react";

// const Manageaccount = lazy(() => import("../Component1/Manageaccount"));
// const Subscriptioninvoices = lazy(() =>
//   import("../Component1/Subscriptioninvoices")
// );
// const Confidentialnote = lazy(() => import("../Component1/Confidentialnote"));
// const Nomineedetailsedit = lazy(() =>
//   import("../Component1/Nomineedetailsedit")
// );
// const Nomineedetails = lazy(() => import("../Component1/Nomineedetails"));
// const AssetDetails = lazy(() => import("../Component1/AssetDetails"));
// const Myprofileedit1 = lazy(() => import("../Component1/Myprofileedit1"));
// const Register = lazy(() => import("../Component1/Register"));
// const MobileNumber = lazy(() => import("../Component1/MobileNumber"));
// const Loginwithpassword = lazy(() => import("../Component1/Loginwithpassword"));
// const Otpveri = lazy(() => import("../Component1/Otpveri"));
// const Login = lazy(() => import("../Component1/Login"));
// const MyProfile = lazy(() => import("../Component1/MyProfile"));
// const LifeDeclaration = lazy(() => import("../Component1/LifeDeclaration"));
// const Assetstep3confirm = lazy(() => import("../Component1/Assetstep3confirm"));
// const Assetstep3 = lazy(() => import("../Component1/Assetstep3"));
// const Assetstep2 = lazy(() => import("../Component1/Assetstep2"));
// const Assetpolicy = lazy(() => import("../Component1/Assetpolicy"));
// const StepperForm = lazy(() => import("../Component1/StepperForm"));
// const ViewAsset = lazy(() => import("../Component1/ViewAsset"));
// const Icons = lazy(() => import("../Component1/Icons"));
// const Index = lazy(() => import("../Component1/Index"));
// const SubscriptionInvoices1 = lazy(() =>
//   import("../Component1/SubscriptionInvoices1")
// );
// const Invoice = lazy(() => import("../Component1/Invoice"));
// const Help = lazy(() => import("../Component1/Help"));
// const TermsConditions = lazy(() => import("../Component1/termsConditions"));
// const Confidentialeditor = lazy(() =>
//   import("../Component1/Confidentialeditor")
// );
// const SignUpForm = lazy(() => import("../components/SignUpForm"));
// const Loginform = lazy(() => import("../components/Loginform"));
// const Home = lazy(() => import("../components/Home"));
// const Capture1 = lazy(() => import("../components/Capture1"));
// const Capture2 = lazy(() => import("../components/Capture2"));
// const Splashscreen = lazy(() => import("../components/Splashscreen"));
// const Forgotpassword = lazy(() => import("../Component1/Forgotpassword"));
// const Forgototpverify = lazy(() => import("../Component1/Forgototpverify"));
// const Payment = lazy(() => import("../Component1/Payment"));
// const Preview = lazy(() => import("../Component1/Preview"));
// const PdfDocList = lazy(() => import("../Component1/PdfDocList"));
// const NotFind = lazy(() => import("../Component1/NotFind"));
// const Manageconfidential = lazy(() =>
//   import("../Component1/Manageconfidential")
// );
// const ViewConfidentialNote = lazy(() =>
//   import("../Component1/confidentialNote/ViewConfidentialNote")
// );
// const EditConfidentialNote = lazy(() =>
//   import("../Component1/confidentialNote/EditConfidentialNote")
// );
// const Termsandcondition = lazy(() => import("../Component1/Termsandcondition"));
// const Privacypolicy = lazy(() => import("../Component1/Privacypolicy"));
// const Faqpageweb = lazy(() => import("../Component1/Faqpageweb"));
// const FAQs = lazy(() => import("../Component1/FAQs"));
// // const Faq1 = lazy(() => import("../Component1/Faq1"));
// const TermsAndConditions = lazy(() =>
//   import("../Component1/TermsAndConditions")
// );
// const PrivacyandPolicy = lazy(() => import("../Component1/PrivacyandPolicy"));

// const routes = [
//   {
//     path: "/",
//     element: <Login />,
//     public: true,
//   },
//   {
//     path: "/dashboard",
//     element: <Index />,
//     public: true,
//   },
//   {
//     path: "/face",
//     element: <Splashscreen />,
//     public: true,
//   },
//   {
//     path: "/privacypolicy",
//     element: <Privacypolicy />,
//     public: true,
//   },
//   {
//     path: "/termsandcondition",
//     element: <Termsandcondition />,
//     public: true,
//   },
//   // {
//   //   path: "/FAQ",
//   //   element: <Faq1 />,
//   //   private: true,
//   // },
//   {
//     path: "/FAQ",
//     element: <Faqpageweb />,
//     public: true,
//   },
//   {
//     path: "/Preview",
//     element: <Preview />,
//     public: true,
//   },
//   {
//     path: "/PdfDocList",
//     element: <PdfDocList />,
//     public: true,
//   },
//   {
//     path: "/payment",
//     element: <Payment />,
//     public: true,
//   },
//   {
//     path: "/face",
//     element: <Loginform />,
//     public: true,
//   },
//   {
//     path: "/loginform",
//     element: <Loginform />,
//     public: true,
//   },
//   {
//     path: "/signup",
//     element: <SignUpForm />,
//     public: true,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//     public: true,
//   },
//   {
//     path: "/404",
//     element: <NotFind />,
//     public: true,
//   },
//   {
//     path: "/capture1",
//     element: <Capture1 />,
//     public: true,
//   },
//   {
//     path: "/capture2",
//     element: <Capture2 />,
//     public: true,
//   },
//   {
//     path: "/confidentialnoteeditor",
//     element: <Confidentialeditor />,
//     public: true,
//   },
//   {
//     path: "/manageconfidentialnote",
//     element: <Manageconfidential />,
//     public: true,
//   },
//   {
//     path: "/viewConfidentialNote/:id",
//     element: <ViewConfidentialNote />,
//     public: true,
//   },
//   {
//     path: "/EditConfidentialNote/:id",
//     element: <EditConfidentialNote />,
//     public: true,
//   },
//   {
//     path: "/Help",
//     element: <Help />,
//     public: true,
//   },
//   {
//     path: "/termsConditions",
//     element: <TermsConditions />,
//     public: true,
//   },
//   {
//     path: "/Subscriptioninvoices/history",
//     element: <SubscriptionInvoices1 />,
//     public: true,
//   },
//   {
//     path: "/Subscriptioninvoices/Invoice",
//     element: <Invoice />,
//     public: true,
//   },
//   {
//     path: "/manageaccount",
//     element: <Manageaccount />,
//     public: true,
//   },
//   {
//     path: "/Subscriptioninvoices",
//     element: <Subscriptioninvoices />,
//     public: true,
//   },
//   {
//     path: "/registration",
//     element: <Register />,
//     public: true,
//   },
//   {
//     path: "/confidentialnote",
//     element: <Confidentialnote />,
//     public: true,
//   },
//   {
//     path: "/nomineedetails",
//     element: <Nomineedetails />,
//     public: true,
//   },
//   {
//     path: "/nomineedetailsedit",
//     element: <Nomineedetailsedit />,
//     public: true,
//   },
//   {
//     path: "/assetdetails",
//     element: <AssetDetails />,
//     public: true,
//   },
//   {
//     path: "/myprofile",
//     element: <MyProfile />,
//     public: true,
//   },
//   {
//     path: "/myprofile/edit",
//     element: <Myprofileedit1 />,
//     public: true,
//   },
//   {
//     path: "/mobileNumber/:id",
//     element: <MobileNumber />,
//     public: true,
//   },
//   {
//     path: "/login/password",
//     element: <Loginwithpassword />,
//     public: true,
//   },
//   {
//     path: "/forgot/password",
//     element: <Forgotpassword />,
//     public: true,
//   },
//   {
//     path: "/login/otp",
//     element: <Otpveri />,
//     public: true,
//   },
//   {
//     path: "/FAQs",
//     element: <FAQs />,
//     public: true,
//   },
//   {
//     path: "/TermsAndConditions",
//     element: <TermsAndConditions />,
//     public: true,
//   },
//   {
//     path: "/PrivacyandPolicy",
//     element: <PrivacyandPolicy />,
//     public: true,
//   },
//   {
//     path: "/Forgot/password/otp",
//     element: <Forgototpverify />,
//     public: true,
//   },
//   {
//     path: "/lifedeclaration",
//     element: <LifeDeclaration />,
//     public: true,
//   },
//   {
//     path: "/add-asset",
//     element: <Icons />,
//     public: true,
//   },
//   {
//     path: "/assetType/view-asset",
//     element: <ViewAsset />,
//     public: true,
//   },
//   {
//     path: "/add-asset/policy",
//     element: <Assetpolicy />,
//     public: true,
//   },
//   {
//     path: "/add-aseets/nominee",
//     element: <StepperForm />,
//     public: true,
//   },
//   {
//     path: "/add-asset/step2",
//     element: <Assetstep2 />,
//     public: true,
//   },
//   {
//     path: "/add-asset/step3",
//     element: <Assetstep3 />,
//     public: true,
//   },
//   {
//     path: "/add-asset/setp3/confirm",
//     element: <Assetstep3confirm />,
//     public: true,
//   },
// ];
// const Routerfile = () => {
//   const [loading, setLoading] = useState(false);
//   const isAuthenticated = () => {
//     const token =
//       "dfnjfnjnfjffds55vdfv7d7fv//81dvf8vd18vf7dv7dfvdv7dfd1gb7dgb7dgb7";
//     console.log(token);
//     return token && token !== null;
//   };
//   useEffect(() => {
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <>
//       <Router>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             {routes?.map((route, index) => {
//               if (route.public) {
//                 return (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 );
//               } else if (route.public) {
//                 return isAuthenticated() ? (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ) : (
//                   <Route path="*" element={<Navigate to="/login" replace />} />
//                 );
//               }
//             })}
//             <Route path="*" element={<Navigate to="/404" replace />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </>
//   );
// };

// export default Routerfile;

import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  useNavigate,
  Routes,
  Navigate,
} from "react-router-dom";

import React, { lazy, Suspense, useEffect, useState } from "react";

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
import Invoice from "../Component1/Invoice";

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
import PdfDocList from "../Component1/PdfDocList";
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
import Faq1 from "../Component1/FAQ";

const Routerfile = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
              <Route path="/FAQ" element={<Faq1 />} />
              <Route path="/FAQ" element={<Faqpageweb />} />
              <Route path="/Preview" element={<Preview />} />
              <Route path="/PdfDocList" element={<PdfDocList />} />
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
          <Route path="/Subscriptioninvoices/Invoice" element={<Invoice />} />
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
