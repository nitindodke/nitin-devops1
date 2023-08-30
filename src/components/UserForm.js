import { Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const UserForm = () => {
  const grampanchayat_name_en = useParams();
  const navigate = useNavigate();
  const findloc = useLocation();
  const loc = findloc.props;

  console.log("123243534543", loc);

  // toastify
  const notifyEng = () => {
    toast.success("Submitted Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifyMar = () =>
    toast.success("यशस्वीरित्या प्रविष्ट केले", {
      position: toast.POSITION.TOP_CENTER,
    });

  const notifyEngError = () =>
    toast.error("User already added", { position: toast.POSITION.TOP_CENTER });
  const notifyMarError = () =>
    toast.error("वापरकर्ता आधीच जोडला आहे", {
      position: toast.POSITION.TOP_CENTER,
    });

  // Form
  const [userForm, setUserForm] = useState({
    name: "",
    contact_no: "",
    district: "",
    taluka: "",
    grampanchayat: "",
    village: "",
    gender: "",
    dob: "",
  });

  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [grampanchayats, setGrampanchayats] = useState([]);
  const [villages, setVillages] = useState([]);

  const [talukasArray, setTalukasArray] = useState([]);
  const [grampanchyayatsArray, setGrampanchyayatsArray] = useState([]);
  const [villagesArray, setVillagesArray] = useState([]);

  // loader
  const [loaders, setLoaders] = useState(false);
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUserForm({ ...userForm, [name]: value });
  };

  useEffect(() => {
    getLang();
    console.log("getPrefernces Calling");
    console.log("check grampanchayat name", grampanchayat_name_en);
  }, []);
  const [lang, setLang] = React.useState("");

  const changeLang = () => {
    if (lang === "marathi") {
      localStorage.setItem("lang", "english");
      getLang();
    } else if (lang === "english") {
      localStorage.setItem("lang", "marathi");
      getLang();
    }
  };

  const getLang = () => {
    if (localStorage.getItem("lang") === null) {
      localStorage.setItem("lang", "marathi");
      setLang("marathi");
    } else {
      setLang(localStorage.getItem("lang"));
    }
  };

  const [nameerror, setNameError] = useState(false);
  const [contacterror, setContactError] = useState(false);
  const [disterror, setDistError] = useState(false);
  const [talukaerror, setTalError] = useState(false);
  const [gramerror, setGramError] = useState(false);
  const [villaerror, setVillaerror] = useState(false);
  const [gendererror, setGenderError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const validate = () => {
    let FormValid = true;
    if (userForm.name.length === 0) {
      FormValid = false;
      setNameError(true);
    }

    if (userForm.contact_no.length === 0) {
      FormValid = false;
      setContactError(true);
    } else if (userForm.contact_no.length < 10) {
      FormValid = false;
      setContactError(true);
    }

    if (userForm.district.length === 0) {
      FormValid = false;
      setDistError(true);
    }

    if (userForm.taluka.length === 0) {
      FormValid = false;
      setTalError(true);
    }

    if (userForm.grampanchayat.length === 0) {
      FormValid = false;
      setGramError(true);
    }

    if (userForm.village.length === 0) {
      FormValid = false;
      setVillaerror(true);
    }

    if (userForm.gender.length === 0) {
      FormValid = false;
      setGenderError(true);
    }

    if (userForm.dob.length === 0) {
      FormValid = false;
      setDateError(true);
    } else if (userForm.dob.length > 0) {
      setDateError(false);
    }
    return FormValid;
  };

  // Gaon Connect Whatsapp
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    setLoaders(true);
    setNameError(false);
    setContactError(false);
    setGenderError(false);
    setDateError(false);

    if (validate()) {
      const { name, contact_no, grampanchayat, taluka, district, gender, dob } =
        userForm;
      const data = {
        name: name,
        contact_no: contact_no,
        grampanchayat: grampanchayat,
        taluka: taluka,
        district: district,
        gender: gender,
        date_of_birth: dob,
      };
      await axios
        .post(
          process.env.REACT_APP_ALL_API +
            "/gaonconnectwhatsapp/insertgaonconnectwhatsappdetails",
          data
        )
        .then((data) => {
          console.log("form Data=>", data);
          console.log("status", data.data.status);
          if (data.data.message === "Contact number already exists") {
            lang === "marathi" ? notifyMarError() : notifyEngError();
            setLoaders(false);
          } else if (data.data.status === 200) {
            {
              lang === "marathi" ? notifyMar() : notifyEng();
            }
            setTimeout(() => {
              setLoaders(false);
            }, 2000);

            if (lang === "marathi") {
              setTimeout(() => {
                setLoaders(false);
                window.location.href = `https://wa.me/+918956581430?text=कृपया वरील नंबर गाव कनेक्ट नावाने सेव्ह करा आणि सरकारी योजना व गावातील अपडेट्स मिळवा..`;
              }, 2000);
            } else {
              setTimeout(() => {
                setLoaders(false);
                window.location.href = `https://wa.me/+918956581430?text=Please save the above number as Gaon Connect and get Government scheme and village updates regularly.`;
              }, 2000);
            }
          }
        })
        .catch((err) => console.log("ERROR", err));
    } else {
      setLoaders(false);
    }
  };
  const getDist = () => {
    axios
      .get("https://api.whatsapp.gaonconnect.in/v1/district/getalldistricts")
      .then((res) => {
        setDistricts(res.data.data);
        console.log("Monaaaa");
        console.log("dist rees", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTaluka = () => {
    axios
      .get("https://api.whatsapp.gaonconnect.in/v1/taluka/getalltalukas")
      .then((res) => {
        setTalukas(res.data.data);
        console.log("talukas rees", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGrampanchayat = () => {
    axios
      .get(
        "https://api.whatsapp.gaonconnect.in/v1/grampanchayat/getallgrampanchayats"
      )
      .then((res) => {
        setGrampanchayats(res.data.data);
        console.log("grampanchayat rees", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVillage = () => {
    axios
      .get("https://api.whatsapp.gaonconnect.in/v1/village/getallvillages")
      .then((res) => {
        setVillages(res.data.data);
        console.log("village rees", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("data", villages);
  useEffect(() => {
    getDist();
    getTaluka();
    getGrampanchayat();
    getVillage();
  }, []);

  // useEffect(() => {
  //   if (userForm.taluka) {
  //     getTaluka();
  //   } else {
  //     setTalukas();
  //   }
  // }, [userForm.district]);

  useEffect(() => {
    getTalukaData();
  }, [userForm.district]);

  const getTalukaData = () => {
    const result = talukas.filter(
      (event) => event.district_id === userForm.district
    );
    console.log("result", result);
    setTalukasArray(result);
  };

  useEffect(() => {
    setVillagesArray([]);
    getGrampanchayatData();
  }, [userForm.taluka]);

  // const villageArray = () => {
  //   console.log("yfduwgfdjshckdfij");
  //   const resultvillage = villages.filter(
  //     (event) => event.taluka_id === userForm.taluka
  //   );
  //   setVillagesArray(resultvillage);
  // };
  const getGrampanchayatData = () => {
    console.log("yfduwgfdjshckdfij");
    const resultGram = grampanchayats.filter(
      (event) => event.taluka_id === userForm.taluka
    );
    // const resultvillage = villages.filter(
    //   (event) => event.taluka_id === userForm.taluka
    // );
    // console.log("result 1234", resultGram);
    setGrampanchyayatsArray(resultGram);
    // setVillagesArray([]);
  };

  // useEffect(() => {
  //   getVillagesData();
  // }, [userForm.grampanchayat]);

  useEffect(() => {
    if (userForm.grampanchayat) {
      getVillagesData();
    } else {
      setVillagesArray(villages);
    }
  }, [userForm.grampanchayat]);

  const getVillagesData = () => {
    const result = villages.filter(
      (event) => event.grampanchayat_id === userForm.grampanchayat
    );
    console.log("result 987", result);
    setVillagesArray(result);
  };

  useEffect(() => {
    if (userForm.district) {
      getTalukaData();
    } else {
      setTalukas(talukasArray);
    }
  }, [userForm.district]);

  const textStyle = { marginBottom: "25px" };

  return (
    <>
      <ToastContainer />
      <Paper
        className="paper-wrapper"
        sm={{ width: "50%" }}
        sx={{ width: "70%", margin: "40px auto", padding: "10px 30px" }}
      >
        <form
          onSubmit={(e) => {
            handleOnsubmit(e);
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "40px 0px 0px 20px",
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
                data-on={lang === "marathi" ? "मराठी" : "ENGLISH"}
                data-off={lang === "marathi" ? "मराठी" : "ENGLISH"}
              ></span>{" "}
              <span className="switch-handle"></span>
            </label>
          </div>
          <div
            className="form-input"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "तुमचे नाव " : "Your Name "}
              </Form.Label>
              <Form.Control
                name="name"
                placeholder={lang === "marathi" ? "तुमचे नाव " : "Your Name "}
                value={userForm.name}
                onChange={(e) => {
                  if (
                    !e.target.value.match(
                      /[0-9+@#$&%!~=^_:(){}\[\]*.|//\-/?<>,;`'""/\\]/
                    ) &&
                    e.target.value.trim()
                  ) {
                    handleInputs(e);
                  } else if (e.target.value.length === 0) {
                    handleInputs(e);
                  }
                  userForm.name.length >= 0
                    ? setNameError(false)
                    : setNameError(true);
                }}
              />
              {nameerror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang === "marathi"
                    ? "कृपया वैध नाव प्रविष्ट करा"
                    : "Please Enter valid name"}
                </Typography>
              ) : null}
            </div>

            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "संपर्क क्रमांक" : "Contact No"}
              </Form.Label>
              <Form.Control
                name="contact_no"
                placeholder={
                  lang === "marathi" ? "संपर्क क्रमांक" : "Contact No"
                }
                value={userForm.contact_no}
                onChange={(e) => {
                  if (
                    !e.target.value.match(
                      /[A-Za-z+@#$&%!~=^_:(){}\[\]*.|/\s/g/\-/?<>,;`'""/\\]/
                    ) &&
                    e.target.value.length <= 10
                  ) {
                    handleInputs(e);
                  } else if (e.target.value.length === 0) {
                    handleInputs(e);
                  }
                  userForm.contact_no.length >= 0
                    ? setContactError(false)
                    : setContactError(true);
                }}
              />
              {contacterror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang === "marathi"
                    ? "कृपया 10 अंकी संपर्क क्रमांक टाका"
                    : "Please enter 10 digit mobile number"}
                </Typography>
              ) : null}
            </div>
          </div>
          <div
            className="form-input"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "जिल्हा" : "District"}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  {
                    handleInputs(e);
                  }
                  userForm.district.length >= 0
                    ? setDistError(false)
                    : setDistError(true);
                }}
                value={userForm.district}
                name="district"
              >
                <option value="" selected disabled>
                  {lang === "marathi" ? "जिल्हा निवडा" : "Select district"}
                </option>
                {districts != undefined && districts != null
                  ? districts.map((item) => {
                      return (
                        <option value={item._id}>
                          {lang === "marathi"
                            ? item.district_name_mr
                            : item.district_name_en}
                        </option>
                      );
                    })
                  : ""}
              </Form.Select>
              {disterror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang === "marathi"
                    ? "कृपया जिल्हा निवडा"
                    : "Please Select District"}
                </Typography>
              ) : null}
            </div>

            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "तालुका" : "Taluka"}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={userForm.taluka}
                name="taluka"
                // disabled={talukasArray.length === 0}
                onChange={(e) => {
                  {
                    handleInputs(e);
                  }
                  userForm.taluka.length >= 0
                    ? setTalError(false)
                    : setTalError(true);
                }}
              >
                <option selected disabled value="">
                  {lang === "marathi" ? "तालुका निवडा" : "Select taluka"}
                </option>
                {talukasArray != undefined && talukasArray != null
                  ? talukasArray.map((item) => {
                      return (
                        <option value={item._id}>
                          {lang === "marathi"
                            ? item.taluka_name_mr
                            : item.taluka_name_en}
                        </option>
                      );
                    })
                  : ""}
              </Form.Select>
              {talukaerror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang === "marathi"
                    ? "कृपया तालुका निवडा"
                    : "Please Select Taluka"}
                </Typography>
              ) : null}
            </div>
          </div>
          <div
            className="form-input"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "ग्रामपंचायत" : "Grampanchayat"}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={userForm.grampanchayat}
                name="grampanchayat"
                onChange={(e) => {
                  {
                    handleInputs(e);
                  }
                  userForm.grampanchayat.length >= 0
                    ? setGramError(false)
                    : setGramError(true);
                }}
              >
                <option selected disabled value="">
                  {lang === "marathi"
                    ? "ग्रामपंचायत निवडा"
                    : "Select grampanchayat"}
                </option>
                {grampanchyayatsArray != undefined &&
                grampanchyayatsArray != null
                  ? grampanchyayatsArray.map((item) => {
                      return (
                        <option value={item._id}>
                          {lang === "marathi"
                            ? item.grampanchayat_name_mr
                            : item.grampanchayat_name_en}
                        </option>
                      );
                    })
                  : ""}
              </Form.Select>
              {gramerror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang === "marathi"
                    ? "कृपया ग्रामपंचायत निवडा"
                    : "Please Select Grampanchayat"}
                </Typography>
              ) : null}
            </div>

            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "गाव" : "Village"}
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                value={userForm.village}
                name="village"
                onChange={(e) => {
                  {
                    handleInputs(e);
                  }
                  userForm.village.length >= 0
                    ? setVillaerror(false)
                    : setVillaerror(true);
                }}
                // {villagesArray?.length === 0 ? disabled:""}
                // disabled={villagesArray.length === 0}
              >
                {villagesArray.length > 0 && (
                  <option value="" selected disabled>
                    {lang === "marathi" ? "गाव निवडा" : "Select village"}
                  </option>
                )}
                {villagesArray.length > 0 ? (
                  villagesArray != undefined && villagesArray != null ? (
                    villagesArray.map((item) => {
                      return (
                        <option value={item._id}>
                          {lang === "marathi"
                            ? item.village_name_mr
                            : item.village_name_en}
                        </option>
                      );
                    })
                  ) : (
                    ""
                  )
                ) : (
                  <option value="" selected disabled>
                    {lang === "marathi" ? "गाव निवडा" : "Select village"}
                  </option>
                )}
              </Form.Select>
              {villaerror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang === "marathi"
                    ? "कृपया गाव निवडा"
                    : "Please Select Village"}
                </Typography>
              ) : null}
            </div>
            {/* <div className="input-field">
                <Form.Label>
                  <span style={{ color: "red" }}>*</span>
                  {lang === "marathi" ? "जिल्हा" : "District"}
                </Form.Label>
                <Form.Control
                  name="title"
                  value={lang === "marathi" ? "पुणे" : userForm.district}
                  disabled
                />
              </div> */}
          </div>
          <div
            className="form-input"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>{" "}
                {lang === "marathi" ? "लिंग " : "Gender "}
              </Form.Label>
              <Form.Select
                name="gender"
                value={userForm.gender}
                onChange={(e) => {
                  handleInputs(e);
                  userForm.gender.length < 0
                    ? setGenderError(true)
                    : setGenderError(false);
                }}
              >
                {/* {lang === "marathi" ? (
                    <>
                      <option value="" selected disabled>
                        लिंग निवडा
                      </option>
                      <option value="पुरुष">पुरुष</option>
                      <option value="स्त्री">स्त्री</option>
                      <option value="इतर">इतर</option>
                    </>
                  ) : (
                    <>
                      <option value="" selected disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </>
                  )} */}
                <option value="" selected disabled>
                  {lang === "marathi" ? "लिंग निवडा" : "Select gender"}
                </option>
                <option value="Male">
                  {lang === "marathi" ? "पुरुष" : "Male"}
                </option>
                <option value="Female">
                  {lang === "marathi" ? "स्त्री" : "Female"}
                </option>
                <option value="Other">
                  {lang === "marathi" ? "इतर" : "Other"}
                </option>
              </Form.Select>
              {gendererror ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang !== "marathi"
                    ? "Please select gender"
                    : "कृपया लिंग निवडा"}
                </Typography>
              ) : null}
            </div>
            <div className="input-field">
              {/* <TextField
                  id="date"
                  label={lang === "marathi" ? "जन्म तारीख *" : "Date of Birth *"}
                  name="dob"
                  // value={userForm.dob}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setUserForm({
                      ...userForm,
                      dob: moment(e.target.value).format("YYYY-MM-DD"),
                    });
                    console.log("dob", userForm.dob);
  
                    userForm.dob.length < 0
                      ? setDateError(true)
                      : setDateError(false);
                  }}
                /> */}
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "जन्म तारीख " : "Date of Birth "}
              </Form.Label>
              <Form.Control
                type="date"
                max="2023-03-01"
                id="startDateInput"
                name="dob"
                onChange={(e) => {
                  setUserForm({
                    ...userForm,
                    dob: moment(e.target.value).format("YYYY-MM-DD"),
                  });
                  console.log("dob", userForm.dob);

                  userForm.dob.length < 0
                    ? setDateError(true)
                    : setDateError(false);
                }}
              />
              {dateError ? (
                <Typography
                  variant="subtitle1"
                  sx={{ color: "red", marginBottom: "5px" }}
                >
                  {lang !== "marathi"
                    ? "Please select birth date"
                    : "कृपया जन्मतारीख निवडा"}
                </Typography>
              ) : null}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "30px",
            }}
          >
            {loaders ? (
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "30%",
                  fontSize: "15px",
                  fontWeight: "500",
                  backgroundColor: "#A8C74D",
                  padding: "10px 0px",
                  marginTop: "30px",
                  "&:hover": {
                    backgroundColor: "#A8C74D",
                    transition: "all 0.2s",
                  },
                }}
                fullWidth
              >
                {lang === "marathi" ? "सबमिट करा" : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </Paper>
    </>
  );
};

export default UserForm;
