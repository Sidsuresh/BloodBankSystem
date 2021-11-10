import './Login.css'
import {useNavigate} from 'react-router-dom'

const Login = ({setIsLoggedIn}) =>  {
    const navigate = useNavigate();
    return( 
        <div className='login'>
            <h1>Log In</h1>
            <div className='login-container'>
                <div className='login-card'>
                    <form name= "login-form" method= "POST">
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
                            <input type = "submit" value = "Submit" onClick={
                                () => {
                                    setIsLoggedIn(true);
                                    navigate('/user/donor');
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