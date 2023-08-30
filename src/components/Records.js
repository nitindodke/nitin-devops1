import React,{useState} from "react";
import * as XLSX from "xlsx";
import { Modal, Button, Form } from "react-bootstrap";

export default function Records() {
  const [record, setRecord] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState([]);
  const [pages, setPages] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(10);
  const [startIndex, setStartIndex] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const [sendMsg, setSendMsg] = React.useState(true);
  const [selectedArr, setSelectedArr] = React.useState([]);
  const [checkAll, setCheckAll] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getRecords();
  }, []);
  const getRecords = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_ALL_API+"/dainikgomantaks/getallcontactno", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else {
          alert("Error while loading data...!");
          setLoading(false);
        }
      })
      .then((data) => {
        console.log("Response", data);
        setTotalRecords(data);
        setPages(data.length / 10);
        setRecord(data.filter((item, index) => index >= 0 && index < 10));
        setLoading(false);
        // console.log(data.filter((item,index)=>index>si&&index<=ei))
      })
      .catch((err) => console.warn("Error", err.typeError));
  };
  const pagination = (si, ei) => {
    console.log("Start Index", startIndex);
    console.log("End Index", endIndex);
    console.log("Count ", count);
    setRecord(totalRecords.filter((item, index) => index >= si && index < ei));
  };
  const downloadExcel = (customHeadings) => {
    let dataSet = [];
    console.log("dataset", dataSet);
    dataSet = customHeadings;
    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "UserListReport.xlsx");
  };
  const pushContactInArr = (item) => {
    if (selectedArr.length) {
      let i = selectedArr.findIndex((i) => i === item);
      if (i !== -1) {
        selectedArr.splice(i, 1);
        setSelectedArr(selectedArr);
        console.log(selectedArr);
      } else {
        selectedArr.push(item);
        setSelectedArr(selectedArr);
        console.log(selectedArr);
      }
    } else {
      selectedArr.push(item);
      setSelectedArr(selectedArr);
      console.log(selectedArr);
    }
  };
  const isChecked = (contact) => {
    let x = selectedArr?.find((i) => i === contact);
    if (x === undefined) return false;
    else return true;
  };
  const selectAll = (e) => {
    if (e.target.checked) {
      selectedArr.splice(0, selectedArr.length);
      totalRecords.map((item) => selectedArr.push(item.contactNo));
      setSelectedArr(selectedArr);
      console.log("All Contack,,,", selectedArr);
    } else {
      selectedArr.splice(0, selectedArr.length);
      console.log("All Contack,,,", selectedArr);
    }
  };

  const sendMessage = () => {
    const a = document.getElementById("msg").value.trim();
    a === "" ? alert("Please Enter Message") : console.log("MSG", a);
    const data = {
      mobileNo: selectedArr,
      msg: a,
    };
    fetch(process.env.REACT_APP_ALL_API+"/dainikGomantak/sendwhatsappsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Response:::", response);
        if (response.status === 200) {
          alert("Message Sent");
          setSendMsg(!sendMsg);
          setSelectedArr([]);
          setCheckAll(false);
          setShow(!show);
          return response.json();
        } else {
          alert("Error while sending ");
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const CustomExcel = (data) => {
    const customHeadings =
      data.length > 0 &&
      data.map((item, index) => ({
        "Sr No.": index + 1,
        Date: item.createdAt
          ? `${item.createdAt.split("T")[0].split("-")[2]}/${
              item.createdAt.split("T")[0].split("-")[1]
            }/${item.createdAt.split("T")[0].split("-")[0]}`
          : "-",
        Mobile: item.contactNo ? item.contactNo : "-",
      }));
    console.log("Customm Excel", customHeadings);
    downloadExcel(customHeadings);
  };

  const renderTable =
    record.length > 0 &&
    record !== undefined &&
    record.map((item, index) => {
      return (
        <tr key={index + 1 + startIndex}>
          {sendMsg ? (
            <td> {index + 1 + startIndex}</td>
          ) : (
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                name="option1"
                value="something" 
                onChange={() => {
                  pushContactInArr(item.contactNo);
                }}
                checked={isChecked(item.contactNo) || checkAll ? true : null}
                disabled={checkAll ? true : null}
              />
              <label className="form-check-label">
                {" "}
                {index + 1 + startIndex}
              </label>
            </td>
          )}
          <td>
            {item.createdAt.split("T")[0].split("-")[2]}/
            {item.createdAt.split("T")[0].split("-")[1]}/
            {item.createdAt.split("T")[0].split("-")[0]}
          </td>
          {/* <td>{item.pincode}</td> */}
          <td>{item.contactNo}</td>
        </tr>
      );
    });

    const [showperpage, setShowPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);


  return (
    <div className="container p-4">
      {/* Header */}
      <div className="d-flex flex-row justify-content-between">
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>Records</div>
        <div></div>
        <div>
          {/* <button
            type="button"
            className={`btn ${
              sendMsg ? "btn-outline-primary" : "btn-primary"
            } m-1`}
            onClick={() => {
              setSendMsg(!sendMsg);
              setSelectedArr([]);
              setCheckAll(false);
            }}
          >
            Select Contact
          </button> */}
          <button
            type="button"
            className="btn btn-outline-primary m-1"
            onClick={() => CustomExcel(totalRecords)}
          >
            Excel Export
          </button>
          {/* <button
            type="button"
            className="btn btn-outline-primary m-1"
            onClick={() => {
              selectedArr.length
                ? setShow(!show)
                : alert("Please select contact !!!");
            }}
          >
            Send Message
          </button> */}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              {sendMsg ? (
                <th>Sr.No</th>
              ) : (
                <th>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="check"
                    name="option1"
                    value="something"
                    onChange={(e) => {
                      selectAll(e);
                      setCheckAll(!checkAll);
                    }}
                  />
                  <label className="form-check-label">Select All</label>
                </th>
              )}
              <th>Date</th>
              {/* <th>Pincode</th> */}
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>{renderTable !== undefined ? renderTable : null}</tbody>
        </table>
      </div>
      {/* Loader */}
      {loading ? (
        <center>
          <div className="spinner-border text-primary " role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div>
        </center>
      ) : null}
      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${
              startIndex < 10 && endIndex < 20 ? "disabled" : null
            }`}
          >
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              onClick={() => {
                setStartIndex(startIndex - 10);
                setEndIndex(endIndex - 10);
                setCount(count - 1);
                pagination(startIndex - 10, endIndex - 10);
              }}
            >
              Previous
            </a>
          </li>
          {(() => {
            let a = [];
            for (let i = 0; i < pages; i++)
              a.push(
                <li
                  key={i}
                  className={`page-item ${count === i + 1 ? "disabled" : null}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => {
                      setStartIndex(10 * i);
                      setEndIndex(10 * (i + 1));
                      setCount(i + 1);
                      pagination(10 * i, 10 * (i + 1));
                    }}
                  >
                    {i + 1}
                  </a>
                </li>
              );
            return a;
          })()}

          <li
            className={`page-item ${
              startIndex >= pages * 10 - 10 && endIndex >= pages * 10
                ? "disabled"
                : null
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                setStartIndex(startIndex + 10);
                setEndIndex(endIndex + 10);
                setCount(count + 1);
                pagination(startIndex + 10, endIndex + 10);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
      {/* Selected Records */}
      {/* {selectedArr?.length?<span className=''>{`Record Count ${selectedArr?.length}`}</span>:null} */}
      {/* Total number of records */}
      <span className="">{`Record Count ${totalRecords.length}`}</span>
      <div className="mb-5 mt-5"></div>
      <div className="mt-4"></div>
      {/* Modal */}
      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="inputPassword5">
            Enter Message to send
          </Form.Label>
          <br />
          <textarea
            rows="4"
            cols="50"
            id="msg"
            style={{ width: "100%", height: "50px", border: "1px solid grey" }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => sendMessage()}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
