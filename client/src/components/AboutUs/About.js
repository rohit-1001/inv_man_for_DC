import React from 'react'
import about from '../../assets/about.jpg'
import './About.css'
import { useEffect } from 'react'
const About = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.title = 'Sangrah | About';
    }, [])
    return (
        <div className='adwaitAbout' id='about'>
            <div className='adwaitContainer'>
                <img className='img123' src={about} alt='adwaitAbout' />
                <div className='adwaitCol-2'>
                    <h2>About</h2>
                    <span className='adwaitLine'></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    )
}

export default About
