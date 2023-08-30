// import React, { useState } from "react";
// import * as Icon from "react-bootstrap-icons";
// import {
//   Col,
//   Container,
//   FloatingLabel,
//   Form,
//   InputGroup,
//   Row,
// } from "react-bootstrap";

// const CreateForm = () => {
//   const [selects, setSelects] = useState("");

//   return (
//     <>
//       <Container>
//         <Row className="d-flex justify-content-center">
//           <Col md={4}>
//             <Form.Label>
//               <span style={{ color: "red" }}>*</span> Input Lable
//             </Form.Label>
//             <Form.Control />
//           </Col>

//           <Col md={4}>
//             <Form.Label>
//               <span style={{ color: "red" }}>*</span> Input Field
//             </Form.Label>
//             <Form.Select
//               name="selectfield"
//               value={selects}
//               onChange={(e) => setSelects(e.target.value)}
//             >
//               <option disabled selected>
//                 Select Field
//               </option>
//               <option value="textfield">Text Field</option>
//               <option value="dropdown">Dropdown</option>
//               <option value="checkbox">Checkbox</option>
//               <option value="radiobutton">Radiobutton</option>
//               <option value="textarea">Text Area</option>
//             </Form.Select>
//           </Col>
//         </Row>
//         <Row className="d-flex justify-content-center mt-5">
//           {/* <Col md={4}>{selects}</Col> */}
//           {selects === "textfield" ? (
//             <>
//               <Col md={4}>
//                 <Form.Label>Selected Input Field</Form.Label>
//                 <div className="d-flex justify-content-center align-items-center">
//                   <Form.Control className="me-2" />
//                   <Icon.PlusCircleFill
//                     className="add-button me-2"
//                     width="32"
//                     height="32"
//                   />
//                   <Icon.DashCircleFill
//                     className="add-button"
//                     width="32"
//                     height="32"
//                   />
//                 </div>
//               </Col>
//             </>
//           ) : selects === "dropdown" ? (
//             <Col md={4}>
//               <Form.Label>Selected Input Field</Form.Label>
//               <div className="d-flex justify-content-center align-items-center">
//                 <Form.Select className="me-2" />
//                 <Icon.PlusCircleFill
//                   className="add-button me-2"
//                   width="32"
//                   height="32"
//                 />
//                 <Icon.DashCircleFill
//                   className="add-button"
//                   width="32"
//                   height="32"
//                 />
//               </div>
//             </Col>
//           ) : selects === "checkbox" ? (
//             <Col md={4}>
//               <Form.Label>Selected Input Field</Form.Label>
//               <div className="d-flex justify-content-center align-items-center">
//                 <InputGroup className="me-2">
//                   <InputGroup.Radio aria-label="Radio button for following text input" />
//                   <Form.Control aria-label="Text input with radio button" />
//                 </InputGroup>
//                 <Icon.PlusCircleFill
//                   className="add-button me-2"
//                   width="32"
//                   height="32"
//                 />
//                 <Icon.DashCircleFill
//                   className="add-button"
//                   width="32"
//                   height="32"
//                 />
//               </div>
//             </Col>
//           ) : selects === "radiobutton" ? (
//             <Col md={4}>
//               <div className="me-5">
//                 <Form.Label>Selected Input Field</Form.Label>
//                 <div className="d-flex flex-direction-column">
//                   <InputGroup.Radio type="radio" />
//                   <Icon.PlusCircleFill
//                     className="add-button me-2"
//                     width="32"
//                     height="32"
//                   />
//                   <Icon.DashCircleFill
//                     className="add-button"
//                     width="32"
//                     height="32"
//                   />
//                 </div>
//               </div>
//             </Col>
//           ) : selects === "textarea" ? (
//             <Col md={4}>
//               <Form.Label>Selected Input Field</Form.Label>
//               <div className="d-flex justify-content-center align-items-center me-5">
//                 <FloatingLabel
//                   controlId="floatingTextarea"
//                   label="Enter text"
//                   className="me-2"
//                 >
//                   <Form.Control
//                     as="textarea"
//                     placeholder="Leave a comment here"
//                   />
//                 </FloatingLabel>
//                 <Icon.PlusCircleFill
//                   className="add-button me-2"
//                   width="32"
//                   height="32"
//                 />
//                 <Icon.DashCircleFill
//                   className="add-button"
//                   width="32"
//                   height="32"
//                 />
//               </div>
//             </Col>
//           ) : (
//             <Col md={4}>
//               <Form.Label>Selected Input Field</Form.Label>
//               <div className="d-flex justify-content-center align-items-center">
//                 <Form.Control className="me-2" />
//                 <Icon.PlusCircleFill
//                   className="add-button me-2"
//                   width="32"
//                   height="32"
//                 />
//                 <Icon.DashCircleFill
//                   className="add-button"
//                   width="32"
//                   height="32"
//                 />
//               </div>
//             </Col>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default CreateForm;
