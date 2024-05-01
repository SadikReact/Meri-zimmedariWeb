import React from "react";
import imagelogo from "../image/logo.png";
import "../css/style.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import faq from "../Component1/FAQ";
import { LinkContainer } from "react-router-bootstrap";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const Mynavbar = () => {
  const handleLogOut = () => {
    let token = JSON.parse(localStorage.getItem("user_token"));
    // if (token) {

    localStorage.removeItem("ad-token");
    localStorage.removeItem("UserZimmedari");
    localStorage.removeItem("user_token");
    localStorage.removeItem("UpdatedNo");
    localStorage.clear();
    window.location.replace("/#/");
    // }
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          marginBottom: "1rem",
        }}
      >
        <Container fluid>
          <Navbar.Brand href="#home">
            <Link to={"/"}>
              <img src={imagelogo} width={"100px"} alt="12" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto ">
              <LinkContainer to={"/dashboard"}>
                <Nav.Link className="cssfornavbarpadding">Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/add-asset"}>
                <Nav.Link className="cssfornavbarpadding">Add Asset</Nav.Link>
              </LinkContainer>

              <LinkContainer to={"/lifedeclaration"}>
                <Nav.Link className="cssfornavbarpadding">
                  Life Declaration
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={"/myprofile"}>
                <Nav.Link className="cssfornavbarpadding">My Profile</Nav.Link>
              </LinkContainer>

              <NavDropdown
                className="cssfornavbarpadding dropdown-toggle1"
                title="My Account"
                id="basic-nav-dropdown"
              >
                <LinkContainer to={"/assetdetails"}>
                  <NavDropdown.Item
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    Asset Details
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/nomineedetails"}>
                  <NavDropdown.Item>Nominee Details</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown
                  className="cssfornavbarpadding01 "
                  style={{ color: "black", fontWeight: "400" }}
                  title="Confidential Note"
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to={"/confidentialnoteeditor"}>
                    <NavDropdown.Item>New Confidential Note</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/manageconfidentialnote"}>
                    <NavDropdown.Item>
                      Manage Confidential Note
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <LinkContainer to={"/Preview"}>
                  <NavDropdown.Item>Preview</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/Subscriptioninvoices"}>
                  <NavDropdown.Item>Subscription & invoices</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/manageaccount"}>
                  <NavDropdown.Item>Manage Account</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <div className="cssfornavbarpadding sdasdfadfdfsdffsdfsdf">
                <Link to={"/FAQs"}>
                  <NavDropdown.Item>FAQ</NavDropdown.Item>
                </Link>
              </div>

              <div className="cssfornavbarpadding sdasdfadfdfsdffsdfsdf">
                <a
                  href={"https://merizimmedari.com/contact.html"}
                  target="_blank"
                  style={{ textDecoration: "none", color: "rgba(0, 0, 0, .5)" }}
                  rel="noreferrer"
                >
                  Help
                </a>
              </div>
              <LinkContainer to={""}>
                <Nav.Link className="cssfornavbarpadding">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-bell"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                  </span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={""}>
                <Nav.Link className="cssfornavbarpadding">
                  <span>
                    <Link
                      to="/"
                      className="Logout"
                      style={{ textDecoration: "none", hover: "red" }}
                      onClick={handleLogOut}
                    >
                      Log Out
                    </Link>
                  </span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Mynavbar;
