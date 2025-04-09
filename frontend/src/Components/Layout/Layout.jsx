import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../Router/Routers'
const Layout = () => {
  const [headersRequired, setHeadersRequired] = useState(true);
  useEffect(()=> {
    async function checkRoute() {
      if(window.location.pathname==="/api/admin") {
        setHeadersRequired(false);
      }
      return;
    }
    checkRoute();
  },[])
  return (
    <>
    {headersRequired && <Header/>}
    <Routers/>
    <Footer/>
    </>
  )
}


export default Layout
