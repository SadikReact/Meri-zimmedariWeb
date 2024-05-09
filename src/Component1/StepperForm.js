import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import MyContext from "../context/Context.js";
import Mynavbar from "./Mynavbar";
import PersonalDetails from "./PersonalDetails";
import CourseDetails from "./CourseDetails.js";
import Summary from "./Summary.js";
import axiosConfig from "./../axiosConfig";
const StepperForm = () => {
  // const sharedValue = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [myForm, setMyform] = useState({
    policyName: "",
    policyNumber: "",
    reEnterPolicyNumber: "",
    uploadedFileName: null,
  });
  const [showAsset, setShowAsset] = useState("");
  const [gotNomineeData, setGotNominee] = useState([]);
  const [showNominee, setShowNominee] = useState([]);
  const [dynamicFields, setdynamicFields] = useState(""); // for fields
  const [isUpload, setIsupload] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  // const [fileUrl, setFileUrl] = useState(null);
  const [policyName, setPolicyName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [reEnterPolicyNumber, setReEnterPolicyNumber] = useState("");
  // const [formError, setFormError] = useState({
  //   // IspolicyFile: false,
  //   IspolicyName: false,
  //   IspolicyNumber: false,
  //   IsreEnterPolicyNumber: false,
  //   IsBothMatch: false,
  // });
  const nextStep = () => {
    if (step === 1) {
      console.log("1", step);
      let user = JSON.parse(sessionStorage.getItem("UserZimmedari"));
      let asset = JSON.parse(localStorage.getItem("ViewOne"));
      // console.log(asset);
      let payload = {
        userId: user?._id,
        assetsId: asset?.dynamicFields?._id,
      };
      axiosConfig
        .post("/user/no-assets", payload)
        .then(response => {
          console.log("response", response.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    }
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const EditStepPage = item => {
    console.log(item);
    setGotNominee(item);
    setStep(step - 2);
  };

  useEffect(() => {
    if (location.state) {
      setdynamicFields(location?.state);
    }
  }, []);
  useEffect(() => {
    if (location.state) {
      setdynamicFields(location?.state);
    }
  }, [showNominee]);

  const handleChange = input => e => {
    if (input === "policyName") {
      setPolicyName(e.target.value);
    } else if (input === "policyNumber") {
      setPolicyNumber(e.target.value);
    } else if (input === "reEnterPolicyNumber") {
      setReEnterPolicyNumber(e.target.value);
    }
  };

  const handleFileChange = files => event => {
    const file = event.target.files[0];
    setUploadedFileName(file?.name || "Name Not Found");
    setUploadedFile(file);

    if (file && file.size > 500 * 1024) {
      debugger;
      setError("File size exceeds the permissible limit of 500 KB.");
      setIsupload(false);
      setUploadedFile(null);
    } else {
      setIsupload(true);
      setError(null);
      setUploadedFile(file);
      // if (file) {
      //   const fileReader = new FileReader();
      //   fileReader.onload = () => {
      //     setFileUrl(fileReader.result);
      //   };
      //   if (file.type.includes("image") || file.type === "application/pdf") {
      //     fileReader.readAsDataURL(file);
      //   }
      // }
    }

    // if (file && file.size > 500 * 1024) {
    //   setError("File size exceeds the permissible limit of 500 KB.");
    //   setIsupload(true);
    //   console.log(file);
    //   setUploadedFile(file);
    // } else {
    //   setError(null);
    //   setUploadedFile(file);
    //   // setUploadedFileName(file?.name || "Name Not Found");
    // }
    // if (file) {
    //   const fileSizeInBytes = file.size;
    //   const fileSizeInKilobytes = fileSizeInBytes / 1024;
    //   if (file.type === "application/pdf") {

    //     const fileSizeInBytes = file.size;
    //     const fileSizeInKilobytes = fileSizeInBytes / 1024;
    //     console.log("File size:", fileSizeInKilobytes, "KB");
    //   }

    //   else if (file.size / 1024) {
    //     console.log("File size:", fileSizeInKilobytes, "KB");
    // }
    // }
  };
  const submitData = e => {
    e.preventDefault();
    navigate("/add-asset/setp3/confirm");
    alert("Data sent");
  };

  switch (step) {
    case 1:
      return (
        <>
          <Mynavbar />
          <PersonalDetails
            nextStep={nextStep}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            uploadedFileName={uploadedFileName}
            uploadedFile={uploadedFile}
            dynamicFields={dynamicFields}
            myForm={myForm}
            setPolicyName={setPolicyName}
            setPolicyNumber={setPolicyNumber}
            setReEnterPolicyNumber={setReEnterPolicyNumber}
            showAssetData={showAsset}
            setShowAsset={setShowAsset}
            policyName={policyName}
            policyNumber={policyNumber}
            reEnterPolicyNumber={reEnterPolicyNumber}
            error={error}
            isUpload={isUpload}
          />
        </>
      );
    case 2:
      return (
        <>
          <Mynavbar />
          <CourseDetails
            nextStep={nextStep}
            prevStep={prevStep}
            showAsset={showAsset}
            setShowAsset={setShowAsset}
            setShowNominee={setShowNominee}
            gotNomineeData={gotNomineeData}
          />
        </>
      );
    case 3:
      return (
        <>
          <Mynavbar />
          <Summary
            nextStep={nextStep}
            prevStep={prevStep}
            submitData={submitData}
            showAsset={showAsset}
            showNominee={showNominee}
            EditStepPage={EditStepPage}
          />
        </>
      );
    default:
      return null;
  }
};

export default StepperForm;
