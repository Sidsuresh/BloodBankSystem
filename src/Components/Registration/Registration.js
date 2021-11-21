import './Registration.css'
import {useNavigate} from 'react-router-dom'

const Registration = () =>  {
    const navigate = useNavigate();
    return( 
    <div className='register'>
        <h1>Registration</h1>
        <div className='reg-container'>
            <form className='reg-card' name= "reg-form" method= "POST">
                <div className="radio-buttons">
                    <label htmlFor= "acnt">Account Type:</label><br/> 
                    <input type="radio" name="acnt" value="Donor"/>
                    <label htmlFor="Donor" className="radio">Donor</label><br/>
                    <input type="radio" name="acnt" value="Patient"/>
                    <label htmlFor="Patient" className="radio">Patient</label><br/>     
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type= "text" id="name"/>
                </div>

                <div>
                    <label htmlFor="dob">Date of Birth: </label>
                    <input type= "date" id="dob"/>
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
                    <label for="bgp">Blood Group:</label>
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
                    <input type= "text" id="phn"/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type= "text" id="email"/>
                </div>

                <div>
                    <label htmlFor="pwd">Password:</label>
                    <input type= "password" id="pwd"/>
                </div>

                <div>
                    <label id="addr_label" htmlFor="add">Address:</label>
                    <textarea rows= "4" cols= "25" type= "text" id="add"/>
                </div>
                <div className="check-box">
                    <input type="checkbox" id="agree" name="agree" value="Yes" />
                    <label for="agree">I agree to the Terms and Conditions</label>
                </div>
                <div className="button-wrap">
                    <input type = "submit" value = "Submit" onClick={
                        () => {
                            navigate('/');
                        }
                    }></input>
                    <input type = "reset" value = "Reset"></input>
                </div>
            </form>   
        </div>
    </div>
    
    )
}

export default Registration;