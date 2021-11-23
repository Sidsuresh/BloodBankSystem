import './Login.css'
import {useNavigate} from 'react-router-dom'
import useForm from '../useForm';

const Login = ({setIsLoggedIn, accountType, setAccountType}) =>  {
    const navigate = useNavigate();
    const onSubmit = () => {
        alert('User submitted!')
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
    const {data, handleChange, handleSubmit} = useForm({
        onSubmit: onSubmit,
        initialValues: { // used to initialize the data
          acnt: accountType,
        },
      });

    const handleAccountChange = (e) => {
        setAccountType(e.target.value)
        handleChange(e)
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
                            id="Donor"
                            value="Donor" 
                            checked={accountType === 'Donor'} 
                            onChange={handleAccountChange}
                        />
                        <label htmlFor="Donor" className="radio">Donor</label><br/>
                        <input 
                            type="radio" 
                            name="acnt"
                            id="Patient"
                            value="Patient"
                            checked={accountType === 'Patient'} 
                            onChange={handleAccountChange}                         
                        />
                        <label htmlFor="Patient" className="radio">Patient</label><br/> 
                        <input 
                            type="radio" 
                            name="acnt"
                            id="Admin"
                            value="Admin"
                            checked={accountType === 'Admin'} 
                            onChange={handleAccountChange}                         
                        />
                        <label htmlFor="Admin" className="radio">Admin</label><br/>  
                    </div>
                    
                    <div>
                        <label htmlFor="uname">Username:</label>
                        <input type= "text" id="uname" name="uname" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="pwd">Password:</label>
                        <input type= "password" id="pwd" name="pwd" onChange={handleChange}/>
                    </div>

                    <div className="button-wrap">
                        <input type = "submit" value = "Login" onClick= {handleSubmit}></input>
                        <input type = "reset" value = "Reset"></input>
                    </div>
                </form>   
            </div>
        </div>
    )
}

export default Login;