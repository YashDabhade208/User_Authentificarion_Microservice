
const bcrypt = require('bcrypt');
const connection = require('../Config');

const login = async (user) => {
    const { email, password } = user;
    const sql = "SELECT * FROM users WHERE email = ?";
     

    
    try {
      const [results] = await connection.query(sql, [email]);
  
      if (results.length === 0) {
        return { status: 404, message: "User not found" };
      }
  
      const fetchedUser = results[0];
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, fetchedUser.password);
  
  
  
      if (isPasswordValid) {
        return { status: 200, message: "Logged in successfully", user: fetchedUser };
      } else {
        return { status: 401, message: "Incorrect password" };
      }
    } catch (err) {
      return { status: 500, message: "Error logging in", error: err };
    }
  };
  module.exports = { login };