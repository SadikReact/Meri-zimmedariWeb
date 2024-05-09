import React, { useEffect, useState } from "react";
import UserContext from "./Context";

const State = props => {
  const [AssetData, setAssetData] = useState("Jesse Hall");
  const [phoneOtp, setPhoneOtp] = useState(false);
  const [mailOtp, setMailOtp] = useState(false);

  useEffect(() => {
    console.log(phoneOtp);
    console.log(mailOtp);
  }, [phoneOtp, mailOtp]);

  return (
    <UserContext.Provider
      value={{
        AssetData,
        setAssetData,
        setPhoneOtp,
        phoneOtp,
        setMailOtp,
        mailOtp,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default State;
