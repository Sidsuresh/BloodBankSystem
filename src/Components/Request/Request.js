import '../WelcomePagePatient/WelcomePagePatient.css'
import './Request.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


const Request = ({ setIsLoggedIn }) => {
    let { id } = useParams();
    const [donors, setDonors] = useState([]);
    var bgp_map = { "AP": "A+", "AN": "A-", "BP": "B+", "BN": "B-", "ABP": "AB+", "ABN": "AB-", "OP": "O+", "ON": "O-" };
    const bgp = bgp_map[id];
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }

    const readData = () => {
        var donors = []
        const dbRef = ref(db);
        get(child(dbRef, "users/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData['acnt'] === "Donor" && childData['bgp'] === bgp) {
                        donors = [
                            ...donors,
                            { [childKey]: childData }
                        ];
                        console.log(childKey, childData);
                    }
                });
                setDonors(donors);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(readData, [bgp]);
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
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone No</th>
                            <th>Email</th>
                        </tr>
                        {
                            donors.map((val, k) => {
                                var donor_key = Object.keys(val)[0];
                                return (
                                    <tr key={k}>
                                        <td>{val[donor_key]['name']}</td>
                                        <td>{val[donor_key]['add']}</td>
                                        <td>{val[donor_key]['phn']}</td>
                                        <td>{val[donor_key]['email']}</td>
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

export default Request;

