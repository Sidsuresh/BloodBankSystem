import '../WelcomePagePatient/WelcomePagePatient.css'
import './RequestStatus.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import {IoCreateOutline} from 'react-icons/io5'

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";
import { useEffect, useState } from 'react'


const RequestStatus = ({ setIsLoggedIn, username }) => {
    const navigate = useNavigate();
    const [reqst, setReqst] = useState([]);
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    const readData = () => {
        const dbRef = ref(db);
        var reqst = []
        get(child(dbRef, "request/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData['uname'] === username) {
                        reqst = [
                            ...reqst,
                            { [childKey]: childData }
                        ];
                        console.log(reqst)
                    }
                });
                setReqst(reqst);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(readData, [username]);
    
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
                <Link to="/user/patient/status" className="row">
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
                <div className='sdtable'>
                    <table id='sdonor'>
                        <tr>
                            <th>Username</th>
                            <th>Blood Group</th>
                            <th>Units</th>
                            <th>Accept/Decline</th>
                        </tr>
                        {
                            reqst.map((val, k) => {
                                var mails_key = Object.keys(val)[0];
                                return (
                                    <tr key={k}>
                                        <td>{val[mails_key]['uname']}</td>
                                        <td>{val[mails_key]['bgp']}</td>
                                        <td>{val[mails_key]['units']}</td>
                                        <td>{val[mails_key]['status']}</td>
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

export default RequestStatus;