import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import logo from "../asset/img/logo.png";
import signature from "../asset/img/signature.png";
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
});

// Create Invoice component
const Invoice = ({ tableData, userdetails }) => {
  return (
    <PDFViewer width="1000" height="800">
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                border: "1px solid black",
                height: "110px",
              }}
            >
              <View
                style={{
                  width: "50%",
                }}
              >
                <Image
                  style={{ width: "200px", padding: "25px 10px" }}
                  src={logo}
                ></Image>
              </View>

              <View style={{ padding: "10px", width: "50%" }}>
                <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Meri Zimmedari
                </Text>

                <Text
                  style={{
                    fontSize: "8px",
                    marginTop: "5px",
                    marginBottom: "2px",
                    width: "90%",
                  }}
                >
                  FLAT NO. 118, B-5, CAUVERY BLOCK NATIONAL GAMES VILLAGE, delhi
                  Urban, New Delhi, 56004
                </Text>
                <Text style={styles.header}></Text>
                <Text style={styles.header}>
                  Email : merizimmedari@gmail.com
                </Text>
                <Text style={styles.header}>MobileNo :0731100001</Text>
                <Text style={styles.GSTIN}>GSTIN :25AAACH7409R1ZP</Text>
                {/* <Text style={styles.GSTIN}>
                  {`BankName :${
                    BilData?.CompanyDetails?.bankName &&
                    BilData?.CompanyDetails?.bankName
                  } 
                         Bank IFSC : :${
                           BilData?.CompanyDetails?.bankIFSC &&
                           BilData?.CompanyDetails?.bankIFSC
                         }
                         AccountNumber : :${
                           BilData?.CompanyDetails?.accountNumber &&
                           BilData?.CompanyDetails?.accountNumber
                         } `}
                </Text> */}
              </View>
              {/* <View>
                <Text
                  style={{
                    fontSize: "8px",
                    padding: "12px",
                    color: "black",
                  }}
                >
                  Meri Zimmedari
                </Text>
              </View> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                height: "auto",
                padding: "10px",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text>
                  UserName:{userdetails?.firstName + userdetails?.lastName}
                </Text>
                <Text>Email:{userdetails?.email}</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text>Mobile:{userdetails?.mobileNo}</Text>
                <Text>Gender:{userdetails?.gender}</Text>
                <Text>DOB:{userdetails?.dob}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#b4b6baad",
                // borderBottom: "1px solid black",
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                height: "23px",
              }}
            >
              <View
                style={{
                  width: "5%",
                  padding: "5px 2px",
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
                  width: "20%",
                  padding: "5px 2px",
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
                  }}
                >
                  Date
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  padding: "5px 2px",
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
                  }}
                >
                  Plan Type
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
                    fontSize: "10px",
                    color: "black",
                    fontWeight: "1000",
                  }}
                >
                  Service period
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
                    fontSize: "10px",
                    color: "black",
                    fontWeight: "1000",
                  }}
                >
                  Transaction Id
                </Text>
              </View>
              <View
                style={{
                  width: "30%",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: "5px 2px",
                }}
              >
                <Text
                  style={{
                    fontSize: "10px",
                    color: "black",
                    fontWeight: "1000",
                  }}
                >
                  Amount
                </Text>
              </View>
            </View>
            {tableData?.map((ele, i) => (
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
                    width: "3%",
                    padding: "2px 2px",
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
                    width: "15%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "1000",
                      marginLeft: "5px",
                    }}
                  >
                    {ele?.createdAt?.split("T")[0]}
                  </Text>
                </View>
                <View
                  style={{
                    width: "10%",
                    padding: "2px 2px",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",

                      fontWeight: "1000",
                      marginLeft: "3px",
                    }}
                  >
                    {ele?.planType}
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    marginLeft: "30px",
                    // flexDirection: "row",
                    justifyContent: "center",
                    padding: "1px 1px",
                  }}
                >
                  <Text style={styles.container}>{ele?.nextPaymentDate}</Text>
                  <Text style={styles.container}>{ele?.lastPaymentDate}</Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      justifyContent: "center",
                      fontWeight: "1000",
                      //   marginLeft: "5px",
                    }}
                  >
                    {ele?.transactionId}
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      justifyContent: "flex-end",
                      fontWeight: "1000",
                      marginLeft: "5px",
                    }}
                  >
                    {ele?.price}
                  </Text>
                </View>
              </View>
            ))}
            <View
              style={{
                flexDirection: "row",
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              <View
                style={{
                  width: "50%",
                  padding: "10px 10px",
                  borderRight: "1px solid black",
                }}
              ></View>

              <View
                style={{
                  borderBottom: "1px solid black",
                  width: "50%",
                  height: "140px",
                }}
              >
                <View>
                  <View style={{ padding: "3px 3px ", height: "180px" }}>
                    <Text style={{ fontSize: "11px" }}> For</Text>
                    <Text
                      style={{
                        fontSize: "8px",
                        marginTop: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      Meri Zimmedari
                    </Text>
                    <View>
                      <Image
                        style={{ height: "50px", marginTop: "15px" }}
                        src={signature}
                        width="200px"
                        height="200px"
                      ></Image>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: "2px",
                        marginTop: "20px",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: "10px" }}>
                        Authorized Signature
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Invoice;
