import './App.css';
import Navbar from './Components/Navbar/Navbar.js'
import LandingPage from './Components/LandingPage/LandingPage.js'
import Registration from './Components/Registration/Registration.js';
import Login from './Components/Login/Login.js';
import WelcomePageDonor from './Components/WelcomePageDonor/WelcomePageDonor.js';
import WelcomePagePatient from './Components/WelcomePagePatient/WelcomePagePatient.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[accountType, setAccountType] = useState('');
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<Registration />}/>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} accountType={accountType} setAccountType={setAccountType} />}/>
          <Route path="/user/patient" element={isLoggedIn ? <WelcomePagePatient setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
          <Route path="/user/donor" element={isLoggedIn ? <WelcomePageDonor setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
