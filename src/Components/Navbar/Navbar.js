import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () =>  {
    return( 
    <div className='headerContainer'>
        <header>
            <NavLink to='/' activeClassName="is_active" exact={true}><h1 className="header_title">Sage</h1></NavLink>
            <nav>
                <ul className="nav_links">
                    <li><NavLink to='/contact_us' activeClassName="is_active" exact={true}>Contact Us</NavLink></li>
                    <li><NavLink to='/about_us' activeClassName="is_active" exact={true}>About Us</NavLink></li>
                </ul>
            </nav>
        </header>
    </div>
    )
}

export default Navbar;