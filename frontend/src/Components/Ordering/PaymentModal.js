import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ isOpen, toggle, orderDetails, onPaymentSuccess }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Invoke the success callback to trigger any payment/booking related actions.
    if (onPaymentSuccess) {
      onPaymentSuccess();
    }
    // Close the modal and navigate to the thank you page.
    toggle();
    navigate('/thank-you');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Payment</ModalHeader>
      <ModalBody>
        <div className="payment-details">
          <h5>Order Summary</h5>
          <p>Price per scoop: ₹{orderDetails.price}</p>
          <p>Quantity: {orderDetails.quantity}</p>
          <p>Service Charge: ₹{orderDetails.serviceFee}</p>
          <p>Total Amount: ₹{orderDetails.totalAmount}</p>
        </div>
        <div className="payment-message" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>Payment module is under development.</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirm}>
          Confirm Payment
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentModal;
