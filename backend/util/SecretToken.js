require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  const secretKey = process.env.TOKEN_KEY;

  // Ensure the secret key is defined
  if (!secretKey) {
    throw new Error("TOKEN_KEY is not defined in the environment variables");
  }

  // Return the signed token
  return jwt.sign({ id }, secretKey, {
    expiresIn: "3d", // Easier to read duration format
  });
};
