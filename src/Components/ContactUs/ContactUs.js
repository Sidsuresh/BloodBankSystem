import './ContactUs.css'
import {useNavigate} from 'react-router-dom'
import useForm from '../useForm';

const ContactUs = () =>  {
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate('/contact_us');
    }
    const onError = (err) => {
        var msg = ""
        for (const e in err) {
            msg += err[e] + "\n"
        }
        alert(msg)
    }
    const {handleChange, handleSubmit} = useForm({
        validations: {
            name: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Name cannot be empty.",
                },
            },
            phn: {
                pattern: {
                    value: '^.{1,}$',
                    message: "Phone number cannot be empty.",
                },
            },
            email: {
                pattern: {
                  value: '^.{1,}$',
                  message: "Email cannot be empty.",
                },
            },
            mess: {
                pattern: {
                  value: '^.{1,}$',
                  message: "Address cannot be empty.",
                },
              },
          },
        onSubmit: onSubmit,
        onError: onError,
        initialValues: {
            name: "",
            phn: "",
            email: "",
            mess: ""
        },
      });
    
    return( 
    <div className='contact'>
        <h1>Send Us a Message</h1>
        <div className='con-container'>
            <form className='con-card' name= "con-form" method= "POST">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type= "text" id="name" name="name" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="phn">Phone Number:</label>
                    <input type= "text" id="phn" name="phn" onChange={handleChange}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type= "text" id="email" name="email" onChange={handleChange}/>
                </div>

                <div>
                    <label id="mess_label" htmlFor="mess">Message:</label>
                    <textarea rows= "4" cols= "25" type= "text" id="add" name="mess" onChange={handleChange} />
                </div>
                <div className="button-wrap">
                    <input type = "submit" value = "Submit" onClick={handleSubmit}></input>
                    <input type = "reset" value = "Reset"></input>
                </div>
            </form>   
        </div>
    </div>
    
    )
}

export default ContactUs;