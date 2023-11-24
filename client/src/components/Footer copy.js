import React from 'react'
import "./FooterStyle.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import footerimg from "../assets/footerdiv.png"
import { NavLink } from 'react-router-dom'; 
const Footer = () => {
    return (
        <>  
            <div>
                <img src={footerimg} alt="" className='footerimg'/>
            </div>
            <div className="mainFooter123">

                <div className="blocks123">

                    <div className="block1123">
                        <div className="tab1123">
                            <div className="address123">
                                {/* <p className="Addresshead"><b>OFFICE ADDRESS</b></p> */}
                                <p className="fullAddress123">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, veritatis saepe. Pariatur accusamus aliquid nesciunt at, deserunt sed perferendis explicabo error veritatis? Expedita voluptas excepturi debitis facere vel! Voluptatibus, modi.</p>
                            </div>
                            <div className="implinks123">
                                <p className="linkshead123"><b>IMPORTANT LINKS</b></p>
                                <ul>
                                    <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'black' : 'black', })}><p id='footlink123'>Home</p></NavLink></li>
                                    <li><NavLink to="/app/about" style={({ isActive }) => ({ color: isActive ? 'black' : 'black', })}><p id='footlink123'>About Us</p></NavLink></li>
                                    <li><NavLink to="/app/features" style={({ isActive }) => ({ color: isActive ? 'black' : 'black', })}><p id='footlink123'>Features</p></NavLink></li>
                                </ul>
                            </div>
                        {/* </div>
                        <div className="tab1"> */}
                            <div className="contactDetails123">
                                <p className="contact1123"><b>CONTACT US</b></p>
                                <div className="contactemail123">
                                    <div>
                                        <MailOutlineIcon></MailOutlineIcon>
                                    </div>
                                    <div>
                                        <a className = "iamemail123" href="mailto: contact@sangrah.com" target="_blank" rel="noreferrer">contact@sangrah.com</a>
                                    </div>
                                </div>
                                <div className="contactemail123">
                                    <div>
                                        <CallOutlinedIcon></CallOutlinedIcon>
                                    </div>
                                    <div>
                                        <a className = "iamemail123" href="tel: +91-992-034-1878">1234567890</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div className="footerbelow123">
                <div className="footerbelowinside123">© SANGRAH - All Rights Reserved.</div>
            </div>

            {/* <Outlet/> */}
        </>
    )
}

export default Footer