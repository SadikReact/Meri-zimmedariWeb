import React, { useState } from "react";
import imagelogo from "../image/logo.png";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function NavBar() {
  return (
    <div class="container-fluid">
      <div class="row d_flex">
        <a href="https://merizimmedari.com/" target="_blank">
          <div class=" col-md-2 col-sm-9 ">
            <a href="https://merizimmedari.com/" target="_blank">
              <img
                src={imagelogo}
                target="_blank"
                href="https://merizimmedari.com/"
                style={{ width: "96px" }}
                alt="#"
              />
            </a>
          </div>
        </a>
        <div class="col-md-10 col-sm-12 chgdfagdjagdagfagsf">
          <nav class="navigation navbar navbar-expand-md navbar-dark ">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample04"
              aria-controls="navbarsExample04"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarsExample04">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item ">
                  <a
                    class="nav-link"
                    href="https://merizimmedari.com/WhatWeDo.html"
                  >
                    What We Do ?
                  </a>
                </li>
                <li class="nav-item ">
                  <a
                    class="nav-link"
                    href="https://merizimmedari.com/HowWeDo.html"
                  >
                    How It Works ?
                  </a>
                </li>
                <li class="nav-item ">
                  <Link class="nav-link" to="/FAQs">
                    FAQ
                  </Link>
                </li>

                <li class="nav-item ">
                  <a
                    class="nav-link"
                    href="https://merizimmedari.com/contact.html"
                  >
                    Contact Us
                  </a>
                </li>
                {/* <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://user.merizimmedari.com/#/"
                    target="_blank"
                  >
                    Log in
                  </a>
                </li> */}
                <li class="nav-item">
                  <a class="nav-link" href="https://user.merizimmedari.com/#/">
                    sign-in<span style={{ fontSize: "22px" }}>/</span>
                    Sign-up
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
