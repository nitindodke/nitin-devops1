import React, { useEffect, useState } from "react";
import createContextAPI from "./CreateContextAPI";
import axios from "axios";

const StateManagementAPI = ({ children }) => {
  const [districtApi, setDistrictsAPi] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [grampanchayats, setGrampanchayats] = useState([]);
  const [villages, setVillages] = useState([]);

  const getDist = () => {
    axios
      .get("https://api.whatsapp.gaonconnect.in/v1/district/getalldistricts")
      .then((res) => {
        setDistrictsAPi(res.data.data);
        console.log("starte management Api");
        console.log("district rees", res);
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
        // console.log("talukas rees", res);
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
        // console.log("grampanchayat rees", res);
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
        // console.log("village rees", res);
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

  console.log(
    "testing in context",
    districtApi,
    talukas,
    grampanchayats,
    villages
  );

  return (
    <createContextAPI.Provider
      value={{ districtApi, talukas, grampanchayats, villages }}
    >
      {children}
    </createContextAPI.Provider>
  );
};

export default StateManagementAPI;
