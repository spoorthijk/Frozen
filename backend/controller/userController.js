import User from '../models/User.js';

// create user
export const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "User creation failed",
      error: error.message,
    });
  }
};

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser
    });
  } catch (error) {
    console.log(error.message, 'error in the update user');
    res.status(409).json({
      success: false,
      message: "Update failed",
      error: error.message
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const Id = req.params.id;

  try {
    await User.findByIdAndDelete(Id);
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

// get single user
export const getSingleUser = async (req, res) => {
  const Id = req.params.id;

  try {
    const user = await User.findById(Id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: error.message
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  

  try {
    const users = await User.find({})
    

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message
    });
  }
};

// get user by search
// export const getUserBySearch = async (req, res) => {
//   const { userName } = req.query;

//   try {
//     const users = await User.find({ name: { $regex: userName, $options: 'i' } });

//     res.status(200).json({
//       success: true,
//       data: users
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve users",
//       error: error.message
//     });
//   }
// };

// get featured user
// export const getFeaturedUser = async (req, res) => {
//   try {
//     const featuredUsers = await User.find({ featured: true });

//     res.status(200).json({
//       success: true,
//       count: featuredUsers.length,
//       data: featuredUsers
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve featured users",
//       error: error.message
//     });
//   }
// };