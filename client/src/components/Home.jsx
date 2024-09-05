import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
 

function Home() {
    useEffect(() => {
        // Initialiser AOS
        AOS.init({ duration: 1000 });

        // Gestion du défilement de l'en-tête
        const handleScroll = () => {
            const header = document.querySelector('header');
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            if (scrollPosition > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
                <a
                    href="#home"
                    onClick={(e) => { e.preventDefault(); smoothScroll('#home'); }}
                    className="header-link text-gray-700 hover:text-green-500 transition-colors duration-300"
                    data-aos="fade-down"
                >
                    <img src="/img/ocp.png" className="h-16 w-64" alt="OCP Logo" />
                </a>
                <nav className="flex space-x-4 ml-auto">
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); smoothScroll('#home'); }}
                        className="header-link text-gray-700 hover:text-green-500 transition-colors duration-300"
                        data-aos="fade-down"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        onClick={(e) => { e.preventDefault(); smoothScroll('#about'); }}
                        className="header-link text-gray-700 hover:text-green-500 transition-colors duration-300"
                        data-aos="fade-down"
                    >
                        About
                    </a>
                    <a
                        href="#services"
                        onClick={(e) => { e.preventDefault(); smoothScroll('#services'); }}
                        className="header-link text-gray-700 hover:text-green-500 transition-colors duration-300"
                        data-aos="fade-down"
                    >
                        Services
                    </a>
                    <a
                        href="#blog"
                        onClick={(e) => { e.preventDefault(); smoothScroll('#blog'); }}
                        className="header-link text-gray-700 hover:text-green-500 transition-colors duration-300"
                        data-aos="fade-down"
                    >
                        Blog
                    </a>
                    <a
                        href="/login"
                        className="header-link text-gray-700 hover:text-green-500 transition-colors duration-300"
                        data-aos="fade-down"
                    >
                        Login
                    </a>
                </nav>
                <i className="fa-solid fa-bars text-gray-700 ml-4"></i>
            </header>

            <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/img/hero-carousel/ocp2.webp)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="flex items-center justify-center h-full relative text-white text-center">
                    <div className="max-w-4xl mx-auto p-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-up">Welcome to Our Site</h1>
                        <p className="text-lg md:text-2xl mb-8" data-aos="fade-up" data-aos-delay="200">Discover our innovative solutions for your business.</p>
                        <a
                            href="#contact"
                            className="bg-transparent border-2 border-green-500 text-green-500 font-bold py-2 px-6 rounded transition duration-300 hover:bg-green-500 hover:text-white"
                            data-aos="fade-up" data-aos-delay="500"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            <section id="about" className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">About</h2>
                    <p className="text-gray-600 mb-8" data-aos="fade-up">Learn more about the OCP group</p>
                </div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
                        <img src="/img/about/OCP-3.jpg" className="w-full rounded-lg shadow-lg" alt="About Image" />
                    </div>
                    <div className="md:w-1/2 md:ml-8" data-aos="fade-left">
                        <h3 className="text-2xl font-semibold mb-4">What is phosphate?</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600">- An essential source of nutrients</p>
                            <p className="text-gray-600">- It's the natural source of phosphorus</p>
                            <p className="text-gray-600">- It's used in several products</p>
                            <p className="text-gray-600">- It's transformed to produce phosphorus</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="py-16">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Our Services</h2>
  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    <div className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="100">
      <i className="fa-solid fa-industry text-4xl text-blue-600 mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Customization Process</h3>
      <p className="text-gray-600">Our fertilizers are tailor-made to adapt to the specific needs of different types of soil.</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="200">
      <i className="fa-solid fa-seedling text-4xl text-green-600 mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Fertilizers</h3>
      <p className="text-gray-600">Our fertilizers are tailor-made to adapt to the specific needs of different soil types.</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="300">
      <i className="fa-solid fa-map text-4xl text-yellow-600 mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Soil Cartography</h3>
      <p className="text-gray-600">Our mobile laboratories map the quality of the soil locally to assess nutrient levels.</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="400">
      <i className="fa-solid fa-tractor text-4xl text-red-600 mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Local Production</h3>
      <p className="text-gray-600">We share our knowledge on the optimal use of fertilizers to promote sustainable agriculture.</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="500">
      <i className="fa-solid fa-lightbulb text-4xl text-yellow-500 mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Innovative Solutions</h3>
      <p className="text-gray-600">Our investments in new technologies have enabled us to produce customizable fertilizers.</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up" data-aos-delay="600">
      <i className="fa-solid fa-headset text-4xl text-blue-500 mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
      <p className="text-gray-600">We provide around-the-clock support to ensure that your needs are met at any time.</p>
    </div>
  </div>
</section>

<section id="blog" className="py-16 bg-gray-100">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">Latest News</h2>
  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    {/* Articles du blog */}
    <div className="bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="100">
      <img src="/img/blog/ocp1.webp" className="w-full h-64 object-cover" alt="Blog Post 1" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">OCP: A 350 million euro loan from the AFD under consideration</h3>
        <p className="text-gray-600">Learn about the latest developments at OCP.</p>
        <a href="#" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Read More</a>
      </div>
    </div>

    <div className="bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">
      <img src="/img/blog/ocp2.webp" className="w-full h-64 object-cover" alt="Blog Post 2" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">OCP - Fortescue Joint Venture receives green light from Competition Council 2</h3>
        <p className="text-gray-600">Explore our latest news and updates.</p>
        <a href="#" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Read More</a>
      </div>
    </div>

    <div className="bg-white shadow-lg rounded-lg overflow-hidden" data-aos="fade-up" data-aos-delay="300">
      <img src="/img/blog/ocp3.webp" className="w-full h-64 object-cover" alt="Blog Post 3" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">USAID and OCP launch two initiatives to develop agriculture in Africa</h3>
        <p className="text-gray-600">Get insights into our recent activities.</p>
        <a href="#" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Read More</a>
      </div>
    </div>
  </div>
</section>

<footer className="py-8 bg-gray-800 text-white text-center">
        <p className="mb-4">&copy; 2023 OCP. All rights reserved.</p>
        <nav className="flex justify-center space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#blog" className="hover:underline">Blog</a>
          <a href="/login" className="hover:underline">Login</a>
        </nav>
      </footer>


        </div>
    );
}

export default Home;