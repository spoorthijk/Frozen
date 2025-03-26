import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import calculateAvgRating from '../Utilis/avgRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';

import './desert-card.css';

const DesertCard = ({ desert }) => {
  const navigate = useNavigate();
  if (!desert) return null;

  const { _id, name, flavor, photo, price, featured, reviews } = desert;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const handleBuyNow = () => {
    navigate(`/desert/${_id}`, { state: { desert, avgRating } });
  };

  return (
    <div className='desert__card'>
      <Card>
        <div className="desert__img">
          <img src={photo} alt={name} />
          {featured && <span className="featured-label">Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="desert__flavor d-flex align-items-center">
              {flavor}{' '}
              <FontAwesomeIcon icon={faIceCream} style={{ color: 'var(--secondary-color)' }} />
            </span>
            <span className="desert__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>{' '}
              {avgRating === 0 ? 'Not rated' : avgRating}
              {totalRating !== 0 && <span>({reviews.length})</span>}
            </span>
          </div>

          <h5 className="desert__title">
            <Link to={`/desert/${_id}`}>{name}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ₹{price} <span>/ per scoop</span>
            </h5>
            <button className="booking__btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DesertCard;
