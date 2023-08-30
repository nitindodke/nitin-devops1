import React from "react";
import sakalLogo from "../asset/sakalLogo.webp";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";
import gaonconnectLogo from "../asset/appstore1024 x 1024-07.jpg";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/login");
  };
  const userData = localStorage.getItem("User");
  console.log("User");
  return (
    <nav className="navbar">
      <div className="container d-flex">
        <a className="navbar-brand d-block mx-auto" href="/">
          <img
            src={gaonconnectLogo}
            alt="Bootstrap"
            width="auto"
            height="60"
      
            style={{ borderRadius: "100%", }}
          />
        </a>
        {userData ? (
          <Button className="btn-submit" onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </div>
    </nav>
  );
}
