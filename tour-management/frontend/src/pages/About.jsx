import React, { useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import Newsletter from "./../shared/Newsletter";
import "../styles/about.css"; // Assuming a CSS file for styling
import Subtitle from "../shared/Subtitle";


const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <CommonSection title={"About Nomad World"} />

            <section className="about-section">
                <div className="container">

                    <p>
                        Your ultimate companion for discovering and booking unforgettable travel experiences.
                        Whether you’re a seasoned adventurer or a first-time traveler, our platform is designed
                        to make your journey seamless, inspiring, and stress-free.
                    </p>
                    <Subtitle subtitle={"Who We Are"} />
                    {/* <h3 className="services__subtitle">Who We Are</h3> */}
                    <p>
                        At NomadHaven, we believe travel is more than just visiting new places—it’s about
                        creating memories, embracing new cultures, and experiencing the extraordinary. Our
                        passionate team of travel enthusiasts works tirelessly to connect you with carefully
                        curated tours, destinations, and experiences tailored to your preferences.
                    </p>
                    <Subtitle subtitle={<h3>What We Offer</h3>} />
                    {/* <h3>What We Offer</h3> */}
                    <ul>
                        <li>
                            <strong>Handpicked Tours:</strong> Explore our diverse range of tours, from tranquil
                            escapes to adrenaline-pumping adventures, crafted by trusted providers across the globe.
                        </li>
                        <li>
                            <strong>Personalized Recommendations:</strong> Use our intuitive search tools to find
                            trips that match your interests, budget, and schedule.
                        </li>
                        <li>
                            <strong>Affordable Pricing:</strong> Travel shouldn’t break the bank. We offer competitive
                            rates and exclusive deals to ensure your dream getaway is within reach.
                        </li>
                        <li>
                            <strong>24/7 Support:</strong> Our dedicated support team is always here to assist you,
                            whether it’s planning your trip or addressing questions during your journey.
                        </li>
                    </ul>
                    <Subtitle subtitle={<h3>Our Mission</h3>} />
                    {/* <h3>Our Mission</h3> */}
                    <p>
                        We aim to inspire wanderlust, simplify travel planning, and help you turn your travel
                        dreams into reality. By focusing on trust, transparency, and quality, we strive to build
                        a global community of happy travelers who share their stories and adventures with us.
                    </p>

                    <h3>Why Choose Us?</h3>
                    <ul>
                        <li>
                            <strong>Trusted Partners:</strong> Collaborating with reliable tour operators ensures your
                            safety and satisfaction.
                        </li>
                        <li>
                            <strong>User-Friendly Platform:</strong> Booking your next adventure has never been easier.
                        </li>
                        <li>
                            <strong>Sustainability Focus:</strong> We support eco-friendly travel options, empowering
                            you to explore responsibly.
                        </li>
                    </ul>

                    <p>
                        At NomadHaven, every journey begins with a spark of curiosity and ends with cherished
                        memories. Join us today, and let’s explore the world together!
                    </p>
                </div>
            </section>

            <Newsletter />
        </>
    );
};

export default About;
