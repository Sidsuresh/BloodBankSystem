import '../WelcomePagePatient/WelcomePagePatient.css'
import './Request.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import useForm from '../useForm.js'
import db from '../../firebase-config'
import { ref, push, child, set } from "firebase/database";
// import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


const Request = ({ setIsLoggedIn }) => {
    let { id } = useParams();
    var bgp_map = { "AP": "A+", "AN": "A-", "BP": "B+", "BN": "B-", "ABP": "AB+", "ABN": "AB-", "OP": "O+", "ON": "O-" };
    const bgp = bgp_map[id];
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }

    const onSubmit = (data) => {
        const newPostKey = push(child(ref(db), 'posts')).key;
        set(ref(db, 'request/' + newPostKey), data);
        alert("Successfully Added");
        navigate('/user/patient');
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
            uname: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Username cannot be empty.",
                },
            },
            units: {
                pattern: {
                    value: '^[1-9]{1,}$',
                    message: "Units cannot be empty.",
                },
            },
        },
        onSubmit: onSubmit,
        onError: onError,
        initialValues: {
            uname: "",
            bgp: "A+",
            units: 1,
            status: "Pending",
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
                <Link to="/user/patient/blood" className="row active">
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
            <div className='content1'>
                <form className='form-card' name="post-form" method="POST">
                    <div>
                        <label htmlFor="uname">Username: </label>
                        <input type="text" id="uname" name="uname" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="bgp">Blood Group:</label>
                        <input type="text" id="bgp" name="bgp" value={bgp} readOnly />
                    </div>
                    <div>
                        <label htmlFor="units">Units: </label>
                        <input type="number" id="units" name="units" onChange={handleChange} />
                    </div>

                    <div className="button-wrap">
                        <input type="submit" value="Post" onClick={handleSubmit}></input>
                        <input type="reset" value="Reset"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Request;

