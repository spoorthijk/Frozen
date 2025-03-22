import React from 'react'
import '../../Styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import heroImg from '../../assets/images/summer.jpg'
import heroImg02 from '../../assets/images/hero-img02.jpg'
import heroVideo from '../../assets/images/hero-video.mp4'
import iceImg from '../../assets/images/ice.png'
import experienceImg from '../../assets/images/experience.png'

import Subtitle from '../../Shared/Subtitle'
import SearchBar from '../../Shared/SearchBar'
import ServiceList from '../../Services/ServiceList'
import FeaturedDesertList from '../Featured-deserts/FeaturedDesertList'
import MasonryImangesGallery from '../Image-gallery/MasonryImangesGallery'
import Testimonials from '../Testimonial/Testimonials'
import Newsletter from '../../Shared/NewsLetter'

const Home = () => {
  return (<>
{/* ===========hero section start============= */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center ">
              <Subtitle subtitle={'Taste the Magic!'}/>
              <img src= {iceImg} alt="" />
            </div>
            <h1>Every scoop opens the door to happiness!
              <span className="highlight">Delights </span>
            </h1>
            <p>
            Indulge in the creamiest, most delicious ice cream crafted with love.
            Whether you love classic flavors or adventurous new creations, 
            we have the perfect scoop waiting for you!<br/>

            ✅ Freshly made, premium ingredients<br/>
            ✅ Vegan & sugar-free options available<br/>
            ✅ Order online & get it delivered fast!<br/>
            <br/>
            👉 Start Scooping Now!
            </p>
          </div>
          </Col>
          <Col lg='2'>
          <div className="hero__img-box">
            <img src= {heroImg} alt="" />
          </div>
          </Col>

          <Col lg='2'>
          <div className="hero__img-box mt-4">
            <video src= {heroVideo} controls alt="" />
          </div>
          </Col>

          <Col lg='2'>
          <div className="hero__img-box mt-5">
            <img src= {heroImg02} alt="" />
          </div>
          </Col>
          <SearchBar/>
        </Row>
      </Container>
    </section>
{/* ===========hero section end============= */}
      <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className="services__subtitle">What we Serve</h5>
            <h2 className='services__title'>We Offer the Coolest Treats!</h2>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
      </section>

          {/* ============featured tour section start=============== */}
            <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
            <Subtitle subtitle={'Explore'}/>
            <h2 className="featured__desert-title">Discover Your Favorite Ice Cream Delights</h2>
            </Col>
            <FeaturedDesertList/>
          </Row>
        </Container>
      </section>
      {/* ============featured tour section start=============== */}

      {/* ============ experience section start ================ */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={'Experience'}/>
                <h2>With our all experience <br/> we will serve you</h2>
                
                <p>Indulge in the sweetest flavors crafted with love.<br/>  
                Every scoop is a delightful adventure waiting to be savored.</p>

                <div className="counter__wrapper d-flex a;ign-items-center gap-5">
                <div className="counter__box">
                <span>12k+</span>
                <h6>Flavorful Adventure</h6>
              </div>  

              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular Customers</h6>
              </div>  

              <div className="counter__box">
                <span>15</span>
                <h6>Years Experience</h6>
              </div>
            </div>
          </div>
          </Col>
            <Col lg='6'>
            <div className="experience__img">
                <img src={experienceImg} alt="" />
            </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ experience section start ================ */}

      {/* ============= gallery section starts================== */}
      
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <Subtitle subtitle={'Gallery'}/>
            <h2 className='gallery__title'>
            Explore Our Happy Moments
            </h2>
            </Col>
            <Col lg='12'>
            <MasonryImangesGallery/>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ============= gallery section end ================== */}


      {/* =============== testimonial section strat ================== */}

      <section>
        <Container>
          <Row>
            <Col lg ='12'>
            <Subtitle subtitle={'Fans Love'}/>
            <h2 className='testimnial__title'>What our fans say about us</h2>
            </Col>
            <Col lg='12'>
            <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section> 

        {/* =============== testimonial section end ================== */}
        <Newsletter/>
      </>
  )
}

export default Home