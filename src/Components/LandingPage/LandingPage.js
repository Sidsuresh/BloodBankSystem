// import { NavLink } from 'react-router-dom'
import './LandingPage.css'

const SignUp = () =>  {
    return( 
    <div className='land-container'>
        <div className='card'>
            <p>If you are a New User?</p>
            <button id="signup">Sign Up</button>
        </div>
        <div className='card'>
            <p>If you are an Existing User?</p>
            <button id="login">Log In</button>
        </div>
    </div>
    )
}

export default SignUp;