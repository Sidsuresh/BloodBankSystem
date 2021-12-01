import './Login.css'
import {useNavigate} from 'react-router-dom'
import useForm from '../useForm';

import db from '../../firebase-config'
import { ref, child, get } from "firebase/database";

const Login = ({setIsLoggedIn, setUsername, setAccType}) =>  {
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const dbRef = ref(db);
        get(child(dbRef, "users/"+ data['uname'])).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                var user_data = snapshot.val();
                if (user_data['pwd'] === data['pwd'] && user_data['acnt'] === data['acnt']) {
                    alert('User Logged In!')
                    setUsername(data['uname']);
                    setAccType(data['acnt']);
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
                } else {
                    alert('Username, account type or password not correct !!!');
                }
            } else {
                alert('Username doesn\'t exist !!!');
            }
        }).catch((error) => {
            console.error(error);
        });
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