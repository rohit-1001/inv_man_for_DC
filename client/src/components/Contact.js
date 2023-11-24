import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Contact = () => {
  const [contact, setcontact] = useState({
    name:"",
    email:"",
    phone:"",
    msg:""
  })
  const fetchContact = async () => {
      try {
        const data = await axios.get('/getcontact',{
          withCredentials: true
        });

        setcontact({...contact,
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || ""
      })
        if(data.status!==200){
          throw new Error('No login found')
        }
      } catch (error) {
        // Kept purposely to avoid empty catch error if it exists
        console.log(error)
      }
  }

  useEffect(() => {
    fetchContact();
  },[])

  const handleChange = (event) => {
    setcontact({...contact, [event.target.name]:event.target.value})
  }

  const contactForm = async (event) => {
    event.preventDefault()
    const res = await axios.post('/contactform', contact)

    if(res.status!==200){
      toast.error("Form submission failed")
    }
    else{
      toast.success("Form submitted successfully")
    }

  }

  return (
    <div>
      <h1>Contact page</h1>
      <form method="POST">
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={contact.name} name='name' onChange={handleChange}/>
      </div>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={contact.email} name='email' onChange={handleChange}/>
      </div>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
          <input type="number" className="form-control" id="exampleInputEmail1" value={contact.phone} name='phone' onChange={handleChange}/>
      </div>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Message</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={contact.msg} name='msg' onChange={handleChange}/>
      </div>
        <input type="submit" value="Submit" onClick={contactForm}/>
      </form>
    </div>
  )
}

export default Contact
