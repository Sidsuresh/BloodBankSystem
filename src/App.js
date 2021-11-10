import './App.css';
import Navbar from './Components/Navbar/Navbar.js'
import LandingPage from './Components/LandingPage/LandingPage.js'
import { HashRouter as Router} from 'react-router-dom';

function App() {
  return (
  <Router>
      <div className="App">
        <Navbar />
        <LandingPage />
      </div>
    </Router>
  );
}

export default App;
