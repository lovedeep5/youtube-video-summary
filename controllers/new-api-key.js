const { saveNewAPI } = require("../services/video-captions.js");

const createNewApiKey = async (req, res) => {
  const token = req.body.token;

  const key = await saveNewAPI(token);

  if (!key) {
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong." });
  }

  return res.status(200).json({
    status: "success",
    ...key,
  });
};

module.exports = { createNewApiKey };
