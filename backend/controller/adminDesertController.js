import Desert from "../models/Desert.js";

// Create a new desert entry (admin)
export const createDesertAdmin = async (req, res) => {
  const desertBooking = new Desert(req.body);

  try {
    const savedDesert = await desertBooking.save();
    res.status(201).json({
      success: true,
      message: "Desert created successfully",
      data: savedDesert,
    });
    console.log('created the recipe')
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Desert creation failed",
      error: error.message,
    });
  }
};

// Update an existing desert entry (admin)
export const updateDesertAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDesert = await Desert.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDesert,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

// Delete a desert entry (admin)
export const deleteDesertAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    await Desert.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};

// Get a single desert entry (admin)
export const getSingleDesertAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const desert = await Desert.findById(id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username email", // adjust fields as needed
      },
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

// Get all desert entries (admin)
export const getAllDesertsAdmin = async (req, res) => {
  try {
    const deserts = await Desert.find({}).populate("reviews");
    res.status(200).json({
      success: true,
      count: deserts.length,
      data: deserts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve deserts",
      error: error.message,
    });
  }
};
