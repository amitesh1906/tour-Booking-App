import React from 'react'
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';


const Newsletter = () => {
    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="newsletter__content">
                            <h2>Subscribe now for valuable travel insights!</h2>
                            <div className="newsletter__input">
                                <input type="email" placeholder="Enter your email" />
                                <button className="btn newsletter__btn">Subscribe</button>
                            </div>


                            <p>
                                Stay informed and make your travels smoother with our expert insights. Subscribe now to receive the latest travel tips, destination guides, and exclusive updates. Whether you're planning your next adventure or looking for smart travel hacks, we’ve got you covered. Don’t miss out on valuable information to enhance your journey!
                            </p>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="newsletter__img">
                            <img src={maleTourist} alt='' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Newsletter