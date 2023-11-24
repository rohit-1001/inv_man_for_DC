// import React from 'react'
// import Navbar from './Navbar'
// import About from './About'
// import Testimonials from './Testimonials'
// import Demo from './Demo'
// import Picture from './Picture'

// function HomeAbout() {
//   return (
//     <div>
//     {/* <Picture/> */}
//       {/* <Navbar /> */}
//       <About />
//       {/* <Testimonials /> */}
//       <Demo />
//     </div>
//   );
// }

// export default HomeAbout;


// ======================================================================================

import React from 'react'
import leftimg from "./images/download.png"
import whatis from "./images/QualityArtboard16@2x-8-2x.png"
import "./AboutStyles.css"
import whatisupper from "./images/whatisdivimg.png"
import whatisdownimg from "./images/whatisdownimg.png"
import founders from "./images/founders.png"
import homeimg1 from "./images/homeimg1.png"
import Footer from "../../components/Footer"
import { useEffect } from 'react'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
// import Pulse from 'react-reveal/Pulse';
// import Bounce from 'react-reveal/Bounce';

export default function HomeAbout() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | About';
  }, [])
  return (
    <>
      <div>
        <Fade bottom>
          <div className="sec1" id='aboutsec1'>
            <div className="rightsec">
              <img src={leftimg} alt="" id="firstimg" />
            </div>
            <div className="leftsec">
              <h2>Who is Sangrah?</h2>
              <div className="seewhy">We simplify inventory management, making it efficient and hassle-free.</div>
              <div className="seewhyinfo">There’s a belief that inventory management solutions are simply there to track products and materials. But our mission is much broader than that. We understand that there's a better way to handle inventory.
                Our approach to inventory management is to do what’s good for businesses and their growth.
                <br />That's why we've dedicated ourselves to simplifying the inventory management process, making it efficient and straightforward. The result is a solution that brings organization, efficiency, confidence, and positive outcomes to the inventory management experience.</div>
            </div>

          </div>
        </Fade>
        <div>
          <img src={homeimg1} alt="" className='footerimg' />
        </div>
        <div className="sec1" id='aboutsec2'>

          <Slide left>
            <div className="leftsec">
              <h2>What is Sangrah?</h2>
              {/* <div className="seewhy">We make online proctoring simple, easy, and human.</div> */}
              <div className="seewhyinfo" id='absec2left'>
                Sangrah is an innovative platform designed to help businesses efficiently manage their inventory. Our platform provides intuitive inventory management tools, allowing you to organize your products, set stock levels, and monitor restocking requirements with ease. Detailed reports and analytics offer valuable insights into inventory trends, enabling data-driven decision-making for your business. Sangrah is a comprehensive solution that empowers businesses to streamline and optimize their inventory management securely and efficiently.
              </div>
            </div>
          </Slide>
          <Slide right>
            <div className="rightsec" id='absec2right'>
              <img src={whatis} alt="" id="thirdimg" />
            </div>
          </Slide>
        </div>
        <div>
          <img src={homeimg1} alt="" className='footerimg' style={{ transform: "rotateX(180deg)" }} />
        </div>

        <div className="outerhead" id='ourstoryhead'>
          <Fade bottom>
            <div id='heading1'>Our Story</div>
          </Fade>
        </div>
        <div className="sec1" id='ourstory'>
          <div className="rightsec">
            <Fade left>
              <img src={founders} alt="" id="firstimg" />
            </Fade>
          </div>
          <div className="leftsec" id='founders'>
            <Fade bottom>
              <h2>Our Founders</h2>
              <div className="seewhyinfo">
                Sangrah was founded by four dedicated individuals: Akash, Adwait, Mahesh, and Rohit. As students, they recognized the complexities of managing inventory and identified the need for a platform that could simplify and optimize the process. Despite facing challenges and having limited experience in inventory management software, they wholeheartedly committed to creating a user-friendly and efficient platform.
                Their dedication to innovation, business, and customer satisfaction continues to drive Sangrah's mission. They aspire to keep refining and enhancing the platform to meet the evolving needs of businesses in the future.
              </div>
            </Fade>
          </div>


        </div>
      </div >
      <Footer />
    </>
  )
}
