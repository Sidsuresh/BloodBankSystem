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
                <div className='login-card'>
                    <form name= "login-form" method= "POST">
                        <p>
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
                        </p>
                        
                        <p>
                            <label htmlFor="uname">Username: 
                                <input type= "text" id="uname"/>
                            </label>
                        </p>

                        <p>
                            <label htmlFor="pwd">Password: 
                                <input type= "password" id="pwd"/>
                            </label>
                        </p>

                        <p>
                            <input type = "submit" value = "Login" onClick= {
                                () => {
                                    if (accountType === 'Donor') {
                                        setIsLoggedIn(true);
                                        navigate('/user/donor');
                                    } else {
                                        navigate('/');
                                    }
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

export default Login;