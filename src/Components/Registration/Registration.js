import './Registration.css'
import {useNavigate} from 'react-router-dom'
import useForm from '../useForm.js';
import { ref, set } from "firebase/database";
import db from '../../firebase-config.js';

const Registration = () =>  {
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // db.ref('users').set()
        set(ref(db, 'users/' + data['uname']), {
            name: data['name'],
            email: data['email'],
            acnt: data['acnt'],
            pwd: data['pwd'],
            phn: data['phn'],
            add: data['add']
        });
        alert("Successfully Added");
        navigate('/');
    }
    const onError = (err) => {
        var msg = ""
        for (const e in err) {
            msg += err[e] + "\n"
        }
        alert(msg)
    }
    const {data, handleChange, handleSubmit} = useForm({
        validations: {
            uname: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Name cannot be empty.",
                },
            },
            name: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Name cannot be empty.",
                },
            },
            phn: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Phone number cannot be empty.",
                },
            },
            email: {
                pattern: {
                  value: '^.{1,}$',
                  message: "Email cannot be empty.",
                },
            },
            pwd: {
                pattern: {
                  value: '^.{1,}$',
                  message: "Password cannot be empty.",
                },
            },
            add: {
                pattern: {
                  value: '^.{1,}$',
                  message: "Address cannot be empty.",
                },
              },
              agree: {
                pattern: {
                  value: 'true',
                  message: "You have to agree to the Terms and Conditions to continue.",
                },
            },
          },
        onSubmit: onSubmit,
        onError: onError,
        initialValues: {
            acnt: "Donor",
            uname: "",
            name: "",
            phn: "",
            email: "",
            pwd: "",
            add: "",
            agree: "false",
        },
        passData: true,
      });

    return( 
    <div className='register'>
        <h1>Registration</h1>
        <div className='reg-container'>
            <form className='reg-card' name= "reg-form" method= "POST">
                <div className="radio-buttons">
                    <label htmlFor= "acnt">Account Type:</label><br/> 
                    <input 
                        type="radio" 
                        name="acnt" 
                        id="Donor"
                        value="Donor" 
                        checked={data['acnt'] === 'Donor'} 
                        onChange={handleChange}
                    />
                    <label htmlFor="Donor" className="radio">Donor</label><br/>
                    <input 
                        type="radio" 
                        name="acnt"
                        id="Patient"
                        value="Patient"
                        checked={data['acnt'] === 'Patient'} 
                        onChange={handleChange}                         
                    />
                    <label htmlFor="Patient" className="radio">Patient</label><br/>   
                </div>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input type= "text" id="name" name="name" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="dob">Date of Birth: </label>
                    <input type= "date" id="dob" name="dob" onChange={handleChange}/>
                </div>
                
                <div className="radio-buttons">
                    <label htmlFor= "gen">Gender:</label><br/> 
                    <input type="radio" name="gen" value="Male"/>
                    <label htmlFor="Male" className="radio">Male</label><br/>
                    <input type="radio" name="gen" value="Female"/>
                    <label htmlFor="Female" className="radio">Female</label><br/>
                    <input type="radio" name="gen" value="Others"/>
                    <label htmlFor="Others" className="radio">Others</label>       
                </div>

                <div>
                    <label htmlFor="bgp">Blood Group:</label>
                    <select name="bgp" id="bgp">
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
                    <label htmlFor="phn">Phone Number:</label>
                    <input type= "text" id="phn" name="phn" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="uname">Username:</label>
                    <input type= "text" id="uname" name="uname" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type= "text" id="email" name="email" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="pwd">Password:</label>
                    <input type= "password" id="pwd" name="pwd" onChange={handleChange}/>
                </div>

                <div>
                    <label id="addr_label" htmlFor="add">Address:</label>
                    <textarea rows= "4" cols= "20" type= "text" id="add" name="add" onChange={handleChange}/>
                </div>
                <div className="check-box">
                    <input type="checkbox" id="agree" name="agree" value="Yes" onChange={(e) => handleChange(e, e.target.checked.toString())} />
                    <label htmlFor="agree">I agree to the Terms and Conditions</label>
                </div>
                <div className="button-wrap">
                    <input type = "submit" value = "Submit" onClick={handleSubmit}></input>
                    <input type = "reset" value = "Reset"></input>
                </div>
            </form>   
        </div>
    </div>
    
    )
}

export default Registration;