const { captionsQueue } = require("../lib/queues.js");
const { saveCaptionQueue } = require("./video-captions.js");

const addRequestToQueue = (url, auth) => {
  try {
    return captionsQueue
      .add("get youtube captions", {
        url,
        key: auth,
      })
      .then(async (res) => {
        await saveCaptionQueue(123456, res.id, url);
        return res;
      });
  } catch (error) {
    return error;
  }
};

module.exports = { addRequestToQueue };
