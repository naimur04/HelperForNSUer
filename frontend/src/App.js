import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
import Profile from './Profile';
import Library from './Library';
import FoodStalls from './FoodStalls';
import SportsFitnessCenter from './SportsFitnessCenter';
import GymSchedule from './GymSchedule';
import GymFees from './GymFees';
import Sports from './Sports';
import SuggestionBox from './SuggestionBox';
import ParkingPrinting from './ParkingPrinting';
import Parking from './Parking';
import PrintZone from './PrintZone';
import MedicalServices from './MedicalServices';
import MedicalZone from './MedicalZone';
import BloodDonation from './BloodDonation';
import CRSharing from './CRSharing';
import RideSharing from './RideSharing';
import ResumeBuilder from './ResumeBuilder';
import ResumePreview from './ResumePreview';
import ResumeList from './ResumeList';
import Courses from './Courses';
import Clubs from './Clubs';
import Administration from './Administration';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/library' element={<Library />} />
        <Route path='/food-stalls' element={<FoodStalls/>}/>
        <Route path='/gym-sports' element={<SportsFitnessCenter/>}/>
        <Route path='/gym-schedule' element={<GymSchedule/>}/>
        <Route path='/gym-fees' element={<GymFees/>}/>
        <Route path='/sports' element={<Sports/>}/>
        <Route path='/suggestions' element={<SuggestionBox/>}/> 
        <Route path='/parking-print' element={<ParkingPrinting/>}/> 
        <Route path='/parking' element={<Parking/>}/> 
        <Route path='/print-zone' element={<PrintZone/>}/> 
        <Route path='/medical' element={<MedicalServices/>}/> 
        <Route path='/medical-centers' element={<MedicalZone/>}/> 
        <Route path='/blood-donation' element={<BloodDonation/>}/> 
        <Route path='/course-ride' element={<CRSharing/>}/> 
        <Route path='/ride-sharing' element={<RideSharing/>}/> 
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-builder/:id" element={<ResumeBuilder />} />
        <Route path="/resume/:id" element={<ResumePreview />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/administration" element={<Administration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
