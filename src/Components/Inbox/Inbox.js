import '../WelcomePageAdmin/WelcomePageAdmin.css'
import './Inbox.css'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import { GoMail } from "react-icons/go";
import { BsCardChecklist } from "react-icons/bs";

const Inbox = ({setIsLoggedIn}) =>  {
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
            <Link to="/user/admin/request" className="row">
                <div className='sbdico'>
                    <BsCardChecklist/>
                </div>
                Check Request
            </Link>
            <button className="button-row" onClick={onLogOut}>
                <div className='sbdico'>
                    <BiLogOut/>
                </div>
                Logout
            </button>
        </div>
        <div className='content'>
            <div className='ibtable'>
                <table>
                    <tr>
                        <th>Person 1</th>
                        <th>Person 2</th>
                        <th>Person 3</th>
                    </tr>
                    <tr>
                        <td>Emil</td>
                        <td>Tobias</td>
                        <td>Linus</td>
                    </tr>
                    <tr>
                        <td>Emil</td>
                        <td>Tobias</td>
                        <td>Linus</td>
                    </tr>
                    <tr>
                        <td>Emil</td>
                        <td>Tobias</td>
                        <td>Linus</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    )
}

export default Inbox;