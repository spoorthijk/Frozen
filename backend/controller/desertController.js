import Desert from '../models/Desert.js';

// create desertBooking
export const createDesert = async (req, res) => {
  const desertBooking = new Desert(req.body);

  try {
    const savedDesert = await desertBooking.save();
    res.status(201).json({
      success: true,
      message: "Desert created successfully",
      data: savedDesert,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Desert creation failed",
      error: error.message,
    });
  }
};

// update desertBooking
export const updateDesert = async (req, res) => {
  const Id = req.params.id;

  try {
    const updatedDesert = await Desert.findByIdAndUpdate(Id, {
      $set: req.body
    }, { new: true });

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDesert
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Update failed",
      error: error.message
    });
  }
};

// delete desertBooking
export const deleteDesert = async (req, res) => {
  const Id = req.params.id;

  try {
    await Desert.findByIdAndDelete(Id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted"
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Delete failed",
      error: error.message
    });
  }
};

// get single desertBooking

// get single desertBooking
export const getSingleDesert = async (req, res) => {
  const Id = req.params.id;

  try {
    const desert = await Desert.findById(Id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username email' // Select the fields you want to include from the user
      }
    });

    if (!desert) {
      return res.status(404).json({
        success: false,
        message: "Desert not found",
      });
    }

    res.status(200).json({
      success: true,
      data: desert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve desert",
      error: error.message,
    });
  }
};

// get all desertBooking
export const getAllDesert = async (req, res) => {
 //pagination

  try {
    const deserts = await Desert.find({}).populate('reviews');
  

    res.status(200).json({
      success: true,
      count: deserts.length,
      data: deserts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve deserts",
      error: error.message
    });
  }
};


// get desert by search
export const getDesertBySearch = async (req, res) => {
  const { desertName } = req.query;

  try {
    const deserts = await Desert.find
    ({ 
      name: { $regex: desertName, $options: 'i' } });

    res.status(200).json({
      success: true,
      count: deserts.length,
      data: deserts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve deserts",
      error: error.message
    });
  }
};

// get featured desert
export const getFeaturedDesert = async (req, res) => {
  try {
    const featuredDeserts = await Desert.find({ featured: true });

    res.status(200).json({
      success: true,
      count: featuredDeserts.length,
      data: featuredDeserts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve featured deserts",
      error: error.message
    });
  }
};

//get desert count
export const getDesertCount = async (req, res) => {
  try {
    const desertCount = await Desert.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: desertCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve desert count",
      error: error.message
    });
  }
};