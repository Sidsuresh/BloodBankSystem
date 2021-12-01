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
import RequestStatus from './Components/RequestStatus/RequestStatus.js';
import CreateBloodCamp from './Components/CreateBloodCamp/CreateBloodCamp';
import SearchBloodCamp from './Components/SearchBloodCamp/SearchBloodCamp';
import ViewBloodRequest from './Components/ViewBloodRequest/ViewBloodRequest';
import UpdateDonDet from './Components/UpdateDonDet/UpdateDonDet';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[username, setUsername] = useState('');
  const[accType, setAccType] = useState('');

  const defaultRouting = () => {
      if (isLoggedIn) {
        if (accType === "Admin") {
          return  <WelcomePageAdmin setIsLoggedIn={setIsLoggedIn} />
        } else if (accType === "Patient") {
          return  <WelcomePagePatient setIsLoggedIn={setIsLoggedIn} />
        } else {
          return  <WelcomePageDonor setIsLoggedIn={setIsLoggedIn} />
        }
      } else {
        return <LandingPage/> 
      }
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={ defaultRouting() }/>
          <Route path="/contact_us" exact element={<ContactUs />}/>
          <Route path="/signup" exact element={<Registration />}/>
          <Route path="/login" exact element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setAccType={setAccType}/>}/>
          <Route path="/user/patient" element={isLoggedIn ? <WelcomePagePatient setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/donor" element={isLoggedIn ? <WelcomePageDonor setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/admin" element={isLoggedIn ? <WelcomePageAdmin setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/patient/donor" element={isLoggedIn ? <SearchDonor setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/patient/blood" element={isLoggedIn ? <CheckBloodType setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/admin/inbox" element={isLoggedIn ? <Inbox setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/admin/searchdonor" element={isLoggedIn ? <SearchDonorAdmin setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/patient/post' element={isLoggedIn ? <Post setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/patient/request/:id' element={isLoggedIn ? <Request setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/patient/status' element={isLoggedIn ? <RequestStatus setIsLoggedIn={setIsLoggedIn} username={username} />:<LandingPage />}></Route>
          <Route path='/user/donor/createcamp' element={isLoggedIn ? <CreateBloodCamp setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/donor/searchcamp' element={isLoggedIn ? <SearchBloodCamp setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/donor/viewreqt' element={isLoggedIn ? <ViewBloodRequest setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path='/user/donor/updateDet' element={isLoggedIn ? <UpdateDonDet setIsLoggedIn={setIsLoggedIn} username={username} />:<LandingPage />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
