import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from "react-router-dom";
import Footer from './Footer'

export default function MainLayout() {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar />
            {/* <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}> */}
                <Outlet />
            {/* </div> */}
            <Footer />
        </div>
    )
}
