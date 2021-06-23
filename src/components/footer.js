import React from "react";
import "../App.css";

function footer() {
  return (
    <div>
      {/* footer starts here */}
      <footer class="footer">
        <div class="inner-footer">
          <div class="footer-items">
            <h1>Digital Identity</h1>
            <p>
              Digital Identity is a mobile application which allows the users to
              identifyx themseleves and manage the idms
            </p>
            <ul>
              <li>
                <i class="fa fa-map-marker" aria-hidden="true"></i> Kiara
                Residence 2, Jalan 12/122, KL, Malaysia
              </li>
              <li>
                <i class="fa fa-phone" aria-hidden="true"></i> +60104301323
              </li>
              <li>
                <i class="fa fa-envelope" aria-hidden="true"></i>{" "}
                digitalidenity@gmail.com
              </li>
            </ul>
          </div>
          <div class="footer-items">
            <h2>Social Media</h2>
            <ul>
              <li>
                <a href="/">
                  <i class="fab fa-facebook"></i> | DID Application{" "}
                </a>
              </li>
              <li>
                <a href="/">
                  <i class="fab fa-google-plus"></i> | DID Application{" "}
                </a>
              </li>
              <li>
                <a href="/">
                  <i class="fab fa-twitter"></i> | didapp{" "}
                </a>
              </li>
              <li>
                <a href="/">
                  <i class="fab fa-instagram"></i> | didapp{" "}
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-items">
            <h2>Inquiry and Reviews</h2>
            <p>
              We would love to clarify any inquiries you have regarding the app.
              Please give a review too
            </p>
            <form id="Form1" class="input" runat="server">
              <div></div>
            </form>
          </div>
          <div class="footer-items">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">Sign up to DID</a>
              </li>
              <li>
                <a href="/">Our Services</a>
              </li>
              <li>
                <a href="/">Our reviews</a>
              </li>
              <li>
                <a href="/">Terms and conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          Copyright &copy; Digital Identity 2020. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default footer;
