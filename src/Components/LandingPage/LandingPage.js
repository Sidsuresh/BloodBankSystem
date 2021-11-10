// import { NavLink } from 'react-router-dom'
import './LandingPage.css'
import {Link} from 'react-router-dom'

const SignUp = () =>  {
    return( 
    <div className='land-container'>
        <div className='card'>
            <p>If you are a New User ?</p>

            <Link to="/signup" className="btn">Sign up</Link>
        </div>
        <div className='card'>
            <p>If you are an Existing User ?</p>
            <Link to="/login" className="btn">Login</Link>
        </div>
    </div>
    )
}

export default SignUp;