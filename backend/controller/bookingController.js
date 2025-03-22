import Booking from '../models/bookingModel.js'

export const createBooking = async (req, res) => {
    
    const newBooking = new Booking(req.body) 

    try {

        const savedBooking = await newBooking.save()

        res.status(200).json({success:true ,
            message:'your desert has been booked',
             data:savedBooking})
        
    } catch (error) {
        
        res.status(500).json({success:false,
            message:'booking failed',
    })

}
}