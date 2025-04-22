import React, {  useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../Router/Routers'
import { useLocation } from 'react-router-dom'
const Layout = () => {
  const [headersRequired, setHeadersRequired] = useState(true);
  const location = useLocation();
  useEffect( ()=> {
    const isAdminPage = location.pathname === "/api/admin";
    setHeadersRequired(!isAdminPage);
  },[location]);
  return (
    <>
    {headersRequired && <Header/>}
    <Routers/>
    <Footer/>
    </>
  )
}


export default Layout
