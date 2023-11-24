import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signin from "../assets/signin.png";
import signup from "../assets/signup.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title = "Sangrah | Login";
  }, []);
  const [userDataSignUp, setUserDataSignUp] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    role: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange_sign_up = (event) => {
    setUserDataSignUp({
      ...userDataSignUp,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange_sign_in = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const onclick_sign_in_btn = () => {
    const container = document.querySelector(".container123");
    container.classList.remove("sign-up-mode");
  };
  const onclick_sign_in_btn2 = () => {
    const container = document.querySelector(".container123");
    container.classList.remove("sign-up-mode2");
  };
  const onclick_sign_up_btn = () => {
    const container = document.querySelector(".container123");
    container.classList.add("sign-up-mode");
  };
  const onclick_sign_up_btn2 = () => {
    const container = document.querySelector(".container123");
    container.classList.add("sign-up-mode2");
  };
  // const onsubmit = (event) => {
  //   event.preventDefault();
  //   userData.setUserData(userData.userInfo);
  //   onclick_sign_in_btn();
  //   onclick_sign_in_btn2();
  // };
  // const onsubmit1 = (event) => {
  //   event.preventDefault();
  //   let username = event.target.elements["sign_in_username"].value;
  //   let password = event.target.elements["sign_in_password"].value;

  //   if (
  //     userData.userInfo.username === username &&
  //     userData.userInfo.password === password
  //   ) {
  //     userData.setLoginStatus("Profile");
  //     navigate("/Dev-Wizards-NGO.github.io");
  //   } else {
  //     alert("Incorrect username or password!");
  //   }
  // };
  const navigate = useNavigate();
  const loginForm = async (event) => {
    event.preventDefault();
    const { role } = event.target;
    if (role.value === "company") {
      try {
        const res = await axios.post("/companysignin", userData);
        if (res.status !== 200) {
          toast.error(res.data.msg);
        } else {
          toast.success(res.data.msg);
          const { setRole } = props.details;
          setRole("company");
          navigate("/codb");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    } else if (role.value === "vendor") {
      try {
        const res = await axios.post("/vendorsignin", userData);
        if (res.status !== 200) {
          toast.error(res.data.msg);
        } else {
          toast.success(res.data.msg);
          const { setRole } = props.details;
          setRole("vendor");
          navigate("/codb");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    }
  };
  const signupForm = async (event) => {
    event.preventDefault();
    const { role } = event.target;
    setUserDataSignUp({
      ...userDataSignUp,
      role: role.value,
    });
    // setTimeout(() => {
    // }, 2000);-
    if (role.value === "company") {
      try {
        const res = await axios.post("/companyregister", userDataSignUp);

        if (res.status === 200) {
          toast.success("User registered successfully");
        } else {
          toast.error("User registration failed" + res.msg);
        }
        onclick_sign_in_btn();
        onclick_sign_in_btn2();
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    } else if (role.value === "vendor") {
      try {
        const res = await axios.post("/vendorregister", userDataSignUp);

        if (res.status === 200) {
          toast.success("User registered successfully");
        } else {
          toast.error("User registration failed" + res.msg);
        }
        onclick_sign_in_btn();
        onclick_sign_in_btn2();
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    }
  };
  return (
    <>
      {/* <form method='POST'>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" value={userData.email} name='email' onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" value={userData.password} name='password' onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={loginForm}>Submit</button>
        </form> */}
      <div className="login_body">
        <div className="container123">
          <div className="signin-signup">
            <form onSubmit={loginForm} className="sign-in-form">
              <h2 className="title123">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange_sign_in}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  value={userData.password}
                  onChange={handleChange_sign_in}
                  required
                />
              </div>
              <div className="register-checkboxes">
                <span>Sign In as: </span>
                <span>
                  <input
                    type="radio"
                    name="role"
                    id="register-checkbox-11"
                    value="company"
                  />
                  <label htmlFor="register-checkbox-11">Company</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="role"
                    id="register-checkbox-22"
                    value="vendor"
                  />
                  <label htmlFor="register-checkbox-22">Vendor</label>
                </span>
              </div>
              <button type="submit" value="Login" className="btn123">
                Sign In
              </button>
              <p className="social-text123">Or Sign in to our Community</p>
              <div className="social-media123">
                <a
                  target="_blank"
                  href="https://www.facebook.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.google.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-google"></i>
                </a>
                <a
                  target="_blank"
                  href="https://in.linkedin.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <p className="account-text">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  id="sign-up-btn2"
                  onClick={onclick_sign_up_btn2}
                >
                  Sign up
                </Link>
              </p>
            </form>
            <form onSubmit={signupForm} className="sign-up-form">
              <h2 className="title123">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-file-signature"></i>
                <input
                  type="text"
                  placeholder="Name"
                  id="sign_up_name"
                  onChange={handleChange_sign_up}
                  name="name"
                  value={userDataSignUp.name}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  id="sign_up_email"
                  onChange={handleChange_sign_up}
                  name="email"
                  value={userDataSignUp.email}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="number"
                  placeholder="Phone"
                  id="sign_up_phone"
                  onChange={handleChange_sign_up}
                  name="phone"
                  value={userDataSignUp.phone}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  id="sign_up_password"
                  onChange={handleChange_sign_up}
                  name="password"
                  value={userDataSignUp.password}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="sign_up_cpassword"
                  onChange={handleChange_sign_up}
                  name="cpassword"
                  value={userDataSignUp.cpassword}
                  required
                />
              </div>
              <div className="register-checkboxes">
                <span>Register As: </span>
                <span>
                  <input
                    type="radio"
                    name="role"
                    id="register-checkbox-1"
                    value="company"
                    onChange={(e)=>{
                      setUserDataSignUp({
                        ...userDataSignUp,
                        role: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="register-checkbox-1">Company</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="role"
                    id="register-checkbox-2"
                    value="vendor"
                    onChange={(e)=>{
                      setUserDataSignUp({
                        ...userDataSignUp,
                        role: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="register-checkbox-2">Vendor</label>
                </span>
              </div>
              <button type="submit" value="Sign up" className="btn123">
                Sign Up
              </button>
              <p className="social-text123">Or Sign in with social platform</p>
              <div className="social-media123">
                <a
                  target="_blank"
                  href="https://www.facebook.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  target="_blank"
                  href="https://www.google.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-google"></i>
                </a>
                <a
                  target="_blank"
                  href="https://in.linkedin.com/"
                  className="social-icon123"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <p className="account-text">
                Already have an account?{" "}
                <Link
                  to="/Dev-Wizards-NGO.github.io/signup_login"
                  id="sign-in-btn2"
                  onClick={onclick_sign_in_btn2}
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content123">
                <h3>Member of our Community?</h3>
                <p>
                  By logging in, you become part of our mission to create a more
                  efficient and sustainable supply chain. Together, we can make
                  a lasting impact on the world.
                </p>
                <button
                  className="btn123"
                  id="sign-in-btn"
                  onClick={onclick_sign_in_btn}
                >
                  Sign in
                </button>
              </div>
              <img src={signin} alt="" className="image" />
            </div>
            <div className="panel right-panel">
              <div className="content123">
                <h3>New to our Community?</h3>
                <p>
                  Join our community and help us create a more efficient and
                  sustainable world through better inventory management.
                </p>
                <button
                  className="btn123"
                  id="sign-up-btn"
                  onClick={onclick_sign_up_btn}
                >
                  Sign up
                </button>
              </div>
              <img src={signup} alt="" className="image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
