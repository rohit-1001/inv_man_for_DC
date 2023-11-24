import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import companyLogo from "../assets/logo.png";
import signin from "../assets/signin.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { useRef } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons"; // Dashboard
import { faBox } from "@fortawesome/free-solid-svg-icons"; // Products
import { faHistory } from "@fortawesome/free-solid-svg-icons"; // History
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"; // Orders
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Logout
import axios from "axios";
import "./NavbarStyle.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const Navbar3 = (props) => {
  const navigate = useNavigate();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowMediaIcons(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure, you want to log out?");
    if (confirmLogout) {
      const { setRole } = props.details;
      try {
        const res = await axios.post("/adminlogout", {
          withCredentials: true,
        });

        if (res.status === 200) {
          toast.info(res.data.msg);
          setRole("visitor");
          navigate("/login");
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
  return (
    <>
      <div className="hero" ref={menuRef}>
        <div className="logo">
          <NavLink to="/">
            {" "}
            <div>
              <img
                src={companyLogo}
                alt="Logo Here"
                className="logo1"
                style={{
                  width: "200px",
                  // border: "2px solid red"
                }}
              />
            </div>
          </NavLink>
        </div>
        <div
          className={showMediaIcons ? "inmobileview itemlist" : "itemlist"}
          style={{
            width: "400px",
            // border: "2px solid red"
          }}
        >
          <ul className="List">
            <NavLink
              to="/adminDashboard"
              style={({ isActive }) => ({
                color: isActive ? "#466bda" : "#545e6f",
                textDecoration: "none",
                fontWeight: "500",
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: window.innerWidth <= 768 ? "row" : "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faTachometerAlt} />
                <li
                  className="listItem"
                  onClick={() => setShowMediaIcons(false)}
                  style={{
                    fontWeight: "600",
                    marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                  }}
                >
                  Dashboard
                </li>
              </div>
            </NavLink>
            <NavLink
              to="/logout"
              onClick={logout}
              style={({ isActive }) => ({
                color: isActive ? "#466bda" : "#545e6f",
                textDecoration: "none",
                fontWeight: "500",
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: window.innerWidth <= 768 ? "row" : "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <li
                  className="listItem"
                  onClick={() => setShowMediaIcons(false)}
                  style={{
                    fontWeight: "600",
                    marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                  }}
                >
                  Logout
                </li>
              </div>
            </NavLink>

            {/* <a href="https://www.njindiaonline.in/cdesk/login.fin" target="_blank" rel="noreferrer"><li className='listItem login' onClick={() => setShowMediaIcons(false)}>LOG IN</li></a> */}
          </ul>
        </div>

        <div
          className="hamburger-menu"
          onClick={() => setShowMediaIcons(!showMediaIcons)}
        >
          <GiHamburgerMenu className="hamburgerlines" />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar3;
