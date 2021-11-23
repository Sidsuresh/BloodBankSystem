import './ContactUs.css'
import {useNavigate} from 'react-router-dom'

const ContactUs = () =>  {
    const navigate = useNavigate();
    return( 
    <div className='contact'>
        <h1>Send Us a Message</h1>
        <div className='con-container'>
            <form className='con-card' name= "con-form" method= "POST">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type= "text" id="name"/>
                </div>

                <div>
                    <label htmlFor="phn">Phone Number:</label>
                    <input type= "text" id="phn"/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type= "text" id="email"/>
                </div>

                <div>
                    <label id="mess_label" htmlFor="add">Message:</label>
                    <textarea rows= "4" cols= "25" type= "text" id="add"/>
                </div>
                <div className="button-wrap">
                    <input type = "submit" value = "Submit" onClick={
                        () => {
                            navigate('/contact_us');
                        }
                    }></input>
                    <input type = "reset" value = "Reset"></input>
                </div>
            </form>   
        </div>
    </div>
    
    )
}

export default ContactUs;