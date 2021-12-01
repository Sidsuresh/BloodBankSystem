import '../WelcomePagePatient/WelcomePagePatient.css'
import './SearchDonor.css'
import { useNavigate } from 'react-router-dom'
import useForm from '../useForm'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";
import { useState } from 'react'


const SearchDonor = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [donors, setDonors] = useState([]);
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    const onSubmit = (data) => {
        const dbRef = ref(db);
        var donors = []
        get(child(dbRef, "users/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData['bgp'] === data['search_bar']) {
                        console.log(childKey, childData);
                        donors = [
                            ...donors,
                            { [childKey]: childData }
                        ];
                        console.log(donors)
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
                    // value: '^(A+|A-|B+|B-|AB+|AB-|O+|O-)$',
                    value: '^[ABO][B]?[+-]$',
                    message: "Search cannot be empty and can only be A+, A-, B+, B-, AB+, AB-, O+, O-.",
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
                    <input type='text' id='search_bar' name='search_bar' placeholder='Search...' onChange={handleChange}></input>
                    <input type="submit" value="Search" onClick={handleSubmit}></input>
                </div>

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

export default SearchDonor;

