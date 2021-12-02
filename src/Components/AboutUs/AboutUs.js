import './AboutUs.css'
import Sid from './Photo.jpg'
import Gautham from './IMG_1010.jpeg'

const AboutUs = () =>  {
    return( 
    <div className='about-container'>
        <div className='card'>
            <img src={Sid} alt="sid_image" height='250px'/>
            <p>Siddharth Suresh Nair</p>
            <p>19BCE0826</p>
        </div>
        <div className='card'>
            <img src={Gautham} alt="sid_image" height='250px'/>
            <p>Gautham Sreekumar</p>
            <p>19BCE0818</p>
        </div>
    </div>
    )
}

export default AboutUs;