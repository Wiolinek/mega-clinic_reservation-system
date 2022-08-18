import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import Homepage from './components/Homepage/Homepage'
import OurDoctors from './components/OurDoctors/OurDoctors'
import Reservation from './components/Reservation/Reservation'
import LogIn from './components/LogIn/LogIn'
import SuccessForm from './components/SuccessForm/SuccessForm'
import DoctorAccount from './components/DoctorAccount/DoctorAccount'
import Logout from './components/Logout/Logout'
import ErrorPage from './components/ErrorPage/ErrorPage'
import Context from './Context'

import './App.css';


const App: React.FC = () => {
  
  return (
  <BrowserRouter>
  <Context>
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
    </Context>
  </BrowserRouter>
  );
}

export default App;
