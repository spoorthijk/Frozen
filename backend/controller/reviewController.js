import Desert from "../models/Desert.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const desertId = req.params.desertId;
  const newReview = new Review({
    ...req.body,
    desert: desertId,
    user: req.user.id, // Assuming you have user information from the token
  });

  try {
    const savedReview = await newReview.save();

    // After creating a review, now update the reviews array in the desert model
    await Desert.findByIdAndUpdate(
      desertId,
      { $push: { reviews: savedReview._id } },
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