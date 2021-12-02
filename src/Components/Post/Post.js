import '../WelcomePagePatient/WelcomePagePatient.css'
import './Post.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

import useForm from '../useForm.js'
import db from '../../firebase-config'
import { ref, set, push, child} from "firebase/database";


const Post = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }

    const onSubmit = (data) => {
        const newPostKey = push(child(ref(db), 'posts')).key;
        set(ref(db, 'posts/' + newPostKey), data);
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
            email: {
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
            email: "",
            bgp: "A+",
            units: 1,
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
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="bgp">Blood Group:</label>
                        <select name="bgp" id="bgp" onChange={handleChange}>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
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

export default Post;

