import User from "../models/User";

export const createUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // creating a new User
    const user = new User({
      name,
      username,
      password,
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({savedUser});
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {};

export const getUser = async (req, res) => {};
