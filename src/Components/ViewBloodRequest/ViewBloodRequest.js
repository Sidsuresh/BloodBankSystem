import '../WelcomePageAdmin/WelcomePageAdmin.css'
import './ViewBloodRequest.css'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";

import { FaSearch } from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { BiLogOut } from 'react-icons/bi'

const ViewBloodRequest = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    const readPosts = () => {
        const dbRef = ref(db);
        var posts = []
        get(child(dbRef, "posts/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    console.log(childKey, childData);
                    posts = [
                        ...posts,
                        { [childKey]: childData }
                    ];
                    console.log(posts)
                });
                setPosts(posts);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(readPosts, []);

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
                <Link to="/user/donor/viewreqt" className="row active">
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
                <div className='sdtable'>
                    <table id='sdonor'>
                        <tr>
                            <th>Email</th>
                            <th>Blood Group</th>
                            <th>Units</th>
                        </tr>
                        {
                            posts.map((val, k) => {
                                var post_key = Object.keys(val)[0];
                                return (
                                    <tr key={k}>
                                        <td>{val[post_key]['email']}</td>
                                        <td>{val[post_key]['bgp']}</td>
                                        <td>{val[post_key]['units']}</td>
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

export default ViewBloodRequest;