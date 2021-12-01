import '../WelcomePagePatient/WelcomePagePatient.css'
import './CreateBloodCamp.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import useForm from '../useForm.js'
import db from '../../firebase-config'
import { ref, set, push, child } from "firebase/database";


const CreateBloodCamp = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }

    const onSubmit = (data) => {
        const newPostKey = push(child(ref(db), 'bloodcamp')).key;
        set(ref(db, 'bloodcamp/' + newPostKey), data);
        alert("Successfully Added");
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
            name: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Username cannot be empty.",
                },
            },
            city: {
                pattern: {
                    value: '^.{1,}$',
                    message: "City cannot be empty.",
                },
            },
            loc: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Location cannot be empty.",
                },
            },
            date: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Date cannot be empty.",
                },
            },
            time: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Time cannot be empty.",
                },
            },
        },
        onSubmit: onSubmit,
        onError: onError,
        initialValues: {
            name: "",
            city: "",
            loc: "",
            date: "",
            time: "",
            status: "Pending",
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
                <button className="button-row" onClick={onLogOut}>
                    <div className='sbdico'>
                        <BiLogOut />
                    </div>
                    Logout
                </button>
            </div>
            <div className='content1'>
                <form className='form-card' name="post-form" method="POST">
                    {/* date, city, time, name, location */}
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" name="name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="city">City: </label>
                        <input type="text" id="city" name="city" onChange={handleChange} />
                    </div>
                    <div>
                        <label id="loc_label" htmlFor="loc">Location:</label>
                        <textarea rows="4" cols="20" type="text" id="loc" name="loc" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="date">Date: </label>
                        <input type="date" id="date" name="date" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="time">Time: </label>
                        <input type="time" id="time" name="time" onChange={handleChange} />
                    </div>

                    <div className="button-wrap">
                        <input type="submit" value="Create" onClick={handleSubmit}></input>
                        <input type="reset" value="Reset"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBloodCamp;

