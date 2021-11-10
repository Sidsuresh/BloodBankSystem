import './Registration.css'
import {useNavigate} from 'react-router-dom'

const Registration = () =>  {
    const navigate = useNavigate();
    return( 
    <div className='register'>
        <h1>Registration</h1>
        <div className='reg-container'>
            <div className='reg-card'>
                <form name= "reg-form" method= "POST">
                    <p>
                        <label htmlFor="name">Name: 
                            <input type= "text" id="name"/>
                        </label>
                    </p>

                    <p>
                        <label htmlFor="dob">Date of Birth: 
                            <input type= "date" id="dob"/>
                        </label>
                    </p>
                    
                    <p>
                        <label htmlFor= "gen">Gender:</label><br/> 
                        <input type="radio" name="gen" value="Male"/>
                        <label htmlFor="Male" className="radio">Male</label><br/>
                        <input type="radio" name="gen" value="Female"/>
                        <label htmlFor="Female" className="radio">Female</label><br/>
                        <input type="radio" name="gen" value="Others"/>
                        <label htmlFor="Others" className="radio">Others</label>       
                    </p>

                    <p>
                        <label htmlFor="bgp">Blood Group: 
                            <input type= "text" id="bgp"/>
                        </label>
                    </p>

                    <p>
                        <label htmlFor="phn">Phone Number: 
                            <input type= "text" id="phn"/>
                        </label>
                    </p>

                    <p>
                        <label htmlFor="email">Email: 
                            <input type= "text" id="email"/>
                        </label>
                    </p>

                    <p>
                        <label htmlFor="pwd">Password: 
                            <input type= "password" id="pwd"/>
                        </label>
                    </p>

                    <p>
                        <label htmlFor="add">Address: 
                            <textarea rows= "4" cols= "20" type= "text" id="add"/>
                        </label>
                    </p>

                    <p>
                        <input type = "submit" value = "Submit" onClick={
                            () => {
                                navigate('/');
                            }
                        }></input>
                        <input type = "reset" value = "Reset"></input>
                    </p>
        
                </form>
            </div>    
        </div>
    </div>
    
    )
}

export default Registration;