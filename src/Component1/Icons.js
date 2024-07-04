import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mynavbar from "./Mynavbar";
import axiosConfig from "./../axiosConfig";
const Icons = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [noOfAsset, setNoOfAsset] = useState([]);
  const [num, setNum] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [AssetList, setAssetList] = useState([]);
  useEffect(() => {
    let assests = [];
    (async () => {
      let userId = JSON.parse(sessionStorage.getItem("UserZimmedari"));
      await axiosConfig
        .get(`/user/no-of-assets/${userId?._id}`)
        .then(res => {
          assests = res.data.assets;
          setNoOfAsset(res.data.assets);
        })
        .catch(err => {
          console.log(err);
        });
      await axiosConfig
        .get("/admin/get-list")
        .then(response => {
          // console.log(assests);
          // console.log(response.data.Field);
          let data = response.data.Field;

          data?.forEach((ele, index) => {
            let selectedassests;
            if (assests?.length > 0) {
              selectedassests = assests?.forEach((value, i) => {
                if (value?.assetsId?.Asset_Type == ele?.Asset_Type) {
                  ele["noOfAssets"] = value?.noOfAssets;
                }
              });
            }
            return selectedassests;
          });

          setResult(response.data.Field);
        })
        .catch(error => {
          console.error(error);
        });
    })();

    axiosConfig
      .get("/asset/view-asset")
      .then(res => {
        setAssetList(res.data.Asset);
      })
      .catch(err => {
        console.log(err);
      });
    FindAssetType();
  }, []);

  const FindAssetType = () => {
    const assetTypeCounts = [];

    AssetList.forEach(item => {
      const { assetType } = item;
      if (assetType) {
        const index = assetTypeCounts.findIndex(
          element => element.assetType === assetType
        );
        if (index === -1) {
          assetTypeCounts.push({ assetType, count: 1 });
        } else {
          assetTypeCounts[index].count++;
        }
      }
    });

    let arraList = [];
    assetTypeCounts?.map(assetTypeCount => {
      arraList.push(assetTypeCount);
    });
    setNum(arraList);
  };
  const handlePlus = selectedData => {
    // console.log(selectedData);
    const { _id, Asset_Type, Field_1, Field_2, Field_3, Field_4 } =
      selectedData;
    const payload = { Asset_Type, Field_1, Field_2, Field_3, Field_4, _id };

    localStorage.setItem("ViewOne", JSON.stringify(payload));
    localStorage.removeItem("assetDetails");
    localStorage.removeItem("nomineeDetails");
    navigate("/add-aseets/nominee", { state: selectedData });
  };

  const handleView = selectedData => {
    // console.log(selectedData);
    navigate("/assetType/view-asset", { state: selectedData });
  };
  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };
  const filteredData = result.filter(item =>
    item?.Asset_Type?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  return (
    <>
      <Mynavbar />
      <div>
        <p
          style={{
            fontSize: "22px",
            color: "rgb(43, 77, 129)",
            fontWeight: "400",
            backgroundImage:
              "linear-gradient(to right, rgb(194, 215, 233) , rgb(229, 234, 238))",
          }}
        >
          <span className="ml-3">Add Asset </span>

          <span></span>
        </p>
      </div>
      <div className="container">
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            paddingBottom: "30px",
          }}
        >
          <form class="example" style={{ width: "85%", borderRadius: "20px" }}>
            <input
              className="borderradiuscssforsearch"
              type="text"
              placeholder="Search.."
              name="search"
              onChange={handleSearch}
            />
            <button type="submit" className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="#5578B0"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-search hoverable-image"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <span
                className="icon-name"
                style={{ marginLeft: "5%", marginTop: "5px" }}
              >
                Search
              </span>
            </button>
          </form>
        </div>
        <div style={{ overflow: "scroll", height: "25rem" }}>
          <table className="table">
            <thead>
              <tr style={{ backgroundColor: "rgb(182, 204, 230)" }}>
                <th className="assettablehead">Asset Type</th>
                <th className="assettablehead">Number of Asset Added</th>
                <th
                  className="assettablehead "
                  // style={{
                  //   color: "rgb(47, 80, 119)",
                  //   fontSize: "18px",
                  //   fontFamily: "Calibri",
                  //   borderRight: "2px solid white",
                  // }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData?.map((ele, ind) => {
                  return (
                    <tr key={ind}>
                      <th
                        scope="row"
                        style={{
                          color: "rgb(47, 80, 119)",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          fontWeight: "400",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "-5px",
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid  rgb(114, 158, 216)",
                            width: "100%",
                          }}
                        >
                          {ele.Asset_Type}
                        </div>
                      </th>
                      <td
                        className="text-center"
                        style={{
                          color: "rgb(47, 80, 119)",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                          fontWeight: "400",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "-5px",
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid  rgb(114, 158, 216)",
                          }}
                        >
                          {ele?.noOfAssets && ele?.noOfAssets ? (
                            <>{ele?.noOfAssets}</>
                          ) : (
                            0
                          )}{" "}
                          Added
                        </div>
                      </td>
                      <td
                        className="text-center"
                        style={{
                          color: "rgb(47, 80, 119)",
                          fontSize: "18px",
                          fontFamily: "Calibri",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            border: "1px solid  rgb(114, 158, 216)",
                            marginTop: "-5px",
                          }}
                        >
                          <span className="icon-container">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              color="#5578B0"
                              width="30"
                              height="30"
                              fill="currentColor"
                              className="bi bi-eye hoverable-image"
                              viewBox="0 0 16 16"
                              type="button"
                              onClick={() => handleView(ele)}
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                            <span
                              className="icon-name"
                              style={{ marginLeft: "3.5%" }}
                            >
                              View
                            </span>
                          </span>
                          <span className="icon-container cssfordesktopviewforicon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0,0,256,256"
                              onClick={() => handlePlus(ele)}
                              className="hoverable-image"
                              type="button"
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                              >
                                <g transform="scale(5.33333,5.33333)">
                                  <path
                                    d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z"
                                    fill="#5578b0"
                                  ></path>
                                  <path
                                    d="M21,14h6v20h-6z"
                                    fill="#ffffff"
                                  ></path>
                                  <path
                                    d="M14,21h20v6h-20z"
                                    fill="#ffffff"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <span
                              className="icon-name"
                              style={{ marginLeft: "7%", cursor: "pointer" }}
                            >
                              Add
                            </span>
                          </span>
                          {/* <span className="icon-container cssfordesktopviewforicon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0,0,256,256"
                              onClick={() => handlePlus1(ele)}
                              className="hoverable-image"
                              type="button"
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                              >
                                <g transform="scale(5.33333,5.33333)">
                                  <path
                                    d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z"
                                    fill="#5578b0"
                                  ></path>
                                  <path
                                    d="M21,14h6v20h-6z"
                                    fill="#ffffff"
                                  ></path>
                                  <path
                                    d="M14,21h20v6h-20z"
                                    fill="#ffffff"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <span
                              className="icon-name"
                              style={{ marginLeft: "7%" }}
                            >
                              Add
                            </span>
                          </span> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="container mt-5 " style={{ paddingBottom: "60px" }}>
          <div style={{ float: "left" }}>
            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              <p
                style={{
                  color: "rgb(82, 114, 161)",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                  </svg>
                </span>
                <span className="ml-3">BACK</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Icons;
