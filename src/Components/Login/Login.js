import './Login.css'
import {useNavigate} from 'react-router-dom'

const Login = ({setIsLoggedIn, accountType, setAccountType}) =>  {
    const navigate = useNavigate();
    const handleAccountChange = (e) => {
        setAccountType(e.target.value)
    }
    return( 
        <div className='login'>
            <h1>Log In</h1>
            <div className='login-container'>
                <form className='login-card' name= "login-form" method= "POST">
                    <div className="radio-buttons">
                        <label htmlFor= "acnt">Account Type:</label><br/> 
                        <input 
                            type="radio" 
                            name="acnt" 
                            value="Donor" 
                            checked={accountType === 'Donor'} 
                            onChange={handleAccountChange}
                        />
                        <label htmlFor="Donor" className="radio">Donor</label><br/>
                        <input 
                            type="radio" 
                            name="acnt" 
                            value="Patient"
                            checked={accountType === 'Patient'} 
                            onChange={handleAccountChange}                         
                        />
                        <label htmlFor="Patient" className="radio">Patient</label><br/> 
                        <input 
                            type="radio" 
                            name="acnt" 
                            value="Admin"
                            checked={accountType === 'Admin'} 
                            onChange={handleAccountChange}                         
                        />
                        <label htmlFor="Admin" className="radio">Admin</label><br/>  
                    </div>
                    
                    <div>
                        <label htmlFor="uname">Username:</label>
                        <input type= "text" id="uname"/>
                    </div>

                    <div>
                        <label htmlFor="pwd">Password:</label>
                        <input type= "password" id="pwd"/>
                    </div>

                    <div className="button-wrap">
                        <input type = "submit" value = "Login" onClick= {
                            () => {
                                if (accountType === 'Donor') {
                                    setIsLoggedIn(true);
                                    navigate('/user/donor');
                                } else if (accountType === 'Patient') {
                                    setIsLoggedIn(true);
                                    navigate('/user/patient');
                                } else {
                                    setIsLoggedIn(true);
                                    navigate('/user/admin');                                    
                                }
                            }
                        }></input>
                        <input type = "reset" value = "Reset"></input>
                    </div>
                </form>   
            </div>
        </div>
    )
}

export default Login;