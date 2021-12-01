import '../WelcomePageAdmin/WelcomePageAdmin.css'
import './SearchBloodCamp.css'
import { useNavigate } from 'react-router-dom'
import useForm from '../useForm'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";
import { useState } from 'react'


const SearchBloodCamp = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [bdCamps, setBdCamps] = useState([]);
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    const onSubmit = (data) => {
        const dbRef = ref(db);
        var camps = []
        get(child(dbRef, "bloodcamp/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData['city'] === data['search_bar']) {
                        console.log(childKey, childData);
                        camps = [
                            ...camps,
                            { [childKey]: childData }
                        ];
                        console.log(camps)
                    }
                });
                setBdCamps(camps);
                if (camps.length === 0) {
                    alert("No Blood Bank Camps in the city !!!")
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const onError = (err) => {
        var msg = ""
        for (const e in err) {
            msg += err[e] + "\n"
        }
        alert(msg)
    }
    const { handleChange, handleSubmit } = useForm({
        validations: {
            search_bar: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Search cannot be empty.",
                },
            }
        },
        onSubmit: (data) => onSubmit(data),
        onError: onError,
        initialValues: {
            search_bar: ""
        },
        passData: true,
    });

    return (
        <div className='donor-container'>
            <div className='sidebar'>
                <Link to="/user/donor/searchcamp" className="row">
                    <div className='sbdico'>
                        <FaSearch />
                    </div>
                    Search Blood Bank Camp
                </Link>
                <Link to="/user/donor/createcamp" className="row">
                    <div className='sbdico'>
                        <IoCreateOutline />
                    </div>
                    Create Blood Bank Camp
                </Link>
                <Link to="/user/donor/viewreqt" className="row">
                    <div className='sbdico'>
                        <FaSearch />
                    </div>
                    View Blood Request
                </Link>
                <Link to="/user/donor/updateDet" className="row">
                    <div className='sbdico'>
                        <IoCreateOutline />
                    </div>
                    Update Donation Details
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
                    <input type='text' id='search_bar' name='search_bar' placeholder='Search City...' onChange={handleChange}></input>
                    <input type="submit" value="Search" onClick={handleSubmit}></input>
                </div>

                <div className='sdtable'>
                    <table id='sdonor'>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        {
                            bdCamps.map((val, k) => {
                                var camp_key = Object.keys(val)[0];
                                return (
                                    <tr key={k}>
                                        <td>{val[camp_key]['name']}</td>
                                        <td>{val[camp_key]['city']}</td>
                                        <td>{val[camp_key]['loc']}</td>
                                        <td>{val[camp_key]['date']}</td>
                                        <td>{val[camp_key]['time']}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SearchBloodCamp;

