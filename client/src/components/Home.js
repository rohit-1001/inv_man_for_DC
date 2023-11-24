import React from 'react'
import "./HomeStyles.css"
import rightsecimg from "../assets/hometrial2.png"
import verficiation from "../assets/id-removebg-preview.png"
import results from "../assets/online-exam.svg"
import createexam from "../assets/hometrial4.avif"
import homeimg1 from "../assets/homeimg1.png"
import testi1 from "../assets/testi1.jpg"
import testi2 from "../assets/testi2.jpg"
import testi3 from "../assets/testi3.jpg"
import Footer from './Footer'
import { useEffect } from 'react'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
// import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Home';
  }, [])
  return (
    <>
      <div className="sec1123">
        <Fade bottom>
          <div className="leftsec123">
            <h2>Efficient Inventory Management at Your Fingertips</h2>
            <div className="seewhy123">Discover why businesses prefer Sangrah over other inventory management solutions.</div>
            <div className="seewhyinfo123">"Sangrah is my go-to inventory management platform. It allows me to streamline and optimize my inventory processes with ease, free from any hiccups. Sangrah's user-friendly interface simplifies the inventory management process, making it the ultimate choice for my business. Our company relies on Sangrah for all our inventory needs due to its efficiency and round-the-clock support."</div>
          </div>
        </Fade>
        <Fade bottom>
          <div className="rightsec123">
            <img src={rightsecimg} alt="" id="firstimg123" />
          </div>
        </Fade>
      </div>

      <div>
        <img src={homeimg1} alt="" className='footerimg' />
      </div>
      <div className="outerhead11">
        <Zoom>
          <div id='heading111'>Efficient Inventory Management</div>
        </Zoom>
      </div>
      <div className="sec2111">
        <div className="sec2div1222">
          <Fade left>
            <div className="left123">
              <h3>Manage Inventory</h3>
              <div className="leftinfo123">
                <ul>
                  <li>Efficiently organize and track your inventory using our intuitive management tools.</li>
                  <li>Add and categorize your products, set stock levels, and keep an eye on restocking needs.</li>
                  <li>Generate reports to analyze inventory trends and make informed business decisions.</li>
                </ul>
              </div>
            </div>
          </Fade>
          <Fade right>
            <div className="right123">
              <img src={createexam} alt="" id="secondimg123" />
            </div>
          </Fade>
        </div>


        <div className="sec2div1222">
          <Fade left>
            <div className="right123">
              <img src={verficiation} alt="" id="thirdimg123" />
            </div>
          </Fade>
          <Fade right>
            <div className="left123">
              <h3>Verify Inventory and Begin Management</h3>
              <div className="leftinfo123">
                <ul>
                  <li>Efficiently verify your inventory within 60 seconds.</li>
                  <li>Access 24/7/365 customer support for any assistance.</li>
                  <li>Utilize advanced inventory management software.</li>
                </ul>
              </div>
            </div>
          </Fade>
        </div>
        <div className="sec2div1222">
          <Fade left>
            <div className="left123">
              <h3>Review  Updates</h3>
              <div className="leftinfo123">
                <ul>
                  <li>Login to access your inventory updates on our platform.</li>
                  <li>Check stock levels and receive feedback or notifications.</li>
                  <li>Use these updates to guide your future inventory management and achieve your business goals.</li></ul>
              </div>
            </div>
          </Fade>
          <Fade right>
            <div className="right123">
              <img src={results} alt="" id="forthimg123" />
            </div>
          </Fade>
        </div>

      </div >
      <Zoom>
        <div id='heading211'>Testimonials</div>
      </Zoom>
      <Slide bottom cascade>
        <div className="outertestimonials123">
          <div className="container1111">
            <div className="testimonial-box999">
              <div className="testimonial123">
                <i className="fas123 fa-quote-right"></i>
                <span className="testimonial-text123">"Efficient inventory management has been a game-changer for our business. A partnership with Sangrah has been one of our best decisions."</span>
                <div className="testimonial-user123">
                  <img src={testi1} alt="user-img" className="user-img123" />
                  <div className="user-info123">
                    <span className="user-name123">Brian Marchman</span>
                    <div className="user-job-details123">
                      <span className="user-job">Business Owner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="container1111">
          <div className="testimonial-box999">
            <div className="testimonial123">
              <i className="fas123 fa-quote-right"></i>
              <span className="testimonial-text123">"Revolutionizing our operations, Sangrah's inventory management has redefined success for our company. A trusted ally, they've unlocked new horizons for us. Our growth story is incomplete without their invaluable support."</span>
              <div className="testimonial-user123">
                <img src={testi2} alt="user-img" className="user-img123" />
                <div className="user-info123">
                  <span className="user-name123">Brian Marchman</span>
                  <div className="user-job-details123">
                    <span className="user-job">Business Owner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="container1111">
            <div className="testimonial-box999">
              <div className="testimonial123">
                <i className="fas123 fa-quote-right"></i>
                <span className="testimonial-text123">"The transformation we've witnessed with Sangrah's inventory management is nothing short of remarkable. Their partnership is a strategic asset, propelling our business forward. In the journey of success, they've been our steadfast companion."</span>
                <div className="testimonial-user123">
                  <img src={testi3} alt="user-img" className="user-img123" />
                  <div className="user-info123">
                    <span className="user-name123">Brian Marchman</span>
                    <div className="user-job-details123">
                      <span className="user-job">Business Owner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
      <Footer />
    </>
  )
}

export default Home
