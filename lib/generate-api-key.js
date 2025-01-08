const crypto = require("crypto");

const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 64-character hex string
};

module.exports = { generateApiKey };
