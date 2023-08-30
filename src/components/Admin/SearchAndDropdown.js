import React, { useContext, useEffect, useState, useRef } from "react";
import validator from "validator";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import * as Icon from "react-bootstrap-icons";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Modal, Paper, Stack, IconButton, TextField } from "@mui/material";
import { Button, Typography } from "@mui/material";
import StateManagementAPI from "../../context/StateManagementAPI";
import axios from "axios";
import Common from "./Common";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SearchAndDropdown = () => {
  useEffect(() => {
    // getLang();
    // console.log("getPrefernces Calling");
  }, []);

  // const { districtApi, talukas, grampanchayats, villages } = Common();

  const [lang, setLang] = React.useState("");
  const [loaders, setLoaders] = useState(false);
  // const [districtshow, setDistrictShow] = useState(false);
  // const districtApi = useContext(StateManagementAPI);

  // const changeLang = () => {
  //   if (lang === "marathi") {
  //     localStorage.setItem("lang", "english");
  //     getLang();
  //   } else if (lang === "english") {
  //     localStorage.setItem("lang", "marathi");
  //     getLang();
  //   }
  // };

  // const getLang = () => {
  //   if (localStorage.getItem("lang") === null) {
  //     localStorage.setItem("lang", "marathi");
  //     setLang("marathi");
  //   } else {
  //     setLang(localStorage.getItem("lang"));
  //   }
  // };
  const [formDatas, setFormDatas] = useState({
    district_name_en: "",
    taluka_name_en: "",
    grampanchayat_name_en: "",
    village: "",
  });

  // ------------------to get the data from API--------------

  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [grampanchayats, setGrampanchayats] = useState([]);
  const [villages, setVillages] = useState([]);

  // --------------------to post data to API------------------

  const [selectedDis, setSelectedDis] = useState([]);  
  const [selectedTal, setSelectedTal] = useState([]);
  const [selectedGram, setselectedGram] = useState([]);
  const [selectedVillageEng, setSelectedVillageEng] = useState("");
  const [selectedVillageMarathi, setSelectedVillageMarathi] = useState("");

  // -------------------District POPUP fileds-------------------------
  const [selectedDisEng, setSelectedDisEng] = useState("");
  const [selectDistsrictMarathi, setSelectDistsrictMarathi] = useState("");

  // -------------------Taluka POPUP fileds---------------------------
  const [selectedTalEng, setSelectedTalEng] = useState("");
  const [selectTalukaMarathi, setSelectTalukaMarathi] = useState("");

  // -------------------Grampanchayat POPUP fileds--------------------
  const [selectedGramEng, setSelectedGramEng] = useState("");
  const [selectGrampanchayatMarathi, setSelectGrampanchayatMarathi] = useState("");
  const [contactNumber, setContactNumber] = useState();

  // -------------------Errors----------------------------------------
  const [districtError, setdistrictError] = useState(false);
  const [talukaError, settalukaError] = useState(false);
  const [gramPanchaytError, setgramPanchaytError] = useState(false);
  const [villageError, setVillageError] = useState(false);

  // const [dis, setDis] = useState("");
  // console.log(dis)
  // const [tal, setTal] = useState("");
  // const [gram, setGram] = useState("");
  // const [vil, setVil] = useState("");

  const getDist = () => {
    axios
      .get(
        "https://api.whatsapp.gaonconnect.in/v1/district/getalldistricts",
        {}
      )
      .then((res) => {
        setDistricts(res.data.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDist();
    getTaluka();
    getGrampanchayat();
    getVillage();
  }, []);

  const validation = () => {
    let FormValid = true;

    if (selectedDis.length === 0) {
      FormValid = false;
      setdistrictError("field should not be empty");
    }
  //  if (!validator.isAlpha(dis)) {
  //     FormValid = false;
  //     setdistrictError("Alphabate Only");
  //   }

    if (selectedTal.length === 0) {
      FormValid = false;
      settalukaError("field should not be empty");
    }
    // if (!validator.isAlpha(tal)) {
    //   FormValid = false;
    //   settalukaError("Alphabate Only");
    // }

    if (selectedGram.length === 0) {
      FormValid = false;
      setgramPanchaytError("field should not be empty");
    }
    // if (!validator.isAlpha(gram)) {
    //   FormValid = false;
    //   setgramPanchaytError("Alphabate Only");
    // }

    if (selectedVillageEng.length === 0) {
      FormValid = false;
      setVillageError("field should not be empty");
    }
    // if (!validator.isAlpha(vil)) {
    //   FormValid = false;
    //   setVillageError("Alphabate Only");
    // }
    return FormValid;
  };

  const postDatas = (e) => {
    e.preventDefault();

    if (validation()) {
      const formData = new FormData();
      formData.append("district_name_en", selectedDis);
      formData.append("taluka_name_en", selectedTal);
      formData.append("grampanchayat_name_en", selectedGram);
      formData.append("village_name_en", selectedVillageEng);
      formData.append("village_name_mr", selectedVillageMarathi);
      axios
        .post(
          "https://api.whatsapp.gaonconnect.in/v1/gaonConnectWhatsapp/adddistricttalukagrampanchayatvillage",
          formData
        )
        .then((res) => {
          setFormDatas(res.data.data);
          console.log("new data response", res);
          setSelectedDis([]);
          setSelectedTal([]);
          setselectedGram([]);
          selectedVillageEng("");
          selectedVillageMarathi("")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // ---------------POPup Buttons state-----------------------------------------------------------

  const [open, setOpen] = React.useState(false);
  const [openone, setOpenone] = React.useState(false);
  const [opentwo, setOpentwo] = React.useState(false);

  // --------------District input filed-------------------------------------------------------------

  const handleClickOpen = () => {
    setOpen(true);

    // ------------District Added POPup----------------------------------------------------------
    const districtExists = districts.filter(
      (item) =>
        item?.district_name_en?.toLowerCase() ==
        selectedDis[0].district_name_en?.toString().toLowerCase()
    );
    // console.log("districtExists", districtExists, districts, selectedDis);
    setSelectDistsrictMarathi(districtExists[0]?.district_name_mr);
    setSelectedDisEng(districtExists[0]?.district_name_en);
  };

  // --------------Taluka input filed------------------------------------------------------------

  const handleClickOpenone = () => {
    setOpenone(true);

    // ----------District Added POPup----------
    const districtExists = districts.filter(
      (item) =>
        item?.district_name_en?.toLowerCase() ==
        selectedDis[0].district_name_en?.toString().toLowerCase()
    );
    setSelectDistsrictMarathi(districtExists[0]?.district_name_mr);
    setSelectedDisEng(districtExists[0]?.district_name_en);

    // ---------------taluka Added POPup---------------
    const talukaExists = talukas.filter(
      (item) =>
        item?.taluka_name_en?.toLowerCase() ==
        selectedTal[0].taluka_name_en?.toString().toLowerCase()
    );
    setSelectTalukaMarathi(talukaExists[0]?.taluka_name_mr);
    setSelectedTalEng(talukaExists[0]?.taluka_name_en);
  };

  // ---------grampanchayat input filed------------------------------------------------------------

  const handleClickOpentwo = () => {
    setOpentwo(true);

    // -----------district Added POPup-------------
    const districtExists = districts.filter(
      (item) =>
        item?.district_name_en?.toLowerCase() ==
        selectedDis[0].district_name_en?.toString().toLowerCase()
    );
    setSelectDistsrictMarathi(districtExists[0]?.district_name_mr);
    setSelectedDisEng(districtExists[0]?.district_name_en);

    // -----------taluka Added POPup------------
    const talukaExists = talukas.filter(
      (item) =>
        item?.taluka_name_en?.toLowerCase() ==
        selectedTal[0].taluka_name_en?.toString().toLowerCase()
    );
    setSelectTalukaMarathi(talukaExists[0]?.taluka_name_mr);
    setSelectedTalEng(talukaExists[0]?.taluka_name_en);

    // --------------grampanchayat Added POPup--------------
    const gramExists = grampanchayats.filter(
      (item) =>
        item?.grampanchayat_name_en?.toLowerCase() ==
        selectedGram[0].grampanchayat_name_en?.toString().toLowerCase()
    );
    setSelectGrampanchayatMarathi(gramExists[0]?.grampanchayat_name_mr);
    setSelectedGramEng(gramExists[0]?.grampanchayat_name_en);
  };

  const handleClose = () => {
    setSelectedDisEng("");
    setSelectDistsrictMarathi("");
    setOpen(false);
    setOpenone(false);
    setOpentwo(false);
  };

  const createNewDistrict = () => {
    axios
      .post("https://api.whatsapp.gaonconnect.in/v1/district/adddistrict", {
        district_name_mr: selectDistsrictMarathi,
        district_name_en: selectedDisEng,
      })
      .then((res) => {
        console.log("Response", res.data);
        handleClose();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const createNewTaluka = () => {
    axios
      .post("https://api.whatsapp.gaonconnect.in/v1/taluka/addtaluka", {
        district_name_en: selectedDisEng,
        taluka_name_mr: selectTalukaMarathi,
        taluka_name_en: selectedTalEng,
      })
      .then((res) => {
        console.log("Response", res.data);
        handleClose();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const createNewGrampanchayat = () => {
    axios
      .post(
        "https://api.whatsapp.gaonconnect.in/v1/grampanchayat/addgrampanchayat",
        {
          district_name_en: selectedDisEng,
          taluka_name_en: selectedTalEng,
          grampanchayat_name_en: selectedGramEng,
          grampanchayat_name_mr: selectGrampanchayatMarathi,
          contact_number: contactNumber,
          // base_url: "https://whatsapp.gaonconnect.in/",
        }
      )
      .then((res) => {
        console.log("Response", res.data);
        handleClose();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // const createNewVillage = () => {
  //   axios
  //     .post("https://api.whatsapp.gaonconnect.in/v1/village/addvillage",
  //       {
  //         "village_name_mr": selectedVillageMarathi,
  //         "village_name_en": selectedVillageEng,
  //         "grampanchayat_name_en":selectedGramEng,
  //         "taluka_name_en":selectedTalEng,
  //         "district_name_en":selectedDisEng,
  //     })
  //     .then((res) => {
  //       console.log("Response", res.data);
  //       handleClose();
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  // };
  // console.log(dis)
  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create new district</DialogTitle>
        <DialogContent dividers={"paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <TextField
              label="District in English"
              variant="outlined"
              name="district_english"
              fullWidth
              className="mb-4"
              size="small"
              value={selectedDisEng}
              onChange={(e) => setSelectedDisEng(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="District in Marathi"
              variant="outlined"
              name="district_marathi"
              className="mb-4"
              fullWidth
              size="small"
              value={selectDistsrictMarathi}
              onChange={(e) => setSelectDistsrictMarathi(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={createNewDistrict}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openone}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create new Taluka</DialogTitle>
        <DialogContent dividers={"paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <TextField
              label="District in English"
              variant="outlined"
              name="district_english"
              fullWidth
              className="mb-4"
              size="small"
              value={selectedDisEng}
              onChange={(e) => setSelectedDisEng(e.target.value)}
            />
            <TextField
              label="Taluka in English"
              variant="outlined"
              name="taluka_english"
              fullWidth
              className="mb-4"
              size="small"
              setVillages
              value={selectedTalEng}
              onChange={(e) => setSelectedTalEng(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Taluka in Marathi"
              variant="outlined"
              name="taluka_marathi"
              className="mb-4"
              fullWidth
              size="small"
              value={selectTalukaMarathi}
              onChange={(e) => setSelectTalukaMarathi(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={createNewTaluka}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={opentwo}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Create new grampanchayat
        </DialogTitle>
        <DialogContent dividers={"paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <TextField
              label="District in English"
              variant="outlined"
              name="district_english"
              fullWidth
              className="mb-4"
              size="small"
              value={selectedDisEng}
              onChange={(e) => setSelectedDisEng(e.target.value)}
            />
            <TextField
              label="Taluka in English"
              variant="outlined"
              name="taluka_english"
              fullWidth
              className="mb-4"
              size="small"
              value={selectedTalEng}
              onChange={(e) => setSelectedTalEng(e.target.value)}
            />
            <TextField
              label="Grampanchayat in English"
              variant="outlined"
              name="grampanchayat"
              fullWidth
              className="mb-4"
              size="small"
              value={selectedGramEng}
              onChange={(e) => setSelectedGramEng(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Grampanchayat in Marathi"
              variant="outlined"
              name="grampanchayat"
              className="mb-4"
              fullWidth
              size="small"
              value={selectGrampanchayatMarathi}
              onChange={(e) => setSelectGrampanchayatMarathi(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Contact Number"
              variant="outlined"
              name="contact_number"
              className="mb-4"
              fullWidth
              size="small"
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={createNewGrampanchayat}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Paper
        className="paper-wrapper"
        sm={{ width: "50%" }}
        sx={{ width: "70%", margin: "40px auto", padding: "5px 30px" }}
      >
        <Form onSubmit={(e) => postDatas(e)}>
          {" "}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px 0px 0px 20px",
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
          </div> */}
          <div
            className="form-input"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="input-field ">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "जिल्हा" : "District"}
              </Form.Label>
              <div
                className="form-input inputBtnWrapper"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  {districts !== undefined && districts.length > 0 ? (
                    <div
                      className="d-flex flex-column text-danger "
                      style={{ marginRight: "10px", width: "400px" }}
                    >
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="district_name_en"
                        onChange={(e) => setSelectedDis(e)}
                        // onBlur={() => {
                        //   selectedDis.map((ele) =>
                        //     setDis(ele.district_name_en)
                        //   );
                        // }}
                        options={districts}
                        placeholder="Enter District"
                        selected={selectedDis}
                      />
                      <span>{districtError}</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    onClick={handleClickOpen}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "तालुका" : "Taluka"}
              </Form.Label>
              <div
                className="form-input"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  {talukas !== undefined && talukas.length > 0 ? (
                    <div
                      className="d-flex flex-column text-danger "
                      style={{ marginRight: "10px", width: "400px" }}
                    >
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="taluka_name_en"
                        onChange={(e) => setSelectedTal(e)}
                        // onBlur={() => {
                        //   selectedTal.map((ele) => setTal(ele.taluka_name_en));
                        // }}
                        options={talukas}
                        placeholder="Enter Taluka"
                        selected={selectedTal}
                      />
                      <span>{talukaError}</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    onClick={handleClickOpenone}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="input-field">
              <Form.Label>
                <span style={{ color: "red" }}>*</span>
                {lang === "marathi" ? "ग्रामपंचायत" : "Grampanchayat"}
              </Form.Label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  {grampanchayats !== undefined && grampanchayats.length > 0 ? (
                    <div
                      className="d-flex flex-column text-danger"
                      style={{ marginRight: "10px", width: "400px" }}
                    >
                      <Typeahead
                        id="basic-typeahead-single"
                        labelKey="grampanchayat_name_en"
                        onChange={(e) => setselectedGram(e)}
                        // onBlur={() => {
                        //   selectedGram.map((ele) =>
                        //     setGram(ele.grampanchayat_name_en)
                        //   );
                        // }}
                        options={grampanchayats}
                        placeholder="Enter Grampanchayat"
                        selected={selectedGram}
                      />
                      <span>{gramPanchaytError}</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    onClick={handleClickOpentwo}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div>
            {villages !== undefined && villages.length > 0 ? (
            <div className="input-box">
              <div className="input-field">
                <Form.Label>
                  <span style={{ color: "red" }}>*</span>
                  {lang === "marathi" ? "गाव" : "Village"}
                </Form.Label>
                <div
                  className="d-flex flex-column text-danger"
                  style={{ width: "200px" }}
                >
                  <Form.Control
                    name="village_name_mr"
                    placeholder="Enter Village"
                    onChange={(e) => setSelectedVillageEng(e.target.value)}
                    // onBlur={() => {
                    //   selectedVillageEng.map((ele) =>
                    //     setVil(ele.village_name_en)
                    //   );
                    // }}
                  />
                  <span>{villageError}</span>
                </div>
              </div>

              <div className="input-field">
                <Form.Label>
                  <span style={{ color: "red" }}>*</span>
                  <span>गाव</span>
                </Form.Label>
                <div
                  className="d-flex flex-column text-danger"
                  style={{ width: "200px" }}
                >
                  <Form.Control
                    name="village_name_en"
                    placeholder="Enter Village"
                    onChange={(e) => setSelectedVillageMarathi(e.target.value)}
                    // onBlur={() => {
                    //   selectedVillageMarathi.map((ele) =>
                    //     setVil(ele.village_name_mr)
                    //   );
                    // }}
                  />
                  <span>{villageError}</span>
                </div>
              </div>
            </div>
          
            ):null}
            </div>
            </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              marginBottom: "30px",
              marginLeft: "10px",
            }}
          >
            {loaders ? (
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            ) : (
              <Button
                onClick={postDatas}
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
        </Form>
      </Paper>
    </>
  );
};

export default SearchAndDropdown;
