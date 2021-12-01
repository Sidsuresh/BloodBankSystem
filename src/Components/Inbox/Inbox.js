import '../WelcomePageAdmin/WelcomePageAdmin.css'
import './Inbox.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { GoMail } from "react-icons/go";

import db from '../../firebase-config'
import { ref, child, get, update } from "firebase/database";
import { useEffect, useState } from 'react'


const Inbox = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [mails, setMails] = useState([]);
    const onLogOut = () => {
        setIsLoggedIn(false);
        navigate('/');
    }
    const readData = () => {
        const dbRef = ref(db);
        var mails = []
        get(child(dbRef, "request/")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    mails = [
                        ...mails,
                        { [childKey]: childData }
                    ];
                    console.log(mails)
                });
                setMails(mails);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(readData, []);

    const onAccept = async (mails_key, bgp, units_req) => {
        const updateStatus = {
            status: "Accept",
        };
        const dbRef = ref(db);
        var old_units = 0;
        await get(child(dbRef, `bloodbank/${bgp}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              old_units = snapshot.val()['units'];
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        var new_units = old_units - units_req;
        const updateUnits = {
            units: new_units,
        };
        update(ref(db, `request/${mails_key}`), updateStatus);
        update(ref(db, `bloodbank/${bgp}`), updateUnits);
    }

    const onDecline = (mails_key) => {
        const data = {
            status: "Declined",
        };
        update(ref(db, 'request/' + mails_key), data);
    }


    return (
        <div className='admin-container'>
            <div className='sidebar'>
                <Link to="/user/admin/inbox" className="row">
                    <div className='sbdico'>
                        <GoMail />
                    </div>
                    Inbox
                </Link>
                <Link to="/user/admin/searchdonor" className="row">
                    <div className='sbdico'>
                        <FaSearch />
                    </div>
                    Search Donor
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
                            mails.map((val, k) => {
                                var mails_key = Object.keys(val)[0];
                                if (val[mails_key]['status'] === "Pending") {
                                    return (
                                        <tr key={k}>
                                            <td>{val[mails_key]['uname']}</td>
                                            <td>{val[mails_key]['bgp']}</td>
                                            <td>{val[mails_key]['units']}</td>
                                            <td>{<input type="submit" id="accept" name="request" value='Accept' onClick={() => onAccept(mails_key, val[mails_key]['bgp'], val[mails_key]['units'])}/>} &emsp;
                                                {<input type="submit" id="decline" name="request" value='Decline' onClick={() => onDecline(mails_key)}/>}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Inbox;