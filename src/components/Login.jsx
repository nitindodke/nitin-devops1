import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { BASE_URL } from "../Utils/urls";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Login = () => {
  const notify = () => {
    toast.error("Please fill your details", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const mobileError = () => {
    toast.error("Please Enter Valid Mobile Number", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const APiError = () => {
    toast.warning("Something Went Wrong !!.Please Try Again", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const Invalid = () => {
    toast.error("Invalid Login Credentials !!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const navigate = useNavigate();

  const [Mobile, setMobile] = useState("");
  console.log(Mobile);
  const [Pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const validate = () => {
    let FormValid = true;

    if (!Mobile || !Pass) {
      FormValid = false;
      notify();
    } else if (Mobile.match(/[A-Za-z+@#$&%!~]/) || Mobile.length !== 10) {
      FormValid = false;
      mobileError();
    }
    return FormValid;
  };

  const handleLogin = async () => {
    setLoader(true);
    if (validate()) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("contact", Mobile);
      urlencoded.append("password", Pass);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const result = await fetch(BASE_URL + "/user/login", requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log("API", res);
          if (res.errors === "No user found") {
            Invalid();
            setLoader(false);
          } else if (!res.user.user) {
            navigate("/admin");
          } else {
            localStorage.setItem("User", res.user.user);
            navigate("/admin/records");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          APiError();
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  return (
    <>
    <NavBar />
    <div className="login-main">
      <ToastContainer autoClose={false} />
      <Container className="login">
        <Row className="justify-content-center align-items-center h-100">
          <Col md={6}>
            <Card className="card px-4 py-4 text-center">
              <h1 className="heading mb-4">Login</h1>

              <Form className="px-4">
                <Form.Control
                  type="tel"
                  placeholder="Mobile Number"
                  value={Mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mb-3"
                />

                <InputGroup className="mb-4">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={Pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <InputGroup.Text>
                    {showPassword ? (
                      <Icon.EyeSlash
                        style={{ cursor: "pointer" }}
                        onClick={() => setshowPassword(!showPassword)}
                      />
                    ) : (
                      <Icon.Eye
                        style={{ cursor: "pointer" }}
                        onClick={() => setshowPassword(!showPassword)}
                      />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                <Button
                  className="btn-submit"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  {loader ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer />
    </>
  );
};

export default Login;
