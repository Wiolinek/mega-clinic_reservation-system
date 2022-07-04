// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import Homepage from "./components/Homepage/Homepage"
import AboutUs from "./components/AboutUs/AboutUs"
import OurDoctors from "./components/OurDoctors/OurDoctors"
import Contact from "./components/Contact/Contact"
import Reservation from "./components/Reservation/Reservation"
import LogIn from "./components/LogIn/LogIn"

import './App.css';


const App: React.FC = () => {
  return (
  <BrowserRouter>
  <Navigation />
    <Routes>
      <Route path="/" element={ <Homepage />}></Route>
      <Route path="/about-us" element={ <AboutUs />}></Route>
      <Route path="/our-doctors" element={ <OurDoctors />}></Route>
      <Route path="/contact" element={ <Contact />}></Route>
      <Route path="/reservation" element={ <Reservation />}></Route>
      <Route path="/login" element={ <LogIn />}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
