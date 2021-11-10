import './App.css';
import Navbar from './Components/Navbar/Navbar.js'
import LandingPage from './Components/LandingPage/LandingPage.js'
import Registration from './Components/Registration/Registration.js';
import Login from './Components/Login/Login.js';
import WelcomePageDonor from './Components/WelcomePageDonor/WelcomePageDonor.js';
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
          <Route path="/signup" element={<Registration />}/>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
          {/* <Route path="/users" element={isLoggedIn ? <Home />:<LandingPage/>}></Route> */}
          <Route path="/user/donor" element={isLoggedIn ? <WelcomePageDonor setIsLoggedIn={setIsLoggedIn} />:<LandingPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
