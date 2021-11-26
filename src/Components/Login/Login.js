import './Login.css'
import {useNavigate} from 'react-router-dom'
import useForm from '../useForm';

const Login = ({setIsLoggedIn}) =>  {
    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert('User Logged In!')
        if (data['acnt'] === 'Donor') {
            setIsLoggedIn(true);
            navigate('/user/donor');
        } else if (data['acnt'] === 'Patient') {
            setIsLoggedIn(true);
            navigate('/user/patient');
        } else {
            setIsLoggedIn(true);
            navigate('/user/admin');                                    
        }
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
                message: "Username cannot be empty.",
              },
            },
            pwd: {
                pattern: {
                  value: '^.{1,}$',
                  message: "Password cannot be empty.",
                },
              },
          },
        onSubmit: onSubmit,
        onError: onError,
        initialValues: {
            uname: "",
            pwd: "",
            acnt: "Donor",
        },
        passData: true,
      });

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
                        <input 
                            type="radio" 
                            name="acnt"
                            id="Admin"
                            value="Admin"
                            checked={data['acnt'] === 'Admin'} 
                            onChange={handleChange}                         
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