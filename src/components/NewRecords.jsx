import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const NewRecords = () => {
  const [Active, setActive] = useState("SmsRecords");
  return (
    <>
      <NavBar />
       {/* <div>
        <Container className="mt-3">
          <Row className="d-flex justify-content-end">
            <Button
              className="btn-block w-auto me-3 btn-submit"
              onClick={() => setActive("SmsRecords")}
            >
              <Icon.ClipboardData className="me-2" />
              Watch Records
            </Button>
            <Button
              className="btn-block w-auto btn-submit"
              onClick={() => setActive("TinyURLData")}
            >
              <Icon.ClipboardPulse className="me-2" />
              Link Stats
            </Button>
          </Row>
          <Row>
            <Col md={12}>
              {Active==="SmsRecords" && <SmsRecords/>}
         {Active==="TinyURLData" && <TinyURLData />}
            </Col>
          </Row>
        </Container>
      </div>  */}
      
      <Outlet/>
      <Footer />
    </>
  );
};

export default NewRecords;
