import React,{useState, useEffect} from 'react';
import { Pagination } from "antd";
import * as XLSX from "xlsx";
import { Modal, Button, Form } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';


const SmsRecords = () => {

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

    useEffect(() => {
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
              // alert("Error while loading data...!");
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
      const downloadExcel = (customHeadings) => {
        let dataSet = [];
        console.log("dataset", dataSet);
        dataSet = customHeadings;
        const worksheet = XLSX.utils.json_to_sheet(dataSet);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "UserListReport.xlsx");
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

      const [showperpage, setShowPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentpage * showperpage;
  const indexOfFirstPost = indexOfLastPost - showperpage;
  const howManyPages = Math.ceil(totalRecords.length / showperpage);


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

  const renderTable =
    totalRecords.length > 0 &&
    totalRecords !== undefined &&
    // .slice(pagination.start, pagination.end)
    totalRecords.slice(indexOfFirstPost, indexOfLastPost).map((item, index) => {
      return (
        <tr key={index + 1 + startIndex}>
          {sendMsg ? (
            currentpage !== 1 ? (
              <td> {index + 1 + showperpage * (currentpage - 1)}</td>
            ) : (
              <td>{index + 1}</td>
            )
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
    
          <td>{item.contactNo}</td>
        </tr>
      );
    });
    const onShowSizeChange = (current, pageSize) => {
        setShowPerPage(pageSize);
        setCurrentPage(current);
      };

  return (
    <div>
        <div className="container p-4">
      {/* {/ Header /} */}
      <div className="d-flex flex-row justify-content-between">
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>Records</div>
        <div></div>
        <div>
          <button
            type="button"
            className="btn btn-excel"
            onClick={() => CustomExcel(totalRecords)}>
            <Icon.FileEarmarkSpreadsheet className='me-2'/> Excel Export
          </button>
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
         
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>{renderTable !== undefined ? renderTable : null}</tbody>
        </table>
      </div>

      {loading ? (
        <center>
          <div className="spinner-border text-primary " role="status">
           
          </div>
        </center>
      ) : null}

      {/* / Pagination / */}
      {/******************  krupa changes ****************** */}
      {/* <div className="main-page-container" style={{ margin: "20px 0px" }}>
        {howManyPages > 0 ? (
          <Pagination
            setCurrentPage={setCurrentPage}
            pages={howManyPages}
            setRecord={setRecord}
            setTotalRecords={setTotalRecords}
            setPages={setPages}
            totalRecords={totalRecords}
            record={record}
          />
        ) : null} */}

      {/* {/ row per page /} */}
      {/* {/ ********************* krupa change **************** /} */}
      {/* <div className="rowperpagedata">
          <div className="rowheading">
            <p style={{ fontWeight: "600" }}>
              Row Per Page:
              <select
                style={{ marginLeft: "5px", borderRadius: "5px" }}
                value={sortValue}
                onChange={handlerSort}
                // onClick={(e) => setSortValue(e.target.value)}
              >
                {sortOption.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
      </div> */}

      {/* {/ ****************************** end ******************* /} */}
      {/* {/ for antd /} */}
      {/* <Pagination
        dataSource={totalRecords}
        onhandlerChange={onhandlerChange}
        total={totalRecords}
        pageSize={5}
      /> */}

      {/* <Table
        // columns={columns}
        dataSource={totalRecords}
        pagination={{
          current: currentpage,
          pageSize: showperpage,
          onChange: (currentpage, showperpage) => {
            setCurrentPage(currentpage);
            setShowPerPage(showperpage);
          },
        }}
      /> */}
      <div className="main-page-container" style={{ margin: "20px auto" }}>
        <Pagination
          dataSource={totalRecords}
          onChange={(value) => setCurrentPage(value)}
          pageSize={showperpage}
          total={totalRecords.length}
          // total = {50}
          current={currentpage}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "25", "50", "75", "100"]}
          // showQuickJumper
          onShowSizeChange={onShowSizeChange}
        />
      </div>
   
    
      <span className="testing">{`Record Count ${totalRecords.length}`}</span>
      <div className="mt-5"></div>
  
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


    </div>
  )
}

export default SmsRecords