import '../WelcomePagePatient/WelcomePagePatient.css'
import './SearchDonor.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

const SearchDonor = ({ setIsLoggedIn }) => {
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
                        <FaSearch />
                    </div>
                    Search Donor
                </Link>
                <Link to="/user/patient/blood" className="row">
                    <div className='sbdico'>
                        <FaSearch />
                    </div>
                    Check Available Blood Types
                </Link>
                <Link to="/user/patient/request" className="row">
                    <div className='sbdico'>
                        <IoCreateOutline />
                    </div>
                    Request Status
                </Link>
                <button className="button-row" onClick={onLogOut}>
                    <div className='sbdico'>
                        <BiLogOut />
                    </div>
                    Logout
                </button>
            </div>
            <div className='content'>
                <div className='searchbar'>
                    <input type='text' id='search_bar' placeholder='Search...'></input>
                </div>

                <div className='sdtable'>
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
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SearchDonor;