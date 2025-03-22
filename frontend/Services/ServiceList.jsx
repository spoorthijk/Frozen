import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'


import FlavorImg from '../assets/images/sweet.png'
import DesertImg from '../assets/images/Frozen.png'
import creativityImg from '../assets/images/creativity.png';

const servicesData = [
    {
        imgUrl: FlavorImg,
        title: "🍦 Delicious Ice Cream Flavors",
        desc: "Indulge in a variety of rich, creamy, and refreshing flavors made with love!",
    },
    {
        imgUrl: DesertImg,
        title: "🍧 Frozen Desserts & Shakes",
        desc: "Enjoy rich sundaes and thick shakes, crafted to satisfy every craving!",
    },
    {
        imgUrl: creativityImg,
        title: "🚀 Customize Your Treat",
        desc: "Mix and match flavors, add toppings, and create your perfect dessert!",
    },
];

const ServiceList = () => {
  return (<>
    {
        servicesData.map((item,index)=> 
        <Col lg='3' key={index}>
            <ServiceCard item={item}/>
        </Col>)
    }
  </>
  );
}

export default ServiceList
