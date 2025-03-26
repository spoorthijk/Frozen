import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from '../Components/Pages/Home';
// import Menu from '../Components/Pages/Menu';
import DesertDetails from '../Components/Pages/DesertDetails';
import Login from '../Components/Pages/Login';
import Register from '../Components/Pages/Register';
import SearchResultList from '../Components/Pages/SearchResultList';
import About from '../Components/Pages/About'
import ThankYou from '../Components/Pages/ThankYou';
import AdminDesertPage from '../Components/admin/pages/AdminDesertPage';
import MainMenu from '../Components/MainMenu';
import Ordering from '../Components/Ordering/Ordering';
import Dashboard from '../Components/user/Dashboard';


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home'/>} />
      <Route path='/home' element={<Home/>} />   
      <Route path='/about' element={<About/>} />   
      <Route path='/menu' element={<MainMenu/>} />
      <Route path='/desert/:id' element={<DesertDetails/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/desert/serach' element={<SearchResultList/>} />
      <Route path="/desert/:id/thank-you" element={<ThankYou />} /> 
      <Route path="/thank-you" element={<ThankYou />} /> 
      <Route path="/api/admin" element={<AdminDesertPage />} /> 
      <Route path="/order/:id" element={<Ordering />} /> 
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  )
}

export default Routers
