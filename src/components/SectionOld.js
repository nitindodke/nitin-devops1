import React, { useState, useEffect } from "react";
import walogo2 from "../asset/walogo2.png";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import Typed from 'react-typed';
// import Banner from '../asset/Banner.jpg';
// import Typewriter from "typewriter-effect";
import gif from "../asset/white-Broadcast.gif";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Section() {
  useEffect(() => {
    getLang();
    console.log("getPrefernces Calling");
  }, []);
  const [lang, setLang] = React.useState("");
  const [loader, setLoader] = useState(false);

  const [textLinesMarathi, settextLinesMarathi] = useState([]);
  const [textLinesENGLSIH, settextLinesENGLSIH] = useState([]);
  const changeLang = () => {
    if (lang === "marathi") {
      localStorage.setItem("lang", "english");
      getLang();
      //   setError("");
    } else if (lang === "english") {
      localStorage.setItem("lang", "marathi");
      getLang();
      //   setError("");
    }
  };

  const handleJoin = () => {
    setLoader(true);
    setTimeout(() => {
      navigate("/home", { props: grampanchayat });
      setLoader(false);
    }, 2000);
  };

  const getLang = () => {
    if (localStorage.getItem("lang") === null) {
      localStorage.setItem("lang", "marathi");
      setLang("marathi");
    } else {
      setLang(localStorage.getItem("lang"));
      // console.log(localStorage.getItem("lang"));
    }
  };
  const navigate = useNavigate();

  // const textLines = [
  //     `ब्रेकिंग न्यूज`,
  //     `माहिती आणि मनोरंजन`,
  //     `शॉपिंगची धमाल`,
  //     `स्पर्धा परीक्षा मार्गदर्शन`
  //   ];
  useEffect(() => {
    fetchGrampanchayatData();
  }, []);

  const { grampanchayat } = useParams();

  const [fetchGrampanchayat, setFetchGrampanchayat] = useState({
    grampanchayat_name_en: grampanchayat,
  });

  const fetchGrampanchayatData = async () => {
    const datas = {
      grampanchayat_name_en: grampanchayat,
    };
    await axios
      .post(
        process.env.REACT_APP_ALL_API +
          "/grampanchayat/getgrampanchayatbyenglishname",
        datas
      )
      .then((res) => {
        setFetchGrampanchayat(res);
        console.log("grampanchayat response*********", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container fluid>
        <div>Data : {grampanchayat}</div>

        <Row className=" d-flex justify-content-center align-items-center h-100">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
              marginRight: "25%",
            }}
          >
            <label className="switch">
              <input
                className="switch-input"
                type="checkbox"
                onChange={changeLang}
              />
              <span
                className="switch-label"
                style={{ color: "black" }}
                data-on={lang === "marathi" ? "मराठी" : "ENGLISH"}
                data-off={lang === "marathi" ? "मराठी" : "ENGLISH"}
              ></span>{" "}
              <span className="switch-handle" style={{ color: "black" }}></span>
            </label>
          </div>
          <Col md={10} className="text-center">
            <h3 className="typeWriter">
              {lang === "marathi"
                ? "केंद्र व राज्य सरकारच्या विविध योजनांची तसेच गावातील घडामोडींची माहिती"
                : "Get Information about various schemes of Central and State government along with the village updates."}
            </h3>
            {/* <div className='typeWriter'>
                        <Typed strings={textLines} typeSpeed={60} backSpeed={50} loop/>
                        </div> */}
            {/* <div className='typeWriter-2'>
                        <Typed strings={textLines} typeSpeed={60} backSpeed={50} loop/>
                        </div> */}

            {/* <div className="typeWriter text-center">
                        <Typewriter 
                        style={{FontFace}}
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
                        </div> */}

            <div>
              {/* Small h2 font only visible For Smaller Devices like Mobiles*/}
              <div className="whatsApp-Heading d-flex align-items-center justify-content-center mt-3 d-block d-md-none">
                <h2 className="mb-0">
                  {lang === "marathi" ? "आता तुमच्या" : "Now on your"}
                  <img
                    src={walogo2}
                    style={{ width: "40px" }}
                    className="ms-2 me-1"
                    alt="WhatsApp"
                  />
                  <span className="whatsApp me-2">
                    {lang === "marathi" ? "WhatsApp" : "WhatsApp"}
                  </span>{" "}
                  {lang === "marathi" ? "वर" : ""}
                </h2>
              </div>
              {/* Big h1 font only visible For Larger Devices like Ipad or Laptops */}
              <div
                className="whatsApp-Heading d-flex align-items-center justify-content-center mt-3 d-none d-md-block"
                style={{ marginBottom: "20px" }}
              >
                <h1 className="now-on mb-0">
                  {lang === "marathi" ? "आता तुमच्या" : "Now on your"}
                  <img
                    src={walogo2}
                    style={{ width: "40px" }}
                    className="ms-2 me-1"
                    alt="WhatsApp"
                  />
                  <span className="whatsApp me-2">
                    {lang === "marathi" ? "WhatsApp" : "WhatsApp"}
                  </span>{" "}
                  {lang === "marathi" ? "वर" : ""}
                </h1>
              </div>
              <div className="below-joinnow">
                {/* <h3 className="my-3">{lang === "marathi" ? "किंवा" : "OR"}</h3> */}
                <div>
                  <h5
                    style={{ marginBottom: "25px" }}
                    className="click-on-text"
                  >
                    {lang === "marathi"
                      ? " खाली दिलेल्या Join Now बटनावर क्लिक करा आणि मिळवा लेटेस्ट अपडेट्स आता तुमच्या फोनवरती"
                      : "Click on the Join Now button below and get the latest updates on your phone now."}
                  </h5>

                  {loader ? (
                    <div class="spinner-border" role="status">
                      <span class="sr-only"></span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-submit mb-2"
                      onClick={handleJoin}
                    >
                      {lang === "marathi" ? "Join Now" : "Join Now"}
                      <img
                        src={gif}
                        className="img-fluid"
                        style={{ width: "45px" }}
                      />
                    </button>
                  )}
                </div>
                <div
                  className="mobileclass alert alert-pills  mt-2 mx-auto"
                  role="alert"
                >
                  <a href="tel:9172226320">
                    <h5
                      className="text-dark mb-0"
                      style={{ fontWeight: "500" }}
                    >
                      +91 89565 81430
                    </h5>
                  </a>
                </div>
              </div>

              <p
                className="text-center text-muted mt-3 mb-2"
                style={{ fontWeight: "600" }}
              >
                {lang === "marathi"
                  ? "चला तर मग, आजच जॉईन करा🤝"
                  : "So Let's join today"}
              </p>
              <div className="alert alert-pills  mt-2 mx-auto" role="alert">
                <span
                  className="content text-dark "
                  style={{ fontWeight: "500" }}
                >
                  {" "}
                  Join Now, Absolutely{" "}
                </span>
                <span
                  className="badge badge-pill badge-success ms-1"
                  style={{ backgroundColor: "#25D366", borderRadius: "10px" }}
                >
                  Free
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* <Row className="justify-content-center">
        <Col md={8} className="mt-3 mb-5">
        <img src={Banner} className='img-fluid' style={{borderRadius:'15px'}} alt="Home"/>
        </Col>
       </Row> */}
      </Container>

      {/* <section className="bg-half-170 pb-0 bg-light d-table w-100" style={{height:'73vh'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="title-heading text-center mt-4 mt-md-5 pt-md-5">
                            <h3 className="heading mb-2">
                                <span className="element text-primary"
                                    data-elements="ब्रेकिंग न्यूज, जॉब अपडेट्स, माहिती आणि मनोरंजन ,शॉपिंगची धमाल, स्पर्धा परीक्षा मार्गदर्शन "></span>
                                <br/>
                                <span style={{ fontSize: "24px !important" }}>आता तुमच्या <span style={{ color: "#25D366" }}> <img src={walogo} className="logowa" alt="" />WhatsApp</span> वर</span>
                            </h3>


                            <p className="para-desc mx-auto text-muted" style={{ marginBottom: "10px !important" }}>
                                चला तर मग, आजच दैनिक गोमंतक जॉईन करा🤝
                            </p>

                            <div className="alert alert-pills" role="alert">

                                <span className="content"> Join Now, Absolutely </span>
                                <span className="badge badge-pill badge-success mr-1" style={{ backgroundColor: "#25D366" }}> Free</span>
                            </div>
                            <button type="button" className="btn btn-outline-primary" onClick={()=>navigate('/home')}>Proceed</button>
                        </div>

                        {/* <img src={Banner} className="img-fluid" alt='banner' style={{borderRadius:'15px'}}/> */}
      {/* </div>
                </div>
            </div>
        </section> */}
    </div>
  );
}
