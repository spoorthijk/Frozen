import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'
import ava04 from '../../assets/images/ava-4.jpg'



const Testimonials = () => {

    const settings={
        dot:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint:992,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint:576,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1,
                   
                },
            },
        ]
    }

  return (
    <Slider {...settings}>
        <div className="testimonial py-4 px-3">
            <p>
            Absolutely love this place! The flavors are rich and creamy, 
            and every scoop feels like a little piece of happiness. 
            The staff is always welcoming, making the whole experience even better. 
            From classic vanilla to creative flavors, there's something for everyone 
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className='mb-0-mt'>John Doe</h6>
                    <p>
                        Customer
                    </p>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>
            This is truly a paradise for ice cream lovers! The toppings are fresh, 
            and the waffle cones are perfectly crispy. 
            My kids can’t get enough of their colorful sundaes. 
            It’s our go-to spot for sweet treats and happy memories.
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className='mb-0-mt'>Lia Frankle</h6>
                    <p>
                        Customer
                    </p>
                </div>
            </div>
        </div>

        <div className="testimonial py-4 px-3">
            <p>
            The milkshakes here are thick, creamy, and just the right amount of sweet. 
            The cozy atmosphere and friendly service make it even more enjoyable. 
            Every visit feels special — this place never disappoints!
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className='mb-0-mt'>Liam</h6>
                    <p>
                        Customer
                    </p>
                </div>
            </div>
        </div>


        <div className="testimonial py-4 px-3">
            <p>
            Every scoop here is a delight! The flavors are so unique and perfectly balanced. 
            The toppings are always fresh, and the staff makes you feel right at home. 
            It’s more than just ice cream — it’s a sweet experience every time!
            </p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava04} className='w-25 h-25 rounded-2' alt="" />
                <div>
                    <h6 className='mb-0-mt'>Sophia</h6>
                    <p>
                        Customer
                    </p>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonials
