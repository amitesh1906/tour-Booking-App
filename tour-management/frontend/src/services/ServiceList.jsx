import React from 'react'
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";


const serviceData = [
    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "We offer accurate and reliable weather forecasting services, helping you plan your travels with ease. From real-time updates to detailed forecasts, we provide all the information you need to make informed decisions during your trips"
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "We provide expert tour guide services with personalized recommendations to enhance your travel experience. Whether exploring hidden gems or landmarks, our knowledgeable guides ensure you get the most from every destination."
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "We offer customized travel experiences tailored to your preferences. From personalized itineraries to exclusive tours, our services are designed to give you a unique and unforgettable journey that suits your interests and needs."
    }

]
const ServiceList = () => {
    return (
        <>
            {serviceData.map((item, index) => (<Col lg='3' key={index}><ServiceCard item={item} /> </Col>))}
        </>
    )
}

export default ServiceList