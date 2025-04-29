import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../common/Header.jsx'
import Footer from '../common/Footer.jsx'
const UserLayout = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </>
    )
}

export default UserLayout