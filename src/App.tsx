import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Homepage from './components/pageTemplates/Homepage/Homepage';
import OurDoctors from './components/pageTemplates/OurDoctors/OurDoctors';
import Reservation from './components/pageTemplates/Reservation/Reservation';
import LogIn from './components/pageTemplates/LogIn/LogIn';
import SuccessForm from './components/pageTemplates/SuccessForm/SuccessForm';
import DoctorAccount from './components/pageTemplates/DoctorAccount/DoctorAccount';
import Logout from './components/pageTemplates/Logout/Logout';
import ErrorPage from './components/pageTemplates/ErrorPage/ErrorPage';

import './App.css';


const App: React.FC = () => {
  
  return (
  <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path='/' element={ <Homepage />}></Route>
        <Route path='/our-doctors' element={ <OurDoctors />}></Route>
        <Route path='/reservation' element={ <Reservation />}></Route>
        <Route path='/login' element={ <LogIn />}></Route>
        <Route path='/success' element={ <SuccessForm />}></Route>
        <Route path='/doctor-account' element={ <DoctorAccount />}></Route>
        <Route path='/logout' element={ <Logout />}></Route>
        <Route path='*' element={ <ErrorPage />}></Route>
      </Routes>
      <Footer />
  </BrowserRouter>
  );
}

export default App;
