const User = require('../Models/Login');
const jwt = require('jsonwebtoken');


const Login = async (req, res) => {
  const secretKey = "nigga"; // Replace with a secure key from environment variables
  const user = req.body;
  console.log(user);
  let token;

  try {
    let result;

      // Perform custom login
      result = await User.login(user);

      if (result && result.status === 200) {
        // Generate JWT for custom login
        token = jwt.sign(
          { id: result.user.id, email: result.user.email, role: "user" },
          secretKey,
          { expiresIn: '1h' } // Token expires in 1 hour
        );

        return res.status(200).json({ message: "Logged in", token, result});
      } else {
        throw new Error("Invalid credentials for custom login");
      }
    

   

   
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = { Login };