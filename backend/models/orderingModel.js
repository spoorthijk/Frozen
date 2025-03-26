import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  userEmail: {
    type: String,
    // required: true,
  },
  desertName: {
    type: String,
    // required: true,
  },
  fullName: {
    type: String,
    // required: true,
  },
  unitSize: {
    type: Number,
    // required: true,
  },
  phone: {
    type: String, // Changed to String to accommodate different phone number formats
    // required: true,
  },
  bookAt: {
    type: Date,
    // required: true,
  },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);