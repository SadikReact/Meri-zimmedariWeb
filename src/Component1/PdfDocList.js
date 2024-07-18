import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 30,
  },
  container: {
    fontSize: "10px",
  },
  GSTIN: {
    fontSize: "10px",
    fontWeight: "bold",
    marginTop: "1px",
    marginBottom: "2px",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCellHeader: {
    margin: "auto",
    marginBottom: 5,
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginBottom: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  hindiText: {
    fontFamily: "Roboto",
  },
});
const Invoice = ({
  tableData,
  userdetails,
  NomineeList,
  AssetList,
  nominees,
  manageList,
}) => (
  <PDFViewer width="1000" height="800">
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={{ margin: "20px 5px" }}>
            <Text style={{ textAlign: "center", fontWeight: "600" }}>
              CONDOLENCE
            </Text>
            <br />
            <Text>
              With profound grief, we extend our condolence on the demise of Mr.{" "}
              {userdetails?.firstName}. The entire family of merizimmedari.com
              prays that his departed soul rests in peace and that the bereaved
              family gets enough strength to bear this irreparable loss.
            </Text>
          </View>
          <View style={{ margin: "20px 5px" }}>
            <Text style={{ textAlign: "center", fontWeight: "600" }}>
              Disclaimer
            </Text>
            <br />
            <Text>
              The purpose of this document is to share the asset information
              uploaded by Mr.
              {userdetails?.firstName} on merizimmedari.com for Mr.{" "}
              {nominees?.nomineeName}. Please note that any distribution of
              assets to Mr. {nominees?.nomineeName} is entirely depends on the
              decision of the relevant asset managing organization (e.g., banks,
              insurance companies, etc.). Merizimmedari.com does not assert the
              authenticity of the information provided, as it is uploaded by the
              user and shared as such.
            </Text>
          </View>
          {AssetList ? (
            <>
              <View>
                <Text style={{ textAlign: "center", margin: "10px" }}>
                  Asset information
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#b4b6baad",
                  borderTop: "1px solid black",
                  borderRight: "1px solid black",
                  borderLeft: "1px solid black",
                  height: "23px",
                }}
              >
                <View
                  style={{
                    width: "7%",
                    padding: "3px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      color: "black",
                      fontWeight: "1000",
                      marginLeft: "2px",
                    }}
                  >
                    #
                  </Text>
                </View>
                <View
                  style={{
                    width: "25% ",
                    padding: "3px 2px",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    Asset Name
                  </Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    padding: "3px 2px",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    Asset Managing Org.
                  </Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "5px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    UIDName
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "5px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    UIDNo.
                  </Text>
                </View>
                <View
                  style={{
                    width: "45%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "5px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "6px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    DateofAssetLast Verified by User
                  </Text>
                </View>
                <View
                  style={{
                    width: "35%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "5px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    NomineeName
                  </Text>
                </View>
                <View
                  style={{
                    width: "35%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "5px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "6px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    RelationWithNominee
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "5px 2px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "6px",
                      color: "black",
                      fontWeight: "1000",
                    }}
                  >
                    PercentageOfShare
                  </Text>
                </View>
              </View>
            </>
          ) : null}

          {AssetList ? (
            <>
              <View
                style={{
                  marginTop: "1px",
                  flexDirection: "row",
                  borderRight: "1px solid black",
                  borderLeft: "1px solid black",
                  borderBottom: "1px solid black",
                  height: "30px",
                }}
              >
                <View
                  style={{
                    width: "7%",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "1000",
                      marginLeft: "2px",
                    }}
                  >
                    1
                  </Text>
                </View>

                <View
                  style={{
                    width: "25%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontWeight: "1000",
                      width: "100%",
                    }}
                  >
                    {AssetList?.assetType}
                  </Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontWeight: "1000",
                      justifyContent: "flex-end",
                    }}
                  >
                    {AssetList?.policyIssuersName}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "7px",
                      fontWeight: "1000",
                      marginLeft: "10px",
                    }}
                  >
                    {AssetList?.Field_3}
                  </Text>
                </View>
                <View
                  style={{
                    width: "45%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "6px",
                      fontWeight: "1000",
                    }}
                  >
                    {AssetList?.Field_3}
                  </Text>
                </View>
                <View
                  style={{
                    width: "40%",
                    flexDirection: "row",
                    justifyContent: "left",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontWeight: "1000",
                    }}
                  >
                    {moment(AssetList?.createdAt).format("MMM Do YY")}
                  </Text>
                </View>

                <View
                  style={{
                    width: "35%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      justifyContent: "center",
                      fontWeight: "1000",
                    }}
                  >
                    <Text style={styles.container}>
                      {nominees?.nomineeName}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: "35%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      justifyContent: "flex-end",
                      fontWeight: "1000",
                      marginLeft: "5px",
                    }}
                  >
                    {nominees?.relationWithNominee}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      justifyContent: "flex-end",
                      fontWeight: "1000",
                      marginLeft: "5px",
                    }}
                  >
                    {nominees?.percentageofShar
                      ? nominees?.percentageofShar
                      : "Not Available"}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            "No Data available"
          )}
          <View>
            <Text style={{ textAlign: "center", margin: "10px" }}>
              Confidential Note
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#b4b6baad",
              borderTop: "1px solid black",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              height: "23px",
            }}
          >
            <View
              style={{
                width: "20%",
                padding: "3px 2px",
                flexDirection: "row",
                justifyContent: "center",
                borderRight: "1px solid black",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  color: "black",
                  fontWeight: "1000",
                  marginLeft: "5px",
                }}
              >
                #
              </Text>
            </View>
            <View
              style={{
                width: "80%",
                padding: "3px 2px",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  color: "black",
                  fontWeight: "1000",
                }}
              >
                Note
              </Text>
            </View>
          </View>
          {manageList?.map((ele, i) => (
            <View
              key={i}
              style={{
                marginTop: "1px",
                flexDirection: "row",
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
                height: "30px",
              }}
            >
              <View
                style={{
                  width: "20%",
                  padding: "2px 2px",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "10px",
                    fontWeight: "1000",
                    marginLeft: "5px",
                  }}
                >
                  {i + 1}
                </Text>
              </View>

              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: "2px 2px",
                }}
              >
                <Text
                  style={{
                    fontSize: "10px",
                    fontWeight: "1000",
                  }}
                >
                  {ele?.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);
export default Invoice;
