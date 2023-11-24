import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const signupForm = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/register", user);

      if (res.status === 200) {
        toast.success("User registered successfully");
      } else {
        toast.error("User registration failed" + res.msg);
      }
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.warning(error.response.data.error);
      } else {
        toast.error("Some error occured");
      }
    }
  };
  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <form method="POST">
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            value={user.name}
            name="name"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone1" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPhone1"
            value={user.phone}
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={signupForm}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
