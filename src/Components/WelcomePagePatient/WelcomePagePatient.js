import './WelcomePagePatient.css'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {IoCreateOutline} from 'react-icons/io5'
import {BiLogOut} from 'react-icons/bi'

const WelcomePagePatient = ({setIsLoggedIn}) =>  {
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    return ( 
    <div className='pat-container'>
        <div className='sidebar'>
            <Link to="/user/patient/donor" className="row">
                <div className='sbdico'>
                    <FaSearch/>
                </div>
                Search Donor
            </Link>
            <Link to="/user/patient/blood" className="row">
                <div className='sbdico'>
                    <FaSearch/>
                </div>
                Check Available Blood Types
            </Link>
            <Link to="/user/patient/status" className="row">
                <div className='sbdico'>
                    <IoCreateOutline/>
                </div>
                Request Status
            </Link>
            <button className="button-row" onClick={onLogOut}>
                <div className='sbdico'>
                    <BiLogOut/>
                </div>
                Logout
            </button>
        </div>
        <div className='content'>
            <p>Why you should use our Services?</p>
            <ul>
				<li>The usage of different authentication methods provides best sense of security in terms of your data.</li>
				<li>Requests are fulfilled within a short span of time due to which Service Time is very small.</li>
				<li>Partnership with hospitals all over the nation making it easier for you to find your perfect match</li>
				<li>Efficient and Secure transportation of Blood Bags to any location in the Indian Subcontinent.</li>
				<li>It is easy to locate Donors in and around your location.</li>
			</ul>
        </div>
    </div>
    )
}

export default WelcomePagePatient;