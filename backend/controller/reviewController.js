// backend/controller/reviewController.js
import Desert from "../models/Desert.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const desertId = req.params.desertId;
  const { comment, rating } = req.body; // Expecting a comment and rating from the client

  // Create a new review instance.
  const newReview = new Review({
    comment,
    rating,
    desert: desertId,
    // Use either req.user._id or req.user.id depending on your token payload structure.
    user: req.user._id || req.user.id,
  });

  try {
    const savedReview = await newReview.save();

    // Update the corresponding desert by pushing the new review into its reviews array.
    await Desert.findByIdAndUpdate(
      desertId,
      { $push: { reviews: savedReview } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Review created successfully",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Review creation failed",
      error: error.message,
    });
  }
};
