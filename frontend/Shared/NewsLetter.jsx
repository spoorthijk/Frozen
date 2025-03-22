import React from 'react'
import './newsletter.css';
import { Container,Row,Col } from 'reactstrap';
// import customer from '../../assets/images/joycustomer.png'
import customer from '../assets/images/joycustomer.png'

const Newsletter = () => {
  return(
  <section className='newsletter'>
    <Container>
    <Row>
        <Col lg='6'>
        <div className="newsletter__content">
            <h2>Subscribe now to get sweet updates and exclusive offers!</h2>
            <div className='newsletter__input'>
                <input type='email' placeholder='Enter your Email'/>
                <button className="btn newsletter__btn">Subscribe</button>
            </div>

            <p>
            Stay updated with the latest flavors, special discounts, and exciting events. 
            Don’t miss out on the sweetest news — join our ice cream family today!
            </p>
        </div>
        </Col>
        <Col lg='6'>
        <div className="newsletter__img">
            <img src={customer} alt="" />
        </div>
        </Col>
    </Row>
    </Container>
    </section> 


  )

}


export default Newsletter
