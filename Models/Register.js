
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const axios = require('axios'); // Ensure axios is required
const connection = require('../Config');

const register = async (user,req,res) => {
    const { name, email, password } = user;
    const checkusersql = "select * from users where email =?"
    
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    try {
        let hashedPassword;

        if (password) {
            // Hash the password with a salt (default is 10 rounds)
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        } else {
            // Use a placeholder or null for users without a password
            hashedPassword = null; // or use a placeholder value like 'OAUTH_USER'
        }
        const [userResults] = await connection.query(checkusersql, [email]);
        if (userResults.length > 0) {
            return { status: 400, message: "User already exists" };
        }

        const [result] = await connection.query(sql, [name, email, hashedPassword]);
        const userId = result.insertId;
        const initialBalance = 10000;
        
       const walletResult= await createWalletForUser(userId, initialBalance);
       console.log(walletResult);

        return res.status(200).json({ message: "User registered successfully", userId: userId });
    } catch (err) {
        console.error("Error registering user:", err);
        return { status: 500, message: "Error registering user", error: err.message };
    }
};


const createWalletForUser = async (userId) => {
  const mutation = `
    mutation {
      createWallet(  user_id: ${userId}) {
        
        user_id
        
      }
    }
  `;

  try {
    const response = await axios.post('http://localhost:3001/graphql', {
      query: mutation,
    });
    console.log('Wallet created:', response.data.data.createWallet);
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw new Error('Wallet creation failed');
  }
};

module.exports = { register };
0