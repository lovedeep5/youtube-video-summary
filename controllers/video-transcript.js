const { addRequestToQueue } = require("../services/video-queue.js");

const videoTranscriptRoute = async (req, res) => {
  try {
    const URL = req.body.url;
    const token = req.body.token;

    if (!URL) {
      return res
        .status(400)
        .json({ status: "failed", message: "YouTube URL is mandatory" });
    }

    const task = await addRequestToQueue(URL, token);
    console.log(`Task added to queue id: ${task.id}`);

    return res.status(200).json({ id: task.id, status: "success" });
  } catch (error) {
    console.error(`Error in videoTranscriptRoute: ${error.message}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

module.exports = { videoTranscriptRoute };
