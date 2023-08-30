import React, { useState } from "react";
// import walogo from "../asset/walogo.png";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import walogo2 from "../asset/walogo2.png";
// import home from '../asset/home.png';
import Banner from "../asset/Banner.jpg";

import Lottie from "react-lottie";
import * as animationData from "../asset/ErrorRed.json";

function MyVerticallyCenteredModal(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal text-center px-2"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Lottie options={defaultOptions} height={100} width={100} />
        <h2 className="mt-3 mb-3">काहीतरी चूक झाली</h2>
        <h5 className="text-muted">{props.Error}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="close">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Section() {
  const navigate = useNavigate();
  const [district, setDistrict] = React.useState();
  const [SelectedDistrict, setSelectedDistrict] = React.useState();
  const [contact, setcontact] = React.useState();
  const [Error, setError] = React.useState();

  React.useEffect(() => {
    fetchData();
  }, []);

  const [modalShow, setModalShow] = React.useState(false);

  const fetchData = async () => {
    await fetch("https://yin-api.foxberry.link/v1/address/city/MH", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        console.log("Data", data);
        setDistrict(data);
      })
      .catch((err) => console.log("ERR", err));
  };
  // --------------- Lottie Code --------------------

  // --------------- Form Validations Code --------------------

  const FormValid = () => {
    let Isformvalid = true;

    if (!SelectedDistrict) {
      Isformvalid = false;
      console.log("Invalid District");
      setError("कृपया आपला जिल्हा निवडा");
      setModalShow(true);
    } else if (!contact) {
      Isformvalid = false;
      setError("कृपया आपला 10 आकडी WhatsApp नंबर प्रविष्ट करा");
      console.log("Invalid Contact");
      setModalShow(true);
    } else if (contact.length !== 10) {
      Isformvalid = false;
      setError("कृपया आपला 10 आकडी WhatsApp नंबर प्रविष्ट करा");
      setModalShow(true);
    }

    return Isformvalid;
  };

  const validate = () => {
    if (FormValid()) {
      navigate("/home");
    } else {
      console.log("Form Is Invalid");
    }
  };
  console.log("SelectedDistrict", SelectedDistrict);

  return (
    <div>
      <Container className="home-section">
        <Row className="justify-content-center align-items-center h-100 pt-4">
          <Col md={6}>
            <div className="typeWriter text-center">
              <Typewriter 
            options={{autoStart:true, loop:true}}
              onInit={(typewriter) => {
                typewriter 
                .start()
                  .typeString("ब्रेकिंग न्यूज")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("माहिती आणि मनोरंजन")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("शॉपिंगची धमाल")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("स्पर्धा परीक्षा मार्गदर्शन")
                  .pauseFor(1000)
                  .deleteAll()
                 .start()
              }}
            />
            </div>
            <div className="whatsApp-Heading d-flex align-items-center justify-content-center mt-4">
              <h4>आता तुमच्या</h4>
              <img
                src={walogo2}
                style={{ width: "40px" }}
                className="ms-2 me-1 mb-2"
                alt="WhatsApp"
              />
              <h4 className="whatsApp me-2">WhatsApp</h4>
              <h4>वर</h4>
            </div>
            <p
              className="text-center text-muted mt-3 mb-2"
              style={{ fontWeight: "500" }}
            >
              चला तर मग, आजच दैनिक गोमंतक जॉईन करा🤝
            </p>
            <div className="alert alert-pills  mt-2 mx-auto" role="alert">
              <span className="content"> Join Now, Absolutely </span>
              <span
                className="badge badge-pill badge-success ms-1"
                style={{ backgroundColor: "#25D366", borderRadius: "10px" }}
              >
                Free
              </span>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center inputRow  mx-auto mt-3">
          <Col md={4}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3 mb-md-0"
              value={SelectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option>जिल्हा निवडा</option>
              {district !== undefined && district.length > 0 ? (
                district.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option>No data Found</option>
              )}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3 mb-md-0">
              <Form.Control
                type="number"
                placeholder="तुमचा 10 अंकी WhatsApp क्रमांक"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button className="btn w-100 btn-join" onClick={() => validate()}>
              जॉईन करा
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={5} className="mt-5 mb-5">
            <img
              src={Banner}
              className="img-fluid"
              style={{ borderRadius: "15px" }}
              alt="Home"
            />
          </Col>
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        Error={Error}
      />

      {/* ----------- Modal For Error --------------- */}

      {/* <section
        className="bg-half-170 pb-0 bg-light d-table w-100"
        style={{ height: "73vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="title-heading text-center mt-4 mt-md-5 pt-md-5">
              <div className="typeWriter text-center">
            <Typewriter 
              onInit={(typewriter) => {
                typewriter 
                  .typeString("ब्रेकिंग न्यूज")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("माहिती आणि मनोरंजन")
                  .deleteAll()
                  .typeString("शॉपिंगची धमाल")
                  .deleteAll()
                  .typeString("स्पर्धा परीक्षा मार्गदर्शन")
                 .start();
                // typewriter.typeString("जॉब अपडेट्स")
                // typewriter.typeString("माहिती आणि मनोरंजन")
                // typewriter.typeString("शॉपिंगची धमाल")
                // typewriter.typeString("स्पर्धा परीक्षा मार्गदर्शन")
                //  typewriter.typepauseFor(1000)
                //  typewriter.deleteAll()
              }}
            />
            </div>
                <h3 className="heading mb-2">
                  <span
                    className="element text-primary"
                    data-elements="ब्रेकिंग न्यूज, जॉब अपडेट्स, माहिती आणि मनोरंजन ,शॉपिंगची धमाल, स्पर्धा परीक्षा मार्गदर्शन "
                  ></span>
                  <br />
                  <span style={{ fontSize: "24px !important" }}>
                    आता तुमच्या{" "}
                    <span style={{ color: "#25D366" }}>
                      {" "}
                      <img src={walogo} className="logowa" alt="" />
                      WhatsApp
                    </span>{" "}
                    वर
                  </span>
                </h3>

                <p
                  className="para-desc mx-auto text-muted"
                  style={{ marginBottom: "10px !important" }}
                >
                  चला तर मग, आजच दैनिक गोमंतक जॉईन करा🤝
                </p>

                <div className="alert alert-pills" role="alert">
                  <span className="content"> Join Now, Absolutely </span>
                  <span
                    className="badge badge-pill badge-success mr-1"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    {" "}
                    Free
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/home")}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
