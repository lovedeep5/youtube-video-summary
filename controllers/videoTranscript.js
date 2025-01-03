const { getVideoTranscript } = require("../services/videoTranscript");

const videoTranscriptRoute = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth && auth !== process.env.KEY) {
    return res
      .status(401)
      .json({ status: "failed", message: "Unauthorized request" });
  }

  const URL = req.body.url;

  if (!URL) {
    return res
      .status(400)
      .json({ status: "failed", message: "youtube URL is mandatory." });
  }
  const transcript = await getVideoTranscript(URL);
  return res.status(200).json({ transcript, status: "success" });
};

module.exports = { videoTranscriptRoute };
