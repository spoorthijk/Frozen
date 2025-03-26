// src/components/DesertDetails/DesertDetails.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../Styles/desert-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { DesertContext } from '../../assets/data/desert';
import calculateAvgRating from '../../Utilis/avgRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/images/avatar.jpg';
import Ordering from '../Ordering/Ordering';
import NewsLetter from '../../Shared/NewsLetter';

const DesertDetails = () => {
  const { id } = useParams();
  const commentRef = useRef('');
  const [desertRating, setDesertRating] = useState(null);
  const { deserts } = useContext(DesertContext);
  const [currentDesert, setCurrentDesert] = useState(null);

  // Find the matching desert once the context is loaded.
  useEffect(() => {
    if (deserts) {
      const foundDesert = deserts.find((desert) => desert._id.toString() === id);
      setCurrentDesert(foundDesert);
    }
  }, [deserts, id]);

  if (!deserts) {
    return <h4>Loading...</h4>;
  }

  if (!currentDesert) return <h4>Desert not found</h4>;

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const { _id, name, flavor, photo, price, featured, reviews, description } = currentDesert;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Submit review to the backend.
  const submitHandler = async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value;

    // Build the review data using field names matching the backend schema.
    const reviewData = {
      comment,
      rating: desertRating || 5,
    };

    console.log('Submitting review data:', reviewData);

    try {
      // Get token from localStorage if available.
      const token = localStorage.getItem('token');
      // Adjust the API endpoint as needed.
      const response = await fetch(`http://localhost:8000/api/v1/reviews/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Token must be sent if required by your backend.
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (data.success) {
        // Append the new review to the current reviews.
        setCurrentDesert({
          ...currentDesert,
          reviews: [...currentDesert.reviews, data.data],
        });
        // Clear the input and reset the rating.
        commentRef.current.value = '';
        setDesertRating(null);
      } else {
        console.error('Review submission failed:', data.message);
      }
    } catch (error) {
      console.error('Error while submitting review:', error);
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="desert__content">
                <img src={photo} alt={name} />

                <div className="desert__info">
                  <h2>{name}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="desert__rating d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating === 0 ? 'Not rated' : avgRating}
                      {totalRating !== 0 && <span>({reviews?.length})</span>}
                    </span>

                    <span className="desert__flavor d-flex align-items-center">
                      {flavor}{' '}
                      <FontAwesomeIcon icon={faIceCream} style={{ color: 'var(--secondary-color)' }} />
                    </span>
                  </div>
                  <div className="desert__extra-details">
                    <span>₹ {price} / per scoop</span>
                    <span>
                      <i className="ri-map-pin-line"></i> Somewhere
                    </span>
                    <span style={{ color: 'var(--heading-color)' }}>
                      <i className="ri-time-line"></i>
                      {featured ? 'Available' : 'Out of stock'}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{description}</p>
                </div>

                {/* Reviews Section */}
                <div className="desert__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setDesertRating(star)}
                          style={{
                            cursor: 'pointer',
                            color: desertRating >= star ? 'gold' : 'black',
                          }}
                        >
                          {star} <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={commentRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button className="btn primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews?.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="User avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.userName || 'Anonymous'}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString('en-US', options)}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating || 5} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.comment}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Ordering desert={currentDesert} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default DesertDetails;


/*
Example Client-Side Fetch Request:

// Retrieve the token from localStorage (or your chosen storage)
const token = localStorage.getItem('token'); 

// Replace 'desertId' with the actual desert ID you want to review.
const desertId = "your-desert-id";

const response = await fetch(`/api/reviews/${desertId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Token must be sent here.
  },
  body: JSON.stringify({
    comment: "This is a sample review comment.",
    rating: 4,
  }),
});
*/
