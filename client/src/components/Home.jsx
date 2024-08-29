import React from 'react';
import { useState } from 'react'
// import '../css/style.css'
import { useEffect } from 'react';
import { useRef } from 'react';
import Swiper from 'swiper';

function App() {

  useEffect(() => {
    // Handle scroll event
    const handleScroll = () => {
      const header = document.querySelector('header');
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      if (scrollPosition > 0) {   
        header.classList.add('scrolled');
      } else {   
        header.classList.remove('scrolled');
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Handle DOMContentLoaded event
    const handleDOMContentLoaded = () => {
      const element = document.querySelector('.open-animate');
      if (element) {
        element.classList.add('open-animate');
      }
    };

    // Call DOMContentLoaded handler on component mount
    handleDOMContentLoaded();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
    <header className="header">
        <a href="index.html"><img src="/img/ocp.png" style={{ height: "60px" , width: "250px" }} alt="image" /></a>
        <nav className="navbar">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#blog">blog</a>
            <a href="../login.html">Login</a>
        </nav>
        <i className="fa-solid fa-bars"></i>
    </header>

    <div className="home" id="home">
        <div className="swiper home-slid">
            <div className="swiper-wrapper">

                <div className="swiper-slide box">
                    <div className="image">
                        <img src="/img/hero-carousel/ocp1.jpg" style={{ width: "100%" }} alt="image" />
                    </div>
                    <div className="content">
                        <h3>Our vision for a sustainable future</h3>
                        <p>thanks to our expertise in extraction</p>
                        <a href="#" className="btn">start</a>
                    </div>
                </div>

                <div className="swiper-slide box">
                    <div className="image">
                        <img src="/img/hero-carousel/ocp2.webp" style={{ height: "800px" , width: "100%" }} alt="image" />
                    </div>
                    <div className="content">
                        <h3>Find out how we create </h3>
                        <p>sustainable growth for all</p>
                        <a href="#" className="btn">start</a>
                    </div>
                    
                </div>

                <div className="swiper-slide box">
                    <div className="image">
                        <img src="/img/hero-carousel/ocp3.jpg" style={{ width: "100%", height: "800px" }} alt="image" />
                    </div>
                    <div className="content">
                        <h3>the best contribution to your business</h3>
                        <p>Our mission is to help you develop your industry</p>
                        <a href="#" className="btn">start</a>
                    </div>
                    
                </div>


            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
    </div>


    <section className="about" id="about">
        <div className="heading">
            <h2>About</h2>
            <p>Learn more about the OCP group</p>
            <div></div>
        </div>

        <div className="box">
            <div className="about-image">
                <img src="/img/about/OCP-3.jpg" style={{ width: "500px" }} alt="image" />
            </div>
            <div className="content">
                <h3>What is phosphate?</h3>
                <div>- An essential source of nutrients</div>
                <div>- it's the natural source of phosphorus</div>
                <div>- it's used in several products</div>
                <div>- it's transformed to produce phosphorus</div>
            </div>
        </div>
    </section>


    <section className="services" id="services">
        <div className="heading">
            <h2>our services</h2>
            <div></div>
        </div>
    
        <div className="row">
            <div className="box">
                <i className="fa-solid fa-industry"></i>
                <h3>Costumazion process</h3>
                <p>Our fertilizers are tailor-made to adapt to the specific needs of different types of soil, helping farmers follow the principles of "4R" nutrient management - the right fertilizer, in the right quantity, at the right time and good Place - With the best levels of precision never known.</p>
            </div>
    
            <div className="box">
                <i className="fa-solid fa-seedling"></i>
                <h3>Fertilizers</h3>
                <p>Our fertilizers are tailor-made to adapt to the specific needs of different soil types, helping farmers follow the principles of "4R" nutrient management.</p>
            </div>
    
            <div className="box">
                <i className="fa-solid fa-map"></i>
                <h3>Soil cartography</h3>
                <p>Our mobile laboratories map the quality of the soil locally. The goal is to assess nutrient levels and know what the soil needs.</p>
            </div>
    
            <div className="box">
                <i className="fa-solid fa-tractor"></i>
                <h3>Local production</h3>
                <p>We share our knowledge on the optimal use of fertilizers to preserve resources and promote sustainable agriculture.</p>
            </div>
    
            <div className="box">
                <div className="content">
                    <i className="fa-solid fa-lightbulb"></i>
                    <h3>Innovative solutions</h3>
                </div>
                <p>OUR Production Systems, our Investments in New Technologies and our Partnerships with countries and their local reference organizations have enabled us to produce customizable and adaptable fertilizers.</p>
            </div>
    
            <div className="box">
                <div className="content">
                    <i className="fa-solid fa-headset"></i>
                    <h3>24/7 Support</h3>
                </div>
                <p>We provide around-the-clock support to ensure that your needs are met at any time.</p>
            </div>
        </div>
    </section>
    
   
    <section className="blog" id="blog">
        <div className="heading">
            <h2>Latest News</h2>
            <div></div>
        </div>
        <div className="row">
            <div className="box">
                <img src="/img/blog/ocp1.webp" alt="image" />
                <h3>OCP - Fortescue Joint Venture receives green light from Competition Council</h3>
<p>The Competition Council has given the green light to the creation of a joint venture between OCP Green Energy SA and the company Fortescue operating in the green energy production sector.</p>
                <a href="https://lematin.ma/economie/feu-vert-du-conseil-de-la-concurrence-a-la-joint-venture-ocp-fortescue/236842" className="btn">read more</a>
            </div>

            <div className="box">
                <img src="/img/blog/ocp2.webp" alt="image" />
                <h3>USAID and OCP launch two initiatives to develop agriculture in Africa</h3>
<p>USAID and OCP Group have signed a partnership to launch two projects called “Space to Place” and “Rock Phosphate Amendment.” The first will collect local soil and climate data to guide farmers toward optimal use of plant nutrition solutions.</p>
                <a href="https://lematin.ma/economie/usaid-et-ocp-lancent-2-initiatives-pour-developper-lagriculture-en-afrique/228210" className="btn">read more</a>
            </div>

            <div className="box">
                <img src="/img/blog/ocp3.webp" style={{ height: "47%" }} alt="image" />
                <h3>OCP: A 350 million euro loan from the AFD under consideration</h3>
<p>The French Development Agency (AFD) and OCP Group are studying the granting of a loan of up to 350 million euros. The loan will target the development of green hydrogen and ammonia</p>

                <a href="https://lematin.ma/economie/ocp-un-pret-de-350-millions-deuros-de-lafd-a-letude/224081" className="btn">read more</a>
            </div>
        </div>
    </section>

    <div className="welcam">
        <span>Welcome to the Cherifian Phosphates Office <a href="https://www.ocpgroup.ma/" className="btn">visit our official website</a></span>
    </div>

    <section className="contact" id="contact">
        <div className="heading">
            <h2>contact us</h2>
            <div></div>
        </div>
        <div className="box">
            <div className="content">
                <i className="fa-solid fa-mobile-screen"></i>
                <div>call: +212593823909</div>
                <div>monday-friday (8am-6pm) </div>
            </div>
            <div className="content">
                <i className="fa-solid fa-envelope"></i>
                <div>email: Ocp-group@gmail.com</div>
                <div>web: www.ocpgroup.ma</div>
            </div>
            <div className="content">
                <i className="fa-solid fa-location-dot"></i>
                <div>location: Khouribga</div>
                <div>Morroco</div>
            </div>
        </div>

        <div className="row">
            <div className="ifarm">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.46998136828!2d31.367140420131445!3d30.080723581957894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583df81720ed69%3A0xb597301dcb56aacf!2z2YXZiNmEINiz2YrYqtmKINiz2YbYqtixINin2YTZhdin2LjYqQ!5e0!3m2!1sar!2seg!4v1653556459063!5m2!1sar!2seg" width="550" height="430" style={{ border:"0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="form-c">
                <form action="">
                    <input type="text" placeholder="name" />
                    <input type="email" placeholder="email" />
                    <input type="number" placeholder="phone" />
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="submit" value="send message" />
                </form>
            </div>
        </div>
    </section>


    <footer className="footer">
        <div className="content">
            <h3>Company</h3>
    <p>We work with leading researchers and technology providers to create bespoke fertilizers for farmers’ individual soils. Discover customization process here.</p>
            <div className="shar">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-twitter"></i>
            </div>
        </div>

        <div className="link">
            <h3>links</h3>
            <a href="#home">home</a>
            <a href="#about">about</a>
            <a href="#services">services</a>
            <a href="#blog">latest news</a>
            <a href="#contact">contact</a>
        </div>

        <div className="our-servis">
            <h3>services</h3>
            <a href="#">Costumazion process</a>
            <a href="#">Fertilizers</a>
            <a href="#">Soil cartography</a>
            <a href="#">Local production</a>
            <a href="#">Innovative solutions</a>
            <a href="#">24/7 Support</a>
        </div>

        <div className="Ournews">
            <h3>Our Newsletter</h3>
        <p>The French Development Agency (AFD) and OCP Group are studying the granting of a loan of up to 350 million euros. The loan will target the development of green hydrogen and ammonia</p>
        </div>
    </footer>


  </div>
  )
}

export default App
