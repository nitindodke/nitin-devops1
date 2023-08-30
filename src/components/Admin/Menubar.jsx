import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import gaonconnectLogo from "../../asset/appstore1024 x 1024-07.jpg";
import * as Icon from 'react-bootstrap-icons';
import { Button, Spinner, Accordion } from 'react-bootstrap';


const Menubar = () => {
  function setnav(){
    const mobilenav = document.querySelector(".mobile-nav");
    const toggle = document.querySelector(".mobile-nav-toggle");
  
    const visibility = mobilenav.getAttribute('data-visible' );
    if(visibility ==="false"){
        mobilenav.setAttribute("data-visible" , true);
        toggle.setAttribute("aria-expanded", true);
        document.querySelector("body").style.overflow='hidden';
    }
    else if(visibility === "true"){
        mobilenav.setAttribute("data-visible" , false);
        toggle.setAttribute("aria-expanded", false);
        document.querySelector("body").style.overflow='auto';
        
    }
  }

  const naviagte = useNavigate();
  const [loader,setLoader] = useState(false);

 const handleLogout=()=>{
  setLoader(true);
  localStorage.clear();
  naviagte('/');
  setLoader(false);
 }

  return (

    <nav className='navbar px-4'>
       <a className="navbar-brand d-block mx-auto" href="/dashboard">
          <img
            src={gaonconnectLogo}
            alt="Bootstrap"
            width="auto"
            height="60"
      
            style={{ borderRadius: "100%", }}
          />
        </a>

    <div className="mobile-nav-toggle" aria-controls='selectNav' aria-expanded="false"  onClick={setnav}>
        <div className='menu-btn__burger'></div>
    </div>
 
    <ul className="lg-nav">
    <Button className='btn btn-logout' onClick={handleLogout}>{ loader ? <Spinner animation="border" variant="light" className='spinner'/> :<>
    <Icon.BoxArrowLeft className='me-2'/>Logout</>}</Button>
    </ul>
    
    <ul id="selectNav" className="mobile-nav" data-visible="false">
    <div className="sidenav-lg">
    <Accordion defaultActiveKey="0" flush className="">

    
      <Accordion.Item eventKey="0">
        <Accordion.Header><Icon.HouseDoor className='me-2'/>Home</Accordion.Header>
        <Accordion.Body>

        <Link to="/"><Button className="w-100 mb-2 btn-accordionMenu" onClick={setnav}>
           <Icon.Activity className="me-2"/>Overall Sakal Report</Button></Link>
            <Link to="/overall-business-performance-1"><Button className="w-100 mb-2 btn-accordionMenu" onClick={setnav}>
            <Icon.Person className='me-2'/>Overall Business Report-1</Button></Link>
        </Accordion.Body>
      </Accordion.Item>
      
      <Accordion.Item eventKey="1">
           <Accordion.Header><Icon.ArrowDownCircle className='me-2'/>Other Roles</Accordion.Header>
           {/* <Accordion.Body>
           <Link to="/admin/enter-mobile"><Button className="w-100 mb-2 btn-accordionMenu" onClick={setnav}>
            <Icon.PersonAdd className='me-2'/>Register User</Button></Link>
            <Link to="/admin/add-member-attendance"><Button className="w-100 mb-2 btn-accordionMenu" onClick={setnav}>
            <Icon.PersonAdd className='me-2'/>Register User without OTP</Button></Link>
           </Accordion.Body> */}
         </Accordion.Item>
    
    </Accordion>
      </div>

      <Button className='btn btn-logout m-5' onClick={handleLogout}>{ loader ? <Spinner animation="border" variant="light" className='spinner'/> :<><Icon.BoxArrowLeft className='me-2'/>Logout</>}</Button>
    </ul>
    
</nav>
  )
}

export default Menubar;