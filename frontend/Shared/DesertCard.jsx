import React from 'react'
import { Card, CardBody } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import calculateAvgRating from '../Utilis/avgRating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream} from "@fortawesome/free-solid-svg-icons";



import './desert-card.css'

const DesertCard = ({desert}) => {

  const navigate = useNavigate();
    if (!desert) return null;

  const { id, name, flavor, photo, price, featured, reviews } = desert;
  const { totalRating, avgRating } = calculateAvgRating(reviews);


  const handleBuyNow = () => {
    navigate('/order', { state: { desert, avgRating } });  // ✅ Pass data to Ordering page
};

  return (
    <div className='desert__card'>
      <Card>
        <div className="desert__img">
          <img src={photo} alt="desert-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>

      <div className="card__top d-flex align-items-center 
      justify-content-between">
      <span className="desert__flavor  d-flex align-items-center">
        {flavor} <FontAwesomeIcon icon={faIceCream} style={{ color: 'var(--secondary-color)' }} />
      </span>
      <span className="desert__rating d-flex align-items-center gap-1">
      <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}

        {totalRating === 0 ? (
          'Not rated'
          ) : (
          <span>({reviews.length})</span>
          )}
        </span>
      </div>

      <h5 className="desert__title">
        <Link to={`/icecreams/${id}`}>{name}</Link></h5>

        <div className="card__bottom d-flex align-items-center 
        justify-content-between mt-3">
        <h5>₹{price} <span> / per scoop</span></h5>
        <button className="booking__btn" >
           <Link to={`/icecreams/${id}`} onClick={handleBuyNow}>Buy Now</Link>
        </button>
        </div>
      </CardBody>

      </Card>

      {/* <CardBody>

      <div className="card__top d-flex align-items-center 
      justify-content-between">
      <span className="desert__flavor  d-flex align-items-center">
        {flavor} <FontAwesomeIcon icon={faIceCream} style={{ color: 'var(--secondary-color)' }} />
      </span>
      <span className="desert__rating d-flex align-items-center gap-1">
      <i className="ri-star-fill"></i> {avgRating || "Not rated"}
        {totalRating > 0 && <span>({reviews.length})</span>}
        </span>
      </div>

      <h5 className="desert__title">
        <Link to={`/icecreams/${id}`}>{name}</Link></h5>

        <div className="card__bottom d-flex align-items-center 
        justify-content-between mt-3">
        <h5>₹{price} <span> / per scoop</span></h5>
        <button className="booking__btn" >
           <Link to={`/icecreams/${id}`} onClick={handleBuyNow}>Buy Now</Link>
        </button>
        </div>
      </CardBody> */}


    </div>
  )
}

export default DesertCard
