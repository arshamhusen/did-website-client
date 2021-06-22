import React from "react";
import "../App.css";
import AOS from "aos";
import ProgressBar from "react-scroll-progress-bar";
import GirlLap from "../assets/girl.svg";
import Gif from "../assets/gif1.gif";
import Phone1 from "../assets/phone.png";
import Phone2 from "../assets/phone2.png";
import back from "../assets/Back.png";
import apple from "../assets/apple.svg";
import google from "../assets/play.png";
import Admin from "../assets/admin.png";
import { Link } from "react-router-dom";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ProgressBar
            bgcolor="rgba(1, 245, 245, 1)
rgba(37, 190, 239, 1)"
          />
        </div>
        <div className="main-cont">
          <div className="main-title" data-aos="fade-up">
            <h1>Join the digitalisation of identity</h1>
          </div>
          <div className="second-title">
            <h2>
              Modernize the sign in and attendance systems in your businesses,
              schools and organisations by using Digital Identity. Idenity
              yourself with just a tap.
            </h2>
          </div>
          <div className="btn-container">
            <Link to="/register">
              <button>Register to the IDMS Admin System</button>
            </Link>
          </div>
        </div>
        <div className="second-cont">
          {/* <div className="test" data-aos="flip-right"></div> */}
          <div data-aos="fade-right">
            <h2>Identity with one tap? How does that work?</h2>
            <h4>I know.. Pretty cool right?</h4>
          </div>
          <div className="img-cont-1" data-aos="fade-up">
            <img src={GirlLap} alt="girl" />
          </div>
          <div className="cont">
            <div className="content">
              <div data-aos="fade-left">
                <h1>01</h1>
              </div>
              <div data-aos="fade-up">
                <h5>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec porttitor tortor, congue tristique erat.
                  Suspendisse metus enim, scelerisque a finibus et, tempor sed
                  lacus.
                </h5>
              </div>
            </div>
            <div className="content">
              <div data-aos="fade-left">
                <h1>02</h1>
              </div>
              <div data-aos="fade-up">
                <h5>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec porttitor tortor, congue tristique erat.
                  Suspendisse metus enim, scelerisque a finibus et, tempor sed
                  lacus.
                </h5>
              </div>
            </div>
            <div className="content">
              <div data-aos="fade-left">
                <h1>03</h1>
              </div>
              <div data-aos="fade-up">
                <h5>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec porttitor tortor, congue tristique erat.
                  Suspendisse metus enim, scelerisque a finibus et, tempor sed
                  lacus.
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* third contents home */}
        <div className="third-cont" data-aos="zoom-out">
          <h1>Fine. Why chose it over physical cards?</h1>
          <h5>Glad you asked!</h5>
          <div className="cont-3" data-aos="fade-in">
            <div className="container-box">
              <div className="box" data-aos="flip-right">
                <h2>20%</h2>
                <h3>Faster</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec porttitor tortor, congue tristique erat.
                  Suspendisse metus enim, scelerisque a finibus et, tempor sed
                  lacus.
                </p>
              </div>
            </div>
            <div className="container-box">
              <div className="box" data-aos="flip-right">
                <h2>40%</h2>
                <h3>More Secure</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec porttitor tortor, congue tristique erat.
                  Suspendisse metus enim, scelerisque a finibus et, tempor sed
                  lacus.
                </p>
              </div>
            </div>
            <div className="container-box">
              <div className="box" data-aos="flip-right">
                <h2>200%</h2>
                <h3>Less Amiss</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam nec porttitor tortor, congue tristique erat.
                  Suspendisse metus enim, scelerisque a finibus et, tempor sed
                  lacus.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* gif testing */}
        <div className="forth-cont">
          <div className="forth-sub-cont" data-aos="fade-left">
            <h2>An IDMS system for the Administrators and lectures</h2>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              nec porttitor tortor, congue tristique erat. Suspendisse metus
              enim, scelerisque a finibus et, tempor sed lacus. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Aliquam nec porttitor
              tortor, congue tristique erat. Suspendisse metus enim, scelerisque
              a finibus et, tempor sed lacus.
            </h4>
          </div>
          <div className="cont-gif">
            <img src={Gif} alt="loading"></img>
          </div>
        </div>

        {/*  */}

        <div className="app-container">
          <div data-aos="zoom-out">
            <h1>A Mobile Client Application for Employees and Students</h1>
          </div>
          <div className="phones">
            <div className="phone-1">
              <img src={Phone1} alt="phone" data-aos="fade-left" />
            </div>
            <div className="phone-2">
              <img src={Phone2} alt="phone" data-aos="zoom-in" />
            </div>
            <div className="back">
              <img src={back} alt="phone" data-aos="fade-right" />
            </div>
          </div>
          <div className="available-cont">
            <h4>Available in both App Store and Google Play</h4>
          </div>
          <div className="download-cont">
            <a href="/">
              <img src={apple} alt="Apple" />
            </a>
            <a href="/">
              <img src={google} alt="Apple" />
            </a>
          </div>
        </div>

        {/* Last */}
        <div className="last-cont">
          <div className="last-sub-cont">
            <h1>Why wait? Get started!</h1>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              nec porttitor tortor, congue tristique erat. Suspendisse metus
              enim, scelerisque a finibus et, tempor sed lacus.{" "}
            </h5>
            <button>Get Started</button>
          </div>
          <div className="last-sub-cont" data-aos="fade-up">
            <img src={Admin} alt="haha"></img>
          </div>
        </div>
      </div>
    );
  }
}
