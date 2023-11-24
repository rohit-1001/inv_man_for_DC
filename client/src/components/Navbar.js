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
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "./NavbarStyle.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  let menuRef = useRef();
  const { role, setRole } = props.details;

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
    let confirmLogout = window.confirm("Are you sure, you want to log out?");
    if (confirmLogout) {
      if (role === "vendor") {
        try {
          const res = await axios.post("/vendorlogout", {
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
      } else if (role === "company") {
        try {
          const res = await axios.post("/companylogout", {
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
    }
  };
  return (
    <>
      <div className="hero" ref={menuRef}>
        <div className="logo">
          <NavLink to="/codb">
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
        <div className={showMediaIcons ? "inmobileview itemlist" : "itemlist"}>
          <ul className="List">
            <NavLink
              to="/codb"
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
              to="/products"
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
                <FontAwesomeIcon icon={faBox} />
                <li
                  className="listItem"
                  onClick={() => setShowMediaIcons(false)}
                  style={{
                    fontWeight: "600",
                    marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                  }}
                >
                  Products
                </li>
              </div>
            </NavLink>

            {role === "vendor" ? (
              <NavLink
                to="/marketplace"
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
                  <FaShoppingCart />
                  <li
                    className="listItem"
                    onClick={() => setShowMediaIcons(false)}
                    style={{
                      fontWeight: "600",
                      marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                    }}
                  >
                    Marketplace
                  </li>
                </div>
              </NavLink>
            ) : null}
            {/* <NavLink to="/order-history"
              style={({ isActive }) => ({
                color: isActive ? '#466bda' : '#545e6f',
                textDecoration: 'none',
                fontWeight: '500',
                // background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              <div style={{
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "row" : "column",
                alignItems: "center",
              }}>
                <FontAwesomeIcon icon={faHistory} />
                <li className='listItem' onClick={() => setShowMediaIcons(false)} style={{
                  fontWeight: '600',
                  marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                }}>My Orders</li>
              </div>
            </NavLink> */}
            <NavLink
              to="/orders"
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
                <FontAwesomeIcon icon={faClipboardList} />
                <li
                  className="listItem"
                  onClick={() => setShowMediaIcons(false)}
                  style={{
                    fontWeight: "600",
                    marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                  }}
                >
                  Orders
                </li>
              </div>
            </NavLink>
            <NavLink
              to="/copr"
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
                <FontAwesomeIcon icon={faUser} />
                <li
                  className="listItem"
                  onClick={() => setShowMediaIcons(false)}
                  style={{
                    fontWeight: "600",
                    marginLeft: window.innerWidth <= 768 ? "10px" : "0px",
                  }}
                >
                  Profile
                </li>
              </div>
            </NavLink>
            <NavLink
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

export default Navbar;
