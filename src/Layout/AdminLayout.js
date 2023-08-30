import React from "react";
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Menubar from "../components/Admin/Menubar";
import Sidebar from "../components/Admin/Sidebar";


const AdminLayout = () => {
  return (
    <>
      <div>
        <Menubar/>
        <Container fluid className="">
          <Row>
            <div className="sidenav-lg-parent">
              <Col className="ps-0 d-none d-lg-block">
                <Sidebar />
              </Col>
              <Col>
                <div className="outletDiv px-3">
                  <Outlet />
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminLayout;
