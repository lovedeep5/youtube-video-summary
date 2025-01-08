const { isApivalid } = require("../services/video-captions");
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized request" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

    const isValid = await isApivalid(token);

    if (!isValid) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid token" });
    }
    req.body.token = token;
    next(); // Token is valid, proceed to the next middleware or route handler
  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

module.exports = authenticate;
