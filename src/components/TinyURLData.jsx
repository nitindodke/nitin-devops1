import React,{useState,useEffect} from 'react'
import { Container, Col , Row} from 'react-bootstrap';
import DataTable from "react-data-table-component";
import moment from "moment";


const TinyURLData = () => {

    
const [URLData, setURLData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
    
    // fetch API for Showing ALL sms Send By USer
  const fetchData = async () => {
    await fetch("https://fxurl.co/v1/shorten/list?clientId=63ac092bf7fcb78739b74153", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) 
        return res.json();
      })
      .then((data) => {
        console.log("Data", data);
        setURLData(data);
      })
      .catch((err) => console.log("ERR", err));
  };


  //------ DataTable For Table from React-Data-Table-Components -----------
  const columns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      grow:0.2,
      wrap:true,
      sortable: false,
    },
    {
      name: "Short Code",
      selector: (row) => row?.short_code,
      sortable: false,
      grow:0.2,
      wrap:true,
    },
    {
        name: "URLs",
        selector: (row) => row?.url,
        sortable: false,
        grow:1,
        wrap:true,
      },
      {
        name: "Clicks Counts",
        selector: (row) => row?.clicks_count,
        sortable: false,
        grow:0.2,
        wrap:true,
      },
 
    {
      name: "Created Date",
      selector: (row) => moment(row?.createdAt).format("DD MMM YYYY hh:mm a"),
      sortable: false,
      wrap: true,
      grow:0.2,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
        background:'rgb(252, 250, 250);',
        textAlign:'center',
        justifyContent:'center',
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "16px",
        fontWeight: "700",
        color: "green",
        background:'rgb(252, 250, 250)',
        textAlign:'center',
        justifyContent:'center',
      },
    },
    cells: {
      style: {
        paddingLeft: "5px", // override the cell padding for data cells
        paddingRight: "5px",
        fontSize: "16px",
        background:'rgb(252, 250, 250);',
        justifyContent:'center',
      },
    },
  };

  return (
    <div>
        <Container>
            <Row className='mb-5 pt-2'>
              <Col md={12}>
              <DataTable
            columns={columns}
            data={URLData.urls}
            pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]} 
            responsive
            customStyles={customStyles}
          />
              </Col>
            </Row>
        </Container>
        <div className='mt-5'></div>
        <div className='mt-2'></div>
    </div>
    
  )
}

export default TinyURLData;