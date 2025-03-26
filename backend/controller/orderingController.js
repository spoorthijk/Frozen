import Booking from '../models/orderingModel.js';

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  console.log('New Booking:', newBooking);

  try {
    const savedBooking = await newBooking.save();
    console.log('Saved Booking:', savedBooking);
    res.status(200).json({
      success: true,
      message: 'Your desert has been booked',
      data: savedBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Booking failed',
      error: error.message,
    });
  }
};
