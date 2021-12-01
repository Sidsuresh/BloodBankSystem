import '../WelcomePageDonor/WelcomePageDonor.css'
import './UpdateDonDet.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import useForm from '../useForm.js'
import db from '../../firebase-config'
import { ref, update, push, child } from "firebase/database";


const UpdateDonDet = ({ setIsLoggedIn, username }) => {
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }

    const onSubmit = (data, uname) => {
        const date1 = Date.now();
        const date2 = new Date(data['dld']);
        const diffInMs = Math.abs(date2 - date1);
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        var updateData = {};
        if (days < 90) {
            data['status'] =  "Not Eligible";
            // const updateData = {
            //     status:,
            // };
        } else {
            data['status'] =  "Eligible";
        }
        update(ref(db, 'users/' + uname), data);
        alert("Successfully Updated");
        navigate('/user/donor');
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
            dld: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Username cannot be empty.",
                },
            }
        },
        onSubmit: (data) => onSubmit(data, username),
        onError: onError,
        initialValues: {
            dld: "",
            status: "Eligible",
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
            <div className='content2'>
                <form className='form-card' name="post-form" method="POST">
                    <div>
                        <label htmlFor="dld">Date of Last Donation: </label>
                        <input type="date" id="dld" name="dld" onChange={handleChange} />
                    </div>

                    <div className="button-wrap">
                        <input type="submit" value="Update" onClick={handleSubmit}></input>
                        <input type="reset" value="Reset"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateDonDet;

