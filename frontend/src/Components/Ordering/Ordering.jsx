import React, { useState } from 'react';
import './ordering.css';
import { Form, FormGroup, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';

const Ordering = ({ desert, avgRating }) => {
  const navigate = useNavigate();
  const { price, reviews, _id: desertId } = desert;

  const [credentials, setCredentials] = useState({
    userID: '01',
    userEmail: '',
    fullName: '',
    phone: '',
    quantity: 1,
    orderDate: '',
    orderTime: ''
  });

  // State for the login warning modal.
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Payment modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Check if all required fields are filled.
  const validateInputs = () => {
    const { userEmail, fullName, phone, quantity, orderDate, orderTime } = credentials;
    if (!fullName || !userEmail || !phone || !quantity || !orderDate || !orderTime) {
      // Optionally, you can show another modal for missing fields.
      return false;
    }
    return true;
  };

  // Check for token in localStorage.
  const checkUserToken = () => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);
    if (!token || token === 'undefined') {
      // Instead of alert, open the login warning modal.
      setLoginModalOpen(true);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentials.quantity) + Number(serviceFee);

  const togglePaymentModal = () => {
    // Check token and input validations before opening the payment modal.
    if (!checkUserToken()) return;
    if (!validateInputs()) return;
    setPaymentModalOpen(!paymentModalOpen);
  };

  // Prepare order details for the payment modal
  const orderDetails = {
    price,
    quantity: credentials.quantity,
    serviceFee,
    totalAmount,
  };

  // This function makes the booking API call once payment is confirmed.
  const handleBooking = async () => {
    try {
      const bookingData = {
        ...credentials,
        desertId, // include desert id to link order with the desert
      };

      const response = await fetch('http://localhost:8000/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally include the token if your backend requires it:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (result.success) {
        navigate('/thank-you', { state: result.data });
      } else {
        console.error('Booking failed:', result.message);
        // Optionally, display a modal for booking failure.
      }
    } catch (error) {
      console.error('Error while booking:', error);
      // Optionally, display a modal for error.
    }
  };

  // This function is called when payment is successful.
  // It closes the modal and triggers the booking API call.
  const onPaymentSuccess = () => {
    togglePaymentModal();
    handleBooking();
  };

  return (
    <div className="ordering">
      <div className="ordering__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/ per scoop</span>
        </h3>
        <span className="desert__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* =============== booking form ================ */}
      <div className="ordering__form">
        <h5>Information</h5>
        <Form className="ordering__info-form">
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="email" placeholder="Email" id="userEmail" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Quantity" id="quantity" min="1" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="date" id="orderDate" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="time" id="orderTime" required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>
      {/* =============== booking bottom ================ */}
      <div className="ordering__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span>₹{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>₹10</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>{serviceFee}</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={togglePaymentModal}>
          Order Now
        </Button>
      </div>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        toggle={togglePaymentModal}
        orderDetails={orderDetails}
        onPaymentSuccess={onPaymentSuccess} // Callback on successful payment
      />
      {/* Login Warning Modal */}
      <Modal centered isOpen={loginModalOpen} toggle={() => setLoginModalOpen(!loginModalOpen)}>
        <ModalHeader toggle={() => setLoginModalOpen(false)}>
          Login Required
        </ModalHeader>
        <ModalBody>
          You must be logged in to book.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { setLoginModalOpen(false); navigate('/login'); }}>
            Go to Login
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Ordering;
