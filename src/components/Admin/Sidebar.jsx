import React from "react";
import { Accordion, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="sidenav-lg">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Icon.HouseDoor className="me-2" />
              Home
            </Accordion.Header>
            <Accordion.Body>
              <Button
                className="w-100 mb-2 btn-accordionMenu"
                onClick={() => {
                  navigate("/current-year");
                }}
              >
                {" "}
                <Icon.Activity className="me-2" />
                Watch Records
              </Button>
              <Button
                className="w-100 mb-2 btn-accordionMenu"
                onClick={() => {
                  navigate("/overall-business-performance-1");
                }}
              >
                <Icon.Activity className="me-2" />
                Link Stats
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <Icon.ArrowDownCircle className="me-2" />
              Manage Forms
            </Accordion.Header>
            <Accordion.Body>
              <Button
                className="w-100 mb-2 btn-accordionMenu"
                onClick={() => {
                  navigate("/dashboard/search");
                }}
              >
                <Icon.CardHeading className="me-2" />
                Create Form
              </Button>
              <Button
                className="w-100 mb-2 btn-accordionMenu"
                onClick={() => {
                  navigate("/dashboard/editform");
                }}
              >
                <Icon.PencilSquare className="me-2" />
                Edit Form
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
