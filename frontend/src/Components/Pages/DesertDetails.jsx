import React, { useContext, useRef, useState } from 'react';
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
  const reviewMsgRef = useRef('');
  const [desertRating, setDesertRating] = useState(null);

  const { deserts, error } = useContext(DesertContext);

  // Log context data for debugging
  console.log('URL ID:', id);
  console.log('Deserts from context:', deserts);

  // If deserts data is not yet loaded, show a loading message
  if (!deserts) {
    return <h4>Loading...</h4>;
  }

  // Use _id to match the identifier used in your desert data
  const desert = deserts.find((desert) => desert._id.toString() === id);

  // Log the found desert for debugging
  console.log('Found desert:', desert);

  if (!desert) return <h4>Desert not found</h4>;

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const { _id, name, flavor, photo, price, featured, reviews, description } = desert;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    // TODO: Add logic to save the review and update state.
    // Clear input after submission 
    reviewMsgRef.current.value = '';
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
                      <i
                        className="ri-star-fill"
                        style={{ color: 'var(--secondary-color)' }}
                      ></i>
                      {avgRating === 0 ? 'Not rated' : avgRating}
                      {totalRating !== 0 && <span>({reviews?.length})</span>}
                    </span>

                    <span className="desert__flavor d-flex align-items-center">
                      {flavor}{' '}
                      <FontAwesomeIcon
                        icon={faIceCream}
                        style={{ color: 'var(--secondary-color)' }}
                      />
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
                        <span key={star} onClick={() => setDesertRating(star)}>
                          {star} <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thought`s"
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
                              <h5>Puneetha</h5>
                              <p>
                                {new Date('01-18-2024').toLocaleDateString('en-US', options)}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating || 5} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>Delicious</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Ordering desert={desert} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default DesertDetails;
