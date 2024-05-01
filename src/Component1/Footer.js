import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div class="footer">
        <div class="copyright">
          <div class="container">
            <div class="col-md-4">
              <p style={{ fontSize: "17px" }}>
                <span>
                  <Link
                    class="forhoveratagcolor"
                    to="/TermsAndConditions"
                    style={{ textDecoration: "none" }}
                  >
                    Terms and Condition
                  </Link>
                </span>
                <span>|</span>
                <span style={{ marginLeft: "5px" }}>
                  <Link
                    to="/PrivacyandPolicy"
                    style={{ textDecoration: "none" }}
                  >
                    Privacy Policy
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
