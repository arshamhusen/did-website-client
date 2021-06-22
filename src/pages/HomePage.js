import React from "react";
import NavBar from "../components/navBar";
import HomePage from "../components/homePage";
import Footer from "../components/footer";
import "../App.css";
export default class HomeLandingPage extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <HomePage />
        <Footer />
      </div>
    );
  }
}
