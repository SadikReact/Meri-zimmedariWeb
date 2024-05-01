import React, { useEffect, useState } from "react";
import UserContext from "./Context";

const State = props => {
  const [AssetData, setAssetData] = useState("Jesse Hall");

  // useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ AssetData, setAssetData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default State;
