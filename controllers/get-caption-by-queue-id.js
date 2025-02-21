// TODO:
// write route here

const { getCompletedCaptionByQueueId } = require("../services/video-captions");

const getCaptionById = async (req, res) => {
  try {
    const captionId = req.body.captionId;

    if (!captionId) {
      return res
        .status(400)
        .json({ status: "failed", message: "Caption ID is mandatory" });
    }

    // TODO: Get caption by caption id
    const caption = await getCompletedCaptionByQueueId(captionId);
    if (!caption) {
      return res
        .status(404)
        .json({ status: "failed", message: "Caption not found" });
    }

    return res.status(200).json({ status: "success", caption });
  } catch (error) {
    console.error(`Error in getCaptionById: ${error.message}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

module.exports = getCaptionById;
