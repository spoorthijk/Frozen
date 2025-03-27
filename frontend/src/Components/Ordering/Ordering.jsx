import React, { useState, useEffect } from 'react';
import './ordering.css';
import { Form, FormGroup, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PaymentModal from './PaymentModal';

const Ordering = ({ desert, avgRating }) => {
  const navigate = useNavigate();
  const { price, reviews, _id: desertId, name: desertName } = desert;

  // Function to decode token and extract user data.
  const getUserDataFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return {};
    try {
      const decoded = jwtDecode(token);
      // console.log(decoded,'decoded')
      // Assuming token structure as described.
      return {
        userId: decoded.id || decoded.userId || '',
        fullName: decoded.username || '',  // Using username as fullName
        userEmail: decoded.email || '',
      };
    } catch (error) {
      console.log('Failed to decode token:', error);
      return {};
    }
  };

  // Get initial token values.
  const tokenData = getUserDataFromToken();
  // console.log(tokenData.fullName)

  // Set initial credentials including data from the decoded token.
  const [credentials, setCredentials] = useState({
    userId: tokenData.userId || '',
    userEmail: tokenData.userEmail || '',
    fullName: tokenData.fullName || '',
    phone: '',
    quantity: 1,
    orderDate: '',
    orderTime: ''
  });

  console.log(credentials,'credentials')

  // Update token values if token changes or on component mount.
  useEffect(() => {
    const newTokenData = getUserDataFromToken();
    setCredentials(prev => ({
      ...prev,
      userId: newTokenData.userId,
      userEmail: newTokenData.userEmail,
      fullName: newTokenData.username,
    }));
  }, []);

  // State for the login warning modal.
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Payment modal state.
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Check if all required fields are filled.
  const validateInputs = () => {
    const { userEmail, fullName, phone, quantity, orderDate, orderTime } = credentials;
    return fullName && userEmail && phone && quantity && orderDate && orderTime;
  };

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(credentials.quantity) + Number(serviceFee);

  // Toggle the payment modal if inputs are valid.
  const togglePaymentModal = () => {
    if (!validateInputs()) return;
    setPaymentModalOpen(!paymentModalOpen);
  };

  // Prepare order details for the payment modal.
  const orderDetails = {
    price,
    quantity: credentials.quantity,
    serviceFee,
    totalAmount,
  };

  // This function makes the booking API call once payment is confirmed.
  const handleBooking = async () => {
    try {
      // Add additional order details to the bookingData.
      const bookingData = {
        ...credentials,
        desertId,     // Link order with the desert.
        desertName,   // Save the desert name.
        price,        // Price per scoop.
        serviceFee,   // Fixed service fee.
        totalAmount,  // Total amount for the order.
      };

      const response = await fetch('http://localhost:8000/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (result.success) {
        navigate('/thank-you', { state: result.data });
      } else {
        console.error('Booking failed:', result.message);
      }
    } catch (error) {
      console.log('Error while booking:', error.message);
    }
  };

  // Called when payment is successful.
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
      {/* Booking Form */}
      <div className="ordering__form">
        <h5>Information</h5>
        <Form className="ordering__info-form">
          <FormGroup>
            <input 
              type="text" 
              placeholder="Full Name" 
              id="fullName" 
              required 
              onChange={handleChange} 
              value={credentials.fullName}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <input 
              type="email" 
              placeholder="Email" 
              id="userEmail" 
              required 
              onChange={handleChange} 
              value={credentials.userEmail}
              disabled
            />
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
      {/* Order Summary */}
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
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
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
        onPaymentSuccess={onPaymentSuccess}
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
