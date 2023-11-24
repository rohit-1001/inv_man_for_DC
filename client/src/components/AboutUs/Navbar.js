import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './images/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [scroll, setScroll] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
        return () => {
            window.removeEventListener('scroll', changeNav);
        };
    }, []);

    return (
        <div className={scroll ? 'header active' : 'header'}>
            <nav className='navbar'>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (
                        <FaTimes size={30} style={{ color: '#ffffff' }} />
                    ) : (
                        <FaBars size={30} style={{ color: '#ffffff' }} />
                    )}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <a href='#about' onClick={closeMenu}>
                            About
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='#testimonials' onClick={closeMenu}>
                            Testimonials
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='#demo' onClick={closeMenu}>
                            Demo
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
