import './App.css';
import Navbar from './Components/Navbar/Navbar.js'
import LandingPage from './Components/LandingPage/LandingPage.js'
import Registration from './Components/Registration/Registration.js';
import Login from './Components/Login/Login.js';
import ContactUs from './Components/ContactUs/ContactUs.js';
import WelcomePageDonor from './Components/WelcomePageDonor/WelcomePageDonor.js';
import WelcomePagePatient from './Components/WelcomePagePatient/WelcomePagePatient.js';
import WelcomePageAdmin from './Components/WelcomePageAdmin/WelcomePageAdmin.js';
import SearchDonor from './Components/SearchDonor/SearchDonor.js';
import SearchDonorAdmin from './Components/SearchDonorAdmin/SearchDonorAdmin.js';
import CheckBloodType from './Components/CheckBloodType/CheckBloodType.js';
import Request from './Components/Request/Request.js';
import Inbox from './Components/Inbox/Inbox.js';
import Post from './Components/Post/Post.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/contact_us" exact element={<ContactUs />}/>
          <Route path="/signup" exact element={<Registration />}/>
          <Route path="/login" exact element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/user/patient" element={isLoggedIn ? <WelcomePagePatient setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/donor" element={isLoggedIn ? <WelcomePageDonor setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/admin" element={isLoggedIn ? <WelcomePageAdmin setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/patient/donor" element={isLoggedIn ? <SearchDonor setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/patient/blood" element={isLoggedIn ? <CheckBloodType setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/admin/inbox" element={isLoggedIn ? <Inbox setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/admin/searchdonor" element={isLoggedIn ? <SearchDonorAdmin setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/patient/post' element={isLoggedIn ? <Post setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/patient/request/:id' element={isLoggedIn ? <Request setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
