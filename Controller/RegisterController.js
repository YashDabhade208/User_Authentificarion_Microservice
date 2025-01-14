
const User = require('../Models/Register')



const registerUser = async (req, res) => {
  const user = req.body;

  try {
    const result = await User.register(user); // Await the promise returned by `register`
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

module.exports = { registerUser };