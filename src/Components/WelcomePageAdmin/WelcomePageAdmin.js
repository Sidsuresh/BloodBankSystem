import './WelcomePageAdmin.css'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import { GoMail } from "react-icons/go";

const WelcomePageAdmin = ({setIsLoggedIn}) =>  {
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    
    return ( 
    <div className='admin-container'>
        <div className='sidebar'>
            <Link to="/user/admin/inbox" className="row">
                <div className='sbdico'>
                    <GoMail/>
                </div>
                Inbox
            </Link>
            <Link to="/user/admin/searchdonor" className="row">
                <div className='sbdico'>
                    <FaSearch/>
                </div>
                Search Donor
            </Link>
            <button className="button-row" onClick={onLogOut}>
                <div className='sbdico'>
                    <BiLogOut/>
                </div>
                Logout
            </button>
        </div>
        <div className='content'>
            <p>Why we need you to give Blood?</p>
            <ul>
				<li>Giving blood saves lives. The blood you give is a lifeline in an emergency and for people who need long-term treatments.</li>
				<li>Many people would not be alive today if donors had not generously given their blood.</li>
				<li>We need over 6,000 blood donations every day to treat patients in need across india. Which is why there’s always a need for people to give blood.</li>
				<li>Each year we need approximately 200,000 new donors, as some donors can no longer give blood.</li>
				<li>Most people between the ages of 17-65 are able to give blood.</li>
				<li>Around half our current donors are over 45. That's why we need more young people (over the age of 17) to start giving blood, so we can make sure we have enough blood in the future.</li>
			</ul>
        </div>
    </div>
    )
}

export default WelcomePageAdmin;