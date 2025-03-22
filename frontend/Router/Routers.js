import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from '../Components/Pages/Home';
import Menu from '../Components/Pages/Menu';
import DesertDetails from '../Components/Pages/DesertDetails';
import Login from '../Components/Pages/Login';
import Register from '../Components/Pages/Register';
import SearchResultList from '../Components/Pages/SearchResultList';
import About from '../Components/Pages/About'


const Routers = () => {
  return (
   <Routes>
   <Route path='/' element={<Navigate to='/home'/>} />
   <Route path='/home' element={<Home/>} />   
   <Route path='/about' element={<About/>} />   
   <Route path='/menu' element={<Menu/>} />
   <Route path='/desert/:id' element={<DesertDetails/>} />
   <Route path='/login' element={<Login/>} />
   <Route path='/register' element={<Register/>} />
   <Route path='/desert/serach' element={<SearchResultList/>} />
   </Routes>
  )
}

export default Routers
