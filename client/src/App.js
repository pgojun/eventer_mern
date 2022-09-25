import React from 'react';
import Home from './components/Hero/Hero';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import AddEvent from './components/AddEvent/AddEvent';
import EventDetails from './components/EventDetails/EventDetails';
import UpdateEvent from './components/UpdateEvent/UpdateEvent';
import Footer from './components/Footer/Footer';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (

    <BrowserRouter >
      <Navbar />
      <Routes>
      <Route path="/" exact element={<Navigate to="/events" replace />} />
        <Route path="/events" index element={<Home />} />
        <Route path="/events/search" exact element={<Home/>} />
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/events" replace />} />
        <Route path="/add" element={!user ? <Navigate to ="/login" replace/> : <AddEvent/>} />
        <Route path="/update/:id" element={!user ? <Navigate to ="/login" replace/> : <UpdateEvent/>} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
