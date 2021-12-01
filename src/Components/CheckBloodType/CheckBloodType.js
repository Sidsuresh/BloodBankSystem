import '../WelcomePagePatient/WelcomePagePatient.css'
import './CheckBloodType.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";
import { useState, useEffect } from 'react'


const CheckBloodType = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [bloodgrp, setBloodgrp] = useState([]);
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }

    const onRequest = (id) => {
        navigate('/user/patient/request/'+ id);
    }

    const onPost = () => {
        navigate('/user/patient/post');
    }

    const readData = () => {
        const dbRef = ref(db);
        var data = []
        get(child(dbRef, "bloodbank/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    data = [
                        ...data,
                        { [childKey]: childData }
                    ];
                    console.log(childKey, childData);
                    console.log(data);
                });
                setBloodgrp(data);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(readData, []);
    
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

                <div className='sdtable'>
                    <table id='sdonor'>
                        <tr>
                            <th>Blood Group</th>
                            <th>Available Donor</th>
                            <th>Request</th>
                        </tr>
                        {
                            bloodgrp.map((val, k) => {
                                var id;
                                var donor_key = Object.keys(val)[0];
                                if (donor_key.length === 3) {
                                    id = donor_key.substring(0,2);
                                } else {
                                    id = donor_key.substring(0,1);
                                }
                                if (donor_key.substr(-1) === "+" ) {
                                    id += "P";
                                } else {
                                    id += "N";
                                }
                                return (
                                    <tr key={k}>
                                        <td>{donor_key}</td>
                                        <td>{val[donor_key]}</td>
                                        <td>{<input type="submit" name="request" value='Post' onClick={onPost}/>} &emsp;
                                            {<input type="submit" name="request" value='Request' onClick={() => onRequest(id)}/>}</td>
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

export default CheckBloodType;

