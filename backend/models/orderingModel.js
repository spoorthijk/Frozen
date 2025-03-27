import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  desertName: {
    type: String,
    // required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price:{
    type: String,
  },
  quantity:{
    type: Number,
  },
  serviceFee:{
    type: String,
  },
  totalAmount:{
    type: String,
  },
  phone: {
    type: String, // Changed to String to accommodate different phone number formats
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderTime: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);